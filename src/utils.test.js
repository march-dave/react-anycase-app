import { sortAlphabetize } from './sort';

describe('Alphabetics Array Object return sort by object property name ascending', () => {
  it('it should matching array object return', () => {
    const listItems = [{ title: 'bbc' }, { title: 'abc' }, { title: 'cbc' }, { title: 'cbc' }];
    const expectedItem = [{ title: 'abc' }, { title: 'bbc' }, { title: 'cbc' }, { title: 'cbc' }];
    const response = sortAlphabetize(listItems, 'title', true);

    expect(response).toEqual(expectedItem);
  });

  it('it should matching Array Object return sort by property name descending ', () => {
    const listItems = [{ title: 'bbc' }, { title: 'abc' }, { title: 'cbc' }, { title: 'cbc' }];
    const expectedItem = [{ title: 'cbc' }, { title: 'cbc' }, { title: 'bbc' }, { title: 'abc' }];
    const response = sortAlphabetize(listItems, 'title', false);

    expect(response).toEqual(expectedItem);
  });

  it('it should matching Array return sort by ascending', () => {
    const listItems = ['bbc', 'abc', 'cbc', 'cbc'];
    const expectedItem = ['abc', 'bbc', 'cbc', 'cbc'];

    const response = sortAlphabetize(listItems, '', true);

    expect(response).toEqual(expectedItem);
  });

  it('it should matching Array return by descending', () => {
    const listItems = ['bbc', 'abc', 'cbc', 'cbc'];
    const expectedItem = ['cbc', 'cbc', 'bbc', 'abc'];

    const response = sortAlphabetize(listItems, '', false);

    expect(response).toEqual(expectedItem);
  });
});