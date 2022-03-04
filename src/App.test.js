import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount } from 'enzyme';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

window.alert = jest.fn();

let MainApp = (
<Provider store={store}>
	<App />
</Provider>
)

const findByCustomTag = (MainApp, attr) => {
    const wrapper = MainApp.find(`[testTag='${attr}']`);
    return wrapper;
}

it('should load the original webpage', () => {
	let wrapper = mount(MainApp)
	let findh1 = wrapper.find('h1').length;
	expect(findh1).toBe(1);
})

describe('Clicking buttons', ()=> {
	it('should click All Posts button', () => {
		let wrapper = mount(MainApp)
		const AllBtnFind = findByCustomTag(wrapper, 'AllBtn');
		// console.log(AllBtnFind.at(0).debug());
		expect(AllBtnFind.length).toBe(2); // It receives two buttons - one from App and one from Button component
	
		AllBtnFind.at(0).simulate('click');
		// expect something
	})

	it('should click Delete button', () => {
		let wrapper = mount(MainApp)
		const DeleteBtnFind = findByCustomTag(wrapper, 'DeleteBtn');
		expect(DeleteBtnFind.length).toBe(2); // It receives two buttons - one from App and one from Button component

		const InputTextIDFind = findByCustomTag(wrapper, 'InputID');
		// InputTextIDFind.simulate('change', {target: {value: 1}});
		// console.log(InputTextIDFind.debug());
		// wrapper.InputID = 1;
		// console.log(wrapper.InputID);
		// console.log(InputTextIDFind.debug());
		// InputTextIDFind.value = 1;
    	// InputTextIDFind.simulate('change');
		// 
		DeleteBtnFind.at(0).simulate('click');
		// expect something
	})

})

