import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('New Todo'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('New Todo', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="wrapper">
      <header>Todo App</header>
      <div className="inputField">
        <input
          type="text"
          placeholder="Add your new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button  onClick={handleAddTask}>
          <i className="fas fa-plus"></i>
          ADD
        </button>
      </div>
      <ul className="todoList">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className="icon" onClick={() => handleDeleteTask(index)}>
            DELETE
            </button>
          </li>
        ))}
      </ul>
      <div className="footer">
        <span>You have {tasks.length} pending tasks</span>
        <button onClick={handleDeleteAllTasks}>Clear All</button>
      </div>
    </div>
  );
};

export default TodoApp;
