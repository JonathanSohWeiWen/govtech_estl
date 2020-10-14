# Technology Associate Programme (TAP) 2021 Take Home Assessment

## Installation
### Node.js/npm installation
It is assumed that the npm package has been installed on your machine. If not, please follow the guides listed below <br/>
Mac: https://treehouse.github.io/installation-guides/mac/node-mac.html <br/>
Windows: https://www.guru99.com/download-install-node-js.html

### Initial steps
1. Clone the repo with the following link https://github.com/JonathanSohWeiWen/govtech_estl.git
2. Navigate into the the folder path with terminal/cmd. It should look like <PATH>/govtech_estl
3. Run the code `npm install` to install all necessary dependencies
  
### Database setup
For this application, I've developed it with MySQL, as such a schema and table needs to be created in MySQL database<br/>
If MySQL has not been installed in the machine, please refer to https://www.mysql.com/downloads/ (MySQL Workbench is recommended) <br/>
1. Create the database **govtech** with MySQL Workbench 'Add schema' button or run the following query in MySQL <br/>  ```CREATE DATABASE `govtech` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;``` 
2. Inside **govtech** database, create the table **user** with the following columns
    * id
        * Column Name: id
        * Datatype: varchar(128)
        * PK: checked
        * NN: checked
        * UQ: checked
    * login
        * Column Name: login
        * Datatype: varchar(128)
        * NN: checked
        * UQ: checked
    * name
        * Column Name: name
        * Datatype: varchar(128)
        * NN: checked
    * salary
        * Column Name: salary
        * Datatype: decimal(18,2)
        * NN: checked
<br/>Alternatively run the following query in MySQL:<br/>
```CREATE TABLE `user` (
  `id` varchar(128) NOT NULL,
  `login` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `salary` decimal(18,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;```
4. Note down the **host, user** and  **password** of your MySQL. Default should be localhost, root and password respectively

### Edit server.js file
From the repository open up the *server.js* file.
Change the host, user and password in accordance to your MySQL configurations
```javascript
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'govtech',
});
```
### Run the code
Navigate into the the folder path with terminal/cmd. It should look like <PATH>/govtech_estl. Then run the following code: ```npm run dev```<br/>
The web application should startu, running on http://localhost:3000/
