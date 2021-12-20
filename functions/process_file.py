from pandas import read_csv

def return_attributes():
    df = read_csv('uploads/file.csv', encoding='utf-8')
    attributes = list(df.columns)
    return attributes
