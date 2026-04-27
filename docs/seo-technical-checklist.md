# SEO Technical Checklist

Portal: FirmeAmenajariGradina.ro  
Scop: imbunatatiri tehnice SEO pentru un director local cu firme, judete, landing pages locale si articole.

## Prioritate mare

### 1. Sitemap corect si complet

Ce trebuie corectat:

- Sitemap-ul trebuie sa foloseasca mereu host-ul canonic: `https://www.firmeamenajarigradina.ro`.
- Trebuie incluse toate paginile publice indexabile:
  - homepage
  - pagini statice
  - `/firma/[slug]`
  - `/judet/[id]`
  - landing pages locale `/{slug}`
  - `/blog/[id]`
- Trebuie excluse paginile cu `noIndex`.
- `lastModified` ar trebui sa vina din Sanity (`_updatedAt`, `publishedAt`, etc.), nu din `new Date()` pentru toate intrarile.

Fisiere relevante:

- `app/sitemap.js`
- `lib/sanity/queries.js`

De ce conteaza:

Sitemap-ul este principala cale prin care Google descopera paginile dinamice importante ale unui director local.

### 2. Centralizare URL canonic

Ce trebuie corectat:

- `SITE_URL` este definit repetat in mai multe fisiere.
- Trebuie creat un helper unic pentru baza URL:
  - canonical
  - Open Graph URL
  - sitemap
  - robots
  - JSON-LD
  - breadcrumbs

Fisiere relevante:

- `app/layout.jsx`
- `app/sitemap.js`
- `app/robots.js`
- `app/page.jsx`
- `app/firma/[slug]/page.jsx`
- `app/[clinici]/page.jsx`
- `app/(listings)/judet/[id]/page.jsx`
- `app/(listings)/amenajari-gradini/page.jsx`
- `app/(blogs)/blog/[id]/page.jsx`
- `components/common/JsonLd.jsx`
- `lib/sanity/seo.js`

De ce conteaza:

Evita semnalele mixte intre `www`, non-`www`, localhost sau alte valori de mediu.

### 3. Imagine OG implicita

Ce trebuie corectat:

- Metadata foloseste `/og-default.jpg`, dar fisierul trebuie sa existe in `public/`.
- Recomandare: `public/og-default.jpg`, dimensiune `1200x630`.

Fisiere relevante:

- `app/layout.jsx`
- `public/og-default.jpg`

De ce conteaza:

Preview-urile sociale si link previews pot afisa imagine corecta pentru pagini fara imagine proprie.

### 4. JSON-LD extins

Ce trebuie corectat:

- Adauga schema `Organization` globala.
- Adauga schema `FAQPage` pentru landing pages care au FAQ.
- Extinde `LocalBusiness` pentru firme cu date disponibile:
  - `priceRange`
  - `openingHours`
  - `areaServed`
  - `hasMap`
  - `serviceType`
  - `sameAs`
  - `aggregateRating` doar daca exista review-uri reale

Fisiere relevante:

- `utils/schemaOrg.js`
- `app/page.jsx`
- `app/firma/[slug]/page.jsx`
- `app/[clinici]/page.jsx`
- `app/(listings)/judet/[id]/page.jsx`

De ce conteaza:

Schema ajuta motoarele de cautare sa inteleaga entitatile locale, serviciile si structura directorului.

### 5. Heading hierarchy

Ce trebuie corectat:

- Fiecare pagina indexabila trebuie sa aiba un singur `h1` clar.
- Blog detail trebuie sa foloseasca `h1` pentru titlul articolului, nu `h3`.
- Cardurile de firme ar trebui sa foloseasca `h3`, nu multe `h2`.
- Sectiunile secundare folosesc `h2`, iar subsectiunile `h3`.

Fisiere relevante:

- `app/(blogs)/blog/[id]/page.jsx`
- `components/listing-style/slider-style/FeaturedItem.jsx`
- `components/judete/FirmaItem.jsx`
- `components/agency-details/PropertyHeader.jsx`
- `components/listing-style/slider-style/index.jsx`

De ce conteaza:

O structura coerenta de heading-uri ajuta atat SEO, cat si accesibilitatea.

## Prioritate medie

### 6. Curatare linkuri goale

Ce trebuie corectat:

- Inlocuieste `href="#"` cu:
  - `button`, daca elementul declanseaza o actiune
  - `span`, daca este doar eticheta vizuala
  - link real, daca trebuie sa fie navigabil

Fisiere relevante:

- componente publice din `components/common`
- `components/listing-style`
- `components/judete`
- `components/blog-details`

De ce conteaza:

Reduce linkurile inutile crawl-uite de Google si imbunatateste accesibilitatea.

### 7. Canonical consistent pe toate paginile

Ce trebuie corectat:

- Toate canonical-urile trebuie sa fie absolute sau rezolvate corect prin `metadataBase`.
- Host-ul trebuie sa fie mereu acelasi: `https://www.firmeamenajarigradina.ro`.
- `og:url`, breadcrumbs JSON-LD si sitemap trebuie sa fie aliniate cu canonical-ul.

Fisiere relevante:

- `lib/sanity/seo.js`
- `app/layout.jsx`
- `app/sitemap.js`
- paginile dinamice din `app/`

De ce conteaza:

Evita duplicate content intre `www`, non-`www`, localhost si URL-uri relative interpretate diferit.

### 8. Sanitizare continut firma

Ce trebuie corectat:

