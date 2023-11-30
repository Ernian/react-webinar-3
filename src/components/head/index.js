import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, closeModal }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {
        title === 'Корзина' &&
        <button onClick={closeModal}>Закрыть</button>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func
};

Head.defaultProps = {
  title: 'Заголовок не задан',
  closeModal: () => { }
}

export default React.memo(Head);
