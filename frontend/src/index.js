import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RandingPage from './pages/RandingPage';
import JoinPage from './pages/JoinPage';
import JoinPageHelper from './pages/JoinPageHelper';
import JoinPageUser from './pages/JoinPageUser';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RandingPage />,
  },
  {
    path: "/Join",
    element: <JoinPage />,
  },
  {
    path: "/JoinUser",
    element: <JoinPageUser />,
  },
  {
    path: "/JoinHelper",
    element: <JoinPageHelper />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);