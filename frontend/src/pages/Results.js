import React from "react";
import { useLocation } from "react-router-dom";
import "./Results.css";

const Results = () => {
    const location = useLocation();
    const { result } = location.state || {};

    const handleDownloadPDF = () => {
        if (result && result.pdf_filename) {
            window.open(result.pdf_filename, "_blank");
        } else {
            alert("PDF file not available.");
        }
    };

    return (
        <div className="results-container">
            {/* Header */}
            <header className="results-header">
                <h1>Prediction Results 🎯</h1>
            </header>

            {/* Results Section */}
            <div className="results-wrapper">
                {/* Recidivism Card */}
                <div className="result-card blue-card" data-aos="fade-right">
                    <h2>🔒 Recidivism Prediction</h2>
                    <p>Probability: <strong>{result?.recidivism_probability ? (result.recidivism_probability * 100).toFixed(2) + "%" : "N/A"}</strong></p>
                    <p>Risk Level: <strong>{result?.recidivism_prediction || "N/A"}</strong></p>
                    {result?.recidivism_date !== undefined && (
                        <p>Days until recidivism: <strong>{result.recidivism_date}</strong></p>
                    )}
                    {result?.recid_severity_probability !== undefined && (
                        <>
                            <p>Probability of Crime Committed: <strong>{(result.recid_severity_probability * 100).toFixed(2)}%</strong></p>
                            <p>Severity of Crime: <strong>{result.recid_severity_classification}</strong></p>
                        </>
                    )}
                </div>

                {/* Violence Recidivism Card */}
                <div className="result-card red-card" data-aos="fade-left">
                    <h2>🛡️ Violence Prediction</h2>
                    <p>Probability: <strong>{result?.violence_probability ? (result.violence_probability * 100).toFixed(2) + "%" : "N/A"}</strong></p>
                    <p>Risk Level: <strong>{result?.violence_prediction || "N/A"}</strong></p>
                    {result?.violence_date !== undefined && (
                        <p>Days until violent recidivism: <strong>{result.violence_date}</strong></p>
                    )}
                    {result?.violence_severity_probability !== undefined && (
                        <>
                            <p>Probability of Violent Crime: <strong>{(result.violence_severity_probability * 100).toFixed(2)}%</strong></p>
                            <p>Severity of Crime: <strong>{result.violence_severity_classification}</strong></p>
                        </>
                    )}
                </div>
            </div>

            {/* Download Report Button */}
            <div className="btn-container" data-aos="zoom-in">
                <button onClick={handleDownloadPDF} className="btn-download">
                    📄 Download Full Report
                </button>
            </div>
        </div>
    );
};

export default Results;
