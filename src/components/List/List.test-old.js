import List from './List';
import { mount } from 'enzyme';

// Redux
import { Provider } from 'react-redux';
import store from '../../redux/store';

it('should return a table with all the data', () => {
	//   let wrapper = mount(<App output={store.getState()} />);
	let wrapper = mount(<List store={store} />)
	console.log(wrapper.debug());
	// let findp = wrapper.find('h1').length;
	// expect(findp).toBe(1);
})
