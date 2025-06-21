# pip install flask flask-cors

from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
@app.route("/api/sales", methods=["GET"])

def get_sales_data():
    return jsonify({
        "sales": [
            "nothing yet, need to submit data from user"
        ]})



if __name__ == "__main__":
    app.run(debug=True, port=8888)