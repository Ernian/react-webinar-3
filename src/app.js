import React from 'react';
import { createElement, getDeclination } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(({ code, title, selected, countOfSelections }) =>
            <div key={code} className='List-item'>
              <div className={'Item' + (selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(code)}>
                <div className='Item-code'>{code}</div>
                <div className='Item-title'>
                  {title}
                  {
                    countOfSelections &&
                    `| Выделяли ${countOfSelections} ${getDeclination(countOfSelections)}`
                  }
                </div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
