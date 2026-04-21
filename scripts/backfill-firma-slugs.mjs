// Backfill `slug` field on all documents in the `Firme` collection.
// Usage (from project root):
//   node scripts/backfill-firma-slugs.mjs           # dry run (no writes)
//   node scripts/backfill-firma-slugs.mjs --write   # apply updates
//
// Environment:
//   Loads .env.local first, then .env, using dotenv.
//   Needs the NEXT_PUBLIC_FIREBASE_* variables used by the web app.
//   The project's Firestore rules must allow unauthenticated writes to Firme
//   OR run this while signed in (future: wire in email/password auth here).

import fs from "node:fs";
import path from "node:path";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) return;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  });
}

loadEnvFile(path.resolve(".env.local"));
loadEnvFile(path.resolve(".env"));

function slugify(str) {
  if (!str) return "";
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function slugifyFirma(firma) {
  if (!firma) return "";
  const base = [firma.siteName, firma.localitate].filter(Boolean).join(" ");
  return slugify(base);
}

async function main() {
  const writeMode = process.argv.includes("--write");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  if (!firebaseConfig.projectId) {
    console.error(
      "Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID in env; aborting."
    );
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const firmeSnap = await getDocs(collection(db, "Firme"));
  const firme = [];
  firmeSnap.forEach((d) => firme.push({ docId: d.id, ...d.data() }));

  console.log(`Total firme: ${firme.length}`);

  const takenSlugs = new Set(
    firme.map((f) => (f.slug || "").trim()).filter(Boolean)
  );

  const updates = [];
  let skipped = 0;

  for (const firma of firme) {
    if (firma.slug && firma.slug.trim()) {
      skipped += 1;
      continue;
    }
    let base = slugifyFirma(firma);
    if (!base) {
      console.warn(
        `  - skipping ${firma.docId}: cannot derive slug (missing siteName/localitate)`
      );
      skipped += 1;
      continue;
    }
    let candidate = base;
    let counter = 2;
    while (takenSlugs.has(candidate)) {
      candidate = `${base}-${counter}`;
      counter += 1;
    }
    takenSlugs.add(candidate);
    updates.push({ docId: firma.docId, slug: candidate });
  }

  console.log(`To update: ${updates.length} | already had slug: ${skipped}`);
  updates.forEach((u) => console.log(`  ${u.docId} -> ${u.slug}`));

  if (!writeMode) {
    console.log("\nDry run. Re-run with --write to apply.");
    process.exit(0);
  }

  let applied = 0;
  for (const u of updates) {
    try {
      await updateDoc(doc(db, "Firme", u.docId), { slug: u.slug });
      applied += 1;
    } catch (err) {
      console.error(`Failed updating ${u.docId}`, err);
    }
  }
  console.log(`Applied ${applied}/${updates.length} updates.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
