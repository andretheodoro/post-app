import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AxiosResponse } from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333333;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 1rem;
  color: #333333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`;

const PostCard = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 0.5rem;
`;

const PostAuthor = styled.p`
  font-size: 0.9rem;
  color: #666666;
  margin-bottom: 1rem;
`;

const PostDescription = styled.p`
  font-size: 1rem;
  color: #444444;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; // Limita a 3 linhas
  -webkit-box-orient: vertical;
`;

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/post/${id}`);
  };

    // Função para buscar posts por palavra-chave
    const searchPosts = async (keyword: string) => {
        try {
          const response = await api.get(`/posts/search`, {
            params: { keyword }
          });
          setPosts(response.data); // Define os posts com base na resposta da API
        } catch (error) {
          setPosts([]); 
          console.error('Erro ao buscar posts:', error);
        }
    };

      // Chama a função de busca quando a palavra-chave muda
  useEffect(() => {
    if (searchKeyword) {
      searchPosts(searchKeyword);
    } else {
      // Caso a palavra-chave esteja vazia, carregue todos os posts
      loadAllPosts();
    }
  }, [searchKeyword]);

    // Função para carregar todos os posts
    const loadAllPosts = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Pegando o token do localStorage

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let response: AxiosResponse<any, any>;
            if (token != null && token != "") {
                const idTeacher = localStorage.getItem('idTeacher');
                response = await api.get(`posts/professor/${idTeacher}`,  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Enviando o token no header
                    },
                  });
            }
            else{
                response = await api.get('/posts');
            }

            setPosts(response.data);
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
        }
    };

    // Carrega todos os posts na primeira renderização
    useEffect(() => {
        loadAllPosts();
    }, []);


  return (
    <Container>
      <Title>Lista de Posts</Title>
      <SearchInput
        type="text"
        placeholder="Buscar por título..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <CardGrid>
        {posts.map((post) => (
          <PostCard key={post.id} onClick={() => handleCardClick(post.id)}>
            <PostTitle>{post.title}</PostTitle>
            <PostAuthor>Autor: {post.author}</PostAuthor>
            <PostDescription>{post.description}</PostDescription>
          </PostCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default PostList;
