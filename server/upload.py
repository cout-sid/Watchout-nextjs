import pickle
import pandas
import urllib
from pymongo import InsertOne
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv, dotenv_values 
load_dotenv() 

client = MongoClient(os.getenv("DB_URL"), server_api=ServerApi('1'))
db = client.Movies
collection = db.info
requesting = []


df = pickle.load( open("../df_old.pkl","rb"))

length = df.shape[0]

id = df.movie_id.values.tolist()
title = df.title.values.tolist()
overview = df.overview.values.tolist()
genres = df.genres.values.tolist()
keywords = df.keywords.values.tolist()
cast = df.cast.values.tolist()
director = df.crew.values.tolist()


# movie_id	title	overview	genres	keywords	cast	crew

for i in range(length):

        jsonObj={
            "id":id[i],
            "title":title[i],
            "overview":overview[i],
            "genres":genres[i],
            "keywords":keywords[i],
            "cast":cast[i],
            "director":director[i]
    }
        # myDict = json.loads(jsonObj)
        requesting.append(InsertOne(jsonObj))

result = collection.bulk_write(requesting)
client.close()


