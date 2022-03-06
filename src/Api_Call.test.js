import * as API from './Api_Call';

window.alert = jest.fn();

const SUCCESS_API_URL = `https://jsonplaceholder.typicode.com/posts`;
const ERROR_API_URL = `https://jsonplaceholder.typicode.com/pos`

describe('Testing API to get default list', () => {
	it('should make API call: SUCCESS: API_GET_DEFAULT_LIST', async () => {
		const GetDefaultListApiCallTest = await API.API_GET_DEFAULT_LIST({ API_URL: SUCCESS_API_URL });
		expect(GetDefaultListApiCallTest).toEqual(true);
	})

	it('should make API call: ERROR: API_GET_DEFAULT_LIST', async () => {
		const GetDefaultListApiCallTest = await API.API_GET_DEFAULT_LIST({ API_URL: ERROR_API_URL });
		expect(GetDefaultListApiCallTest).toEqual(false);
	})
})

describe('Testing the Add Update API call', () => {
	it('should make API call: SUCCESS: UPDATE', async () => {
		let props = {
			API_URL: SUCCESS_API_URL,
			id: 1,
			userId: 1,
			title: 'Test Update Title',
			body: 'Test Update Body'
		}
		const UpdateListApiCallTest = await API.API_ADD_UPDATE_LIST(props);
		expect(UpdateListApiCallTest).toEqual(true);
	})

	it('should make API call: SUCCESS: ADD', async () => {
		let props = {
			API_URL: SUCCESS_API_URL,
			id: 0,
			userId: 1,
			title: 'Test Add Title',
			body: 'Test Add Body'
		}
		const AddListApiCallTest = await API.API_ADD_UPDATE_LIST(props);
		expect(AddListApiCallTest).toEqual(true);
	})

	it('should make API call: ERROR: UPDATE', async () => {
		let props = {
			API_URL: ERROR_API_URL,
			id: 1,
			userId: 1,
			title: 'Test Update Title',
			body: 'Test Update Body'
		}
		const UpdateListApiCallTest = await API.API_ADD_UPDATE_LIST(props);
		expect(UpdateListApiCallTest).toEqual(false);
	})

	it('should make API call: ERROR: ADD', async () => {
		let props = {
			API_URL: ERROR_API_URL,
			id: 0,
			userId: 1,
			title: 'Test Add Title',
			body: 'Test Add Body'
		}
		const AddListApiCallTest = await API.API_ADD_UPDATE_LIST(props);
		expect(AddListApiCallTest).toEqual(false);
	})
})
describe('Testing the Filter API call', () => {
	it('should make API call: SUCCESS: API_FILTER_LIST', async () => {
		let props = {
			API_URL: SUCCESS_API_URL,
			userId: 1
		}
		const FilterListApiCallTest = await API.API_FILTER_LIST(props);
		expect(FilterListApiCallTest).toEqual(true);
	})

	it('should make API call: ERROR: API_FILTER_LIST', async () => {
		let props = {
			API_URL: ERROR_API_URL,
			userId: 1
		}
		const FilterListApiCallTest = await API.API_FILTER_LIST(props);
		expect(FilterListApiCallTest).toEqual(false);
	})
})

describe('Testing the Add Delete API call', () => {
	it('should make API call: SUCCESS: API_DELETE_LIST', async () => {
		let props = {
			API_URL: SUCCESS_API_URL,
			id: 1
		}
		const DeleteListApiCallTest = await API.API_DELETE_LIST(props);
		expect(DeleteListApiCallTest).toEqual(true);
	})

	it('should make API call: ERROR: API_DELETE_LIST', async () => {
		let props = {
			API_URL: ERROR_API_URL,
			id: 1
		}
		const DeleteListApiCallTest = await API.API_DELETE_LIST(props);
		expect(DeleteListApiCallTest).toEqual(false);
	})
})

it('should make API call: API_GET_CURRENT_LIST', async () => {
	let id = 1;
	const GetCurrentListApiCallTest = await API.API_GET_CURRENT_LIST();
	expect(GetCurrentListApiCallTest).toEqual(true);
})