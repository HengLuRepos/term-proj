import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Index from './routes'
import Search from './routes/search'
import Tracking from './routes/tracking'
import GameDetails from './routes/gameDetails'
import {loader as indexLoader} from './routes/index'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: indexLoader
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "tracking",
        element: <Tracking />
      },
      {
        path: "games/:gameid",
        element: <GameDetails />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
