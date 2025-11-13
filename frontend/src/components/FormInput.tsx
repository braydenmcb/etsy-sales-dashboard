import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

import { validateCsvFile } from '../validators/validateCsvFile.tsx'
import  { fetchCsvData }  from '../hooks/fetchCsvData.tsx'




// This component allows users to upload CSV files for analysis
// It uses react-bootstrap for styling and react-dropzone for file handling


const FormInput: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleSubmit = () => {
        const validFiles: File[] = [];
        const errors: string[] = [];

        if (selectedFiles.length === 0) {
            alert("No Files are submitted!")
        }
        selectedFiles.forEach((file) => {
            const {valid, error} = validateCsvFile(file);
            if (valid) {
                validFiles.push(file);
            } else if (error) {
                errors.push(`${file.name}: ${error}`);
            }
        });

        if (errors.length > 0) {
            alert("Some files are invalid:\n" + errors.join("\n"));
            return;
        }

        console.log("Valid CSV files:", validFiles.map(f=> f.name));

        fetchCsvData(validFiles)
    };

    return (
        <>
            <Form>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Upload your CSV file(s)</Form.Label>
                    <br></br>
                    <Form.Control type="file" multiple accept=".csv" onChange={handleFileChange}/>
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                    <p>*Either drag over a group of files, or Ctrl/Cmd/Shift + click to select your files.</p>
                </Form.Group>
            </Form>
        </>
    )
}

export default FormInput;