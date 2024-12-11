import { AxiosResponse } from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api'; // Supondo que você tenha uma instância do axios configurada

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [authenticated, setAuthenticated] = useState<boolean>(false); // Estado de autenticação

  // Quando o token mudar, faça a verificação de sua validade
  useEffect(() => {
    if (token) {
      // Verifique a validade do token
      checkIsAuthenticated(token);
    } else {
      setAuthenticated(false);
    }
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setToken(null);
    setAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  // Função para verificar se o token JWT é válido
  const checkIsAuthenticated = async (token: string) => {
    try {
      // const response = await api.get(`/auth/verifyToken`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const response = await api.get(`/professor/isAuthenticated`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setAuthenticated(true); // Se a API responder com sucesso, o token é válido
      } else {
        setAuthenticated(false); // Caso contrário, invalidamos o estado
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      setAuthenticated(false); // Em caso de erro na verificação, considera-se o token inválido
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, token, login, logout }}>
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

// Função para verificar expiração do token e atualizá-lo
export const verifyExpirationAndRefreshToken = (response: AxiosResponse) => {
  // console.clear();
  try {
    const newToken = response.headers['authorization']; // Captura o token do cabeçalho da resposta
    console.log('newtoken:', newToken);

    if (newToken) {
      console.log('Novo token recebido:', newToken);
      localStorage.setItem('authToken', newToken); // Atualiza o token no localStorage
    }

  } catch (error) {
    console.error('Erro ao verificar expiração do token:', error);
  }
};