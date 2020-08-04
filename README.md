# bux
Issue tracker, decision logs and more

![Bux example](https://i.ibb.co/1bdCz5k/bux.png)

**Warning:** This is a work in progress running on the master branch. A production ready release will be tagged with a version number.

## Build instructions

You will require JDK 8 or above for running the backend and Node/NPM for running the front end.

Bux uses Maven for building and managing the core depedencies.
 - Clone the repository 
 ```
 git clone https://github.com/2DSharp/bux
 ```
 - Run mvn
 ```
 mvn clean install
 ```
 
 For debugging, you can go to the `src/main/react` directory and run:
 ```
 yarn start
 ```
 
 This will run the server in development mode on port 3000, however you also need to make sure you run the main Spring Boot Application for the REST API at port 2310.
 
 Java Tests are located at: `src/test`, unit tests are marked with a suffix "Test" whereas integration tests are marked with
 a suffix "IT" for convenience and consistency. They share the same directory.
 
