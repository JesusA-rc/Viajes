import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Router.jsx';
import { queryClient } from './lib/queryClient.js';
import { QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>
)
