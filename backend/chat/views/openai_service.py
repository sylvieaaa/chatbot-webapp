import google.generativeai as genai
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
import os


class ChatService:

    def __init__(self) -> None:
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def generate_response(self, prompt):
        try:
            # response = self.model.generate_content(
            #     prompt=prompt
            # )
            response = self.model.generate_content(prompt)
            # Extract the generated text from the response
            # message = response.choices[0].message.content.strip()
            return response.text
        except Exception as e:
            return f'Error: {str(e)}'
