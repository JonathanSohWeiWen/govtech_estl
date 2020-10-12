// const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const csv = require('fast-csv');
const fs = require('fs');

// const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5527;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

const validateCsvData = (rows) => {
	// console.log(rows);
	let ids = new Set();
	let logins = new Set();
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].id.charAt(0) === '#') {
			rows.splice(i, 1);
		} else {
			ids.add(rows[i].id);
			logins.add(rows[i].login);
			if (rows[i].salary < 0) {
				return 'Invalid salary';
			}
		}
	}
	if (rows.length - 1 >= ids.size) {
		return 'Duplicate ids found';
	} else if (rows.length - 1 >= logins.size) {
		return 'Duplicate login found';
	}
	return;
};

const updateCsvData = (newRows) => {
	try {
		let updatedRows = fs.readFileSync('users.json', {
			encoding: 'utf8',
			flag: 'r',
		});
		let ids = [];
		for (let i = 0; i < updatedRows.length; i++) {
			ids.push(updatedRows[i].id);
		}
		for (let i = 0; i < newRows.length; i++) {
			const index = ids.indexOf(newRows[i].id);
			if (index > 0) {
				updatedRows[index].login = newRows[i].login;
				updatedRows[index].name = newRows[i].name;
				updatedRows[index].salary = newRows[i].salary;
			} else {
				updatedRows.push(newRows[i]);
			}
		}
		return updatedRows;
	} catch (err) {
		return newRows;
	}
};

//API calls
app.get('/', (req, res) => {
	res.send('Hello world');
});
app.post('/users/upload', upload.single('file'), (req, res) => {
	const fileRows = [];
	csv
		.parseFile(req.file.path, 'utf-8')
		.on('data', (data) => {
			fileRows.push({
				id: data[0],
				login: data[1],
				name: data[2],
				salary: data[3],
			});
		})
		.on('end', () => {
			fileRows.splice(0, 1);
			fs.unlinkSync(req.file.path);
			const validationError = validateCsvData(fileRows);
			if (validationError) {
				return res.status(400).json({ error: validationError });
			} else {
				const updatedRows = updateCsvData(fileRows);
				const writeData = JSON.stringify(updatedRows);
				fs.writeFile('users.json', writeData, (err) => {
					if (err) throw err;
				});
				return res.json({ message: 'Upload successful' });
			}
		});
});

//Start listening on a specific port number
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
