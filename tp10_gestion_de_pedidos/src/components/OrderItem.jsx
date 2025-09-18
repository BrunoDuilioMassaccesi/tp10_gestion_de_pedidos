import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import '../styles/OrderItem.css';

function OrderItem({ id, customer, items, status, date }) {
  return (
    <div className={`order-item order-item--${status}`}>
      <div className="order-item__header">
        <span className="order-item__id">#{id}</span>
        <span className="order-item__customer">Cliente: {customer}</span>
        <span className="order-item__date">{format(new Date(date), 'dd/MM/yyyy')}</span>
        <span className={`order-item__status order-item__status--${status}`}>{status}</span>
      </div>
      <div className="order-item__products">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  customer: function(props, propName, componentName) {
    if (!props[propName] || typeof props[propName] !== 'string' || props[propName].length < 3) {
      return new Error(`Prop '${propName}' in '${componentName}' debe ser un string de al menos 3 caracteres.`);
    }
  },
  items: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: function(props, propName, componentName) {
      if (typeof props[propName] !== 'number' || props[propName] <= 0) {
        return new Error(`Prop '${propName}' en '${componentName}' debe ser un número mayor a 0.`);
      }
    },
    price: PropTypes.number.isRequired
  })).isRequired,
  status: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
  date: PropTypes.instanceOf(Date)
};

OrderItem.defaultProps = {
  status: 'pending',
  date: new Date()
};

export default OrderItem;
