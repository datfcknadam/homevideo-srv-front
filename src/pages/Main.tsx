import Grid from '@mui/material/Grid'
import MediaCard from '../ui/MediaCard'; 
import { useAppSelector, useAppDispatch } from '../hooks'
import { AppDispatch, RootState } from '../store'
import { fetchMovies } from '../store/movie/actions';
import { useEffect } from 'react';
import {
    Link
  } from "react-router-dom";
import { pathToImage } from '../api';

const MainPage = ()=> {
    const dispatch: AppDispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovies());
    }, []);
    const collectionMovies = useAppSelector((state: RootState) => state.movie.collectionMovies);
    const mediaCards = collectionMovies.map((it, key) => (
        <Grid item key={key}>
            <Link to={`/movie/${it.name}`}>
                <MediaCard
                    img={`${pathToImage}${it.img}`}
                    name={it.name}
                />
            </Link>
        </Grid>
    ));
    return (
        <Grid container spacing={1}>
            {mediaCards}
        </Grid>
    )
}
    

export default MainPage;