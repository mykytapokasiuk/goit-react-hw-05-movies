import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getMovies } from 'services/api';
import * as notifications from 'services/utils';

const useGetMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const searchTerm = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    if (!searchTerm) return;
    const fetchMovies = async () => {
      try {
        setIsloading(true);
        const response = await getMovies(searchTerm);
        setMovies(response.results);
        notifications.checkResponse(response, setSearchParams);
      } catch (error) {
        notifications.onError(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovies();
  }, [searchTerm, setSearchParams]);

  const onSubmit = input => {
    if (!input) {
      notifications.onInputEmpty();
      return false;
    }
    return true;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form_element = event.currentTarget;
    const searchValue = form_element.elements.searchQuery.value.trim();
    setSearchParams({
      query: searchValue,
    });
    const isSuccess = onSubmit(searchValue);
    if (isSuccess) form_element.reset();
  };

  return { movies, isLoading, location, handleSubmit };
};

export default useGetMovies;
