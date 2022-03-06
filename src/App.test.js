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

it('should load the original webpage and clear any input', () => {
	let wrapper = mount(MainApp)
	let findh1 = wrapper.find('h1').length;
	expect(findh1).toBe(1);
})

describe('Clicking All Posts Button', () => {
	it('should show all the posts', () => {
		let wrapper = mount(MainApp)
		const AllBtnFind = findByCustomTag(wrapper, 'AllBtn');
		expect(AllBtnFind.length).toBe(2);
		// It receives two buttons - one from App and one from Button component

		AllBtnFind.at(0).simulate('click');
		// expect something
	})
})

describe('Clicking delete button', () => {
	it('should test delete when id present', () => {
		let wrapper = mount((
			<Provider store={store}>
				<App testId='5' />
			</Provider>
		))
		const DeleteBtnFind = findByCustomTag(wrapper, 'DeleteBtn');
		DeleteBtnFind.at(0).simulate('click');
		// expect something
	})

	it('should alert when delete and no ID present', () => {
		let wrapper = mount(MainApp)
		const DeleteBtnFind = findByCustomTag(wrapper, 'DeleteBtn');
		DeleteBtnFind.at(0).simulate('click');
		// expect something
	})
})

describe('Clicking Filter button', () => {
	it('should test filter when userId present', () => {
		let wrapper = mount((
			<Provider store={store}>
				<App testuserId='5' />
			</Provider>
		))
		const DeleteBtnFind = findByCustomTag(wrapper, 'FilterBtn');
		DeleteBtnFind.at(0).simulate('click');
		// expect something
	})

	it('should alert when filter and no userId present', () => {
		let wrapper = mount(MainApp)
		const DeleteBtnFind = findByCustomTag(wrapper, 'FilterBtn');
		DeleteBtnFind.at(0).simulate('click');
		// expect something
	})
})

describe('Clicking Add Update button', () => {
	it('should test add/update functionality', () => {
		let wrapper = mount((
			<Provider store={store}>
				<App testId = '1' testuserId = '1' testTitle = 'Test Update Title' testBody = 'Test Update Body' />
			</Provider>
		))
		const DeleteBtnFind = findByCustomTag(wrapper, 'AddUpdateBtn');
		DeleteBtnFind.at(0).simulate('click');
		// expect something
	})

	it('should alert when no data present', () => {
		let wrapper = mount(MainApp)
		const DeleteBtnFind = findByCustomTag(wrapper, 'AddUpdateBtn');
		DeleteBtnFind.at(0).simulate('click');
		// expect something
	})
})