import { AppDispatch } from '..';
import api from '../../api';
import { setMovie, setEpisodes, setCollectionMovies } from './reducer';

export const fetchMovies = () => async (dispatch: AppDispatch) => {
    const response = await api.get(`/movie/list`);
    dispatch(setCollectionMovies(response.data))
};

export const fetchMovie = (name: string, episode?: string) => async (dispatch: AppDispatch) => {
    const { data } = await api.get('/movie', {
        params: {
            name,
            episode,
        },
    });
    dispatch(setEpisodes(data.collectionMovies));
    dispatch(setMovie(data.movie));
};
