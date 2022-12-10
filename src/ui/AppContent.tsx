import MainPage from '../pages/Main';

import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import MoviePage from '../pages/MoviePage';

const AppContent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/movie/:name" element={<MoviePage />}/>
    </Routes>
  </Router>
);

export default AppContent;