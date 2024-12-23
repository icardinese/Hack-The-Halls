import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

const DataAnalysis = () => {
  useEffect(() => {
    // --- Overall Performance Metrics Comparison ---
    const overallMetrics = ['Accuracy', 'Precision', 'Recall', 'F1 Score'];
    const yourModelMetrics = [82.64, 82.93, 82.64, 82.57];
    const yourModelDebiasedMetrics = [82.84, 82.98, 82.84, 82.80];
    const compasMetrics = [63.65, 63.79, 63.65, 63.64];

    const overallData = [
      {
        x: overallMetrics,
        y: yourModelMetrics,
        name: 'Your Model',
        type: 'bar',
        marker: { color: 'rgb(55, 83, 109)' },
      },
      {
        x: overallMetrics,
        y: yourModelDebiasedMetrics,
        name: 'Your Model (Debiased)',
        type: 'bar',
        marker: { color: 'rgb(26, 118, 255)' },
      },
      {
        x: overallMetrics,
        y: compasMetrics,
        name: 'COMPAS',
        type: 'bar',
        marker: { color: 'rgb(229, 43, 80)' },
      },
    ];

    const overallLayout = {
      title: 'Overall Performance Metrics Comparison',
      xaxis: { title: 'Metrics' },
      yaxis: { title: 'Percentage (%)', range: [0, 100] },
      barmode: 'group',
    };

    Plotly.newPlot('overall-metrics', overallData, overallLayout);

    // --- Group Accuracies Comparison ---
    const groups = ['African-American', 'Caucasian', 'Hispanic', 'Other', 'Native American', 'Asian'];
    const yourModelGroupAccuracies = [80.85, 84.55, 84.59, 84.83, 100.0, 92.86];
    const yourModelDebiasedGroupAccuracies = [81.27, 84.29, 84.59, 85.96, 100.0, 92.86];
    const compasGroupAccuracies = [63.48, 62.83, 68.80, 60.11, 88.89, 85.71];

    const groupAccData = [
      {
        x: groups,
        y: yourModelGroupAccuracies,
        name: 'Your Model',
        type: 'bar',
        marker: { color: 'rgb(55, 83, 109)' },
      },
      {
        x: groups,
        y: yourModelDebiasedGroupAccuracies,
        name: 'Your Model (Debiased)',
        type: 'bar',
        marker: { color: 'rgb(26, 118, 255)' },
      },
      {
        x: groups,
        y: compasGroupAccuracies,
        name: 'COMPAS',
        type: 'bar',
        marker: { color: 'rgb(229, 43, 80)' },
      },
    ];

    const groupAccLayout = {
      title: 'Group Accuracies Comparison',
      xaxis: { title: 'Racial Group' },
      yaxis: { title: 'Accuracy (%)', range: [0, 100] },
      barmode: 'group',
    };

    Plotly.newPlot('group-accuracies', groupAccData, groupAccLayout);

    const maeGroups = [
      "Overall",
      "African-American",
      "Caucasian",
      "Hispanic",
      "Other",
      "Native American",
      "Asian",
    ];

    const yourModelMAE = [71.68, 75.28, 62.78, 77.76, 78.43, 23.38, 97.54];
    const yourModelDebiasedMAE = [
      68.25, 71.81, 59.39, 74.95, 75.05, 14.81, 92.58,
    ];
    const compasMAE = [193.29, 194.83, 191.41, 195.77, 178.34, 222.83, 108.05];

    const maeData = [
      {
        x: maeGroups,
        y: yourModelMAE,
        name: "Your Model",
        type: "bar",
        marker: { color: "rgb(55, 83, 109)" },
      },
      {
        x: maeGroups,
        y: yourModelDebiasedMAE,
        name: "Your Model (Debiased)",
        type: "bar",
        marker: { color: "rgb(26, 118, 255)" },
      },
      {
        x: maeGroups,
        y: compasMAE,
        name: "COMPAS",
        type: "bar",
        marker: { color: "rgb(229, 43, 80)" },
      },
    ];

    const maeLayout = {
      title: "Mean Absolute Error for Date Predictions",
      xaxis: { title: "Group" },
      yaxis: { title: "Mean Absolute Error (Days)" },
      barmode: "group",
    };

    Plotly.newPlot("mae-dates", maeData, maeLayout);

    

    // Add other charts (Mean Absolute Error, FPR, FNR, etc.) similarly...

    // --- False Positive Rates by Racial Group ---
    const fprGroups = [
      "African-American",
      "Caucasian",
      "Hispanic",
      "Other",
      "Native American",
      "Asian",
    ];

    const yourModelFPR = [15.47, 8.95, 7.78, 11.32, 0.0, 0.0];
    const yourModelDebiasedFPR = [16.65, 10.47, 8.38, 11.32, 0.0, 0.0];
    const compasFPR = [40.38, 20.15, 19.16, 15.09, 0.0, 14.29];

    const fprData = [
      {
        x: fprGroups,
        y: yourModelFPR,
        name: "Your Model",
        type: "bar",
        marker: { color: "rgb(55, 83, 109)" },
      },
      {
        x: fprGroups,
        y: yourModelDebiasedFPR,
        name: "Your Model (Debiased)",
        type: "bar",
        marker: { color: "rgb(26, 118, 255)" },
      },
      {
        x: fprGroups,
        y: compasFPR,
        name: "COMPAS",
        type: "bar",
        marker: { color: "rgb(229, 43, 80)" },
      },
    ];

    const fprLayout = {
      title: "False Positive Rates by Racial Group",
      xaxis: { title: "Racial Group" },
      yaxis: { title: "False Positive Rate (%)", range: [0, 50] },
      barmode: "group",
    };

    Plotly.newPlot("fpr-group", fprData, fprLayout);

    // --- False Negative Rates by Racial Group ---
    const fnrGroups = [
      "African-American",
      "Caucasian",
      "Hispanic",
      "Other",
      "Native American",
      "Asian",
    ];

    const yourModelFNR = [22.16, 24.47, 28.28, 20.83, 0.0, 14.29];
    const yourModelDebiasedFNR = [20.42, 22.99, 27.27, 18.06, 0.0, 14.29];
    const compasFNR = [33.40, 53.97, 60.61, 75.0, 0.0, 14.29];

    const fnrData = [
      {
        x: fnrGroups,
        y: yourModelFNR,
        name: "Your Model",
        type: "bar",
        marker: { color: "rgb(55, 83, 109)" },
      },
      {
        x: fnrGroups,
        y: yourModelDebiasedFNR,
        name: "Your Model (Debiased)",
        type: "bar",
        marker: { color: "rgb(26, 118, 255)" },
      },
      {
        x: fnrGroups,
        y: compasFNR,
        name: "COMPAS",
        type: "bar",
        marker: { color: "rgb(229, 43, 80)" },
      },
    ];

    const fnrLayout = {
      title: "False Negative Rates by Racial Group",
      xaxis: { title: "Racial Group" },
      yaxis: { title: "False Negative Rate (%)", range: [0, 80] },
      barmode: "group",
    };

    Plotly.newPlot("fnr-group", fnrData, fnrLayout);

  }, []);

  return (
    <div id="page-wrapper">
      <section id="banner">
        <div className="inner">
          <header>
            <h2>Data Analysis</h2>
          </header>
          <p>Explore insights from your predictions.</p>
        </div>
      </section>

      <article id="main">
        <section className="wrapper style1 container special">
          <div className="analysis-container">
            <h3>Performance Metrics</h3>
            <div id="overall-metrics"></div>
            <div id="group-accuracies"></div>
            <div id="mae-dates"></div>
            <div id="fpr-group"></div>
            <div id="fnr-group"></div>
          </div>
        </section>
      </article>

      <footer id="footer">
        <ul className="copyright">
          <li>&copy; PrediCore AI</li>
          <li>
            Design by <a href="http://html5up.net">HTML5 UP</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default DataAnalysis;
