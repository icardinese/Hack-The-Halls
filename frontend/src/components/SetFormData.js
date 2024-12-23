import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPDF from "./UploadPDF";
import FormScreen from "./FormScreen"; // Assuming this is the form screen component

const ParentComponent = () => {
    const [formData, setFormData] = useState({});

    return (
        <Router>
            <Routes>
                <Route
                    path="/upload"
                    element={<UploadPDF setFormData={setFormData} />}
                />
                <Route
                    path="/form"
                    element={<FormScreen formData={formData} />}
                />
            </Routes>
        </Router>
    );
};

export default ParentComponent;
