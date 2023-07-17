import axios from 'axios';
import params from './utils.js';

/**
 *  Gets array of objects from server
 * @function getTrendingMovies
 * @returns {Promise} Promise
 */
const getTrendingMovies = async () => {
  const { data } = await axios.get(
    `${params.url}trending/movie/day?api_key=${params.key}`
  );
  return data;
};

/**
 *  Gets movie details from server
 * @function getMovieDetails
 * @param {number} id
 * @returns {Promise} Promise
 */
const getMovieDetails = async movie_id => {
  const { data } = await axios.get(
    `${params.url}movie/${movie_id}?api_key=${params.key}`
  );
  return data;
};

/**
 *  Gets cast information for a movie page
 * @function getMovieCredits
 * @param {number} id
 * @returns {Promise} Promise
 */
const getMovieCredits = async movie_id => {
  const { data } = await axios.get(
    `${params.url}movie/${movie_id}/credits?api_key=${params.key}`
  );
  // console.log(data);
  return data;
};

export { getTrendingMovies, getMovieDetails, getMovieCredits };
