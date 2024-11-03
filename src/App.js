import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProductManager from './components/ProductManager';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app-header">
        </header>
        <main className="app-main">
          <ProductManager />
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
