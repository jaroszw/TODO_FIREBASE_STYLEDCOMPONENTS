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

const NavItems = ({ mobile, clicked, loggedIn, signOut }) => {
  let links;

  if (loggedIn) {
    links = (
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link="/">
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
        <NavItem clicked={clicked} mobile={mobile} link="/login">
          Login
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/signup">
          Sign Up
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/recovery">
          Recovery
        </NavItem>
      </Ul>
    );
  }
  return <Nav>{links}</Nav>;
};

export default NavItems;
