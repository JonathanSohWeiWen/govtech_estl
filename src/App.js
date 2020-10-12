import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [users, setUsers] = useState([]);
	const [params, setParams] = useState({
		minSalary: 0,
		maxSalary: 4000,
		offset: 0,
		limit: 30,
		sort: '+name',
	});

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
		<div>
			<table class='table-auto'>
				<thead>
					<tr>
						<th class='px-4 py-2'>ID</th>
						<th class='px-4 py-2'>Login</th>
						<th class='px-4 py-2'>Name</th>
						<th class='px-4 py-2'>Salary</th>
					</tr>
				</thead>
				<tbody>
					{users.map((item, index) => {
						if (index % 2 === 0) {
							return (
								<tr key={item.id}>
									<td class='border px-4 py-2'>{item.id}</td>
									<td class='border px-4 py-2'>{item.login}</td>
									<td class='border px-4 py-2'>{item.name}</td>
									<td class='border px-4 py-2'>{item.salary}</td>
								</tr>
							);
						} else {
							return (
								<tr class='bg-gray-100' key={item.id}>
									<td class='border px-4 py-2'>{item.id}</td>
									<td class='border px-4 py-2'>{item.login}</td>
									<td class='border px-4 py-2'>{item.name}</td>
									<td class='border px-4 py-2'>{item.salary}</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		</div>
	);
}

export default App;
