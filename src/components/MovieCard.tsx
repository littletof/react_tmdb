import { Link, Star } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Chip, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Movie } from "../models/movie";

export interface MovieCardProps {
    movie: Movie;
}

export interface WikiData {
    extract: string;
    content_urls: {desktop:{page: string}};
}

export function MovieCard(props: MovieCardProps) {
    const [wikiData, setWikiData] = useState<WikiData>();
    const [loadingData, setLoadingData] = useState(false);

    const getWikiData = () => {
        setLoadingData(true);
        // Could not find proper api to restrict to movies.
        // maybe this gives slightly better results sometimes, but more complex:
        // https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&formatversion=latest&prop=extracts&srsearch=${props.movie.name}%20articletopic:films&explaintext=1&exsectionformat=plain
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${props.movie.name}`)
            .then(r => r.json())
            .then(r => setWikiData(r))
            .finally(() => setLoadingData(false));
    }

    const accordOpened = (expanded: boolean) => {
        if(expanded && !wikiData) {
            getWikiData();
        }
    }

    return (
        <Accordion onChange={(_, expanded) => accordOpened(expanded)} className="">
            <AccordionSummary>
                <div className="d-flex jsb flex">
                    <div className="center">
                        <h3>{props.movie.name} <small><i>({formatDateString(props.movie.releaseDate)})</i></small></h3>
                        <i>{props.movie.tagline}</i>
                        <div className="mt-1">{props.movie.genres.map(({name}) => <Chip key={name} label={name}/>)}</div>
                    </div>
                    <div className="d-flex center">
                        {props.movie.score}
                        <Star/>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <h5>Overview:</h5>
                    <p>{props.movie.overview}</p>
                </div>
                <div>
                    {loadingData && <CircularProgress/>}
                    {wikiData && <>
                        <h5>Wikipedia summary:<a href={wikiData.content_urls?.desktop?.page} target="_blank" className="v-middle ml-1"><Link color="primary"/></a></h5>
                        <p>
                            <i>{wikiData.extract}</i>
                        </p>
                    </>}
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

function formatDateString(date: string) {
    return new Intl.DateTimeFormat(undefined, {year: 'numeric'}).format(new Date(date))
}