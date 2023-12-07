import React, { useState } from "react";
import "./LeftMenu.css"; // 스타일 파일을 불러옵니다.

const LeftMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState("개인정보수정");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // 여기에서 선택한 메뉴에 따라 다른 동작을 수행할 수 있습니다.
  };

  return (
    <div className="left-menu">
      <div
        className={`menu-item ${
          selectedMenu === "개인정보수정" ? "active" : ""
        }`}
        onClick={() => handleMenuClick("개인정보수정")}
      >
        개인정보수정
      </div>
      <div
        className={`menu-item ${selectedMenu === "타임테이블" ? "active" : ""}`}
        onClick={() => handleMenuClick("타임테이블")}
      >
        타임테이블
      </div>
      <div
        className={`menu-item ${selectedMenu === "도움내역" ? "active" : ""}`}
        onClick={() => handleMenuClick("도움내역")}
      >
        도움내역
      </div>
      {/* 다른 메뉴 아이템들을 추가할 수 있습니다. */}
    </div>
  );
};

export default LeftMenu;
