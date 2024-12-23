from google.cloud import speech

def convert_speech_to_text(file_path):
    client = speech.SpeechClient()

    with open(file_path, "rb") as audio_file:
        audio_data = audio_file.read()

    audio = speech.RecognitionAudio(content=audio_data)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US"
    )

    response = client.recognize(config=config, audio=audio)
    for result in response.results:
        print(f"Transcript: {result.alternatives[0].transcript}")
    return response.results[0].alternatives[0].transcript
