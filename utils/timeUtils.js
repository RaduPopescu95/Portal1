export function getCurrentDateTime() {
  const now = new Date();

  // Obține data în formatul "21-09-2023"
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Adăugați 1 la lună, deoarece indexul lunii începe de la 0
  const year = now.getFullYear();

  // Obține ora în formatul "16:00"
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const dateFormatted = `${day}-${month}-${year}`;
  const timeFormatted = `${hours}:${minutes}`;

  return {
    date: dateFormatted,
    time: timeFormatted,
  };
}

export function parseDateToISO(dateInput) {
  if (!dateInput) return null;
  try {
    if (
      typeof dateInput === "object" &&
      typeof dateInput.toDate === "function"
    ) {
      return dateInput.toDate().toISOString();
    }
    if (dateInput instanceof Date) {
      return isNaN(dateInput.getTime()) ? null : dateInput.toISOString();
    }

    const str = String(dateInput).trim();
    if (!str) return null;

    if (str.includes("T") || /^\d{4}-\d{2}-\d{2}$/.test(str)) {
      const iso = new Date(str);
      if (!isNaN(iso.getTime())) return iso.toISOString();
    }

    const parts = str.split("-");
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (!day || !month || !year) return null;
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;

    const date = new Date(Date.UTC(year, month - 1, day));
    return isNaN(date.getTime()) ? null : date.toISOString();
  } catch (err) {
    console.warn("[parseDateToISO] invalid input", dateInput, err);
    return null;
  }
}
