import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ThemeProviderWrapper } from './context/themeContext.tsx';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProviderWrapper>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProviderWrapper>
  </Provider>
);
