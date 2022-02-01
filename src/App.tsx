import { useLazyQuery } from '@apollo/client';
import { SearchOutlined } from '@mui/icons-material';
import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import './App.scss';
import { MovieCard } from './components/MovieCard';
import { SearchMovieQueryParams, SearchMovieQueryResult, SEARCH_MOVIE_QUERY } from './queries/search-movie';


function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [getMovies, { loading, error, data }] = useLazyQuery<SearchMovieQueryResult, SearchMovieQueryParams>(SEARCH_MOVIE_QUERY);

  const searchMovies = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchTerm.trim());
    if(searchTerm?.trim().length) {
      getMovies({variables: {searchTerm: searchTerm || ''}});
    }
  }

  return (
      <div className="d-flex-column">
        <div className="d-flex">
          <h1>My TMDB</h1>
          <form  className="flex d-flex center" onSubmit={e => searchMovies(e)}>
            <TextField className="mr-1" variant="outlined" placeholder='Search' value={searchTerm} onChange={({currentTarget:{value}}) => setSearchTerm(value)}/>

            <Button variant="contained" disabled={!searchTerm} type="submit">
              <SearchOutlined/>
              Search
            </Button>
          </form>
        </div>
        
        <div className="results d-flex-column">
          { loading ? <CircularProgress /> 
                    : data?.searchMovies.length ? data.searchMovies.map(r => <MovieCard key={r.id} movie={r}/>) 
                                                : <h3> {data?.searchMovies ? 'No results...' : 'Search for a movie'}</h3>
          }
          {error ? error.message : ''}
        </div>
      </div>
  );
}

export default App;
