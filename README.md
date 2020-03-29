# bux
Issue tracker, decision logs and more

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
 
 Java Tests are located at: `src/test`, unit tests are marked with a suffix "Test" whereas integration tests are marked with
 a suffix "IT" for convenience. They share the same directory.
 
