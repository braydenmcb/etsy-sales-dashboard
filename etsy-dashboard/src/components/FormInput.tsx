import Form from 'react-bootstrap/Form';

import { validateCsvFile } from '../validators/validateCsvFile.tsx'
import  { fetchCsvData }  from '../hooks/fetchCsvData.tsx'


// This component allows users to upload CSV files for analysis
// It uses react-bootstrap for styling and react-dropzone for file handling


const FormInput: React.FC = () => {
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0 ) return;

        const validFiles: File[] = [];
        const errors: string[] = [];

        Array.from(files).forEach((file) => {
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

        for (var file in validFiles) {
            fetchCsvData(file);
        }
    };

    return (
        <>
            <Form>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Upload your CSV file(s)</Form.Label>
                    <Form.Control type="file" multiple accept=".csv" onChange={handleFilesChange}/>
                </Form.Group>
            </Form>
        </>
    )
}

export default FormInput;