import express, { Request, Response } from 'express';
import resizeImage from '../../utilities/images';
import { promises as fs } from 'fs';

const images = express.Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  if (Object.keys(req.query).length === 0) {
    res.send('Please provide a valid query to use this service');
  } else if (isNaN(width) || isNaN(height)) {
    res.statusMessage = 'Width and Height should be numbers';
    res.status(400);
    res.send('Width and Height should be numbers');
  } else if (width <= 0 || height <= 0) {
    res.statusMessage = 'Width and Height should be more than zero';
    res.status(400);
    res.send('Width and Height should be more than zero');
  } else {
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
        res.statusMessage = "That image doesn't exist";
        res.status(400);
        res.send("That image doesn't exist");
      }
    }
  }
});

export default images;
