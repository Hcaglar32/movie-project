import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import client from './appoloClient'; // Apollo Client'ın nasıl oluşturulduğuna göre yol değişebilir.
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

// React uygulamanızın erişim sağlaması gereken bileşenleri burada import edin.

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>,

  document.getElementById('root')
);

// Uygulamanızın performansını ölçmek istiyorsanız, raporWebVitals fonksiyonunu çağırabilirsiniz.
reportWebVitals();
