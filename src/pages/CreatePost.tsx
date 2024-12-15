import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { ErrorNotification, NotificationContent, BackButton } from '../styles/CommonStyled';
import { AxiosResponse } from 'axios';
import { verifyExpirationAndRefreshToken } from './Auth/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333333;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: light dark;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: light dark;
  resize: vertical;
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const idteacher = localStorage.getItem('idTeacher');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    setError('');
    const token = localStorage.getItem('authToken'); // Pegando o token do localStorage

    if (!token) {
      setError('Token não encontrado. Usuário não autenticado.');
      return;
    }

    event.preventDefault();
    const newPost = { title, description, author, idteacher };

    api.post('/posts',
      newPost, // Dados do post 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviando o token no header
        },
      }
    )
      .then((response: AxiosResponse) => {
        verifyExpirationAndRefreshToken(response);
        console.log('Post criado com sucesso');
        navigate('/teacherPostsList'); // Redireciona para a lista de posts do professor após a criação
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorMessages = (() => {
            const [firstError] = error.response.data.errors;
            const [field, message] = Object.entries(firstError)[0];
            return `${field === "title" ? "Título" : field === "description" ? "Descrição" : "Autor"}: ${message}`;
          })();
          setError(errorMessages); // Define todas as mensagens de erro no estado
        } else {
          setError('Ocorreu um erro inesperado.');
        }
      });
  };

  // Função para remover a mensagem de erro
  const handleErrorClick = () => {
    setError(''); // Limpa a mensagem de erro ao clicar
  };

  return (
    <Container>
      <Title>Criar Novo Post</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Textarea
          placeholder="Conteúdo do post"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit">Criar Post</Button>
        <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
        {
          error &&
          <ErrorNotification>
            <NotificationContent onClick={handleErrorClick}>{error}</NotificationContent>
          </ErrorNotification>
        }
      </Form>
    </Container>
  );
};

export default CreatePost;
