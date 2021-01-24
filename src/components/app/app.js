import React, { useState } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

const getId = () => Date.now().toString();

function App() {
  const [items, setItems] = useState([
    { id: 1, label: 'Drink Coffee', important: false, done: false },
    { id: 2, label: 'Learn React', important: true, done: false },
    { id: 3, label: 'Make Awesome App', important: false, done: false }
  ]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const onItemAdded = (label) => {
    if (label !=='') {
      const item = createItem(label);
      setItems((prev) => [...prev, item]);
    }
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };

  const onToggleDone = (id) => {
    setItems(() => toggleProperty(items, id, 'done'));
  };

  const onToggleImportant = (id) => {
    setItems(() => toggleProperty(items, id, 'important'));
  };

  const onDelete = (id) => {
    const idx = items.findIndex((item) => item.id === id);
    setItems(() => [
        ...items.slice(0, idx),
        ...items.slice(idx + 1)
    ]);
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const onSearchChange = (search) => {
    setSearch(search);
  };

  const createItem = (label) => {
    return {
      id: getId(),
      label,
      important: false,
      done: false
    };
  }

  function filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  }

  function searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  const doneCount = items.filter((item) => item.done).length;
  const toDoCount = items.length - doneCount;
  const visibleItems = searchItems(filterItems(items, filter), search);


  return (
    <div className="todo-app">
      <AppHeader toDo={toDoCount} done={doneCount} />

      <div className="search-panel d-flex">
        <SearchPanel
          onSearchChange={onSearchChange} />

        <ItemStatusFilter
          filter={filter}
          onFilterChange={onFilterChange} />
      </div>

      <TodoList
        items={visibleItems}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
        onDelete={onDelete} />

      <ItemAddForm
        onItemAdded={onItemAdded} />
    </div>

  );
}

export default App;