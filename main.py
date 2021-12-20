from flask import Flask, render_template, url_for, request, redirect
from functions.process_file import return_attributes
from functions.algorithms.proximatrix import sliceAttributes, scaling, proximityMatrix
from functions.algorithms.freq_pattern import fp_analysis
from functions.algorithms.clustering import cluster_analysis, calculateInput
from functions.algorithms.classification import createModel, predictInput
from functions.algorithms.outliers import getOutliers


import json

FOLDER_PATH = '/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = FOLDER_PATH

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        algos = request.form['algorithms']
        f.filename = 'uploads/file.csv'
        f.save(f.filename)
        return redirect("/dashboard/"+algos)

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return render_template('dashboard.html')

@app.route('/dashboard/proximity_matrix', methods=['GET', 'POST'])
def proxim():
    attributes = return_attributes()

    if request.method == "POST":
        jsonData = request.get_json()

        if jsonData["scaling"] == 1:
            scaling(jsonData["attributes"])
        elif jsonData["scaling"] == 0:
            sliceAttributes(jsonData["attributes"])
        elif jsonData["exec"] == 1:
            print(jsonData["startendnum"])
            firstNum = jsonData["startendnum"][0]
            lastNum = jsonData["startendnum"][1]
            json_resp = proximityMatrix(firstNum, lastNum)
            return json_resp

    return render_template('dashboard/proximatrix.html', attributes = attributes)

@app.route('/dashboard/frequent_pattern', methods=['GET', 'POST'])
def freq_pattern():
    if request.method == "POST":

        if request.files:
            f = request.files['static_file']
            f.filename = 'models/fp-analysis.csv'
            f.save(f.filename)
        else:
            params = request.get_json();
            json_resp = fp_analysis(params["min_sup"], params["confidence"]);
            return json_resp

    return render_template('dashboard/freq_pattern.html')

@app.route('/dashboard/clustering', methods=['GET', 'POST'])
def clustering():
    attributes = return_attributes()

    if request.method == "POST":
        params = request.get_json()
        print(params)

        if params["calc"]:
            return str(calculateInput(params["values"])[0])
        else:
            print(params)
            cluster_analysis(params["scale"], params["attribute"], params["labeled"], params["k"])

    return render_template('dashboard/clustering.html', attributes = attributes)

@app.route('/dashboard/classification', methods=['GET', 'POST'])
def classification():
    attributes = return_attributes()

    if request.method == "POST":
        params = request.get_json()

        if(int(params["input"])):
            return str(predictInput(params["x"]))
        else:
            print(params)
            return str(createModel(params["x"], params["y"], params["scale"], params["categorical"]))


    return render_template('dashboard/classification.html', attributes = attributes)

@app.route('/dashboard/outliers', methods=['GET', 'POST'])
def outliers():
    attributes = return_attributes()

    if request.method == "POST":
        params = request.get_json()
        return json.dumps(getOutliers(params["attribute"]))

    return render_template('dashboard/outliers.html', attributes = attributes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
