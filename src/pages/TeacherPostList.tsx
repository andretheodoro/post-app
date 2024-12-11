import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../reducers/post/postStore';
import { setPosts, setSearchKeyword, setLoading, setError, deletePost } from '../reducers/post/postActions';
import { verifyExpirationAndRefreshToken } from './Auth/AuthContext';
import { IPost } from '../types/types';

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
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  height: 40px;
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

// interface Post {
//   id: number;
//   title: string;
//   author: string;
//   description: string;
// }

const TeacherPostList: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  // const { posts, searchKeyword, loading, error } = useSelector((state: RootState) => state);
  const { posts, searchKeyword, loading, error } = useSelector((state: RootState) => state.posts);


  // Função para buscar posts por palavra-chave
  const searchPosts = async (keyword: string) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get(`/posts/search`, { params: { keyword } });
      dispatch(setPosts(response.data));
    } catch (error) {
      console.log('Erro ao buscar posts.', error);
      dispatch(setError('Erro ao buscar posts.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Função para carregar todos os posts
  const loadAllPosts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      let response: AxiosResponse;

      if (token) {
        const idTeacher = localStorage.getItem('idTeacher');
        response = await api.get(`posts/professor/${idTeacher}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        response = await api.get('/posts');
      }

      dispatch(setPosts(response.data));
    } catch (error) {
      console.log('Erro ao carregar posts.', error);
      dispatch(setError('Erro ao carregar posts.'));
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      searchPosts(searchKeyword);
    } else {
      loadAllPosts();
    }
  }, [searchKeyword]);

  const handleEdit = (id: number) => {
    navigate(`/editPost/${id}`);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado.');
      return;
    }

    try {
      const response = await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      verifyExpirationAndRefreshToken(response);
      dispatch(deletePost(id));
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
    }
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
        onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
      />
      <CreateButton onClick={handleCreateNewPost}>Criar Novo Post</CreateButton>
      {loading && <div>🔄 Carregando...</div>}{/* Exibe mensagem enquanto carrega */}
      {error && <div style={{ color: 'red' }}>{error}</div>}  {/* Exibe mensagem de erro */}

      {!loading && !error && (
        <CardGrid>
          {posts.map((post: IPost) => (
            <PostCard key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostAuthor>Autor: {post.author}</PostAuthor>
              <PostDescription>{post.description}</PostDescription>
              <ButtonGroup>
                <EditButton onClick={() => handleEdit(post.id as number)}>Editar</EditButton>
                <DeleteButton onClick={() => handleDelete(post.id as number)}>Excluir</DeleteButton>
              </ButtonGroup>
            </PostCard>
          ))}
        </CardGrid>
      )}
    </Container>
  );
};

export default TeacherPostList;
