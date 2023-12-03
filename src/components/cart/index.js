import React from 'react'
import PropTypes from 'prop-types'
import Head from '../head'
import List from '../list'
import './style.css'

export function Cart({ list, actionCallback, totalPrice, closeModal }) {
  return (
    <div className='Cart'>
      <Head title='Корзина' closeModal={closeModal} />
      {
        list.length > 0 ?
          <>
            <List
              list={list}
              actionCallback={actionCallback}
              buttonText='Удалить'
            />
            <div className='Cart-total'>
              <span>Итого</span>
              <span>{totalPrice.toLocaleString('ru')}&#8381;</span>
            </div>
          </>
          :
          <div className='Cart__empty'>
            Нет добавленных товаров
          </div>
      }
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.array,
  actionCallback: PropTypes.func,
  totalPrice: PropTypes.number,
  closeModal: PropTypes.func
}