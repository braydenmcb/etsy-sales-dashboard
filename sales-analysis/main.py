# pip install flask flask-cors numpy pandas

'''
TODO:
maybe add a file reupload later, now just focus on frontend data visualization
'''
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from analysis_programs import geographical_sales, item_sales, period_sales

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/sales", methods=["POST"])
def upload_data():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 200
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    geo_data = geographical_sales.analyze(filepath)
    item_data = item_sales.analyze(filepath)
    period_data = period_sales.analyze(filepath)

    return jsonify({
        "message": "File analyzed successfully",
        "filename": file.filename,
        "results": {
            "geographical_sales": geo_data,
            "item_sales": item_data,
            "period_sales": period_data
        }
    })


if __name__ == "__main__":
    app.run(debug=True, port=8888)