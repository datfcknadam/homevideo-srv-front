import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchMovie } from "../store/movie/actions";
import { useParams, useSearchParams } from "react-router-dom";
import MediaCard from "../ui/MediaCard";
import VideoPlayer from "../ui/VideoPlayer";
import styles from '../styles/pages/MoviePage.module.sass';
import { queryToObject } from "../common";
import { pathToImage, pathToVideo } from "../api";

const MoviePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [episode, setEpisode] = useState(queryToObject(searchParams.toString()).episode);
    const { name } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const { episodes, movie } = useSelector((state: RootState) => state.movie);
    useEffect(() => {
        dispatch(fetchMovie(name as string, episode))
    }, [name, episode]); 
    const clickEpisode = (episode: string) => {
        setEpisode(episode);
        setSearchParams({ episode });
    };
    return (
        <div>
            <VideoPlayer 
                className={styles.player}
                url={`${pathToVideo}${movie.video}`}
                episodes={episodes}
                width="100%"
                height="100%"
                serverStream={movie.serverStream}
                onClick={clickEpisode}
            />
        </div>
    );   
};
  
export default MoviePage;