import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ error, success }) => {
    if (error) return 'var(--color-errorRed)';
    if (success) return 'green';
    else return 'var(--color-main)';
  }};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: translateY(${({ show }) => (show ? '30px' : '0px')});
  transition: all 0.2s;
  text-align: center;
`;

const Message = ({ children, error, success, show }) => {
  return (
    <div>
      <P error={error} success={success} show={show}>
        {children}
      </P>
    </div>
  );
};

export default Message;
