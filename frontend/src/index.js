import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RandingPage from './pages/RandingPage';
import JoinPage from './pages/JoinPage';
import JoinPageHelper from './pages/JoinPageHelper';
import JoinPageUser from './pages/JoinPageUser';
import HelperList from './pages/helper/helperList/HelperList';
import HelperDetail from './pages/helper/helperDetail/HelperDetail';
import HelperRequest from './pages/helper/helperRequest/HelperRequest';
import UserMyPage from './pages/user/userMyPage/UserMyPage';
import HelperPage from './pages/HelperPage';
import HelperRequestPage from './pages/HeplerRequest';
import HelperMyPage from './pages/HelperMyPage';
import Header2 from './components/Header2';
import ChatPage from './pages/ChatPage';
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
  },
  {
    path: "/user",
    element : <HelperList/>,
  },
  {
    path: "/user/helper/:id",
    element : <HelperDetail/>,
  },
  {
    path: "/helperdetail",
    element : <HelperDetail/>,
  },
  {
    path: "/helperrequest",
    element : <HelperRequest/>,
  },
  {
    path: "/usermypage",
    element : <UserMyPage/>,
  },
  {
    path: "/helper",
    element : <HelperPage/>,
  },
  {
    path: "/helperReq",
    element : <HelperRequestPage/>,
  },
  {
    path: "/helperMy",
    element : <HelperMyPage/>,
  },
  {
    path: "/header2",
    element : <Header2/>,
  },
  {
    path: "/Chat",
    element : <ChatPage/>,
  },
]);

sessionStorage.setItem('id', 'yys')
sessionStorage.setItem('user_id', '1')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);