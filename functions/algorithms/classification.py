import numpy as np
import pandas as pd
import pickle
import matplotlib.pyplot as plt
import graphviz

from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

def createModel(x, y, scale, categorical):
    df = pd.read_csv("uploads/file.csv")

    for i in range(len(categorical)):
        df[categorical[i]] = df[categorical[i]].astype('category')
        df[categorical[i]] = df[categorical[i]].cat.codes

    x_names = x
    y_names = y

    x = df[x].values
    y = df[y].values

    #x[categorical] = x[categorical].astype('category')
    #x[categorical] = x[categorical].cat.codes

    if(int(scale)):
        scaler = StandardScaler()
        x = scaler.fit_transform(x)

    #for i in range(len(categorical)):
    #    print(x[categorical[i]])
    #    if type(x[categorical[i]][0]) is str:
    #        x[categorical[i]] = x[categorical[i]].astype('category')
    #        x[categorical[i]] = x[categorical[i]].cat.codes
    #    else:
    #        continue

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

    dtl = DecisionTreeClassifier(
        criterion = "entropy", random_state = 42,
        max_depth = 3, min_samples_leaf = 5
    )

    dtl.fit(x_train, y_train);

    tree_data = tree.export_graphviz(dtl, out_file=None,
                                     feature_names=x_names,
                                     class_names=y_names,
                                     filled=True)

    graph = graphviz.Source(tree_data, format="png")
    graph.render("static/images/decision_tree")

    filename = 'models/classification_model.sav'
    pickle.dump(dtl, open(filename, 'wb'))

    y_pred = dtl.predict(x_test)

    return (str(accuracy_score(y_test, y_pred) * 100) + "%")

def predictInput(x):
    print(x)
    x = np.array([list(map(float, x))])
    filename = "models/classification_model.sav"
    model = pickle.load(open(filename, 'rb'))

    pred = model.predict(x);
    return pred[0]
