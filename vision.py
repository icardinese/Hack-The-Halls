from google.cloud import vision

def analyze_image(file_path):
    client = vision.ImageAnnotatorClient()

    with open(file_path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.label_detection(image=image)

    labels = [label.description for label in response.label_annotations]
    print(f"Labels: {labels}")
    return labels
