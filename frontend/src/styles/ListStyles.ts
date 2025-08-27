import styled from 'styled-components';

export const ListContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.cardBg};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 0.85rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ $status, theme }) =>
    $status === 'pendente' ? theme.colors.warning : theme.colors.success};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const LoadingMessage = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ActionButton = styled.button<{ variant?: 'primary' | 'success' | 'danger' }>`
  background-color: ${({ variant, theme }) =>
    variant === 'danger'
      ? theme.colors.danger
      : variant === 'success'
      ? theme.colors.success
      : theme.colors.primary};
  color: #fff;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
