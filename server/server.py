
import openai
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, abort
from completionPrompt import *
from flask_cors import CORS

load_dotenv()

openai.api_key = os.getenv('REACT_APP_OPENAI_API_KEY')
import sys
print(sys.executable)



app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/chat', methods=['POST'])
def create_chat_completion():
    if not request.json or not 'prompt' in request.json:
      abort(400)
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
        { "role": "system", "content": completionPrompt2() },
        { "role": "user", "content": request.json['prompt'] }
      ]
    )
    reply = response.choices[0].message
    print(reply)

    return jsonify({ 'response': reply.content })

if __name__ == '__main__':
    app.run(debug=True)