import express from 'express';
import resizeImage from '../../utilities/images';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (filename !== undefined && width !== undefined && height !== undefined) {
    try {
      await resizeImage(filename as string, width as number, height as number);
      const file = process.cwd() + '/thumb/' + filename + '_thumb.jpg';

      await res.sendFile(file);
    } catch (e) {
      console.error(e);
    }
  } else {
    res.send('Please create a query to use this service');
  }
});

export default images;
