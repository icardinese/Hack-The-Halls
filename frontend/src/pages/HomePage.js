import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Add specific styling for HomePage
import compasProblem from "../images/compasproblem.jpg";
import solution from "../images/solution.png";

const HomePage = () => {

    const navigate = useNavigate(); // Hook for navigation

    const handleGetStarted = () => {
        navigate("/input-form"); // Change the path to match the prediction page route
    };

    return (
        <div className="homepage-container">
            <section className="hero" data-aos="fade-up">
                <h1 className="hero-title">🎄 Welcome to PrediCore AI - Christmas Edition 🎅</h1>
                <p className="hero-description">
                    Making this holiday season magical with AI-powered tools for everyone!
                </p>
                <button className="hero-button" onClick={handleGetStarted}>
                    Get Started
                </button>
            </section>

            <section className="features" data-aos="fade-right">
                <h2 className="features-title">Our Holiday Features</h2>
                <div className="features-grid">
                    <div className="feature-card" data-aos="zoom-in">
                        🎅 <h3>Santa Chat</h3>
                        <p>Talk to Santa Claus and share your holiday wishes!</p>
                    </div>
                    <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
                        🎁 <h3>Gift Suggestions</h3>
                        <p>Let AI recommend the perfect presents for your loved ones.</p>
                    </div>
                    <div className="feature-card" data-aos="zoom-in" data-aos-delay="400">
                        📊 <h3>Data Analysis</h3>
                        <p>Look at our data-analysis where we show our AI superiority to COMPAS.</p>
                    </div>
                </div>
            </section>

             {/* Problem Section */}
             <section className="problem-section" data-aos="fade-right">
                <div className="content">
                    <h2>The Problem with COMPAS</h2>
                    <p>
                        COMPAS, a widely used criminal risk assessment tool, has been found to 
                        exhibit significant racial biases. Studies show that African-Americans 
                        are falsely flagged as high-risk at nearly twice the rate of Caucasians.
                    </p>
                    <p>
                        This leads to unjust sentencing and perpetuates systemic inequities in 
                        the criminal justice system.
                    </p>
                </div>
                <div className="image">
                    <img
                        src={compasProblem}
                        alt="Illustration of COMPAS bias"
                    />
                </div>
            </section>

            {/* Solution Section */}
            <section className="solution-section" data-aos="fade-left">
                <div className="image">
                    <img
                        src={solution}
                        alt="Illustration of PrediCore AI's solution"
                    />
                </div>
                <div className="content">
                    <h2>How PrediCore AI Solves It</h2>
                    <p>
                        PrediCore AI uses advanced machine learning algorithms to provide unbiased
                        and accurate recidivism risk predictions. Unlike COMPAS, our system ensures
                        fairness across demographic groups, reducing false-positive rates.
                    </p>
                    <p>
                        With PrediCore AI, professionals can make informed decisions that foster
                        justice and equality.
                    </p>
                </div>
            </section>

            <div class="percentage-cards-container">
            <div class="percentage-cards">
    
                <div class="percentage-card green">
                <div class="percentage-value">85%</div>
                <div class="percentage-text">Improvement in prediction accuracy</div>
                </div>

 
                <div class="percentage-card blue">
                <div class="percentage-value">50%</div>
                <div class="percentage-text">Reduction in racial bias</div>
                </div>

   
                <div class="percentage-card gold">
                <div class="percentage-value">100%</div>
                <div class="percentage-text">Transparency in decision-making</div>
                </div>
            </div>
            </div>



            {/* Call to Action */}
            <section className="cta-section" data-aos="fade-up">
                <h2>Ready to Make a Difference?</h2>
                <p>
                    Join us in creating a more equitable future by leveraging AI to reshape 
                    criminal justice. Take the first step today!
                </p>
                <button className="cta-button" onClick={handleGetStarted}>
                    Start Predicting
                </button>
            </section>

            <section className="mission" data-aos="fade-left">
                <h2 className="mission-title">🎅 Why Choose PrediCore AI?</h2>
                <p className="mission-description">
                    Our mission is to harness the magic of AI and bring joy, precision, and insights
                    to your holiday season. Here's why we're special:
                </p>
                <ul>
                    <li>✨ AI-powered gift recommendations</li>
                    <li>🎅 Fun and engaging tools like Santa Chat</li>
                    <li>📊 Insights that make a difference</li>
                </ul>
            </section>
        </div>
    );
};

export default HomePage;
