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
				//setTimeout(() => window.location.reload(), 3000);
			});
	};

	const Banner = () => {
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
			<Banner />
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
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='sortBy'
								value={params.sort.substring(0)}
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
			</div>
			<div class='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8'>
				<div class='align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12'></div>
				<div class='align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg'>
					<table class='min-w-full'>
						<thead>
							<tr>
								<th class='px-20 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider'>
									ID
								</th>
								<th class='px-20 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Login
								</th>
								<th class='px-20 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Name
								</th>
								<th class='px-20 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Salary
								</th>
								<th class='px-20 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider'>
									Action
								</th>
							</tr>
						</thead>
						<tbody class='bg-white'>
							{users.map((item, index) => {
								return (
									<tr key={item.id}>
										<td class='px-20 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div class='flex items-center'>
												<div>
													<div class='text-sm leading-5 text-gray-800'>
														{item.id}
													</div>
												</div>
											</div>
										</td>
										<td class='px-20 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div class='flex items-center'>
												<div>
													<div class='text-sm leading-5 text-gray-800'>
														{item.login}
													</div>
												</div>
											</div>
										</td>
										<td class='px-20 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div class='flex items-center'>
												<div>
													<div class='text-sm leading-5 text-gray-800'>
														{item.name}
													</div>
												</div>
											</div>
										</td>
										<td class='px-20 py-4 whitespace-no-wrap border-b border-gray-500'>
											<div class='flex items-center'>
												<div>
													<div class='text-sm leading-5 text-gray-800'>
														${item.salary}
													</div>
												</div>
											</div>
										</td>
										<td class='px-20 py-4 whitespace-no-wrap border-b border-gray-500'>
											<button class='px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none'>
												View Details
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default App;
