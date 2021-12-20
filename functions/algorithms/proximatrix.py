import pandas as pd
import json
import numpy as np
from sklearn.preprocessing import StandardScaler
from scipy.spatial import distance_matrix

def sliceAttributes(attribs):
    df = pd.read_csv("uploads/file.csv")
    df = df[attribs]

    df.to_csv('models/proxim.csv')

def scaling(attribs):
    df = pd.read_csv("uploads/file.csv")
    df = df[attribs].values

    df_scaled = StandardScaler().fit_transform(df)

    df_scaled = pd.DataFrame(df_scaled)
    df_scaled.to_csv('models/proxim.csv')

def proximityMatrix(firstNum, lastNum):
    firstNum = int(firstNum)
    lastNum = int(lastNum)
    df = pd.read_csv("models/proxim.csv").values
    df = df[firstNum:lastNum,:]
    proximatrix = distance_matrix(df, df, p=2)
    proximatrix = np.around(proximatrix, 2).tolist()

    return json.dumps(proximatrix)
