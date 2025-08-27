'use client';

import styled from 'styled-components';

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #374151; /* cinza escuro */
`;

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}
