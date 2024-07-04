import Header2 from "../components/Header2";
import Timetable from "../components/Timetable";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useState } from "react";
import LeftMenu from "../components/LeftMenu";
import { BrowserRouter as Router, Routes, Switch } from "react-router-dom";
import HelperMyPage from "./HelperMyPage";
import HelperMyModify from "./HelperMyModify";
let url = window.location.href;
let urlSplit = url.split("/");
let urlSplit2 = urlSplit[3];
console.log(urlSplit2);
if (urlSplit2 === "helperTimetable") {
  localStorage.setItem("selectedMenu", "타임테이블");
} else if (urlSplit2 === "helperMy") {
  localStorage.setItem("selectedMenu", "도움내역");
} else if (urlSplit2 === "HelperMyEdit") {
  localStorage.setItem("selectedMenu", "개인정보수정");
} else {
}

const HelperTimetablePage = () => {
  return (
    <>
      <Header2></Header2>
      <LeftMenu></LeftMenu>

      <Timetable />
    </>
  );
};

export default HelperTimetablePage;
