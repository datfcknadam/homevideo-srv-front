import { PayloadAction } from '@reduxjs/toolkit';
const initialState: StateMovie = {
    collectionMovies: [] as movie[],
    movie: {} as movie,
    episodes: [],
} as StateMovie;
export interface movie {
    img: string,
    name: string,
    video: string,
    serverStream?: boolean,
};
export interface StateMovie {
    collectionMovies: movie[],
    movie: movie,
    episodes: movie[],
}
export const setEpisodes = (payload: []) => ({
    type: 'SET_EPISODES',
    payload,
});
export const setMovie = (payload: {}) => ({
    type: 'SET_MOVIE',
    payload,
});
export const setCollectionMovies = (payload: []) => ({
    type: 'SET_COLLECTION_MOVIES',
    payload,
});

const reducer = (state = initialState, action: PayloadAction<any>): StateMovie | {} => {
    switch (action.type) {
        case 'SET_COLLECTION_MOVIES':
            return {
                ...state,
                collectionMovies: action.payload as [],
            };
        case 'SET_MOVIE':
            return {
                ...state,
                movie: action.payload as {},
            };
        case 'SET_EPISODES': {
            return {
                ...state,
                episodes: action.payload as [],
            }
        }
        default:
            return state;
    }
};

export default reducer;