# Intro to SQL in node
This repo is meant to give you a quick guide to getting up and running with mysql
in node.js.

## The gist.
* Install mysql server: [MySQL Downloads](http://dev.mysql.com/downloads/mysql/)
* Take note of your MySQL server settings
* Fork this repo, then run `npm install`
* Modify the config settings in `index.js` to match your server settings
* Run the SQL scripts in the `creation/` folder on your database.
* Open `index.js`
* Follow along with the comments! The code is provided, but try to experiment!
* Answer the questions listed under 'Goals'

## Goals
Answer these questions by running queries on node and processing the data by whatever means necessary (_map, reduce, and filter are allowed_):
* How many games were played total?
  * _hint: try to use the COUNT function in SQL_
* Which clan does Alice belong to? How about Bob?
  * _Challenge: try using an inner join (or two)_
* How many games did Alice play against Bob?
  * _Challenge: try to include each player's name_
  * _Challenge:* How many games did each player play against each other player?_
* Which clan won the most games?


*this one could be pretty difficult

After you can answer those  (_confidently_) using SQL and javascript together, try implementing them using _only SQL_ to get the same result.

## Databases are smart.

This exercise is geared to help you understand how to move your data processing to the database, which will keep your program free to perform other operations.

Databases are very efficient. Don't be afraid to use them.
