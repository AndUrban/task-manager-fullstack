'use client';

import styled from 'styled-components';

const DangerButton = styled.button`
  background-color: #dc2626; /* vermelho */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c; /* vermelho mais escuro */
  }
`;

export default DangerButton;
