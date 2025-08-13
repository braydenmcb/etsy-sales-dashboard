# pip install flask flask-cors

'''
TODO:
need to now finally analyze the data and send back to frontend to make it look pretty 
'''
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/sales", methods=["GET", "POST"])
def upload_data():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 200
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    return jsonify({"message": "File uplaoded successfully", "filename": file.filename})

if __name__ == "__main__":
    app.run(debug=True, port=8888)