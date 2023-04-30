import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Index from './routes'
import Search from './routes/search'
import Tracking from './routes/tracking'
import GameDetails, {loader as gameLoader} from './routes/gameDetails'
import {loader as indexLoader} from './routes/index'
const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
            loader: indexLoader
          },
          {
            path: `${import.meta.env.BASE_URL}search`,
            element: <Search />
          },
          {
            path: `${import.meta.env.BASE_URL}tracking`,
            element: <Tracking />
          },
          {
            path: `${import.meta.env.BASE_URL}games/:gameid`,
            element: <GameDetails />,
            loader: gameLoader
          }
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
