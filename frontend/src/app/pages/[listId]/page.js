"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const ToDoListPage = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (listId) {
      // Fetch the to-do list items from the server
      const fetchList = async () => {
        try {
          const response = await axios.get(`/api/todos/${listId}`);
          setList(response.data.data);
        } catch (error) {
          console.error('Error fetching the to-do list:', error);
        }
      };
      fetchList();
    }
  }, [listId]);

  const handleAddItem = async () => {
    if (newItem.trim() === '') return;

    try {
      const response = await axios.post(`/api/todos/${listId}`, { name: newItem });
      setList({ ...list, items: [...list.items, response.data.data] });
      setNewItem('');
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-black">{list.name}</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
          />
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
        <ul>
          {list.items.map((item) => (
            <li key={item._id} className="flex items-center justify-between mb-2">
              <span className="text-black">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoListPage;
