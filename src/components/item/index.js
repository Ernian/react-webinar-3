import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onButtonClick: () => {
      props.actionCallback(props.item.code);
    }
  }

  return (
    <div className='Item' >
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      {
        props.item.count &&
        <div className='Item-info'>
          <span>{props.item.price.toLocaleString('ru')} &#8381;</span>
          <span>{props.item.count} шт</span>
        </div>
      }
      <div className='Item-actions'>
        <button onClick={callbacks.onButtonClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddToCart: () => { },
}

export default React.memo(Item);