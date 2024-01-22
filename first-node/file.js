const fs = require('fs');
const path = require('path');

// const result1 = path.join('aa', 'xb', 'oo');
// const result2 = path.join('aa', 'xb', 'oo', '..', '..');
// console.log('1: ', result1);
// console.log('2: ', result2);

// __filename (global)
// console.log(__filename);
// __dirname (global)
// console.log(__dirname);

// const pathName = path.join(__dirname, 'dummy.json');
// console.log(pathName);
// const content = fs.readFileSync(pathName, { encoding: 'utf-8' });
// console.log(content);
// const pathName2 = path.join(__dirname, 'product.json');
// console.log(pathName2);
// const content2 = fs.readFileSync(pathName2, { encoding: 'utf-8' });
// console.log(content2);

// const pathName = path.join(__dirname, 'dummy.json');
// // read ==> error NodeJS call cb(error object)
// // read ==> no error NodeJS call cb(null, data inside file)
// fs.readFile(pathName, { encoding: 'utf-8' }, (err, data) => {
//   console.log(err);
//   console.log(data);
//   console.log('Inside readFile callback');
// });
// console.log('Line after readFile');

// const pathName = path.join(__dirname, 'dummy.json');
// const arr = ['John', 'Jay'];
// // write ==> error NodeJS call cb(error object)
// // write ==> no error NodeJS call cb(null)
// fs.writeFile(pathName, JSON.stringify(arr), 'utf-8', err => {
//   console.log(err);
// });
