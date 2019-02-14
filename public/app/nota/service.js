import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, compose, pipe } from '../utils/operators.js';
import '../utils/array-helpers.js';

const API_URL = 'http://localhost:3000/notas';

// const sumItems = code => notas => notas
//   .$flatMap(nota => nota.itens)
//   .filter(item => item.codigo === code)
//   .reduce((acc, cur) => acc + cur.valor, 0);

const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItemsByCode = (code, items) => items.filter(item => item.codigo === code);
const sumItemsValue = items => items.reduce((acc, cur) => acc + cur.valor, 0);

// eslint-disable-next-line import/prefer-default-export
export const notasService = {
  listAll() {
    return fetch(API_URL)
      .then(res => handleStatus(res))
      .catch((err) => {
        console.log(err);
        Promise.reject('Não foi possível obter as notas.');
      });
  },
  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);

    return this
      .listAll()
      .then((notas) => {
        // return sumItemsValue(filterItems(getItemsFromNotas(notas)));
        // return compose(sumItemsValue, filterItems, getItemsFromNotas)(notas);
        return pipe(getItemsFromNotas, filterItems, sumItemsValue)(notas);
      });
  },
};
