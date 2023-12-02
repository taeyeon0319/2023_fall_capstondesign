import styled from "styled-components";

const MemberStyle = styled.div`
  width: 20%;
  height: 110%;
  background-color: #D0B89E;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 15px;
`;

const MemberImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-left: 20px;
  margin-right: 20px;
`;

const MemberInfo = styled.div`
  width: 80%;
  height: 280px;
  color: var(--Point-6, #54493F);
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  line-height: 0px;
`;

const MemberName = styled.p`
  font-weight: bolder;
  font-size: 30px;
  color: var(--Point-6, #54493F);
  margin-top: 0px;
`;

const Birth = styled.span`
  color: var(--Light-Point-Color, #7E6D62);
  font-size: 15px;
  margin-left: 10px;
`;

const NameUnderLine = styled.hr`
  width: 200px;
  /* border: none; */
  border: 1px solid var(--Light-Point-Color, #7E6D62);
  margin-top: -50px;
`;


const Major = styled.p`
  margin-top: -40px;
`;

const Github = styled.a`
  text-decoration: none;
  color: var(--Light-Point-Color, #7E6D62);
`;

const Keyword = styled.div`
  width: 90%;
  height: 50px;
  margin-top: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Key = styled.p`
  width: 85px;
  height: 40px;
  border-radius: 15px;
  background-color: #54493F;
  color: white;
  font-size: 16px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Member(props) {
  return (
    <>
      <MemberStyle>
        <MemberImg src={props.img} alt="" />
        <MemberInfo>
          <MemberName>
            {props.name}
            <Birth>{props.birth}</Birth>
          </MemberName>
          <NameUnderLine />
          <Major>
            {props.major}
            <span style={{ fontStyle: "italic" }}> {props.num}</span>
          </Major>
          <Github href={props.github} target="_blank">
            {props.github}
          </Github>
          <Keyword>
            <Key>{props.keyword1}</Key>
            <Key>{props.keyword2}</Key>
            <Key>{props.keyword3}</Key>
          </Keyword>
        </MemberInfo>
      </MemberStyle>
    </>
  );
}

export default Member;
