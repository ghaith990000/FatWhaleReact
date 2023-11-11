import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Root from './routes/root';
import ErrorPage from "./error-page";
import reportWebVitals from './reportWebVitals';
import Menus from "./pages/menu";
import Home from './pages/home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthDetails from './pages/AuthDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'menus',
        element: <Menus />
      }
    ]
  },
  {
    path: 'login',
    element: <SignIn />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: 'auth',
    element: <AuthDetails />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
