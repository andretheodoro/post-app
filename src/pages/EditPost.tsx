import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { BackButton } from '../styles/CommonStyled';

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
  color: #333333;

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
  color: #333333;
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

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const idteacher = localStorage.getItem('idTeacher');
  const navigate = useNavigate();

  // Carrega os dados do post existente
  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(response => {
        const { title, author, description } = response.data;
        setTitle(title);
        setAuthor(author);
        setDescription(description);
      })
      .catch(error => console.error('Erro ao carregar o post:', error));
  }, [id]);

  // Função para enviar as atualizações do post
  const handleSubmit = (event: React.FormEvent) => {
    const token = localStorage.getItem('authToken'); // Pegando o token do localStorage

    if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return;
    }

    event.preventDefault();
    const updatedPost = { title, description, author, idteacher };

    api.put(
        `/posts/${id}`, 
        updatedPost, // Dados do post atualizado
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviando o token no header
          },
        }
      )
      .then(() => {
        console.log('Post atualizado com sucesso');
        navigate('/teacherPostsList'); // Redireciona para a lista de posts do professor
      })
      .catch(error => console.error('Erro ao atualizar o post:', error));
  };

  return (
    <Container>
      <Title>Editar Post</Title>
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
        <Button type="submit">Salvar Alterações</Button>
        <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
      </Form>
    </Container>
  );
};

export default EditPost;
