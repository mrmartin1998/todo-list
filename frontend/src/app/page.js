"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    // Fetch to-do lists from the server
    const fetchLists = async () => {
      try {
        const response = await axios.get('/api/todos');
        setLists(response.data.data);
      } catch (error) {
        console.error('Error fetching the to-do lists:', error);
      }
    };
    fetchLists();
  }, []);

  const handleCreateList = async () => {
    if (newListName.trim() === '') return;

    try {
      const response = await axios.post('/api/todos', { name: newListName });
      setLists([...lists, response.data.data]);
      setNewListName('');
    } catch (error) {
      console.error('Error creating new to-do list:', error);
    }
  };

  return (
    <div>
      <h1>To-Do Lists</h1>
      <input
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        placeholder="New list name"
      />
      <button onClick={handleCreateList}>Create List</button>
      <ul>
        {lists.map((list) => (
          <li key={list._id}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
