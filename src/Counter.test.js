import { React } from 'react';
import Counter from './Counter';
import { shallow } from 'enzyme';

describe('ConterTest', () => {

    let wrapper = null;
    test('Counter render collectly', () => {
        wrapper = shallow(<Counter />);
    })

    test('Counter snapshot', () => {
        expect(wrapper).toMatchSnapshot();

    });
})