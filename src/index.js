import React            from 'react';
import ReactDOM         from 'react-dom/client';
import PokemonApp       from './components/PokemonApp';
import reportWebVitals  from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonApp />
  </React.StrictMode>
);

reportWebVitals();
