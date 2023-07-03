import os
from flask import Flask, request, render_template

app = Flask(__name__)

# Production by default
DEBUG = (os.getenv('DEBUG', 'False') == 'True')

# Setting the secret key to have full access on Flask session.
app.secret_key = os.environ['FLASK_SECRET_KEY']


@app.route('/', methods=['GET'])
def index():
    context = {}

    if request.method == 'GET':
        return render_template('index.html', **context)


if __name__ == "__main__":
    if DEBUG:
        # Local development
        app.run(host='0.0.0.0', port=8080, threaded=True, debug=True)
    else:
        # Production use (gunicorn should be used!)
        app.run(host='127.0.0.1', port=8080, threaded=True, debug=False)

