'use client';

import styled from 'styled-components';

const DeleteButton = styled.button`
  background-color: #dc2626; /* Vermelho */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #b91c1c;
  }
`;

export default DeleteButton;
