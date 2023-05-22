# Getting started
This program is useful to get the participants of a course on Moodle.

Run `npm install` in this folder once.

## Config function
This is needed to run anything. You need to set up your Moodle credentials to use the app!
Run `node index.js --config <username>:<password>`. 

For example, 123456:hello. The username is '123456' and the password is 'hello'.

## Search function
To get the participants of a course, you need to run: `node index.js --search <course_id>`.

For example, `node index.js --search 13453`. 

This function will generate a **report** in the *Reports* folder. 
The **report** is a *json* file in which the list of participants is reported.

**Please note:** _You need to take the course or be enrolled in it._

## Filter function
To filter the participants of a course, you need to run: `node index.js --filter <course_id>`.

For example, `node index.js --filter 13453`. 

This function will display on console the list filtered.

**Please note:** _You need a report to execute a filter on list of participants._

## Requirements
You need NodeJS installed.