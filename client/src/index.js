import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { Provider } from './pages/Home/ProviderDtata/Providing';
import { BrowserRouter } from 'react-router-dom';

import { App_provider } from './pages/Home/ProviderDtata/App_provider';
import { WatchVideos } from './pages/Home/AllComponents/WactchViodes';
import { Routes } from 'react-router-dom';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   
      <QueryClientProvider client={queryClient}>
        <App_provider />

      </QueryClientProvider>
    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
