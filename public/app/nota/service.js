import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, compose, pipe } from '../utils/operators.js';
import '../utils/array-helpers.js';
import Maybe from '../utils/Maybe.js';

const API_URL = 'http://localhost:3000/notas';

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo === code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((acc, cur) => acc + cur.valor, 0));

// eslint-disable-next-line import/prefer-default-export
export const notasService = {
  listAll() {
    return fetch(API_URL)
      .then(res => handleStatus(res))
      .then(notas => Maybe.of(notas))
      .catch((err) => {
        console.log(err);
        Promise.reject('Não foi possível obter as notas.');
      });
  },
  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);

    return this
      .listAll()
      .then((notasM) => {
        return pipe(getItemsFromNotas, filterItems, sumItemsValue)(notasM);
      })
      .then(resultM => resultM.getOrElse('0'));
  },
};
