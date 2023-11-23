import Header2 from "../components/Header2";
import Timetable from "../components/Timetable";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const HelperTimetablePage = () => {
  return (
    <>
      <Header2></Header2>

      <Timetable />
    </>
  );
};

export default HelperTimetablePage;
