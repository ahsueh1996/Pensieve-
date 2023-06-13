# Imports
import numpy as np
import pandas as pd
import argparse
from distutils.dir_util import mkpath
import warnings
warnings.filterwarnings("ignore")
# Read the files with pandas
data = pd.io.parsers.read_csv('input/ratings.dat',
names=['user_id', 'movie_id', 'rating', 'time'],
engine='python', delimiter='::', encoding='latin-1')
movie_data = pd.io.parsers.read_csv('input/movies.dat',
names=['movie_id', 'title', 'genre'],
engine='python', delimiter='::', encoding='latin-1')

# Create the ratings matrix of shape (m×u) with rows as movies and columns as users

ratings_mat = np.ndarray(
shape=((np.max(data.movie_id.values)), np.max(data.user_id.values)),
dtype=np.uint8)
ratings_mat[data.movie_id.values-1, data.user_id.values-1] = data.rating.values

# Normalise matrix (subtract mean off)

normalised_mat = ratings_mat - np.asarray([(np.mean(ratings_mat, 1))]).T

# Compute SVD

normalised_mat = ratings_mat - np.matrix(np.mean(ratings_mat, 1)).T
cov_mat = np.cov(normalised_mat)
evals, evecs = np.linalg.eig(cov_mat)

# Calculate cosine similarity, sort by most similar and return the top N.

def top_cosine_similarity(data, movie_id, top_n=10):
   
    index = movie_id - 1
    # Movie id starts from 1
    
    movie_row = data[index, :]
    magnitude = np.sqrt(np.einsum('ij, ij -> i', data, data))
    similarity = np.dot(movie_row, data.T) / (magnitude[index] * magnitude)
    sort_indexes = np.argsort(-similarity)
    return sort_indexes[:top_n]

# Helper function to print top N similar movies
def print_similar_movies(movie_data, movie_id, top_indexes):
    print('Recommendations for {0}: \n'.format(
    movie_data[movie_data.movie_id == movie_id].title.values[0]))
    for id in top_indexes + 1:
        print(str(id),' : ',movie_data[movie_data.movie_id == id].title.values[0])


parser = argparse.ArgumentParser(description='Personal information')
parser.add_argument('--k', dest='k', type=int, help='principal components to represent the movies',default=50)
parser.add_argument('--id', dest='id', type=int, help='Id of the movie',default=1)
parser.add_argument('--n', dest='n', type=int, help='No of recommendations',default=10)

args = parser.parse_args()
k = args.k
movie_id = args.id # Grab an id from movies.dat
top_n = args.n

# k = 50
# # Grab an id from movies.dat
# movie_id = 1
# top_n = 10

sliced = evecs[:, :k] # representative data
top_indexes = top_cosine_similarity(sliced, movie_id, top_n)
print_similar_movies(movie_data, movie_id, top_indexes)