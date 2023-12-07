import React, { useState } from "react";

import "./LeftMenu.css"; // 스타일 파일을 불러옵니다.
let url = window.location.href;
let urlSplit = url.split("/");
let urlSplit2 = urlSplit[3];
console.log(urlSplit2);
const LeftMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(urlSplit2);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // 여기에서 선택한 메뉴에 따라 다른 동작을 수행할 수 있습니다.
    //클릭한 페이지로 이동

    if (menu === "HelperMyEdit") {
      window.location.href = "/HelperMyEdit";
    }
    if (menu === "helperTimetable") {
      window.location.href = "/helperTimetable";
    }
    if (menu === "helperMy") {
      window.location.href = "/helperMy";
    }
  };

  return (
    <div className="left-menu">
      <div
        className={`menu-item ${
          selectedMenu === "HelperMyEdit" ? "active" : ""
        }`}
        onClick={() => handleMenuClick("HelperMyEdit")}
      >
        개인정보수정
      </div>
      <div
        className={`menu-item ${
          selectedMenu === "helperTimetable" ? "active" : ""
        }`}
        onClick={() => handleMenuClick("helperTimetable")}
      >
        타임테이블
      </div>
      <div
        className={`menu-item ${selectedMenu === "helperMy" ? "active" : ""}`}
        onClick={() => handleMenuClick("helperMy")}
      >
        도움내역
      </div>
      {/* 다른 메뉴 아이템들을 추가할 수 있습니다. */}
    </div>
  );
};

export default LeftMenu;
