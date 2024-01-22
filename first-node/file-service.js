const readFilePro = filename => {
  const pathName = path.join(__dirname, filename);
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const writeFilePro = (filename, data) => {};

exports.readFilePro = readFilePro;
exports.writeFilePro = writeFilePro;
