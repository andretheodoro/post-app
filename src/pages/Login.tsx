import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import styled from 'styled-components';
import { useAuth } from '../pages/Auth/AuthContext';
import { ErrorNotification, NotificationContent } from '../styles/CommonStyled';

// Definição de estilos
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 1rem;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    padding: 3rem;
    max-width: 450px;
  }

  @media (min-width: 1024px) {
    max-width: 500px;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  @media (min-width: 768px) {
    padding: 12px;
  }
`;

const Button = styled.button<{ bgColor: string }>`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => props.bgColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.bgColor === '#007bff' ? '#0056b3' : '#218838')};
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (role: 'aluno' | 'professor') => {
    setError('');
    try {
      if (role === 'professor') {
        if (!username || !password) {
          setError('Por favor, preencha o Usuário e Senha.');
          return;
        }

        const response = await api.post('/professor/login', {
          username,
          password,
        });
        const token = response.data.token;
        const idTeacher = response.data.idTeacher;
        localStorage.setItem('authToken', token);
        localStorage.setItem('idTeacher', idTeacher);
        console.log("Token Login: ", token);
        login(token);
        navigate('/teacherPostsList');
      } else {
        navigate('/posts');
      }
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
      console.log(err);
    }
  };

  // Função para remover a mensagem de erro
  const handleErrorClick = () => {
    setError(''); // Limpa a mensagem de erro ao clicar
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <Form>
          <Label>Usuário</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Label>Senha</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            bgColor="#28a745"
            onClick={(e) => {
              e.preventDefault();
              handleLogin('professor');
            }}
          >
            Entrar como Professor
          </Button>
          <br />
          <Button
            bgColor="#007bff"
            onClick={(e) => {
              e.preventDefault();
              handleLogin('aluno');
            }}
          >
            Entrar como Aluno
          </Button>
        </Form>
        {
          error &&
          <ErrorNotification>
            <NotificationContent onClick={handleErrorClick}>{error}</NotificationContent>
          </ErrorNotification>
        }
      </FormWrapper>
    </Container>
  );
};

export default Login;
