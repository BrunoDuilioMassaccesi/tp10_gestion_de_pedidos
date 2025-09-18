import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/OrderForm.css';

const initialProduct = { productId: '', name: '', quantity: 1, price: 0 };

function OrderForm({ onAdd }) {
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState([{ ...initialProduct }]);
  const [status, setStatus] = useState('pending');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');

  const handleItemChange = (idx, field, value) => {
    const newItems = items.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  const addProduct = () => setItems([...items, { ...initialProduct }]);
  const removeProduct = idx => setItems(items.filter((_, i) => i !== idx));

  const validate = () => {
    if (customer.length < 3) return 'El cliente debe tener al menos 3 caracteres.';
    for (const item of items) {
      if (!item.name || item.quantity <= 0 || item.price < 0) {
        return 'Todos los productos deben tener nombre, cantidad (>0) y precio válido.';
      }
    }
    return '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    onAdd({
      id: Date.now(),
      customer,
      items: items.map(item => ({
        ...item,
        productId: Math.floor(Math.random() * 100000)
      })),
      status,
      date: new Date(date)
    });
    setCustomer('');
    setItems([{ ...initialProduct }]);
    setStatus('pending');
    setDate(new Date().toISOString().slice(0, 10));
    setError('');
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Nuevo Pedido</h3>
      {error && <div className="order-form__error">{error}</div>}
      <label>
        Cliente:
        <input type="text" value={customer} onChange={e => setCustomer(e.target.value)} required minLength={3} />
      </label>
      <label>
        Fecha:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </label>
      <label>
        Estado:
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pendiente</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregado</option>
        </select>
      </label>
      <div className="order-form__products">
        <h4>Productos</h4>
        {items.map((item, idx) => (
          <div className="order-form__product" key={idx}>
            <input
              type="text"
              placeholder="Nombre"
              value={item.name}
              onChange={e => handleItemChange(idx, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={item.quantity}
              min={1}
              onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={item.price}
              min={0}
              step={0.01}
              onChange={e => handleItemChange(idx, 'price', Number(e.target.value))}
              required
            />
            {items.length > 1 && (
              <button type="button" onClick={() => removeProduct(idx)} className="order-form__remove">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addProduct} className="order-form__add">Agregar producto</button>
      </div>
      <button type="submit" className="order-form__submit">Agregar Pedido</button>
    </form>
  );
}

OrderForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default OrderForm;
