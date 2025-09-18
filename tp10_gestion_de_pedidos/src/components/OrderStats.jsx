import React from 'react';
import PropTypes from 'prop-types';
import '../styles/OrderStats.css';

function OrderStats({ total, pending, shipped, delivered }) {
  return (
    <div className="order-stats">
      <h3>Estadísticas de Pedidos</h3>
      <ul>
        <li>Total: <span>{total}</span></li>
        <li>Pendientes: <span>{pending}</span></li>
        <li>Enviados: <span>{shipped}</span></li>
        <li>Entregados: <span>{delivered}</span></li>
      </ul>
    </div>
  );
}

OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired
};

export default OrderStats;




