import pickle
import pandas 
# import os

df = pickle.load( open("../df_old.pkl","rb"))
print(df.shape[0])
# print(os.getcwd())