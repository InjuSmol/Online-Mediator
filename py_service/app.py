from flask import Flask, request, jsonify
#from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

#HF_API_TOKEN = os.getenv(process.env.HF_API_TOKEN)

API_URL = "https://api-inference.huggingface.co/models/transformer23/formality-style-transfer"

#model_name = "prithivida/informal_to_formal_styletransfer"
#tokenizer = AutoTokenizer.from_pretrained(model_name)
#model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

headers = {
    "Authorization": f"Bearer {os.getenv("HF_API_TOKEN")}"
}

# Hugging face Inference API call: 
@app.route('/', methods=['POST'])
def formalize():
    data = request.json
    text = data.get("text", "")
    
    response = requests.post(API_URL, headers=headers, json={"inputs": text})
    result = response.json()
    
    try:
        print("HF_API_TOKEN =", os.getenv("HF_API_TOKEN"))
        formal_text = result[0]["generated_text"]
    except Exception as e:
        print("Raw response text:", response.text)  # Add this line
        print("Status code:", response.status_code) # Add this too
        return jsonify({"error": "Failed to generate text", "raw_response": response.text}), 500
    return jsonify({"formal": formal_text})
    
##############################################################
# The original endpoint (local model) 
'''
@app.route('/old', methods=['POST'])
def formalize():
    data = request.json
    text = data.get("text", "")
    inputs = tokenizer.encode(f"transfer Formal: {text}", return_tensors="pt")
    outputs = model.generate(inputs, max_length=128, num_beams=5, early_stopping=True)
    formal_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"formal": formal_text})
'''

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002)

