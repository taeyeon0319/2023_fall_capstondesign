import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RandingPage from "./pages/RandingPage";
import JoinPage from "./pages/JoinPage";
import JoinPageHelper from "./pages/JoinPageHelper";
import JoinPageUser from "./pages/JoinPageUser";
import HelperList from "./pages/helper/helperList/HelperList";
import HelperDetail from "./pages/helper/helperDetail/HelperDetail";
import HelperRequest from "./pages/helper/helperRequest/HelperRequest";
import UserMyPage from "./pages/user/userMyPage/UserMyPage";
import HelperPage from "./pages/HelperPage";
import HelperRequestPage from "./pages/HeplerRequest";
import HelperMyPage from "./pages/HelperMyPage";
import HeplerEditPage from "./pages/HelperMyModify";
import Header2 from "./components/Header2";
import HelperTimetablePage from "./pages/HelperTimetable";
import TeamMember from "./pages/TeamMember";
import Introduce from "./pages/Introduce";
import Guide from "./pages/Guide";
import ChatList  from "./pages/ChatListPage";
import ChatDisplay from "./pages/ChatDisplayPage";
import ChatTest from "./pages/ChatTestPage";

import UserMyPageEdit from "./pages/user/userMyPage/UserMyPageEdit";

import ChatPage from "./pages/ChatPage";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserMyPageReviewCheck from "./pages/user/userMyPageReviewList/UserMyPageReviewCheck";
import UserMyPageWriteReview from "./pages/user/userMyPageWriteReview/userMyPageWriteReview"


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
    element: <HelperList />,
  },
  {
    path: "/user/helper/:id",
    element: <HelperDetail />,
  },
  {
    path: "/helperdetail",
    element: <HelperDetail />,
  },
  {
    path: "/helperrequest",
    element: <HelperRequest />,
  },
  {
    path: "/usermypage",
    element: <UserMyPage />,
  },
  {
    path : "/usermypage/helperReview/:helper_id",
    element : <UserMyPageReviewCheck />,
  },
  {
    path: "/helper",
    element: <HelperPage />,
  },
  {
    path: "/helperReq",
    element: <HelperRequestPage />,
  },
  {
    path: "/helperMy",
    element: <HelperMyPage />,
  },
  {
    path: "/header2",
    element: <Header2 />,
  },
  {
    path: "/usermypage/edit",
    element: <UserMyPageEdit />,
  },
  {
    path: "/usermypage/writeReview/:request_id",
    element: <UserMyPageWriteReview />,
  },
  {
    path: "/Chat",
    element: <ChatPage />,
  },
  {
    path: "/helperTimetable",
    element: <HelperTimetablePage />,
  },
  {
    path:"/team",
    element: <TeamMember />,
  },
  {
    path:"/HelperMyEdit",
    element: <HeplerEditPage />,
  },
  {
    path:"/service",
    element: <Introduce />,
  },
  {
    path:"/guide",
    element: <Guide />,
  },
  {
    path:"/chattest/:userName/:roomName",
    element:<ChatTest />
  },
  {
    path:"/chatlist",
    element:<ChatList />
  },
  {
    path:"/chatdisplay/:roomid/:name",
    element:<ChatDisplay />
  }
]);

sessionStorage.setItem("id", "yys");
sessionStorage.setItem("user_id", "2");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

<RouterProvider router={router} />

);