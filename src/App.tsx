// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';
import TeacherPostList from './pages/TeacherPostList';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Header from './pages/Header/Header'; // Importando o Header

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/posts" element={<PostList />} />

        <Route
          path="/teacherPostsList"
          element={
            <ProtectedRoute>
              <TeacherPostList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createPost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editPost/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
