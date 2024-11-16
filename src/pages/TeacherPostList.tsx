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
  margin-bottom: 1.5rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 1rem;
  color: #333333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const CreateButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    background-color: #0056b3;
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
  cursor: default;
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 75px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  color: white;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const TeacherPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

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

  const handleEdit = (id: number) => {
    navigate(`/editPost/${id}`);
  };

  const handleDelete = (id: number) => {
    const token = localStorage.getItem('authToken'); // Pegando o token do localStorage

    if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return;
    }

    api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviando o token no header
        }
      })
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
        console.log(`Post ${id} excluído com sucesso`);
      })
      .catch((error) => console.error('Erro ao excluir o post:', error));
  };

  const handleCreateNewPost = () => {
    navigate('/createPost');
  };

  return (
    <Container>
      <Title>Gerenciar Posts</Title>
      <SearchInput
        type="text"
        placeholder="Buscar por título..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <CreateButton onClick={handleCreateNewPost}>Criar Novo Post</CreateButton>
      <CardGrid>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostAuthor>Autor: {post.author}</PostAuthor>
            <PostDescription>{post.description}</PostDescription>
            <ButtonGroup>
              <EditButton onClick={() => handleEdit(post.id)}>Editar</EditButton>
              <DeleteButton onClick={() => handleDelete(post.id)}>Excluir</DeleteButton>
            </ButtonGroup>
          </PostCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default TeacherPostList;
