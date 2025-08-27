'use client';

import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: #f59e0b; /* amarelo */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d97706; /* amarelo mais escuro */
  }
`;

export default PrimaryButton;
