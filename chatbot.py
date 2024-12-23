import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load the API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

def chatbot(prompt):
    # Configure the API key and model
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    try:
        # Generate the response
        response = model.generate_content(prompt)
        print(f"Full response: {response}")  # Debugging: Log the full response
        
        # Access the text from the response
        generated_text = response.text
        print(f"Generated text: {generated_text}")  # Debugging: Log the generated text
        
        return generated_text
    except Exception as e:
        print(f"Error in chatbot function: {e}")
        raise
