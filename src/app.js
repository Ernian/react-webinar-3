import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { Modal } from "./components/modal";
import { Cart } from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const { list, isCartOpen, cart } = store.getState();

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    onDeleteFromCart: useCallback((code) => {
      store.deleteProductFromCart(code);
    }, [store]),
    onOpenCart: useCallback(() => {
      store.openCart(true);
    }, [store]),
    onCloseCart: useCallback(() => {
      store.closeCart(true);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        openCart={callbacks.onOpenCart}
        countOfProductsInCart={store.getUniqueProductsCount()}
        totalPrice={store.getTotalPrice()}
      />
      <List list={list} actionCallback={callbacks.onAddToCart} buttonText='Добавить' />
      <Modal
        isOpen={isCartOpen}
        closeModal={callbacks.onCloseCart}
      >
        <Cart
          list={Object.values(cart)}
          actionCallback={callbacks.onDeleteFromCart}
          totalPrice={store.getTotalPrice()}
          closeModal={callbacks.onCloseCart}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
