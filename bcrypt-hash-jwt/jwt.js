const jwt = require('jsonwebtoken');

const secretKey = '1q2w3e4r5t6y7u8i9o0p';
const payload = {
  username: 'john'
};

const invalidToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE3MDYxNTkyODAsImV4cCI6MTcwNjE1OTI4MX0.z0xTzLfGmiLbYGrP_rgl-t7qaW52ri4Ac19KBEXGXts';

const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE3MDYxNTg3NjUsImV4cCI6MTgwNjE1ODc2NX0.7JcfSua0CkpcUJN5suRnqS8VnFJVoUzHJfQCEqMC2xE';

// const token = jwt.sign(payload, secretKey, { expiresIn: 1 });
// console.log(token);

try {
  const decodePayload = jwt.verify(validToken, secretKey);
  console.log(decodePayload);
} catch (err) {
  console.log(err);
}
