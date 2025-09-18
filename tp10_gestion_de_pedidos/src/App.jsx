
import React, { useState, useMemo } from 'react';
import OrderList from './components/OrderList';
import OrderFilter from './components/OrderFilter';
import OrderStats from './components/OrderStats';
import OrderForm from './components/OrderForm';
import './App.css';

const initialOrders = [
  {
    id: 1,
    customer: 'Juan Perez',
    items: [
      { productId: 101, name: 'Mouse', quantity: 2, price: 1200 },
      { productId: 102, name: 'Teclado', quantity: 1, price: 3500 }
    ],
    status: 'pending',
    date: new Date('2025-09-15')
  },
  {
    id: 2,
    customer: 'Maria Lopez',
    items: [
      { productId: 103, name: 'Monitor', quantity: 1, price: 25000 }
    ],
    status: 'shipped',
    date: new Date('2025-09-16')
  },
  {
    id: 3,
    customer: 'Carlos Gomez',
    items: [
      { productId: 104, name: 'Notebook', quantity: 1, price: 150000 }
    ],
    status: 'delivered',
    date: new Date('2025-09-10')
  }
];

function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('');

  const filteredOrders = useMemo(() => {
    return filter ? orders.filter(o => o.status === filter) : orders;
  }, [orders, filter]);

  const stats = useMemo(() => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    return {
      total: orders.length,
      pending,
      shipped,
      delivered
    };
  }, [orders]);

  const handleAddOrder = order => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Gestión de Pedidos - MailAméricas</h1>
      </header>
      <main className="dashboard__main">
        <section className="dashboard__left">
          <OrderForm onAdd={handleAddOrder} />
        </section>
        <section className="dashboard__center">
          <div className="dashboard__filters">
            <OrderFilter filter={filter} onChange={setFilter} />
          </div>
          <OrderList orders={filteredOrders} />
        </section>
        <section className="dashboard__right">
          <OrderStats {...stats} />
        </section>
      </main>
      <footer className="dashboard__footer">
        <span>TP10 - Gestión de Pedidos &copy; 2025</span>
      </footer>
    </div>
  );
}

export default App;
