/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [] }) {
    this.state = initState;
    this.lastId = this.getMaxCode() + 1 || 1
    this.listeners = []; // Слушатели изменений состояния
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
 * Возвращает наибольший code элемента списка или null
 * @returns {number | null}
 */
  getMaxCode() {
    if (this.state.list.length) {
      return Math.max(...this.state.list.map(item => item.code))
    }
    return null
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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.lastId, title: 'Новая запись' }]
    })
    this.lastId++
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          //если элемент списка не был выделен - увеличиваем количество выделений
          if (!item.selected) {
            item.countOfSelections = item.countOfSelections ?
              item.countOfSelections + 1 : 1
          }

          item.selected = !item.selected;
        } else {
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
