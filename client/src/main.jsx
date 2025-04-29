import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles.css'
import App from './app/App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {RouterProvider } from 'react-router';
import { router } from './app/router/Router.jsx';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>

  </StrictMode>
)
