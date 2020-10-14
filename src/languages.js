import LocalizedStrings from 'react-localization';

let languages = new LocalizedStrings({
	en: {
		minimumSalary: 'Minimum salary ($)',
		maximumSalary: 'Maximum salary ($)',
		sortBy: 'Sort by',
		id: 'id',
		login: 'login',
		name: 'name',
		salary: 'salary',
		orderBy: 'DESC - ASC',
		search: 'Search',
		ID: 'ID',
		LOGIN: 'Login',
		NAME: 'Name',
		SALARY: 'Salary',
		ACTION: 'Action',
	},
	zh: {
		minimumSalary: '最低薪资 ($)',
		maximumSalary: '最高薪资 ($)',
		sortBy: '分类',
		id: '身份号码',
		login: '登录',
		name: '名称',
		salary: '薪水',
		orderBy: '下 - 上',
		search: '搜索',
		ID: '身份号码',
		LOGIN: '登录',
		NAME: '名称',
		SALARY: '薪水',
		ACTION: '选项',
	},
});

export default languages;
