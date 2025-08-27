import styled from 'styled-components';

export const StatusBadge = styled.span<{ status: 'done' | 'pending' }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ status, theme }) =>
    status === 'done' ? theme.colors.success : theme.colors.cardBg};
`;
