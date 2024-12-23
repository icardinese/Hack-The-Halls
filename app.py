# app.py

import os
import sys
from flask import Flask, redirect, url_for, flash, send_from_directory
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import random
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import numpy as np
from googleSearch import gift_suggestions
from imageGeneration import generate_image
from speechToText import convert_speech_to_text
from vision import analyze_image
from chatbot import chatbot
from textToSpeech import convert_text_to_speech

import main

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace with your own secret key
app.secret_key = 'your_secret_key'

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload and reports directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join('static', 'reports'), exist_ok=True)

# Utility function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_recidivism_classification(input_data):
    # For demonstration purposes, generate a random probability between 0 and 1
    recidivism_prediction, recidivism_probability = main.predict(input_data, "recidivism")
    return recidivism_probability

def predict_violence_classification(input_data):
    # For demonstration purposes, generate a random probability between 0 and 1
    violence_prediction, violence_probability = main.predict(input_data, "violence")
    return violence_probability

def predict_recidivism_date(input_data, prediction_type):
    # First preprocess the data obviously
    recidivism_date = main.predict_date(input_data, prediction_type)
    return recidivism_date

def predict_violence_date(input_data, prediction_type):
    # First preprocess the data obviously
    violence_date = main.predict_date(input_data, prediction_type)
    return violence_date

def predict_severity(input_data, recidivism_verdict, violence_verdict):
    # First preprocess the data obviously
    recidivism_severity = main.predict_severity(input_data, recidivism_verdict, violence_verdict)
    return recidivism_severity

def generate_pdf_report(
    user_data,
    recidivism_prob,
    recidivism_score,
    violent_recidivism_prob,
    violent_recidivism_score,
    recidivism_date,
    violence_date,
    recid_severity_probability,
    recid_severity_classification,
    violence_severity_probability,
    violence_severity_classification
):
    # Set the file name
    print('HEFJEIOFJAO EFIJAOA;EFIJWAIO;F')
    pdf_filename = f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    output_path = os.path.join("static", "reports", pdf_filename)

    # Create a SimpleDocTemplate
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    elements = []

    # Add Logo and Header
    logo_path = os.path.join("frontend", "static", "images", "logo.png")  # Update with your logo path
    if os.path.exists(logo_path):
        logo = Image(logo_path, width=100, height=50)
        elements.append(logo)
    elements.append(Spacer(1, 20))

    header = Paragraph("<strong>Recidivism and Violent Crime Risk Report</strong>", getSampleStyleSheet()["Title"])
    elements.append(header)

    date = Paragraph(f"<i>Date: {datetime.now().strftime('%B %d, %Y')}</i>", getSampleStyleSheet()["Normal"])
    elements.append(date)
    elements.append(Spacer(1, 20))

    # Add User Data
    user_data_section = Paragraph("<strong>User Information</strong>", getSampleStyleSheet()["Heading2"])
    elements.append(user_data_section)
    user_data_table = Table([[key, value] for key, value in user_data.items()])
    user_data_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(user_data_table)
    elements.append(Spacer(1, 20))

    # Summary Section
    summary_section = Paragraph("<strong>Summary</strong>", getSampleStyleSheet()["Heading2"])
    elements.append(summary_section)

    summary_data = [
        ["Recidivism Probability", f"{round(recidivism_prob * 100, 2)}%"],
        ["Recidivism Risk Level", recidivism_score],
        ["Violent Recidivism Probability", f"{round(violent_recidivism_prob * 100, 2)}%"],
        ["Violent Recidivism Risk Level", violent_recidivism_score],
        ["Predicted Recidivism Date", recidivism_date],
        ["Predicted Violent Crime Date", violence_date],
    ]
    summary_table = Table(summary_data)
    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.lightblue),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.black),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(summary_table)
    elements.append(Spacer(1, 20))

    # Severity Section
    severity_section = Paragraph("<strong>Severity Predictions</strong>", getSampleStyleSheet()["Heading2"])
    elements.append(severity_section)

    severity_data = [
        ["Recidivism Severity Probability", f"{round(recid_severity_probability * 100, 2)}%" if recid_severity_probability else "N/A"],
        ["Recidivism Severity Classification", recid_severity_classification if recid_severity_classification else "N/A"],
        ["Violent Crime Severity Probability", f"{round(violence_severity_probability * 100, 2)}%" if violence_severity_probability else "N/A"],
        ["Violent Crime Severity Classification", violence_severity_classification if violence_severity_classification else "N/A"],
    ]
    severity_table = Table(severity_data)
    severity_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.black),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(severity_table)
    elements.append(Spacer(1, 20))

    # Footer
    footer = Paragraph(
        "<i>Generated by Fighting Against Racial Bias in the Criminal Justice System</i>",
        ParagraphStyle(name="Footer", fontSize=10, alignment=1)
    )
    elements.append(Spacer(1, 50))
    elements.append(footer)

    # Build the PDF
    doc.build(elements)

    return pdf_filename


