
# Nasdaq Index Realtime App

## About the project
This project is neatly designed and built to demonstrate the use of Node.js and its ecosystem frameworks and libraries for building a simple yet functional web application. 
The following is the main functions the application does:

1. Periodically scrape http://www.nasdaq.com/, parse out the index value of the Nasdaq, and store the result in the database.  
2. Create RESTful web service to provide those data to a front end.

## Live Demo
To make it easier for viewers to see how the application works in action, I also created the index page which is basically the html page with some simple javascript 
code to initialize chartjs. The chart is periodically updated in real time using websocket (Socket.IO). On the backend, as soon as 
the new stock data is fetched and extracted from Nasdaq.com, the html page will immediately receive the latest data without requiring the manual refresh.

To provide the live demo, the application is deployed to **AWS Beanstalk** with **AWS-RDS backed Postgresql database** at the following URL:
[http://nasdaq-dev.ap-southeast-1.elasticbeanstalk.com/](http://nasdaq-dev.ap-southeast-1.elasticbeanstalk.com/)

## Getting Started
### Prerequisite

1. **Node 6+** to take advantage of ES2015, I decided to use Node 6 which is the latest generation of Node.js.
2. **Postgresql** for development and testing databases.

### Installation
1. Clone the project from this Github repo.
2. Create new databases for development and testing purposes in Postgresql.
3. Update the knexfile.js at the root level of the project to reflect the. 
4. Run the command: npm install.
5. Run the command: npm start.
6. The server should start up and the application will be available on localhost:3000.

### API
The application exposes the following API for any client to consume:

| API endpoint     | Description  |
| -----------------|:-------------:|
| /api/stocks      | retrieve the most recent 20 stock entries saved in the database. |

## Technologies demonstrated
### ES2015 (formerly known ES6)
  In the newer version of Node.js, it comes bundled with the built-in support for **ES2015(ES6)**. This project make a heavy use of new syntaxs in ES2015 that are designed to 
improve the code in both readability and integrity.

- Let and Const
- Lambda function
- Promise (use bluebird implementation)

### Database
  Using **Knexjs** for interacting with the database. The project also takes advantage of the built-in migration tools which simplifies the database migration.

### Node cron
  To periodically make requests and capture the stock information, the project uses **node-cron** module that will trigger the job which fetches and processes stock information.
  The scheduler fires the job every minute.

### Socket.IO
  To provide realtime update to the client, **Socket.io** is used.  

### ESLint
  To ensure that the codebase follows good standard, well-defined convention and to avoid possible coding mistakes, **ESLint** is used with some customized rules to 
  suit my development style.

### Typings
  To gain more productivity, typescript definition files are used by the IDE to provide code assistence. The project leverages the popular **Typings** tool to manage 
  the definition files.

### Logging
  Logging is the important aspect of any application. This application is no exception. It uses **Winston** as the logging library. It is basically set to output 
  through console only. However, it is quite trivial to set it to output to files as well.

### Testing
  **Mocha, chai and supertest** are used for testing. This project shows how both unit test and integration test are done:
- Unit test: test whether the scraper tool can correctly extract raw html.
-  Integration test: Run the server, prepare the testing database to be in known state, and execute the request against the api endpoint that fetches 
  the data and compare the returned result with the expected ones.


### Build tools
  In modern development practices, especially in Node.js backend development where the needs for minification or file concatenation are less important, 
  it has become more practical to use npm as a build tool instead of using external tools like Gulp (which is the tool I have used for years in client-side development). 
  For this reason, this project uses npm script to achieve these functionalities.
    The available npm commands are as follows:

| Command        | description  |
| -------------  |:-------------|
| npm start      | Start the application |
| npm test       | Run mocha test on the application      |
| npm run lint   | Lint the project      |
| npm run build  | Lint and run mocha test on the project      |


### The other libraries
1. **Cheerio** for parsing raw html data
2. **Lodash** for common tasks like map and reverse an array.
3. **Jade** as templating engine


## Room for improvement
The project is quickly built to demonstrate the basic features of Node.js and its ecosystem libraries. Although most of the code in the project follows best 
practices from industry experts, there are still somethings that can be improved as follows: 

1. For security reasons, it is a good practice to pass sensitive information such as database credentials via Environment variable as opposed to specifying it explicitly in 
the config file(knexfile.js in this case). In this project, I keep it in the knexfile.js for the sake of simplicity.
