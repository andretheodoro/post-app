import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Supondo que o caminho seja correto

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Mostra um indicador de carregamento enquanto verifica a autenticação
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redireciona para a página de login se não autenticado
  }

  return <>{children}</>;
};

export default ProtectedRoute;
