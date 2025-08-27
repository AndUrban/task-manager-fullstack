'use client';

import styled from 'styled-components';

interface ButtonProps {
  status: string;
}

const ToggleStatusButton = styled.button<ButtonProps>`
  background-color: ${({ status }) =>
    status === 'pendente' ? '#f59e0b' : '#2563eb'}; /* amarelo ou azul */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ status }) =>
      status === 'pendente' ? '#d97706' : '#1e40af'}; /* tom mais escuro */
  }
`;

export default ToggleStatusButton;
