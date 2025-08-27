'use client';

import styled from 'styled-components';

const UserCard = styled.li`
  border: 1px solid #d1d5db; /* cinza claro */
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export default UserCard;
