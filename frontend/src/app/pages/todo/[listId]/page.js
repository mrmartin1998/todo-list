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
      const fetchList = async () => {
        try {
          const response = await axios.get(`/api/todos/${listId}`);
          console.log('Fetched list:', response.data.data);
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
      const response = await axios.post(`/api/todos/${listId}/items`, { name: newItem });
      console.log('Added item:', response.data.data);
      setList((prevList) => ({
        ...prevList,
        items: [...prevList.items, response.data.data]
      }));
      setNewItem('');
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handleToggleComplete = async (itemId, completed) => {
    if (!itemId) {
      console.error('Item ID is undefined!');
      return;
    }
    console.log(`Toggling complete for itemId: ${itemId}, completed: ${completed}`);
    try {
      const response = await axios.patch(`/api/todos/${listId}/items/${itemId}`, { completed });
      console.log('Updated item:', response.data.data);
      setList((prevList) => {
        const updatedItems = prevList.items.map((item) =>
          item._id === itemId ? { ...item, completed } : item
        );
        return { ...prevList, items: updatedItems };
      });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!itemId) {
      console.error('Item ID is undefined!');
      return;
    }
    console.log(`Deleting item with itemId: ${itemId}`);
    try {
      await axios.delete(`/api/todos/${listId}/items/${itemId}`);
      console.log('Deleted item:', itemId);
      setList((prevList) => {
        const updatedItems = prevList.items.filter((item) => item._id !== itemId);
        return { ...prevList, items: updatedItems };
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!list) {
    return <div>Loading...</div>;
  }

  const renderedItems = list.items.map((item) => {
    console.log('Rendering item:', item);
    return (
      <li key={item._id} className="flex items-center justify-between mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleToggleComplete(item._id, !item.completed)}
            className="mr-2"
          />
          <span className={item.completed ? 'line-through text-gray-500' : 'text-black'}>
            {item.name}
          </span>
        </label>
        <button
          onClick={() => handleDeleteItem(item._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </li>
    );
  });

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
        <ul>{renderedItems}</ul>
      </div>
    </div>
  );
};

export default ToDoListPage;
