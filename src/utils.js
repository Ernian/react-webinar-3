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
 * @param declinations {Array<string>} ['яблоко', 'яблок', 'яблока']
 * @returns {string}
 */

export function getDeclination(count = 0, declinations = ['раз', 'раз', 'раза']) {
  if (
    count.toString().endsWith('11') ||
    count.toString().endsWith('12') ||
    count.toString().endsWith('13') ||
    count.toString().endsWith('14')
  ) {
    return declinations[1]
  }
  if (count.toString().endsWith('1')) {
    return declinations[0]
  }
  if (
    count.toString().endsWith('2') ||
    count.toString().endsWith('3') ||
    count.toString().endsWith('4')
  ) {
    return declinations[2]
  }
  return declinations[1]
}