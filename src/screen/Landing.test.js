import React from 'react';
import { shallow } from 'enzyme';
import { Landing } from './Landing';
import toJson from 'enzyme-to-json';


it('Landing component should render without crashing', () => {

    const match = { params: { token: "" } };
    const cities = [{}];
    const isFetching = false;

    shallow(<Landing match={match} cities={cities} isFetching={isFetching} />);
});

it('Landing component snapshot', () => {
    const match = { params: { token: "" } };
    const cities = [{}];
    const isFetching = false;

    const wrapper = shallow(<Landing match={match} cities={cities} isFetching={isFetching} />);

    expect(toJson(wrapper)).toMatchSnapshot();
});