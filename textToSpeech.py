from google.cloud import texttospeech
from google.oauth2 import service_account

def convert_text_to_speech(text):
    # Specify the path to your service account key
    credentials_path = "keys\deck-the-halls-hackathon-d4e155608d98.json"
    credentials = service_account.Credentials.from_service_account_file(credentials_path)

    # Initialize the Text-to-Speech client with credentials
    client = texttospeech.TextToSpeechClient(credentials=credentials)

    # Add a cheerful, slightly deeper Santa personality dynamically with SSML
    ssml_text = f"""
    <speak>
        <prosody pitch="-3st" rate="0.95">
            Ho Ho Ho! <break time="400ms"/>
            {text} <break time="400ms"/>
            Wishing you a wonderful holiday season!
        </prosody>
    </speak>
    """

    # Configure the voice selection
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Neural2-D",  # Male voice with deeper tone
        ssml_gender=texttospeech.SsmlVoiceGender.MALE,
    )

    # Configure audio settings
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        pitch=-3.0,  # Slightly deeper pitch
        speaking_rate=0.95,  # Slightly faster for cheerfulness
    )

    # Generate the TTS output
    response = client.synthesize_speech(
        input=texttospeech.SynthesisInput(ssml=ssml_text),
        voice=voice,
        audio_config=audio_config,
    )

    # Save the audio to a file
    with open("young_santa_deeper_google.mp3", "wb") as out:
        out.write(response.audio_content)
        print("Young Santa voice generated and saved as 'young_santa_deeper_google.mp3'")
    
    return "young_santa_deeper_google.mp3"


