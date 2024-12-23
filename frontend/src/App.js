import React, { useState, useEffect } from "react"; // Add useEffect for AOS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import InputForm from "./components/InputForm";
import DataAnalysis from "./pages/DataAnalysis";
import Results from "./pages/Results";
import UploadPDF from "./components/UploadPDF";
import SantaClaus from "./pages/SantaClaus";
import GiftSuggestions from "./pages/GiftSuggestions";

const App = () => {
    const [formData, setFormData] = useState({
        age: "",
        juv_fel_count: "",
        juv_misd_count: "",
        juv_other_count: "",
        priors_count: "",
        days_b_screening_arrest: "",
        c_days_from_compas: "",
        sex: "Male",
        race: "African-American",
        score_text: "Low",
        decile_score: "",
        v_score_text: "Low",
        v_decile_score: "",
        c_charge_degree: "(M1)"
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <Router>
            {/* PDF Upload and Results */}
            <Routes>
            </Routes>

            {/* Main Content */}
            <Header />
            <Routes>
                <Route
                    path="/upload"
                    element={<UploadPDF setFormData={setFormData} />}
                />
                <Route
                    path="/scan-pdf"
                    element={<UploadPDF setFormData={setFormData} />}
                />
                <Route
                    path="/"
                    element={
                        <HomePage
                            setFormData={setFormData}
                            formData={formData}
                        />
                    }
                />
                <Route
                    path="/input-form"
                    element={<InputForm formData={formData} setFormData={setFormData} />}
                />
                <Route path="/data-analysis" element={<DataAnalysis />} />
                <Route path="/santa" element={<SantaClaus />} />
                <Route path="/gifts" element={<GiftSuggestions />} />
                <Route path='/results' element={<Results />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
