import google.generativeai as genai
import os
from dotenv import load_dotenv

api_key = os.getenv("GOOGLE_API_KEY")

# Configure the API key
genai.configure(api_key=api_key)

def generate_image(prompt):
    model = genai.GenerativeModel("gemini-1.5-image")
    response = model.generate_content(prompt)
    # The response will include the URL or base64 string of the generated image
    return response.image_url  # Replace with actual response field for image URL
