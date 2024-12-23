import requests
import os
from dotenv import load_dotenv
from googleapiclient.discovery import build

def gift_suggestions(query, num = 10, **kwargs):
    api_key = os.environ.get('GOOGLE_API_KEY')
    cse_id = os.environ.get('SEARCH_ENGINE_ID')
    try:
        service = build("customsearch", "v1", developerKey=api_key)
        res = service.cse().list(q=query, cx=cse_id, **kwargs).execute()
        return res.get('items', [])
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

