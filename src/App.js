import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import languages from './languages';

function App() {
	const [users, setUsers] = useState([]);
	const [bannerMessage, setBannerMessage] = useState(null);
	const [params, setParams] = useState({
		minSalary: 0,
		maxSalary: 4000,
		offset: 0,
		limit: 30,
		sort: '+name',
	});
	const [selectedItem, setSelectedItem] = useState({});

	const uploadCSV = (e) => {
		const formData = new FormData();
		formData.append('file', e.target.files[0], e.target.files[0].name);
		axios
			.post('http://localhost:5527/users/upload', formData)
			.then((res) => {
				console.log(res.data.message);
				setBannerMessage(res.data.message);
				setTimeout(() => window.location.reload(), 3000);
			})
			.catch((err) => {
				console.log(err);
				setBannerMessage('Error: ' + JSON.stringify(err.message));
				setTimeout(() => window.location.reload(), 3000);
			});
	};

	const getUser = (search) => {
		console.log(search);
		axios
			.get('http://localhost:5527/users/' + search, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				console.log(res);
				setSelectedItem({
					id: res.data[0].id,
					login: res.data[0].login,
					name: res.data[0].name,
					salary: res.data[0].salary,
					type: 'GET',
				});
			})
			.catch((err) => {
				console.log(err);
				setBannerMessage('Error: ' + JSON.stringify(err.message));
				setTimeout(() => window.location.reload(), 3000);
			});
	};

	const deleteUser = (id) => {
		axios
			.delete('http://localhost:5527/users/' + id, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				console.log(res);
				setSelectedItem({});
				setBannerMessage('User ' + id + ' successfully deleted');
				setTimeout(() => window.location.reload(), 3000);
			})
			.catch((err) => {
				console.log(err);
				setBannerMessage('Error: ' + JSON.stringify(err.message));
				setTimeout(() => window.location.reload(), 3000);
			});
	};

	const createUser = () => {
		const formData = new FormData();
		formData.append('login', selectedItem.login);
		formData.append('name', selectedItem.name);
		formData.append('salary', selectedItem.salary);
		axios
			.post('http://localhost:5527/users/' + selectedItem.id, formData, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				console.log(res);
				setBannerMessage('User ' + selectedItem.id + ' successfully updated');
				setSelectedItem({});
				setTimeout(() => window.location.reload(), 3000);
			})
			.catch((err) => {
				console.log(err);
				setBannerMessage('Error: ' + JSON.stringify(err.message));
				setTimeout(() => window.location.reload(), 3000);
			});
	};

	const updateUser = () => {
		const formData = new FormData();
		formData.append('login', selectedItem.login);
		formData.append('name', selectedItem.name);
		formData.append('salary', selectedItem.salary);
		axios
			.patch('http://localhost:5527/users/' + selectedItem.id, formData, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				console.log(res);
				setBannerMessage('User ' + selectedItem.id + ' successfully updated');
				setSelectedItem({});
				setTimeout(() => window.location.reload(), 3000);
			})
			.catch((err) => {
				console.log(err);
				setBannerMessage('Error: ' + JSON.stringify(err.message));
				setTimeout(() => window.location.reload(), 3000);
			});
	};

	const Notifications = () => {
		if (bannerMessage == null) return null;
		if (bannerMessage.includes('Error: ')) {
			return (
				<div className='alert-banner flex flex-wrap -px-32 py-2'>
					<input type='checkbox' className='hidden' id='banneralert' />

					<label
						className='close cursor-pointer flex items-center justify-between w-full p-2 bg-red-500 shadow text-white'
						title='close'
						htmlFor='banneralert'>
						{bannerMessage}
						<svg
							onClick={() => window.location.reload()}
							className='fill-current text-white'
							xmlns='http://www.w3.org/2000/svg'
							width='18'
							height='18'
							viewBox='0 0 18 18'>
							<path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
						</svg>
					</label>
				</div>
			);
		}
		if (bannerMessage) {
			return (
				<div className='alert-banner flex flex-wrap -px-32 py-2'>
					<input type='checkbox' className='hidden' id='banneralert' />

					<label
						className='close cursor-pointer flex items-center justify-between w-full p-2 bg-blue-500 shadow text-white'
						title='close'
						htmlFor='banneralert'>
						{bannerMessage}
						<svg
							onClick={() => window.location.reload()}
							className='fill-current text-white'
							xmlns='http://www.w3.org/2000/svg'
							width='18'
							height='18'
							viewBox='0 0 18 18'>
							<path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
						</svg>
					</label>
				</div>
			);
		}
	};

	const Modal = () => {
		console.log(selectedItem);
		if (selectedItem.type === 'GET') {
			return (
				<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
					<div className='relative w-auto my-6 mx-auto max-w-3xl'>
						{/*content*/}
						<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
							{/*header*/}
							<div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
								<h3 className='text-3xl font-semibold'>{selectedItem.id}</h3>
								<button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'>
									<span
										className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'
										onClick={(e) => setSelectedItem({})}>
										×
									</span>
								</button>
							</div>
							{/*body*/}
							<div className='relative p-6 flex-auto'>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedLogin'>
										Login
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedLogin'
										type='text'
										value={selectedItem.login}
										disabled
									/>
								</div>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedName'>
										Name
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedName'
										type='text'
										value={selectedItem.name}
										disabled
									/>
								</div>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedSalary'>
										Salary ($)
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedSalary'
										type='text'
										value={selectedItem.salary}
										disabled
									/>
								</div>
							</div>
							{/*footer*/}
							<div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
								<button
									className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
									type='button'
									style={{ transition: 'all .15s ease' }}
									onClick={(e) => setSelectedItem({})}>
									Close
								</button>
								<button
									className='bg-gray-500 text-white active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
									type='button'
									style={{ transition: 'all .15s ease' }}
									disabled>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (selectedItem.type === 'CREATE') {
			return (
				<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
					<div className='relative w-auto my-6 mx-auto max-w-3xl'>
						{/*content*/}
						<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
							{/*header*/}
							<div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
								<h3 className='text-3xl font-semibold'>Create user</h3>
								<button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'>
									<span
										className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'
										onClick={(e) => setSelectedItem({})}>
										×
									</span>
								</button>
							</div>
							{/*body*/}
							<div className='relative p-6 flex-auto'>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedId'>
										ID
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedId'
										type='text'
										value={selectedItem.id}
										onChange={(e) =>
											setSelectedItem({
												...selectedItem,
												id: e.target.value,
												autofocus: 0,
											})
										}
										ref={(input) =>
											selectedItem.autofocus === 0
												? input && input.focus()
												: input
										}
									/>
								</div>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedLogin'>
										Login
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedLogin'
										type='text'
										value={selectedItem.login}
										onChange={(e) =>
											setSelectedItem({
												...selectedItem,
												login: e.target.value,
												autofocus: 1,
											})
										}
										ref={(input) =>
											selectedItem.autofocus === 1
												? input && input.focus()
												: input
										}
									/>
								</div>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedName'>
										Name
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedName'
										type='text'
										value={selectedItem.name}
										onChange={(e) =>
											setSelectedItem({
												...selectedItem,
												name: e.target.value,
												autofocus: 2,
											})
										}
										ref={(input) =>
											selectedItem.autofocus === 2
												? input && input.focus()
												: input
										}
									/>
								</div>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedSalary'>
										Salary ($)
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedSalary'
										type='text'
										value={selectedItem.salary}
										onChange={(e) =>
											setSelectedItem({
												...selectedItem,
												salary: e.target.value,
												autofocus: 3,
											})
										}
										ref={(input) =>
											selectedItem.autofocus === 3
												? input && input.focus()
												: input
										}
									/>
								</div>
							</div>
							{/*footer*/}
							<div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
								<button
									className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
									type='button'
									style={{ transition: 'all .15s ease' }}
									onClick={(e) => setSelectedItem({})}>
									Close
								</button>
								<button
									className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
									type='button'
									style={{ transition: 'all .15s ease' }}
									onClick={createUser}>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (selectedItem.type === 'EDIT') {
			return (
				<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
					<div className='relative w-auto my-6 mx-auto max-w-3xl'>
						{/*content*/}
						<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
							{/*header*/}
							<div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
								<h3 className='text-3xl font-semibold'>{selectedItem.id}</h3>
								<button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'>
									<span
										className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'
										onClick={(e) => setSelectedItem({})}>
										×
									</span>
								</button>
							</div>
							{/*body*/}
							<div className='relative p-6 flex-auto'>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedLogin'>
										Login
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedLogin'
										type='text'
										value={selectedItem.login}
										onChange={(e) =>
											setSelectedItem({
												...selectedItem,
												login: e.target.value,
												autofocus: 1,
											})
										}
										ref={(input) =>
											selectedItem.autofocus === 1
												? input && input.focus()
												: input
										}
									/>
								</div>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedName'>
										Name
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedName'
										type='text'
										value={selectedItem.name}
										onChange={(e) =>
											setSelectedItem({
												...selectedItem,
												name: e.target.value,
												autofocus: 2,
											})
										}
										ref={(input) =>
											selectedItem.autofocus === 2
												? input && input.focus()
												: input
										}
									/>
								</div>
								<div className='w-full pr-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										htmlFor='selectedSalary'>
										Salary ($)
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='selectedSalary'
										type='text'
										value={selectedItem.salary}
										onChange={(e) =>
											setSelectedItem({
												...selectedItem,
												salary: e.target.value,
												autofocus: 3,
											})
										}
										ref={(input) =>
											selectedItem.autofocus === 3
												? input && input.focus()
												: input
										}
									/>
								</div>
							</div>
							{/*footer*/}
							<div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
								<button
									className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
									type='button'
									style={{ transition: 'all .15s ease' }}
									onClick={(e) => setSelectedItem({})}>
									Close
								</button>
								<button
									className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
									type='button'
									style={{ transition: 'all .15s ease' }}
									onClick={updateUser}>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (selectedItem.type === 'DELETE') {
			return (
				<div className='fixed z-10 inset-0 overflow-y-auto'>
					<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
						<div className='fixed inset-0 transition-opacity'>
							<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
						</div>
						<span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
						&#8203;
						<div
							className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
							role='dialog'
							aria-modal='true'
							aria-labelledby='modal-headline'>
							<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
								<div className='sm:flex sm:items-start'>
									<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
										<svg
											className='h-6 w-6 text-red-600'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
											/>
										</svg>
									</div>
									<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
										<h3
											className='text-lg leading-6 font-medium text-gray-900'
											id='modal-headline'>
											Delete User
										</h3>
										<div className='mt-2'>
											<p className='text-sm leading-5 text-gray-500'>
												Are you sure you want to delete this user? All of your
												data will be permanently removed. This action cannot be
												undone.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
								<span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
									<button
										type='button'
										className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5'
										onClick={() => deleteUser(selectedItem.id)}>
										Delete
									</button>
								</span>
								<span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
									<button
										type='button'
										className='inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
										onClick={(e) => setSelectedItem({})}>
										Cancel
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
			);
		} else return null;
	};

	const BottomNavigation = () => {
		return (
			<div className='relative py-4 inline-flex float-right shadow-sm'>
				<div
					className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150'
					aria-label='Previous'>
					<svg
						className='h-5 w-5'
						viewBox='0 0 20 20'
						fill='currentColor'
						onClick={(e) => {
							let temp = params.offset - 30;
							if (temp < 0) temp = 0;
							setParams({ ...params, offset: temp });
						}}>
						<path
							fillRule='evenodd'
							d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</div>
				<div
					className='-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150'
					aria-label='Next'>
					<svg
						className='h-5 w-5'
						viewBox='0 0 20 20'
						fill='currentColor'
						onClick={(e) => {
							let temp = params.offset + 30;
							if (users.length < 30) temp = temp - 30;
							setParams({ ...params, offset: temp });
						}}>
						<path
							fillRule='evenodd'
							d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</div>
			</div>
		);
	};

	useEffect(() => {
		axios
			.get('http://localhost:5527/users/', {
				params: params,
			})
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [params]);

	return (
		<div className='container mx-auto'>
			<Modal />
			<Notifications />
			<form>
				<div className='flex flex-wrap -px-32 py-2'>
					<div className='w-full md:w-2/6 pr-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='minimumSalary'>
							{languages.minimumSalary}
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='minimumSalary'
							type='text'
							value={params.minSalary}
							onChange={(e) =>
								setParams({ ...params, minSalary: e.target.value })
							}
						/>
					</div>
					<div className='w-full md:w-2/6 pr-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='maximumSalary'>
							{languages.maximumSalary}
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='maximumSalary'
							type='text'
							value={params.maxSalary}
							onChange={(e) =>
								setParams({ ...params, maxSalary: e.target.value })
							}
						/>
					</div>
					<div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='sortBy'>
							{languages.sortBy}
						</label>
						<div>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='sortBy'
								value={params.sort.substring(1)}
								onChange={(e) => {
									let temp = '';
									if (params.sort.substring(0, 1) !== '-') temp = '+';
									else temp = '-';
									console.log(temp);
									setParams({
										...params,
										sort: temp + e.target.value,
									});
								}}>
								<option>{languages.id}</option>
								<option>{languages.login}</option>
								<option>{languages.name}</option>
								<option>{languages.salary}</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>
					<div className='w-full md:w-1/6 px-3 mb-6 md:mb-0'>
						<div className='relative inline-block w-20 mr-2 align-middle select-none transition duration-200 ease-in'>
							<label
								htmlFor='toggle'
								className='block uppercase tracking-wide pb-2 text-gray-700 text-xs font-bold mb-2'>
								{languages.orderBy}
							</label>
							<input
								type='checkbox'
								name='toggle'
								id='toggle'
								checked={params.sort.substring(0, 1) !== '-' ? 'checked' : ''}
								onChange={(e) => {
									let temp = '';
									if (e.target.checked === false) temp = '-';
									else temp = '+';
									setParams({
										...params,
										sort: temp + params.sort.substring(1),
									});
								}}
								className='toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer'
							/>
							<label
								htmlFor='toggle'
								className='toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer'></label>
						</div>
					</div>
				</div>
			</form>
			<div className='flex w-full bg-grey-lighter'>
				<label className='w-40 flex flex-row justify-evenly flex-column px-2 py-1 bg-white text-blue-600 rounded-lg tracking-wide uppercase border border-blue-200 cursor-pointer hover:bg-blue-600 hover:text-white'>
					<svg
						className='w-8 h-8'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'>
						<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
					</svg>
					<span className='mt-2 text-xs leading-normal'>Select a file</span>
					<input type='file' className='hidden' onChange={uploadCSV} />
				</label>
				<button
					className=' mx-10 px-4 py-1 border-blue-200 border text-blue-600 rounded-lg transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none text-xs leading-normal'
					onClick={() => setSelectedItem({ type: 'CREATE' })}>
					Add New User
				</button>
			</div>
			<div className='-my-2 py-10 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8'>
				<div className='align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12'>
					<div className='flex justify-between'>
						<div className='inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent'>
							<div className='flex flex-wrap items-stretch w-full h-full mb-6 relative'>
								<div className='flex'>
									<span className='flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm'>
										<svg
											width='18'
											height='18'
											className='w-4 lg:w-auto'
											viewBox='0 0 18 18'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z'
												stroke='#455A64'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M16.9993 16.9993L13.1328 13.1328'
												stroke='#455A64'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</span>
								</div>
								<input
									type='text'
									className='flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin'
									placeholder={languages.search}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											console.log(e.target.value);
											getUser(e.target.value);
										}
									}}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg'>
					<table className='min-w-full'>
						<thead>
							<tr>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider'>
									{languages.ID}
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									{languages.LOGIN}
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									{languages.NAME}
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									{languages.SALARY}
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									{languages.ACTION}
								</th>
							</tr>
						</thead>
						<tbody className='bg-white'>
							{users.map((item, index) => {
								return (
									<tr key={item.id}>
										<td className='px-16 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div className='flex items-center'>
												<div>
													<div className='text-sm leading-5 text-gray-800'>
														{item.id}
													</div>
												</div>
											</div>
										</td>
										<td className='px-16 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div className='flex items-center'>
												<div>
													<div className='text-sm leading-5 text-gray-800'>
														{item.login}
													</div>
												</div>
											</div>
										</td>
										<td className='px-16 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div className='flex items-center'>
												<div>
													<div className='text-sm leading-5 text-gray-800'>
														{item.name}
													</div>
												</div>
											</div>
										</td>
										<td className='px-16 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div className='flex items-center'>
												<div>
													<div className='text-sm leading-5 text-gray-800'>
														${item.salary}
													</div>
												</div>
											</div>
										</td>
										<td className='px-16 py-4 whitespace-no-wrap border-b border-gray-500'>
											<button
												className='px-10 mr-4 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none'
												onClick={() =>
													setSelectedItem({
														...item,
														autofocus: 1,
														type: 'EDIT',
													})
												}>
												Edit
											</button>
											<button
												className='px-8 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none'
												onClick={(e) =>
													setSelectedItem({ id: item.id, type: 'DELETE' })
												}>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<BottomNavigation />
				</div>
			</div>
		</div>
	);
}

export default App;
