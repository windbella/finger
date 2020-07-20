const path = require('path');
const fs = require('fs-extra');

const src = path.join(__dirname, '../build');
const dest = path.join(__dirname, '../docs');

fs.remove(dest).then(() => fs.copy(src, dest)).then(() => console.log('Copy complete.'));
