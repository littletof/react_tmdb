export interface Movie {
    id: string;
    name: string;
    releaseDate: string;

    overview: string;
    score: number;
    tagline: string;
    genres: {name: string}[];
    similar: SimilarMovie[];
    // socialMedia.imdb is not filled by the tmdb wrapper
}

export interface SimilarMovie {
    id: string;
    name: string;
}