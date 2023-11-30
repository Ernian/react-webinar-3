import React from "react";
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ openCart, countOfProductsInCart, totalPrice }) {
  const productsPlural = plural(countOfProductsInCart,
    {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    })

  return (
    <div className='Controls'>
      <div className="Controls-info">
        В корзине:
        {
          countOfProductsInCart ?
            <span> {countOfProductsInCart} {productsPlural} / {totalPrice}&#8381;</span> :
            <span> пусто</span>
        }
      </div>
      <button onClick={openCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  countOfProductsInCart: PropTypes.number,
  totalPrice: PropTypes.number
};

Controls.defaultProps = {
  onClickAction: () => { },
  countOfProductsInCart: 0,
  totalPrice: 0
}

export default React.memo(Controls);