def extract_data_from_pdf(file_path):
    # For demonstration purposes, return dummy data
    # In practice, use PyPDF2 or pdfminer.six to extract text from the PDF
    extracted_data = {
        'age': 35,
        'juv_fel_count': 0,
        'juv_misd_count': 1,
        'juv_other_count': 0,
        'priors_count': 2,
        'days_b_screening_arrest': -5,
        'c_days_from_compas': 0,
        'decile_score': 4,
        'score_text': 'Medium',
        'c_charge_degree': '(F3)',
        'v_score_text': 'Medium',
        'v_decile_score': 5,
        'sex': 'Male',
        'race': 'African-American'
    }
    return extracted_data

@app.context_processor
def inject_now():
    return {'current_year': datetime.utcnow().year}

# Utility function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict_recidivism', methods=['POST'])
def predict_recidivism():
    input_data = request.json  # Expecting JSON input from React
    user_data = input_data
    print("hey clutch up hey clutch up hey cluthc up")
    print(input_data)
    if not input_data:
        return jsonify({'error': 'Invalid input data'}), 400

    try:
        numerical_fields = ['age', 'juv_fel_count', 'juv_misd_count', 
        'juv_other_count', 'priors_count', 'days_b_screening_arrest', 
        'c_days_from_compas', 'decile_score', 'v_decile_score']

        for field in numerical_fields:
            input_data[field] = float(input_data[field])

        for field in numerical_fields:
            try:
                input_data[field] = float(input_data[field])  # Convert to float
            except ValueError as e:
                raise ValueError(f"Field '{field}' should be numeric but got: {input_data[field]}") from e
        recidivism_data = main.preprocess_data(input_data, "recidivism")
        violence_data = main.preprocess_data(input_data, "violence")
        recidivism_pred, recidivism_prob = main.predict(input_data, "recidivism")
        print(f"Recidivism Prediction: {recidivism_pred}, Probability: {recidivism_prob}")
        violence_pred, violence_prob = main.predict(input_data, "violence")
        print(f"Violence Prediction: {violence_pred}, Probability: {violence_prob}")

        recidivism_pred = int(recidivism_pred[0][0])  # Convert to standard int
        violence_pred = int(violence_pred[0][0])  # Convert to standard int
        recidivism_prob = float(recidivism_prob[0][0])  # Convert to standard float
        violence_prob = float(violence_prob[0][0])  # Convert to standard float

        response = {
                'recidivism_prediction': "High" if recidivism_pred == 1 else "Low",
                'recidivism_probability': recidivism_prob,
                'violence_prediction': "High" if violence_pred == 1 else "Low",
                'violence_probability': violence_prob,
            }

        if recidivism_pred == 1 and violence_pred == 1:
            response['recidivism_date'] = main.predict_date(input_data, "recidivism")
            print(f"Recidivism Date: {response['recidivism_date']}")
            response['violence_date'] = main.predict_date(input_data, "violence")
            print(f"Violence Date: {response['violence_date']}")
            recid_severity_prob, recid_severity_pred, violence_severity_prob, violence_severity_pred = main.predict_severity(recidivism_data, violence_data, recidivism_pred, violence_pred)
            print(f"Recidivism Severity Probability: {recid_severity_prob}, Classification: {recid_severity_pred}")
            response['recid_severity_probability'] = recid_severity_prob
            response['recid_severity_classification'] = recid_severity_pred
            response['violence_severity_probability'] = violence_severity_prob
            response['violence_severity_classification'] = violence_severity_pred
        elif recidivism_pred == 1:
            response['recidivism_date'] = main.predict_date(input_data, "recidivism")
            print(f"Recidivism Date: {response['recidivism_date']}")
            recid_severity_prob, recid_severity_pred = main.predict_severity(recidivism_data, violence_data, recidivism_pred, violence_pred)
            print(f"Recidivism Severity Probability: {recid_severity_prob}, Classification: {recid_severity_pred}")
            response['recid_severity_probability'] = recid_severity_prob
            response['recid_severity_classification'] = recid_severity_pred
        elif violence_pred == 1:
            response['violence_date'] = main.predict_date(input_data, "violence")
            print(f"Violence Date: {response['violence_date']}")
            violence_severity_prob, violence_severity_pred = main.predict_severity(recidivism_data, violence_data, recidivism_pred, violence_pred)
            print(f"Violence Severity Probability: {violence_severity_prob}, Classification: {violence_severity_pred}")
            response['violence_severity_probability'] = violence_severity_prob
            response['violence_severity_classification'] = violence_severity_pred
        print("CHECKOPINT!!!")
        pdf_filename = generate_pdf_report(
            user_data=user_data,
            recidivism_prob=recidivism_prob,
            recidivism_score=response['recidivism_prediction'],
            violent_recidivism_prob=violence_prob,
            violent_recidivism_score=response['violence_prediction'],
            recidivism_date=response['recidivism_date'] if recidivism_pred == 1 else None,
            violence_date=response['violence_date'] if violence_pred == 1 else None,
            recid_severity_probability=response['recid_severity_probability'] if recidivism_pred == 1 else None,
            recid_severity_classification=response['recid_severity_classification'] if recidivism_pred == 1 else None,  
            violence_severity_probability=response['violence_severity_probability'] if violence_pred == 1 else None,
            violence_severity_classification=response['violence_severity_classification'] if violence_pred == 1 else None
        )

        pdf_url = f"http://localhost:5000/static/reports/{pdf_filename}"
        response['pdf_filename'] = pdf_url

        return jsonify(response), 200
    except Exception as e:
        print("There is hella error!")
        return jsonify({'error': str(e)}), 500

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract data from the PDF
        extracted_data = extract_data_from_pdf(file_path)
        os.remove(file_path)  # Clean up uploaded file
        return jsonify(extracted_data), 200

    return jsonify({'error': 'Invalid file type'}), 400

