import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Container } from '@material-ui/core';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId='102990033453-p3atgqavn7kdh3t1lu428011s63jruqg.apps.googleusercontent.com'>
      <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to="/posts" />} />
        <Route path="/posts" exact element={<Home/>} />
        <Route path="/posts/search" exact element={<Home/>} />
        <Route path="/posts/:id" element={<PostDetails/>} />
        <Route path="/auth" exact element={(!user ? <Auth/> : <Navigate to="/posts" />)} />
      </Routes>
    </Container>
    </GoogleOAuthProvider>
    
  )
}

export default App
