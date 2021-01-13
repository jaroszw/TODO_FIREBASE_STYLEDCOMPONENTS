import React from "react";
import NavItem from "./NavItem/NavItem";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;

  flex-direction: ${(props) => (props.mobile ? "column" : null)};
`;

const NavItems = ({ mobile, clicked, loggedIn }) => {
  let links;

  if (loggedIn) {
    links = (
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link="/">
          Home
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/todos">
          Todos
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/logout">
          Log Out
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link="/">
          Home
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/login">
          Login
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/signup">
          Sign Up
        </NavItem>
      </Ul>
    );
  }
  return <Nav>{links}</Nav>;
};

export default NavItems;
