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
// middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// GET to homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// GET to notes page
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
// write data to json file
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`nData written to ${destination}`));
// read data from/to append/write content to it
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};
// GET to retrieve stored data
app.get('/api/notes', (req, res) => {
    res.json(database.notes);
});
// GET to retrieve all stored notes
app.get('/api/notes', (req, res) => { 
    res.json(database);
});
//POST to add new notes
app.post('/api/notes', (req, res) => {
    
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,

            id: uid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added!`);
        database.push(newNote)
    } else {
        res.error(`There was an error adding your note.`);
    }
});

//LISTENS to ensure app is active
app.listen(PORT, () => console.log(`Listening to the server on PORT ${PORT}`))