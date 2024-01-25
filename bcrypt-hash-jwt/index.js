const bcrypt = require('bcryptjs');

const plainText = '1q2w3';
const digest = '$2a$12$ytB2MrQk4G11KzQcfjBeteYG.vj6PJ1VwVfzJ7qKRdAy2tGFI92Ka';

const run = async () => {
  try {
    // const hashValue = await bcrypt.hash(plainText, 12);
    // console.log(hashValue);
    const isCorrect = await bcrypt.compare(plainText, digest);
    console.log(isCorrect);
  } catch (err) {
    console.log(err);
  }
};

run();
