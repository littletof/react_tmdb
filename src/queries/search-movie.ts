import { gql } from "@apollo/client";
import { Movie } from "../models/movie";

export interface SearchMovieQueryParams {
    searchTerm: string;
}

export interface SearchMovieQueryResult {
    searchMovies: Movie[];
}

export const SEARCH_MOVIE_QUERY = gql`
    query SearchMovies($searchTerm: String!) {
        searchMovies(query: $searchTerm) {
            id
            name
            overview
            releaseDate
            score
            tagline
            genres {name}  
            similar{id name}
        }
    }
`;