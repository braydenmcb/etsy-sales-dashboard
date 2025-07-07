// import Papa from 'papaparse';
import { sendDatatoBackend } from "../api/sendData";

export function fetchCsvData(file: File): void {
    // const reader = new FileReader();
    // reader.onload = () => {
    //     const text = reader.result as string;
    // };
    // reader.readAsText(file);
    
    sendDatatoBackend(file, file.name);
}

