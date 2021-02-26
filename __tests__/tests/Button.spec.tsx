
test('should be equal to 1', () => {
    expect(1).toBe(1)
  })
  import 'jsdom-global/register'; //at the top of file , even  , before importing react

import * as React from 'react';
import { mount, shallow } from 'enzyme';

test('hello world', () => {
  const wrapper = mount(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch('Hello Jest!');
});

/* test('hello world', () => {
  const wrapper = shallow(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch('Hello Jest!');
}); */

import MyComponent from '../../App';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<MyComponent />);
  
    expect(component).toMatchSnapshot();
  });
});