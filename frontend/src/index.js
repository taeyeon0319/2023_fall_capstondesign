import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RandingPage from './pages/RandingPage';
import JoinPage from './pages/JoinPage';
import Header from './components/Header';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RandingPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/Header",
    element: <Header />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);