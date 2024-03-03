const { app } = require('electron');
const Datastore = require('nedb-promises');
const path = require('path');

const db_folder = path.join(app.getPath('userData'), 'data')

console.log('Loading data from', db_folder);

const create_db = (filename) => Datastore.create({
    filename: path.join(db_folder, filename),
    timestampData: true,
    autoload: true
})

module.exports = {
    'events': create_db('events.db')
}