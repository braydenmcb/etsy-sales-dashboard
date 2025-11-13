export function validateCsvFile(file: File): { valid: boolean; error?: string } {
    const isCsv = file.name.endsWith(".csv");
    const isEmpty = file.size <= 0;
    const maxSize = 5 * 1024 * 1024; // 5 MB, subject to change
    const isProperFileNames = file.name.startsWith("EtsySoldOrders") || file.name.startsWith("EtsySoldOrderItems");

    if (!isCsv) return { valid: false, error: "file must be a '.csv' file"};
    if (isEmpty) return { valid :false, error: "file is empty"};
    if (file.size > maxSize) return { valid: false, error: "file is too large, exceeds 5 MB"};
    if (!isProperFileNames) return { valid: false, error: "file is of wrong name."}

    return { valid: true }
}