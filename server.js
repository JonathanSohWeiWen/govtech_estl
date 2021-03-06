// const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const csv = require('fast-csv');
const fs = require('fs');
var cors = require('cors');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'govtech',
});

connection.connect();
const PORT = process.env.PORT || 5527;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const validateCsvData = (rows) => {
	// console.log(rows);
	if (rows.length === 0) return 'Empty csv file';
	let ids = new Set();
	let logins = new Set();
	for (let i = 1; i < rows.length; i++) {
		if (rows[i].length !== 4) return 'Incorrect number of columns';
		if (rows[i][0].charAt(0) === '#') {
			rows.splice(i, 1);
		} else {
			ids.add(rows[i][0]);
			logins.add(rows[i][1]);
			if (rows[i][3] < 0) {
				return 'Invalid salary';
			} else if (parseFloat(rows[i][3]).toFixed(2) !== rows[i][3]) {
				return 'Invalid salary format';
			}
		}
	}
	if (rows.length - 1 !== ids.size) {
		return 'Duplicate ids found';
	} else if (rows.length - 1 !== logins.size) {
		return 'Duplicate login found';
	}
	return;
};

app.get('/users', (req, res) => {
	console.log(req.query);
	res.header('Access-Control-Allow-Origin', '*');
	let minSalary = parseInt(req.query.minSalary);
	if (!isNaN(minSalary)) {
		if (minSalary < 0)
			return res.status(400).json({ error: 'Invalid minimum salary' });
	} else return res.status(400).json({ error: 'Missing minimum salary' });
	let maxSalary = parseInt(req.query.maxSalary);
	if (!isNaN(maxSalary)) {
		if (maxSalary < 0 || maxSalary < minSalary)
			return res.status(400).json({ error: 'Invalid maximum salary' });
	} else return res.status(400).json({ error: 'Missing maximum salary' });
	let limit = parseInt(req.query.limit);
	if (!isNaN(limit)) {
		if (limit !== 30)
			return res.status(400).json({ error: 'Limit must be 30' });
	} else return res.status(400).json({ error: 'Missing limit' });
	let offset = parseInt(req.query.offset);
	if (!isNaN(offset)) {
		if (offset < 0)
			return res.status(400).json({ error: 'Offset must be 0 or more' });
	} else return res.status(400).json({ error: 'Missing offset' });
	let sortParam = req.query.sort;
	let order = 'ASC';
	if (sortParam) {
		if (sortParam.charAt(0) === '-') order = 'DESC';
		sortParam = sortParam.substring(1);
		if (
			sortParam !== 'id' &&
			sortParam !== 'login' &&
			sortParam !== 'name' &&
			sortParam !== 'salary'
		)
			return res.status(400).json({ error: 'Invalid sort' });
	} else return res.status(400).json({ error: 'Missing sort' });

	const sqlQuery =
		'SELECT * FROM user WHERE salary>=' +
		minSalary +
		' AND salary<=' +
		maxSalary +
		' ORDER BY ' +
		sortParam +
		' ' +
		order +
		' LIMIT ' +
		limit +
		' OFFSET ' +
		offset;
	connection.query(sqlQuery, (err, result) => {
		if (err) throw err;
		return res.send(result);
	});
});

app.post('/users/upload', upload.single('file'), (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const fileRows = [];
	csv
		.parseFile(req.file.path, 'utf-8')
		.on('data', (data) => {
			fileRows.push(data);
		})
		.on('end', () => {
			fs.unlinkSync(req.file.path);
			const validationError = validateCsvData(fileRows);
			if (validationError) {
				console.log(validationError);
				return res.status(400).json({ message: validationError });
			} else {
				fileRows.splice(0, 1);
				fileRows.forEach((row) => {
					row[3] = parseFloat(row[3]);
				});
				connection.query(
					'REPLACE INTO user (id, login, name, salary) VALUES ?',
					[fileRows],
					(err, result) => {
						if (err) throw err;
						console.log(
							'Number of records inserted/updated: ' + result.affectedRows
						);
					}
				);

				return res.json({ message: 'Upload successful' });
			}
		});
});

app.get('/users/:id', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let id = req.params.id;
	const sqlQuery = 'SELECT * FROM user WHERE id=?';
	connection.query(sqlQuery, id, (err, result) => {
		if (err) return res.status(400).json({ error: err });
		else return res.send(result);
	});
});

app.post('/users/:id', upload.none(), (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let insertData = [
		[req.params.id, req.body.login, req.body.name, parseFloat(req.body.salary)],
	];
	if (insertData[3] < 0 || insertData[0][3].toFixed(2) !== req.body.salary)
		return res.status(400).json({ error: 'Invalid data' });
	connection.query('INSERT INTO user VALUES ?', [insertData], (err, result) => {
		if (err) return res.status(400).json({ error: err });
		else return res.send(result);
	});
});

app.patch('/users/:id', upload.none(), (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let insertData = [
		[req.params.id, req.body.login, req.body.name, parseFloat(req.body.salary)],
	];
	if (insertData[3] < 0 || insertData[0][3].toFixed(2) !== req.body.salary) {
		return res.status(400).json({ error: 'Invalid data' });
	}
	const sqlQuery =
		"UPDATE user SET login='" +
		req.body.login +
		"', name='" +
		req.body.name +
		"', salary=" +
		parseFloat(req.body.salary) +
		" WHERE id='" +
		req.params.id +
		"'";
	connection.query(sqlQuery, (err, result) => {
		if (err) {
			return res.status(400).json({ error: err });
		} else return res.send(result);
	});
});

app.delete('/users/:id', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let id = req.params.id;
	const sqlQuery = "DELETE FROM user WHERE id='" + id + "'";
	connection.query(sqlQuery, (err, result) => {
		if (err) return res.status(400).json({ error: err });
		else return res.send(result);
	});
});

//Start listening on a specific port number
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
