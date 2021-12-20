import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle

from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

def cluster_analysis(scale, attributes, cat_attributes, k):
    # import
    df = pd.read_csv("uploads/file.csv")
    df = df[attributes]

    # label
    for i in range(len(cat_attributes)):
        df[cat_attributes[i]] = df[cat_attributes[i]].astype('category')
        df[cat_attributes[i]] = df[cat_attributes[i]].cat.codes

    print(df)

    x = df.values

    if scale:
        scaler = StandardScaler()
        x = scaler.fit_transform(x)

    # save model
    model = KMeans(int(k))
    model.fit(x)

    filename = 'models/clustering_model.sav'
    pickle.dump(model, open(filename, 'wb'))

    # save visualization
    pca = PCA(n_components = 2)
    vis = pca.fit_transform(x)

    model_vis = KMeans(int(k))
    model_vis.fit(vis)
    pred = model_vis.fit_predict(vis)

    plt.scatter(vis[:, 0], vis[:, 1], c=pred)
    plt.savefig('static/images/cluster_vis.png')

    try:
        plt.clf()
    except:
        print("Failed")


def calculateInput(input_arr):
    input_arr = np.array([list(map(float, input_arr))])
    model = pickle.load(open('models/clustering_model.sav', 'rb'))
    print(input_arr)
    return model.predict(input_arr)

