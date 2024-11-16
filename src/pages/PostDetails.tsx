import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const PostWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Author = styled.p`
  font-size: 1rem;
  color: #666666;
  font-style: italic;

  span {
    font-weight: bold;
    color: #333;
  }
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444444;
  padding: 1rem 0;
  text-align: justify;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
`;

const BackButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background-color: green;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
  text-align: center;
`;

interface Post {
    id: number;
    title: string;
    author: string;
    description: string;
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`)
        .then((response) => {
          setPost(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar detalhes do post:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <LoadingMessage>Carregando...</LoadingMessage>;

  if (!post) return <ErrorMessage>Post não encontrado</ErrorMessage>;

  return (
    <Container>
      <PostWrapper>
        <Title>{post.title}</Title>
        <Author>Escrito por: <span>{post.author}</span></Author>
        <Content>{post.description}</Content>
        <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
      </PostWrapper>
    </Container>
  );
};

export default PostDetails;
