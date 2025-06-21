import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// This component allows users to upload CSV files for analysis
// It uses react-bootstrap for styling and react-dropzone for file handling
// NOTE: might want to ad a file verification step to ensure the uploaded files are valid CSVs (might make a separate component for that)
function FormInput() {
    return (
        <>
            <Form>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Upload your CSV file(s)</Form.Label>
                    <Form.Control type="file" multiple accept=".csv" />
                </Form.Group>
            </Form>
        </>
    )
}

export default FormInput;