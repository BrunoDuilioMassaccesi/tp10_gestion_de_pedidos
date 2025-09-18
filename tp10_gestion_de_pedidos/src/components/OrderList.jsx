import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import '../styles/OrderList.css';

function OrderList({ orders }) {
  return (
    <div className="order-list">
      {orders.length === 0 ? (
        <div className="order-list__empty">No hay pedidos para mostrar.</div>
      ) : (
        orders.map(order => <OrderItem key={order.id} {...order} />)
      )}
    </div>
  );
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    status: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
    date: PropTypes.instanceOf(Date)
  })).isRequired
};

export default OrderList;
