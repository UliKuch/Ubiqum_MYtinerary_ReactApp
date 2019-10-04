import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';

    it('Landing component should render without crashing', () => {
        shallow(<Landing />);
    });

it('Landing component snapshot', () => {
    const wrapper = shallow(<Landing />);

    expect(wrapper.debug()).toMatchSnapshot();
});