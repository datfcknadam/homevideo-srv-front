import './App.css';
import Appbar from './ui/Appbar';
import AppContent from './ui/AppContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme} >
      <div className="app">
        <Appbar />
        <AppContent />
      </div>
    </ThemeProvider>
  );
}

export default App;
