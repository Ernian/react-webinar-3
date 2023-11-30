/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = {}; // Корзина {code:{product,count}}
    this.state.isCartOpen = false;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    const product = this.state.list.find(product => product.code === code)
    if (!product) return

    if (!!this.state.cart[product.code]) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          [product.code]: {
            ...product,
            count: ++this.state.cart[product.code].count
          }
        }
      })
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          [product.code]: { ...product, count: 1 }
        }
      })
    }
  };

  /**
   * Возвращает общую стоимость товаров в корзине
   * @returns {number}
   */
  getTotalPrice() {
    return Object.values(this.state.cart)
      .reduce((totalPrice, product) => {
        totalPrice += product.price * product.count
        return totalPrice
      }, 0)
  }

  /**
   * Возвращает общее количество товаров в корзине
   * @returns {number}
   */
  getUniqueProductsCount() {
    return Object.keys(this.state.cart).length
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteProductFromCart(code) {
    const products = Object.entries(this.state.cart)
      .filter(([productCode, _]) => productCode !== code.toString())

    this.setState({
      ...this.state,
      cart: Object.fromEntries(products)
    })
  }

  /**
   * Открывает модальное окно корзины
   */
  openCart() {
    this.setState({
      ...this.state,
      isCartOpen: true
    })
  }

  /**
   * Закрывает модальное окно корзины
   */
  closeCart() {
    this.setState({
      ...this.state,
      isCartOpen: false
    })
  }
}

export default Store;