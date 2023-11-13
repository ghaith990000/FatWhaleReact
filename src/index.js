import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Root from './routes/root';
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./error-page";
import reportWebVitals from './reportWebVitals';
import Menus from "./pages/menu";
import Home from './pages/home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from "./pages/Dashboard";
import AuthDetails from './pages/AuthDetails';
import { AuthProvider} from './AuthContext';
import Menu, {MenuLoader} from './pages/menu';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignIn/>
  },
  {
    path: "/admin",
    element: <Dashboard />
  },
  {
    path: "/menu/:menuId",
    element: <Menu />,
    loader: MenuLoader,
  },
  {
    path: "/auth",
    element: <AuthDetails />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
      <AuthProvider>
        <RouterProvider router={router} />
        {/* <App /> */}
      </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
