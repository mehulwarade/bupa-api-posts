import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount } from 'enzyme';

import store from './redux/store';

it('should load the original webpage', () => {
	//   let wrapper = mount(<App output={store.getState()} />);
	wrapper = shallow(<App state={store.getState()} />)
	//console.log(wrapper.debug());
	let findp = wrapper.find('h1').length;
	expect(findp).toBe(1);
})
