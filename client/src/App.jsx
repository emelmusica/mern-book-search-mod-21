import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import { Home, Login, Signup, SavedBooks } from './pages'; // Import your route components

function App() {
  // Apollo Client instance
  const client = new ApolloClient({
    uri: 'https://your-app-name.herokuapp.com', // Replace with heroku Apollo Server's URL
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/saved" element={<SavedBooks />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
