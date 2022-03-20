import express from 'express';
import resizeImage from '../../utilities/images';
import { promises as fs } from 'fs';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (filename !== undefined && width !== undefined && height !== undefined) {
    const file =
      process.cwd() +
      '/thumb/' +
      filename +
      '_thumb_' +
      width +
      '_' +
      height +
      '.jpg';

    try {
      await fs.stat(file);
      await res.sendFile(file);
      console.log('Image accessed!');
    } catch (error) {
      try {
        await resizeImage(
          filename as string,
          width as number,
          height as number
        );
        console.log('Image resized!');
        await res.sendFile(file);
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    res.send('Please create a query to use this service');
  }
});

export default images;
