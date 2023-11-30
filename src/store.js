/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = {}; // Корзина {code:{product,count}}
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

    if (this.isProductInCart(product.code)) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          [product.code]: {
            product,
            count: ++this.state.cart[product.code].count
          }
        }
      })
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          [product.code]: { product, count: 1 }
        }
      })
    }
  };

  /**
  * Проверяет находится ли товар в корзине
  * @param code
  * @returns {boolean}
  */
  isProductInCart(code) {
    return Object.keys(this.state.cart).includes(code.toString())
  }

  /**
   * Возвращает общую стоимость товаров в корзине
   * @returns {number}
   */
  getTotalPrice() {
    return Object.values(this.state.cart)
      .reduce((totalPrice, { product, count }) => {
        totalPrice += product.price * count
        return totalPrice
      }, 0)
  }

  /**
   * Возвращает общее количество товаров в корзине
   * @returns {number}
   */
  getTotalCount() {
    return Object.values(this.state.cart)
      .reduce((totalCount, { count }) => {
        totalCount += count
        return totalCount
      }, 0)
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteProductFromCart(code) {
    const products = Object.entries(this.state.cart)
      .filter(([productCode, _]) => productCode !== code)

    this.setState({
      ...this.state,
      cart: Object.fromEntries(products)
    })
  }
}

export default Store;