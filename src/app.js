import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { Modal } from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const { list, isCartOpen } = store.getState();

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
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
      <Head title='Приложение на чистом JS' />
      <Controls
        openCart={callbacks.onOpenCart}
        countOfProductsInCart={store.getUniqueProductsCount()}
        totalPrice={store.getTotalPrice()}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      <Modal
        isOpen={isCartOpen}
        closeModal={callbacks.onCloseCart}
      >
        Modal
      </Modal>
    </PageLayout>
  );
}

export default App;
