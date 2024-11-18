// src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaList, FaSignOutAlt } from 'react-icons/fa';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px; /* Altura reduzida */
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px; /* Padding reduzido */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 480px) {
    height: 45px;
  }
`;


const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px; /* Diminui o tamanho dos ícones */
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #f0f2f5;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();

  // const handleBackToLogin = () => {
  //   navigate('/');
  // };

  const handleGoToPostsList = () => {
    navigate('/posts');
  };
  
  const handleLogout = () => {
    // Remova o token ou outros dados do localStorage/sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('idTeacher');
    localStorage.removeItem('authToken');

    // Redirecione para a página de login
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Title>Blogging FIAP</Title>
      <IconContainer>
        <IconButton onClick={handleGoToPostsList}>
          <FaList /> {/* Ícone de lista */}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <FaSignOutAlt /> {/* Ícone de lista */}
        </IconButton>
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;
