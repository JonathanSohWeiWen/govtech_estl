import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

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

	const deleteUser = (id) => {
		axios
			.delete('http://localhost:5527/users/' + id, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				console.log(res);
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
		if (selectedItem.type === 'CREATE') {
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
							Minimum salary ($)
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
							Maximum salary ($)
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
							Sort by
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
								<option>id</option>
								<option>login</option>
								<option>name</option>
								<option>salary</option>
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
								DESC - ASC
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
				<div className='align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg'>
					<table className='min-w-full'>
						<thead>
							<tr>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider'>
									ID
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Login
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Name
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Salary
								</th>
								<th className='px-16 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Action
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
												onClick={() => deleteUser(item.id)}>
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
