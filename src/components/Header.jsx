import React from "react";
import styled from "@emotion/styled";

// Styled components
const HeaderContainer = styled.header`
  background-color: #1e1e2b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #eaeaf1;
  padding: 10px;
  margin-bottom: 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 16px;
    color: #eaeaf1;
    display: flex;
    align-items: center;
  }

  .fa-home {
    color: #996bd7;
    font-size: 20px;
    border-radius: 50%;
    padding: 5px;
    background-color: #ffffff;
    margin-right: 5px;
  }

  .checked {
    color: orange;
    margin-right: 5px;
  }
`;

const Button = styled.button`
  background-color: #996bd7;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  margin-left: 10px;
`;

const BellIcon = styled.i`
  color: #ffffff;
  font-size: 20px;
  background-color: gray;
  border-radius: 50%;
  padding: 5px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>
          <h3>
            <span className="fa fa-home"></span>
            <span className="fa fa-star checked"></span>
            Thriving Technologies
          </h3>
        </Title>
      </HeaderContent>
      <ButtonDiv>
        <BellIcon className="fa fa-bell"></BellIcon>
        <Button>Create New Board</Button>
      </ButtonDiv>
    </HeaderContainer>
  );
};

export default Header;
