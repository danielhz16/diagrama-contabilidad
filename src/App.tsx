import ConceptualMap from './components/ConceptualMap';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ width: '100dvw', height: '100dvh', margin: 0, padding: 0 }}>
        <ConceptualMap />
      </div>
    </ThemeProvider>
  );
}

export default App;
