const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Возвращает склонение, соответствующее переданному числу
 * @param n {number}
 * @returns {string} раз/раза
 */

export function getDeclination(n) {
  const declination = ['раз', 'раза']
  if (n > 1 && n < 5) return declination[1]
  if (
    (n > 20 && n < 30) &&
    (n % 10) > 1 &&
    (n % 10) < 5) {
    return declination[1]
  }
  if (n > 30) return '(╯°□°）╯︵ ┻━┻)'
  return declination[0]
}