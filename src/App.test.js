import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount } from 'enzyme';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

let mainApp = (
<Provider store={store}>
	<App />
</Provider>
)

it('should load the original webpage', () => {
	//   let wrapper = mount(<App output={store.getState()} />);
	let wrapper = mount(mainApp)
	//console.log(wrapper.debug());
	let findp = wrapper.find('h1').length;
	expect(findp).toBe(1);
})
 