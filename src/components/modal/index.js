import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom'
import './style.css'

export function Modal({ isOpen, closeModal, children }) {
  useEffect(() => {
    const close = event => {
      if (event.code === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keyup', close)

    return () => {
      document.removeEventListener('keyup', close)
    }
  }, [])

  return (
    isOpen ?
      createPortal(
        <>
          <div className='overlay' />
          <div className='Modal'>
            {children}
          </div>
        </>
        ,
        document.getElementById('portal')
      )
      : null
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.node
}