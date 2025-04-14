from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)

model_name = "prithivida/informal_to_formal_styletransfer"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

@app.route('/', methods=['POST'])
def formalize():
    data = request.json
    text = data.get("text", "")
    inputs = tokenizer.encode(f"transfer Formal: {text}", return_tensors="pt")
    outputs = model.generate(inputs, max_length=128, num_beams=5, early_stopping=True)
    formal_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"formal": formal_text})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

