import numpy as np
import pandas as pd

def getOutliers(attributes):
    df = pd.read_csv("uploads/file.csv")
    df = df[attributes].values

    highest = df.mean() + 3 * df.std()
    lowest = df.mean() - 3 * df.std()

    print(df.min())
    print(df.max())

    print(highest)
    print(lowest)

    new_df = df[(df > highest) | (df < lowest)]
    new_df_list = new_df.tolist()

    jsonData = {
        "highest": highest,
        "lowest": lowest,
        "outliers": new_df_list
    }

    return jsonData
