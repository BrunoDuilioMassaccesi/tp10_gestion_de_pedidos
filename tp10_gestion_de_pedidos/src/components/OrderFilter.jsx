import React from 'react';
import PropTypes from 'prop-types';
import '../styles/OrderFilter.css';

function OrderFilter({ filter, onChange }) {
  return (
    <div className="order-filter">
      <label htmlFor="order-filter-select">Filtrar por estado:</label>
      <select
        id="order-filter-select"
        value={filter}
        onChange={e => onChange(e.target.value)}
        className="order-filter__select"
      >
        <option value="">Todos</option>
        <option value="pending">Pendiente</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
      </select>
    </div>
  );
}

OrderFilter.propTypes = {
  filter: PropTypes.oneOf(['', 'pending', 'shipped', 'delivered']).isRequired,
  onChange: PropTypes.func.isRequired
};

export default OrderFilter;
