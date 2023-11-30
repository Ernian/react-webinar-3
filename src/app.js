import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS' />
      <Controls
        openModal={callbacks.toDo}
        countOfProductsInCart={store.getUniqueProductsCount()}
        totalPrice={store.getTotalPrice()}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
    </PageLayout>
  );
}

export default App;
