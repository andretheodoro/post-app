import { AxiosResponse } from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializa com o valor de token do localStorage
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  useEffect(() => {
    // Quando o token muda, sincronize com o localStorage
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const login = (token: string) => {
    setToken(token); // Armazena o token no estado e localStorage
  };

  const logout = () => {
    setToken(null); // Remove o token do estado e localStorage
  };

  // Verifica se o usuário está autenticado com base na presença do token
  const isAuthenticated = !!token; // TODO: Implementar lógica de verificação de expiração do token

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const verifyExpirationAndRefreshToken = (response: AxiosResponse) => {
  console.clear();
  try {
    const newToken = response.headers['authorization']; // Captura o token do cabeçalho da resposta

    if (newToken) {
      console.log('Novo token recebido:', newToken);
      localStorage.setItem('authToken', newToken); // Atualiza o token no localStorage
    }
  } catch (error) {
    console.error('Erro ao verificar expiração do token:', error);
  }


};