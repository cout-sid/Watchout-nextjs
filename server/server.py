import urllib
import pickle
import requests
import pandas
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv, dotenv_values 
load_dotenv() 
 
# accessing and printing value
# print(os.getenv())

df = pickle.load( open("../df_old.pkl","rb"))
similarity = pickle.load(open("../similarity.pkl","rb"))
# if you use python server.py then this works
# if you use ctrl+shift+N then the current directory is D:\ML\Movie|Recommend
client = MongoClient(os.getenv("DB_URL"))

db = client.Movies
coll = db.info

# Helper function to convert ObjectId to string
def convert_to_serializable(doc):
    doc['_id'] = str(doc['_id'])
    return doc

def get_movie_by_title(title):
    movie_data = coll.find_one({"title": title})
    if movie_data:
        return jsonify(convert_to_serializable(movie_data))
    else:
        return jsonify({"error": "Movie not found"}), 404

# moviesData = [convert_to_serializable(doc) for doc in coll.find().limit(6)]
moviesData = [convert_to_serializable(doc) for doc in coll.find()]



# app instance
app = Flask(__name__)
CORS(app)


@app.route("/movie", methods=['GET'])
def return_home():
    try:
        # Ensure moviesData is a valid list or dict to jsonify
        if not moviesData:
            raise ValueError("No movie data available")
        return jsonify({"moviedata": moviesData})
    except Exception as e:
        # Log the error and return a JSON error response
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/poster/<int:id>",methods=['GET'])
def fetch_poster(id):
    try:

        url = f"https://api.themoviedb.org/3/movie/{id}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US"
        response = requests.get(url)
        data = response.json()

        poster_path = data.get('poster_path')

        if poster_path:
            full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
            return jsonify({"path": full_path})
        else:
            return jsonify({"error": "Poster not found"}), 404
    except requests.exceptions.RequestException as e:
        # Catch any requests exceptions and return an error message
        print("Request failed:", e)
        return jsonify({"error": "Failed to fetch data from the movie database"}), 500
    except Exception as e:
        # Catch any other exceptions and return an error message
        print("An error occurred:", e)
        return jsonify({"error": "An unexpected error occurred"}), 500


@app.route("/movie/<int:id>", methods=['GET'])
def return_movie_by_id(id):
    try:
        movie_data = coll.find_one({"id": id})
        if movie_data:
            return jsonify({"moviedata":convert_to_serializable(movie_data)})
        else:
            return jsonify({"error": "Movie not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/favourites",methods=["GET"])
def return_fav_movies():

    try:
        idlist = request.args.getlist('idlist')
        if not idlist:
            return jsonify({"error": "ID list provided is empty"}), 400

        idlist = [int(id) for id in idlist]

        fav_data = list(coll.find({"id": {"$in": idlist}}))
        fav_data = [convert_to_serializable(movie) for movie in fav_data]

        return jsonify(fav_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



@app.route("/recommend/",methods=['GET'])
def recommend():
    title = request.args.get('title')
    print(title)

    try:
        index = df[df['title'] == title].index[0]
    except IndexError:
        print("title not found in dataframe")
        return jsonify({"error": "Movie not found"}), 404

    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recom_movie_ids = [df.iloc[i[0]].movie_id for i in distances[1:9]]
    recom_movie_ids = [int(movie_id) for movie_id in recom_movie_ids]

    print("recom movie ids just before sending them:",recom_movie_ids);
    return jsonify({"recom_movie_ids":recom_movie_ids})




if __name__ == "__main__":
    app.run(debug=True, port=8080)