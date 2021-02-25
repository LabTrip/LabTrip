
test('should be equal to 1', () => {
    expect(1).toBe(1)
  })

import React from 'react';
import { mount, shallow } from './enzyme';

test('hello world', () => {
  const wrapper = mount(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch('Hello Jest!');
});

test('hello world', () => {
  const wrapper = shallow(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch('Hello Jest!');
});