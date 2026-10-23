
from flask import Flask, render_template, send_from_directory

app = Flask(__name__, template_folder=".", static_folder=None)

@app.route("/")
def dashboard():
    return render_template("index.html")

@app.route("/static/css/style.css")
def style():
    return send_from_directory(app.root_path, "style.css")

@app.route("/static/js/script.js")
def script():
    return send_from_directory(app.root_path, "script.js")

if __name__ == "__main__":
    app.run(debug=True)