# Ensure the backend is running
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'}), 200

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    print(f"Searching for: {query}")
    results = gift_suggestions(query, num=10)
    if results:
        return jsonify({'results': results})
    else:
        return jsonify({'error': 'No results found or an error occurred'}), 500

@app.route('/generate-image', methods=['POST'])
def image_generation():
    prompt = request.json.get('prompt')
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400
    image_url = generate_image(prompt)
    return jsonify({'image_url': image_url})

@app.route('/speech-to-text', methods=['POST'])
def speech_to_text():
    audio_file = request.files.get('audio')
    if not audio_file:
        return jsonify({'error': 'Audio file is required'}), 400
    transcription = convert_speech_to_text(audio_file)
    return jsonify({'transcription': transcription})

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    text = request.json.get('text')
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    audio_url = convert_text_to_speech(text)
    return send_file(audio_url, mimetype="audio/mpeg")

@app.route('/analyze-image', methods=['POST'])
def analyze_image_route():
    image_file = request.files.get('image')
    if not image_file:
        return jsonify({'error': 'Image file is required'}), 400
    analysis_results = analyze_image(image_file)
    return jsonify(analysis_results)

@app.route('/chatbot', methods=['POST'])
def chatbot_route():
    prompt = request.json.get('prompt')
    transcription_enabled = request.json.get('transcription_enabled', False)

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        # Generate chatbot response
        response = chatbot(prompt)

        print("Transcription Enabled:", transcription_enabled)

        # Example: Adding Markdown or symbolic formatting
        formatted_response = response

        # If transcription is enabled, generate audio
        audio_url = None
        if transcription_enabled:
            print("Transcription enabled")
            audio_file = convert_text_to_speech(formatted_response)  # Generate audio
            audio_url = '/' + audio_file  # Provide the relative URL

        print("Audio URL Sent:", audio_url) 
        # Return chatbot response and audio URL (if applicable)
        return jsonify({'response': formatted_response, 'audio_url': audio_url})

    except Exception as e:
        print(f"Error in Flask route: {e}")
        return jsonify({'error': str(e)}), 500




# Serve audio files
@app.route('/<filename>', methods=['GET'])
def serve_audio(filename):
    print('FJEIOAFJEAWO;FIJAOF;EJIOFAJE;AIOJF')
    print('FJEIOAFJEAWO;FIJAOF;EJIOFAJE;AIOJF')
    print('FJEIOAFJEAWO;FIJAOF;EJIOFAJE;AIOJF')
    print('FJEIOAFJEAWO;FIJAOF;EJIOFAJE;AIOJF')
    print('FJEIOAFJEAWO;FIJAOF;EJIOFAJE;AIOJF')
    # Construct the absolute path to the audio file
    audio_path = filename
    if not os.path.exists(audio_path):
        return jsonify({'error': 'Audio file not found'}), 404

    return send_file(audio_path, mimetype="audio/mpeg")

if __name__ == '__main__':
    app.run(debug=True)