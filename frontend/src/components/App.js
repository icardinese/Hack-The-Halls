import React, { useState } from "react";
import UploadPDF from "./UploadPDF";
import InputForm from "./InputForm";

const App = () => {
    const [formData, setFormData] = useState({}); // Initialize state

    return (
        <div>
            <h1>PDF Upload and Form Example</h1>
            <UploadPDF setFormData={setFormData} /> {/* Pass setFormData */}
            <InputForm formData={formData} setFormData={setFormData} /> {/* Pass both formData and setFormData */}
        </div>
    );
};

export default App;
