// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './pages/Auth/AuthContext';
import store from './reducers/post/postStore';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <React.StrictMode>
      <Provider store={store}> {/* Envolva a aplicação com o Provider */}
        <App />
      </Provider>
    </React.StrictMode>
  </AuthProvider>
);
