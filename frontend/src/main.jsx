import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './routes/Login'
import Register from './routes/Register'
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'
import NotFound from './routes/NotFound'
import { ContextProvider } from './context/ContextProvider'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
  }, 
  {
    path: "/",
    element: <GuestLayout/>,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  } 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
