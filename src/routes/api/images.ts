import express from 'express';

const images = express.Router();

images.get('/', (req, res) => {
  res.send('Under Construction');
  console.log('Connected to images page');
});

export default images;
