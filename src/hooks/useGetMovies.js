import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getMovies } from 'services/api';

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
        const { results } = await getMovies(searchTerm);
        setMovies(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovies();
  }, [searchTerm]);

  const handleSubmit = event => {
    event.preventDefault();
    const form_element = event.currentTarget;
    const searchValue = form_element.elements.searchQuery.value.trim();
    setSearchParams({
      query: searchValue,
    });
    //   const isSuccess = onSubmit(searchQuery);
    //   if (isSuccess) form_element.reset();
  };

  return { movies, isLoading, location, handleSubmit };
};

export default useGetMovies;
