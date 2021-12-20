import pandas as pd
import numpy as np
import json
from fpgrowth_py import fpgrowth

def fp_analysis(minSup, minConf):
    minSup = float(minSup)
    minConf = float(minConf)

    df = pd.read_csv('models/fp-analysis.csv', delimiter=';').values
    itemset = df[:, 1]

    arr = []
    for i in range(len(itemset)):
        itemset_split = itemset[i].split(',')
        arr.append(itemset_split)

    freqItemSet, rules = fpgrowth(arr, minSupRatio=minSup, minConf=minConf)

    for i in range(len(rules)):
        rules[i][0] = ','.join(rules[i][0])
        rules[i][1] = ','.join(rules[i][1])

    return json.dumps(rules)
