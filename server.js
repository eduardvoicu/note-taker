const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json');
const uid = require('./helper/uid'); // attaching a method that helps create unique numbers for ID
//express package functionality and designates a PORT to run application
const app = express();
const PORT = process.env.PORT || 3001;

// all static files in "public" folder will be served
app.use(express.static('public'));
