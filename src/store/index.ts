import { configureStore } from '@reduxjs/toolkit'
import { StateMovie } from './movie/reducer';
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
});

export interface RootState {
  movie: StateMovie,
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;