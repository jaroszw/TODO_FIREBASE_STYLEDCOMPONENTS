import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  color: var(--color-white);
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
`;

const Logo = () => {
  return <LogoWrapper>Productivity</LogoWrapper>;
};

export default Logo;