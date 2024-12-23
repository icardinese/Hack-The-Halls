import React from 'react';
import './Features.css';

const features = [
  { title: 'Santa Chat', description: 'Talk directly to Santa Claus!', icon: '🎅' },
  { title: 'Gift Suggestions', description: 'AI-powered personalized gift recommendations!', icon: '🎁' },
  { title: 'Data Analysis', description: 'Understand gifting trends.', icon: '📊' },
];

const Features = () => {
  return (
    <div className="features">
      <h2 className="features-title">Why Choose PrediCore AI?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
