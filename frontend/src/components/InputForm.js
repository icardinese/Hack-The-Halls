import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InputForm.css";

const InputForm = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/predict_recidivism",
        formData
      );
      console.log("Prediction results:", response.data);
      navigate("/results", { state: { result: response.data } });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Input Data</h2>
      <form onSubmit={handleSubmit}>
        {/* Numerical Inputs */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="juv_fel_count">Juvenile Felony Count:</label>
            <input
              type="number"
              name="juv_fel_count"
              value={formData.juv_fel_count}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="juv_misd_count">Juvenile Misdemeanor Count:</label>
            <input
              type="number"
              name="juv_misd_count"
              value={formData.juv_misd_count}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="juv_other_count">Juvenile Other Count:</label>
            <input
              type="number"
              name="juv_other_count"
              value={formData.juv_other_count}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priors_count">Prior Crimes Count:</label>
            <input
              type="number"
              name="priors_count"
              value={formData.priors_count}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="days_b_screening_arrest">
              Days Before Screening Arrest:
            </label>
            <input
              type="number"
              name="days_b_screening_arrest"
              value={formData.days_b_screening_arrest}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="c_days_from_compas">Days From COMPAS:</label>
            <input
              type="number"
              name="c_days_from_compas"
              value={formData.c_days_from_compas}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Categorical Inputs */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="race">Race:</label>
            <select
              name="race"
              value={formData.race}
              onChange={handleChange}
              required
            >
              <option value="African-American">African-American</option>
              <option value="Caucasian">Caucasian</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Asian">Asian</option>
              <option value="Native American">Native American</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="score_text">Score Text:</label>
            <select
              name="score_text"
              value={formData.score_text}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="decile_score">Decile Score:</label>
            <input
              type="number"
              name="decile_score"
              value={formData.decile_score}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="v_score_text">Violence Score Text:</label>
            <select
              name="v_score_text"
              value={formData.v_score_text}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="v_decile_score">Violence Decile Score:</label>
            <input
              type="number"
              name="v_decile_score"
              value={formData.v_decile_score}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="c_charge_degree">Charge Degree:</label>
            <select
              name="c_charge_degree"
              value={formData.c_charge_degree}
              onChange={handleChange}
              required
            >
              <option value="(M1)">Misdemeanor, 1st Degree</option>
              <option value="(M2)">Misdemeanor, 2nd Degree</option>
              <option value="(F1)">Felony, 1st Degree</option>
              <option value="(F2)">Felony, 2nd Degree</option>
              <option value="(F3)">Felony, 3rd Degree</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-predict">
          Predict
        </button>
      </form>
    </div>
  );
};

export default InputForm;
