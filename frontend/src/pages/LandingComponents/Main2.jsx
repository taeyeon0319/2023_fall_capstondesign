import { useState } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  margin-top: 110px;
  margin-bottom:130px;
`;

const TitleSection = styled.div`
  width: 75%;
  height: 150px;
  border-radius: 10px;
  margin: 10px auto;
  background-color: var(--Point-4, #93796A);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  font-weight: bolder;
`;

const SubTitle = styled.p`
  margin-top: 0px;
  font-size: 25px;
  color: white;
`;

const ProjectImg = styled.img`
  width: 50%;
  height: 600px;
  margin: 20px auto;
  background-color: var(--Point-4, #93796A);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectMain = styled.div`
  width: 75%;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const ProjectRight = styled.div`
  width: 62%;
  height: 100%;
`;

const ProjectInfo = styled.div`
  width: 91%;
  height: max-content;
  padding: 20px 30px;
  background-color: #D0B89E;
  border-radius: 10px;
  border: 2px solid #ffffff80;
  font-weight: bolder;
`;

const InfoTitle = styled.h2`
  color: black;
  margin-bottom: 30px;
`;

const Info = styled.p`
  color: #ffffffcc;
  line-height: 30px;
`;

const Accordion = styled.div`
  width: 35%;
  height: 100%;
  position:relative;
`;

const AccordionItem = styled.div`
  border-radius: 10px;
  margin-bottom: 25px;
`;

const AccordionHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: #D0B89E;
  color: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  i {
    transition: transform 0.3s;
  }

  &.open i {
    transform: rotate(180deg);
  }
`;

const AccordionContent = styled.div`
  width: 100%;
  padding: 10px;
  display: none;
  background-color: #D0B89E;
  color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: -10px;
  white-space: pre-wrap; //개행문자 인식
  &.open {
    display: block;
  }
`;

const SubSummary = styled.div`
  margin-left:20px;
`;

const SubSummaryItem = styled.div`
  font-size:17px;
  font-weight:bolder;
  margin-bottom:30px;
`;

const SummaryImg = styled.div`
  // background-color:#D0B89E;
  width:70px;
  height:90px;
  border-radius:10px;
  padding-left:15px;
`;

const SubSummaryName = styled.div`
  font-size:20px;
  font-weight:bolder;
  margin-bottom:10px;
  margin-top:30px;
`;

const SummaryRole = styled.div`
  width:100%;
  display:flex;
  flex-wrap: wrap;
`;

const SummaryRoleEach = styled.div`
  background-color:#FFF8F3;
  width:fit-content;
  padding:10px;
  border-radius:10px;
  margin: 0px 5px 10px;
`
const ProjectSubTitle = styled.div`
  background-color:#313131;
  width:fit-content;
  border-radius:10px;
  font-size:17px;
  padding:0px 7px;
`;

const Main2 = () => {
  const [accordionItems, setAccordionItems] = useState([
    {
      id: 1,
      title: "프로젝트 요약",
      content:
        <>
          <SubSummary>
            <SubSummaryItem><span style={{ color: "#FFF8F3" }}>프로젝트 기간  </span> &nbsp; 2023.03 - 2023.06</SubSummaryItem>
            <SubSummaryItem><span style={{ color: "#FFF8F3" }}>개발 환경  </span> &nbsp; React</SubSummaryItem>
            <SubSummaryItem><span style={{ color: "#FFF8F3" }}>개발 도구  </span> &nbsp; Visual Studio Code, npm</SubSummaryItem>
            <SubSummaryItem><span style={{ color: "#FFF8F3" }}>기타 사용 모듈  </span> &nbsp; axios, cheerio</SubSummaryItem>
            <SubSummaryItem><span style={{ color: "#FFF8F3" }}>API  </span> &nbsp; 네이버 검색 API, Chat gpt 3.5 API</SubSummaryItem>
            <div style={{ display: "flex" }}>
              <a href="https://github.com/junghye01/2023-1-WebProgramming-WebTogether" target="_blank" style={{ color: "white", textDecorationLine: "none", marginRight: "15px" }}><SummaryImg><img alt="Github" width="56" height="56" decoding="async" data-nimg="1"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzIzOF8xNjk0KSI+CjxwYXRoIGQ9Ik0yMy40NjY4IDQxLjYyOEMyMy40NjY4IDQyLjY3NDEgMjMuNDk5NSA0My43MTU5IDIzLjQ1NTQgNDQuNzUzNEMyMy40MjU1IDQ1LjQ2MzYgMjIuODMyMSA0NS43ODY2IDIyLjExNzYgNDUuNTM3NkMxOS43NjUgNDQuNzE2NCAxNy42NTMgNDMuNDg1MyAxNS44MDcxIDQxLjgwNDVDMTMuNTM5OSAzOS43NDA5IDExLjg4MTkgMzcuMjcwMiAxMC44NTcyIDM0LjM3OTZDMTAuMDAzMyAzMS45NzE2IDkuNjYzMTMgMjkuNDkyMyA5Ljg1MDk5IDI2Ljk0MkMxMC4xNzQxIDIyLjU3MjcgMTEuODM0OSAxOC43Nzk5IDE0Ljg2MDcgMTUuNjIzMkMxOC4yMjA5IDEyLjExNzggMjIuMzU2NyAxMC4yMjIxIDI3LjIxNTUgMTAuMDE3MkMzNS40OTg2IDkuNjY4NSA0Mi45MDA3IDE0LjkwNzMgNDUuMzU4NiAyMi44MjA0QzQ2LjE2ODQgMjUuNDI2MiA0Ni4zODMzIDI4LjA4NjIgNDUuOTg5MSAzMC43ODg5QzQ1LjI1MzMgMzUuODI4NSA0Mi44MTgxIDM5Ljg2ODkgMzguNzgxOSA0Mi45NDg4QzM3LjI5NDcgNDQuMDgzMSAzNS42NDA5IDQ0LjkyNTYgMzMuODczMyA0NS41Mzc2QzMzLjA1MzUgNDUuODIwOCAzMi41MDQyIDQ1LjQxMzggMzIuNTA1NiA0NC41MjI4QzMyLjUwNTYgNDIuOTU4NyAzMi41MjI3IDQxLjM5NiAzMi41MjU1IDM5LjgzMTlDMzIuNTI1NSAzOC45NzIzIDMyLjQzMTYgMzguMTI0MSAzMi4wMzQ1IDM3LjM0ODRDMzEuODUzOCAzNi45OTQxIDMxLjYwOSAzNi42NzM4IDMxLjM3NDEgMzYuMzA2N0MzMS43NjI3IDM2LjI0NTUgMzIuMTY2OSAzNi4xODcxIDMyLjU2OTYgMzYuMTE4OEMzMy45NjAxIDM1Ljg4MjUgMzUuMjgwOCAzNS40NTU2IDM2LjQ1MzYgMzQuNjQ4NkMzNy44Mjk4IDMzLjcwMjIgMzguNjk4IDMyLjM4NDMgMzkuMTM0OSAzMC43OTZDMzkuNjIxNiAyOS4wMjk4IDM5Ljc3ODIgMjcuMjMzNyAzOS4zNTY5IDI1LjQyNjJDMzkuMTE2NCAyNC4zOTQ0IDM4LjYzMzkgMjMuNDc2NSAzNy45NDUxIDIyLjY3MzhDMzcuNzc4NiAyMi40ODAyIDM3Ljc0MTYgMjIuMzIyMiAzNy44MTg0IDIyLjA3NkMzOC4yODEgMjAuNjAxNiAzOC4xMTQ0IDE5LjE1MjggMzcuNTc5MyAxNy43MzM4QzM3LjU0MDkgMTcuNjMxMyAzNy4zMTMyIDE3LjUyNDYgMzcuMTkzNiAxNy41NDMxQzM2LjYxMyAxNy42MzQyIDM2LjAwMSAxNy42NzgzIDM1LjQ3MDEgMTcuOTA0NkMzNC41NjA3IDE4LjI5MzEgMzMuNzA5NiAxOC44MTQgMzIuODIzIDE5LjI1ODFDMzIuNjUyMiAxOS4zNDM1IDMyLjQxNzQgMTkuMzk3NSAzMi4yMzggMTkuMzUzNEMyOS40MDAyIDE4LjY2MDMgMjYuNTY4IDE4LjY2MzIgMjMuNzMwMSAxOS4zNTM0QzIzLjU2MDcgMTkuMzk0NyAyMy4zMjU5IDE5LjM1NzcgMjMuMTc5MyAxOS4yNjY2QzIyLjEyMTkgMTguNjA3NyAyMS4wNTE2IDE3Ljk3ODYgMTkuODI5MSAxNy42NzY5QzE5LjQ2NDggMTcuNTg3MiAxOS4wODE5IDE3LjU1MzEgMTguNzA2MiAxNy41NDQ1QzE4LjU5MDkgMTcuNTQxNyAxOC40MDU5IDE3LjY4NCAxOC4zNjQ2IDE3LjgwMDdDMTcuODQzNyAxOS4yMzk2IDE3LjcwNzEgMjAuNjk4NCAxOC4xNzUzIDIyLjE4NDJDMTguMjEwOSAyMi4yOTk1IDE4LjE2NjggMjIuNDg4NyAxOC4wODg1IDIyLjU4MjdDMTYuODc1OSAyNC4wMjg3IDE2LjM0NTEgMjUuNjk1MiAxNi4zOTIgMjcuNTcyNEMxNi40MzA1IDI5LjA4OTYgMTYuNjM0IDMwLjU2NTQgMTcuMjc3MyAzMS45NTU5QzE4LjA2MTUgMzMuNjU1MiAxOS4zNjk0IDM0Ljc4ODEgMjEuMDg1OCAzNS40ODRDMjIuMTAyIDM1Ljg5NjggMjMuMTY1MSAzNi4xMTQ1IDI0LjI0NjcgMzYuMjU5N0MyNC4zNjIgMzYuMjc1MyAyNC40NzczIDM2LjMwMSAyNC41NzgzIDM2LjMxOTVDMjQuMzQwNyAzNi43MDk0IDI0LjA3NzQgMzcuMDcwOSAyMy44OTA5IDM3LjQ2OEMyMy43MzcyIDM3Ljc5NTMgMjMuNjgzMSAzOC4xNjY4IDIzLjU2NzkgMzguNTE0MUMyMy41MzA5IDM4LjYyNjUgMjMuNDY0IDM4Ljc3NzMgMjMuMzcxNSAzOC44MTQ0QzIxLjk3MSAzOS4zNzc5IDIwLjU3OTEgMzkuNTEzMSAxOS4zMDgyIDM4LjUxNjlDMTguOTE2OCAzOC4yMDk1IDE4LjU5MDkgMzcuNzkyNSAxOC4zMTIgMzcuMzc1NUMxNy43NjU0IDM2LjU1ODYgMTcuMTQwNyAzNS44Mzk4IDE2LjE3NDMgMzUuNTQ2N0MxNS43OTE1IDM1LjQzMTQgMTUuMzYxNiAzNS40MDcyIDE0Ljk2MDMgMzUuNDM4NUMxNC41ODg4IDM1LjQ2NyAxNC41MjA1IDM1LjcyNDYgMTQuNzc1MyAzNi4wMDc4QzE0LjkzMTggMzYuMTgxNCAxNS4xMTI2IDM2LjM0NTEgMTUuMzEwNCAzNi40Njg5QzE2LjE1NDQgMzcuMDAyNiAxNi43MDIzIDM3Ljc3ODMgMTcuMTA2NSAzOC42NjIxQzE3LjQxMTEgMzkuMzMxIDE3LjY4NzIgNDAuMDExMyAxOC4yMjY2IDQwLjUzNjRDMTkuMjM1NiA0MS41MTg0IDIwLjQ3ODEgNDEuODQ0NCAyMS44NDAxIDQxLjc5NkMyMi4zNTgxIDQxLjc3NzUgMjIuODc0OCA0MS42OTIxIDIzLjQ2ODIgNDEuNjI5NUwyMy40NjY4IDQxLjYyOFoiIGZpbGw9IiNGQ0ZDRkMiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8yMzhfMTY5NCI+CjxyZWN0IHdpZHRoPSIzNi4zOCIgaGVpZ2h0PSIzNS42MjQzIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS44MDA3OCAxMCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
                style={{ color: "transparent" }} />&nbsp;github</SummaryImg></a>

              <a href="https://www.notion.so/web-together" target="_blank" style={{ color: "white", textDecorationLine: "none" }}><SummaryImg><img alt="웹사이트" width="56" height="56" decoding="async" data-nimg="1"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzIzOF8xNjY4KSI+CjxwYXRoIGQ9Ik0zNS42NTM5IDE0LjQ5OTZDMzcuODAwNCAxNC41OTQ3IDM5Ljc4MTYgMTUuNjY3MyA0MC44NTk0IDE4LjAyMzNDNDEuOTQ3NiAyMC40MDI5IDQxLjYzMjYgMjIuNjgzNSA0MC4wMDE2IDI0Ljc1MzJDMzkuNzk0NiAyNS4wMTQ4IDM5LjU0NDcgMjUuMjQzOSAzOS4zMDc4IDI1LjQ4MDhDMzcuNTAzNiAyNy4yOTE1IDM1LjY5NjggMjkuMDk4MyAzMy44OTQgMzAuOTEwMkMzMS41MDAxIDMzLjMxNDUgMjcuNTU5OSAzMy4zNjE0IDI1LjEzMjIgMzEuMDEwNUMyNC42NTA1IDMwLjU0MzIgMjQuNjAzNyAyOS45MjM1IDI1LjAxNzYgMjkuNDgxQzI1LjQzMDMgMjkuMDM5NyAyNi4wNjAzIDI5LjA0MzYgMjYuNTQ5NyAyOS40OTE0QzI4LjMwMzEgMzEuMDkzOCAzMC43MzM0IDMxLjA3NDMgMzIuNDE5MSAyOS40MTA3QzM0LjM5MjUgMjcuNDY0NiAzNi4zNzI0IDI1LjUyMTIgMzguMjkxMSAyMy41MjMxQzM5LjQ2MDEgMjIuMzA2IDM5LjY4OTIgMjAuODAyNSAzOS4xMjI5IDE5LjIzMzlDMzguNTY3MSAxNy42OTUzIDM3LjQwODYgMTYuODE5MyAzNS43ODY2IDE2LjYxMjNDMzQuNDI5IDE2LjQzOTIgMzMuMjQ0NCAxNi44NDE0IDMyLjI2ODEgMTcuODIxNkMzMS4yMjk0IDE4Ljg2NTYgMzAuMTgxNSAxOS45MDA0IDI5LjE0MTQgMjAuOTQzMUMyOC44MDE3IDIxLjI4NDEgMjguNDA4NiAyMS40MDI2IDI3Ljk1ODIgMjEuMjM0N0MyNy4yMzgzIDIwLjk2NjUgMjcuMDczIDIwLjA3NjEgMjcuNjM5MyAxOS41MDM0QzI4LjYwNjQgMTguNTI1OCAyOS41NzM2IDE3LjU0NjkgMzAuNTU5IDE2LjU4ODlDMzAuOTU5OSAxNi4xOTg0IDMxLjM4MTcgMTUuODE1NyAzMS44NDM4IDE1LjUwMTlDMzIuODY4MiAxNC44MDk0IDM0LjAyMDIgMTQuNTA2MSAzNS42NTM5IDE0LjQ5OTZaIiBmaWxsPSIjRkNGQ0ZDIi8+CjxwYXRoIGQ9Ik0yMC43MTAzIDQxLjQ2ODZDMTguMTMyOSA0MS40NzI1IDE1Ljg3NTggMzkuOTY2NCAxNC45NDM3IDM3LjYyMDdDMTMuOTg3IDM1LjIxMjYgMTQuNjA3OSAzMi40NzY0IDE2LjQ0ODUgMzAuNjgzOUMxOC4zMjU2IDI4Ljg1NjMgMjAuMTg0NCAyNy4wMDY2IDIyLjAwMjkgMjUuMTIwNEMyNC4zNzQ2IDIyLjY2MTUgMjguNTAxIDIyLjU4NDcgMzAuODg0NCAyNS4wMDQ2QzMxLjI5NDUgMjUuNDE5OCAzMS4zNDM5IDI1Ljk4NjEgMzEuMDA5NCAyNi40MTY5QzMwLjY5MTggMjYuODI1NyAzMC4xMTEyIDI2Ljk0MTUgMjkuNjY3MyAyNi42NzQ3QzI5LjU1OCAyNi42MDgzIDI5LjQ2MTcgMjYuNTE1OSAyOS4zNjY2IDI2LjQyODZDMjcuNjc1NyAyNC44ODA5IDI1LjE5NDcgMjQuOTE4NyAyMy41NjYyIDI2LjUzNTRDMjEuNTk4MSAyOC40ODc5IDE5LjYxOTUgMzAuNDMwMSAxNy42OTI5IDMyLjQyM0MxNi41MTc1IDMzLjYzODggMTYuMjc2NyAzNS4xMzcxIDE2LjgzMjUgMzYuNzA1NkMxNy4zODcgMzguMjcyOSAxOC41NjM4IDM5LjE1OTMgMjAuMjE0MyAzOS4zNTg1QzIxLjU0ODYgMzkuNTE4NiAyMi43MTQ5IDM5LjEyNTUgMjMuNjc1NiAzOC4xNjYxQzI0LjcyNDggMzcuMTE3IDI1Ljc4MDQgMzYuMDc0MyAyNi44MjU3IDM1LjAyMjVDMjcuMTU2NCAzNC42ODkzIDI3LjU0MDQgMzQuNTczNCAyNy45NzkgMzQuNzIxOEMyOC42OTExIDM0Ljk2MjYgMjguODk4IDM1Ljg1ODIgMjguMzY0MyAzNi40MjA1QzI3Ljg1MDIgMzYuOTYyIDI3LjMxMjYgMzcuNDgxNCAyNi43ODQxIDM4LjAwOTlDMjYuMTU1MyAzOC42MzczIDI1LjU0NjEgMzkuMjg0MyAyNC44OTE0IDM5Ljg4MThDMjMuNzEzMyA0MC45NTcgMjIuMjk4NCA0MS40NTAzIDIwLjcxMTYgNDEuNDY5OUwyMC43MTAzIDQxLjQ2ODZaIiBmaWxsPSIjRkNGQ0ZDIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMjM4XzE2NjgiPgo8cmVjdCB3aWR0aD0iMjciIGhlaWdodD0iMjYuOTY3NSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjUgMTQuNSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
                style={{ color: "transparent" }} />&nbsp;notion</SummaryImg></a>
            </div>
          </SubSummary>
        </>
    },
    {
      id: 2,
      title: "프로젝트 역할",
      content:
        <>
          <SubSummary>
            <SubSummaryName>김정혜</SubSummaryName>
            <SummaryRole>
              <SummaryRoleEach>검색 키워드 뉴스 조회 기능 구현</SummaryRoleEach>
              <SummaryRoleEach>검색 결과 로컬 스토리지에 자동 저장 기능 구현</SummaryRoleEach>
              <SummaryRoleEach>검색어 추천 기능 구현</SummaryRoleEach>
              <SummaryRoleEach>스크랩 기능 구현</SummaryRoleEach>
            </SummaryRole>

            <SubSummaryName>김태연</SubSummaryName>
            <SummaryRole>
              <SummaryRoleEach>랜딩페이지 구현</SummaryRoleEach>
              <SummaryRoleEach>프로젝트 메인 화면 구현</SummaryRoleEach>
              <SummaryRoleEach>검색 결과 화면 구현</SummaryRoleEach>
              <SummaryRoleEach>뉴스 정보 모달창 구현</SummaryRoleEach>
              <SummaryRoleEach>마이페이지 구현</SummaryRoleEach>
            </SummaryRole>



            <SubSummaryName>안정민</SubSummaryName>
            <SummaryRole>
              <SummaryRoleEach>요약문 제공 기능 구현</SummaryRoleEach>
              <SummaryRoleEach>키워드 제공 기능 구현</SummaryRoleEach>
              <SummaryRoleEach>에러 페이지 구현</SummaryRoleEach>
              <SummaryRoleEach>로딩중 기능 구현</SummaryRoleEach>
            </SummaryRole>
          </SubSummary>
        </>
    },
  ]);

  const toggleAccordion = (id) => {
    setAccordionItems((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <MainWrapper>
      <TitleSection>
        <Title>HelP_Py</Title>
        <SubTitle>: 급하게 도우미가 필요한 상황에서 서비스 내에 인증된 주변의 도우미를 호출할 수 있는 서비스</SubTitle>
      </TitleSection>
      <ProjectImg src="" alt="projectImg"></ProjectImg>
      <ProjectMain>
        <Accordion>
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} className={item.isOpen ? "open" : ""}>
              <AccordionHeader onClick={() => toggleAccordion(item.id)}>
                <h2>{item.title}</h2>
                <i className={item.isOpen ? "fas fa-angle-down" : "fas fa-angle-right"}></i>
              </AccordionHeader>
              <AccordionContent className={item.isOpen ? "open" : ""}>
                <p style={{ padding: "0px 15px" }}>{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <ProjectRight>
          <ProjectInfo>
            <InfoTitle>프로젝트 소개</InfoTitle>
            <Info>
              관심 있는 분야의 최신 뉴스를 Chat GPT가 제공하는 요약문과 키워드를
              통해 간단하고 빠르게 확인할 수 있는 사이트
              <br /><br />
              <ProjectSubTitle>사용 가이드</ProjectSubTitle>
              검색창에 관심있는 뉴스를 검색한 뒤 조회할 기사를 클릭하면 해당
              기사의 본문과 함께 요약문, 키워드를 제공해준다. 사용자가 조회한
              기사들은 mypage에 저장되어 조회했던 기사들만 모아서 확인할 수
              있다.
              <br /><br />
              <ProjectSubTitle>프로젝트 기능</ProjectSubTitle>
              <ul style={{ marginTop: "0px" }}>
                <li>네이버 뉴스의 요약문과 키워드 제공</li>
                <li>검색어 자동 저장 기능</li>
                <li>조회한 기사 모아보기 기능</li>
              </ul>

            </Info>
          </ProjectInfo>
        </ProjectRight>
      </ProjectMain>
    </MainWrapper>
  );
};

export default Main2;
