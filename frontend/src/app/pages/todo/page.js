"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const ToDoPage = () => {
  const { data: session } = useSession();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    console.log('Session:', session);
    if (session && session.user) {
      const fetchLists = async () => {
        try {
          const response = await axios.get(`/api/todos?userId=${session.user.id}`);
          setLists(response.data.data);
        } catch (error) {
          console.error('Error fetching the to-do lists:', error);
        }
      };
      fetchLists();
    }
  }, [session]);

  const handleCreateList = async () => {
    if (newListName.trim() === '' || !session || !session.user) return;

    try {
      const response = await axios.post('/api/todos', {
        name: newListName,
        userId: session.user.id,
      });
      setLists([...lists, response.data.data]);
      setNewListName('');
    } catch (error) {
      console.error('Error creating new to-do list:', error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await axios.delete(`/api/todos?listId=${listId}`);
      setLists(lists.filter((list) => list._id !== listId));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-black">To-Do Lists</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New list name"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
            />
            <button
              onClick={handleCreateList}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Create List
            </button>
          </div>
          <ul>
            {lists.map((list) => (
              <li key={list._id} className="flex items-center justify-between mb-2">
                <Link href={`todo/${list._id}`} className="text-blue-500 hover:underline">
                  {list.name}
                </Link>
                <button
                  onClick={() => handleDeleteList(list._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
