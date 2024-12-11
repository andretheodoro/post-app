import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Supondo que o caminho seja correto

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated: ", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redireciona para a página de login se não autenticado
  }
  return <>{children}</>; // Retorna o conteúdo protegido
};

export default ProtectedRoute;