- `dangerouslySetInnerHTML` trebuie eliminat sau sanitizat explicit.
- Preferabil: continutul firmelor sa fie Portable Text din Sanity.
- Daca ramane HTML, trebuie trecut printr-un sanitizer controlat.

Fisiere relevante:

- `components/agency-details/DescriptionsText.jsx`

De ce conteaza:

Reduce riscul de XSS si pastreaza markup-ul mai curat pentru crawlere.

### 9. Metadata dinamica mai completa

Ce trebuie corectat:

- Firme:
  - titlu cu firma + localitate/judet
  - descriere unica
  - imagine OG din galerie/logo
- Judete:
  - titluri si descrieri unice, nu template prea generic
- Landing pages:
  - canonical/noindex din Sanity
  - OG image daca exista
- Blog:
  - `publishedTime`
  - `modifiedTime`
  - author
  - imagine OG

Fisiere relevante:

- `app/firma/[slug]/page.jsx`
- `app/[clinici]/page.jsx`
- `app/(listings)/judet/[id]/page.jsx`
- `app/(blogs)/blog/[id]/page.jsx`
- `lib/sanity/seo.js`

De ce conteaza:

Metadata buna creste rata de click si reduce riscul de titluri generate automat de Google.

### 10. Internal linking

Ce trebuie corectat:

- Pe paginile de judet, adauga linkuri catre:
  - localitati din judet
  - firme relevante
  - servicii relevante
- Pe landing pages locale, adauga linkuri catre:
  - firme listate
  - judet
  - articole relevante
  - categorii de servicii
- Pe articole, adauga linkuri catre pagini locale si firme relevante.

Fisiere relevante:

- `components/judete/index.jsx`
- `components/listing-style/slider-style/index.jsx`
- `components/sanity/PortableContent.jsx`
- `app/(blogs)/blog/[id]/page.jsx`

De ce conteaza:

Ajuta Google sa inteleaga ierarhia portalului si distribuie autoritate interna catre paginile locale.

## Prioritate performanta

### 11. Reducere JavaScript pe paginile publice

Ce trebuie corectat:

- Separarea componentelor client-only.
- Eliminarea importurilor grele unde nu sunt necesare.
- Evitarea incarcarii globale a functionalitatilor de dashboard/admin pe pagini publice.

Zone relevante:

- homepage
- `/amenajari-gradini`
- `/judet/[id]`
- `/firma/[slug]`
- componente din `components/common`

De ce conteaza:

First Load JS este ridicat pe paginile publice si poate afecta Core Web Vitals.

### 12. Lazy load pentru harti si galerii

Ce trebuie corectat:

- Google Maps trebuie incarcat doar cand sectiunea este vizibila sau utilizatorul interactioneaza.
- PhotoSwipe/gallery trebuie incarcat doar pe paginile unde este necesar.

Fisiere relevante:

- `components/lazyLoadMap/LazyLoadGoogleMap.jsx`
- `components/agency-details/ListingGallery.jsx`
- `components/common/agent-view/ContactWithAgent.jsx`

De ce conteaza:

Reduce JS initial si imbunatateste timpul pana la interactivitate.

### 13. Eliminare console logs din productie

Ce trebuie corectat:

- Elimina `console.log` din componente publice si utilitare.
- Pastreaza doar logging util in server-side error handling.

Zone relevante:

- `components/agency-details/ListingGallery.jsx`
- `utils/firestoreUtils.js`
- `utils/storageUtils.js`
- `utils/localProjectlUtils.js`
- alte fisiere gasite prin `rg "console\\.log"`

De ce conteaza:

Curata output-ul, reduce zgomotul in debugging si elimina expuneri accidentale de date.

## Prioritate operationala

### 14. Secrete in env server-side

Ce trebuie corectat:

- Token-urile si hook secret-urile nu trebuie sa aiba prefix `NEXT_PUBLIC`.
- Valorile reale nu ar trebui commit-uite in `.env`.
- Recomandare:
  - `.env.example` cu chei goale
  - `.env.local` pentru dezvoltare locala
  - Vercel Environment Variables pentru productie

Variabile relevante:

- `SANITY_API_READ_TOKEN`
- `SANITY_HOOK_SECRET`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`

De ce conteaza:

Reduce riscul de expunere a secretelor si previne configurari gresite in build.

### 15. Verificare post-deploy

Dupa fiecare deploy SEO relevant, verifica:

- `https://www.firmeamenajarigradina.ro/robots.txt`
- `https://www.firmeamenajarigradina.ro/sitemap.xml`
- canonical pe homepage
- canonical pe `/amenajari-gradini`
- canonical pe o pagina de firma
- canonical pe o pagina de judet
- numar URL-uri din sitemap
- prezenta JSON-LD in HTML
- lipsa `localhost` in HTML si XML

Comenzi utile:

```bash
curl -L -sS https://www.firmeamenajarigradina.ro/sitemap.xml
curl -L -sS https://www.firmeamenajarigradina.ro/robots.txt
curl -L -sS https://www.firmeamenajarigradina.ro/ | rg "canonical|application/ld\\+json|localhost"
```

## Ordine recomandata de implementare

1. Sitemap complet si canonical host unic.
2. Helper central pentru URL-uri absolute.
3. Imagine OG implicita.
4. FAQPage si LocalBusiness schema extinsa.
5. Heading hierarchy.
6. Curatare linkuri `href="#"`.
7. Sanitizare continut firma.
8. Internal linking.
9. Reducere JS si lazy loading.
10. Eliminare console logs.
