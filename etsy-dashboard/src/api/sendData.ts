import Papa from "papaparse";

export function sendDataToBackend({ filename, content }: {filename: string; content: any[] }) {
    const csvContent = Papa.unparse(content);
    const blob = new Blob([csvContent], {type: "text/csv"});

    const formData = new FormData();
    formData.append("file", blob, filename);

    fetch("http://127.0.0.1:8888/api/sales", {
    method: "POST",
    body: formData
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Server error: ${res.status} - ${text}`);
        }
        return res.json();
    })
    .then((data) => console.log("Upload successful:", data))
    .catch((err) => console.error("Upload failed:", err));

}