from flask import Flask, render_template, request, jsonify
from chat import get_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def index_get():
    return render_template("base.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)
    if data and "message" in data:
        text = data["message"]
        response = get_response(text)
        return jsonify({"answer": response})
    return jsonify({"error": "Invalid request"}), 400

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)