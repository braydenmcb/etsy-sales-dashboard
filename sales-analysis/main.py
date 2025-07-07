# pip install flask flask-cors

'''
TODO:
The frontend is talking to the backend for the submitted file, just not sending the file itself,
now just parse the needed columns (depending on what file is being parsed, and send to backend as json file.)
'''
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
@app.route("/api/sales", methods=["GET"])

def get_sales_data():
    return jsonify({
        "sales": [
            "nothing yet, need to submit data from user"
        ]})

@app.route("/api/submitted-files/", methods=['POST', 'OPTIONS'])
def submit_files():
    if request.method == "OPTIONS":
        return '', 200
    try:
        data = request.get_json()
        print(data)
        return jsonify({
            'status': 'recieved',
            'recieved': data
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == "__main__":
    app.run(debug=True, port=8888)