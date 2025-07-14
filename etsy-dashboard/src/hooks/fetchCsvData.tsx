// import Papa from 'papaparse';
import { sendDatatoBackend } from "../api/sendData";

export function fetchCsvData(file: File): void {
    console.log("parsing file: " + file.name);
    const reader = new FileReader();
    reader.onload = () => {
        const text = reader.result as string;
        sendDatatoBackend({ filename: file.name, content: text});
    };
    reader.readAsText(file);
}

