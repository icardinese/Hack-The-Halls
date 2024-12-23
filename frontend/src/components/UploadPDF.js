import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadPDF = ({ setFormData }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:5000/upload_pdf", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const extractedData = response.data;
            if (extractedData) {
                setFormData(extractedData); // Prefill the form fields
                alert("Form fields prefilled with extracted data!");
                navigate("/input-form"); // Redirect to the form screen
            } else {
                alert("Failed to extract data from the PDF.");
            }
        } catch (error) {
            console.error("Error uploading PDF:", error);
            alert("Error uploading PDF. Please try again.");
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload a PDF</h2>
            <input type="file" onChange={handleFileChange} />
            <p>{selectedFile ? `Selected File: ${selectedFile.name}` : "No file selected"}</p>
            <button onClick={handleFileUpload}>Upload and Extract</button>
        </div>
    );
};

export default UploadPDF;
