const OPT_IN_REQUIRED: Set<string> = new Set([
  // EU (27 countries)
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  // EEA
  "IS",
  "LI",
  "NO",
  // UK (PECR)
  "GB",
  // Other opt-in countries
  "BR", // Brazil (LGPD)
  "CH", // Switzerland
  "CN", // China
  "KR", // South Korea
  "SA", // Saudi Arabia
  "NG", // Nigeria
  "AE", // UAE (PDPL)
  "ZA" // South Africa (POPIA)
]);

export function checkIfRequiresOptIn(countryCode: string | null): boolean {
  if (!countryCode) return true;
  return OPT_IN_REQUIRED.has(countryCode.toUpperCase());
}
