const csv = require('csv-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
var stringify = require('csv-stringify');

'use strict';

let global = this;
var json = [];
let i = 0;

fs.createReadStream('users4.csv')
    .pipe(csv())
    .on('data', (row) => {

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(row.password, salt, function (err, hash) {
                row.password = hash;

                json.push(row);

                s(json);
            });
        });

    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });


const s = (json1) => {
    stringify(json1, function (err, output) {

        fs.writeFileSync('users.csv', output, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else {
                console.log('It\'s saved!');
            }
        });
    });
}