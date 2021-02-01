# Project Name

The WorkAnyPlace app is designed for users to be able to post local smaller jobs and for other users to be able to search through posted jobs and accept jobs that they want to do.  


## External Requirements

In order to build this project you first have to install:
* [ionic](https://ionicframework.com/docs/intro/cli)
$ npm install -g @ionic/cli


## Setup

In order to start the app run:
$ ionic start 


## Running

To run the app:
$ ionic serve

# Deployment


# Testing


We will contribute to testing our code here with writing tests.
Host the app on Firebase.

## Testing Technology
For unit testing we used Jasmine, and for behavioral testing we use selenium IDE.

## Running Tests
In order to run the Unit test, you must access the project directory, WorkAnyPlace/src/tests and run the command line "npm test".  The test will then open the karma browerser to see the results of your tests. 

In order to run the Behavioral test, you must access the project directory, WorkAnyPlace/src/tests/BehavioralTest and run the command selenium-side-runner WorkAnyPlaceBehavioralTest.side. In order for this test to work the selenium-side-runner must be installed using the command: npm install -g selenium-side-runner. Also, a browser driver must be installed, for chrome use the command: npm install -g chromedriver. If having trouble view link: https://www.selenium.dev/selenium-ide/docs/en/introduction/command-line-runner. I had a problem of not having the right permissions to download the driver so I had to use the command: sudo npm install -g chromedriver --unsafe-perm=true --allow-root.

# Authors
Janki Patel: janki@email.sc.edu
Anthony Castellano: castela@email.sc.edu
Nick Rabena: nrabena@email.sc.edu
Caleb Ulch: culch@email.sc.edu
