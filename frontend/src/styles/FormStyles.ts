import styled from 'styled-components';

export const FormContainer = styled.section`
  width: 100%;
  max-width: 560px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  font-weight: 600;
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: bold;
`;
