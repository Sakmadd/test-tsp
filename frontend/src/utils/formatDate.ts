export function formatDateFromString(dateString: string): string {
  const date = new Date(dateString); // Konversi string ke Date

  const day = String(date.getUTCDate()).padStart(2, '0'); // Ambil tanggal (2 digit)
  const month = date.toLocaleString('en-GB', {
    month: 'long',
    timeZone: 'UTC',
  }); // Nama bulan
  const year = date.getUTCFullYear(); // Tahun

  return `${day} ${month} ${year}`;
}
