import resizeImage from '../../utilities/images';
import { promises as fs } from 'fs';

describe('Testing the image resizing', () => {
  it('resizes the image and create the thumbnail', async () => {
    await resizeImage('encenadaport', 200, 200);
    const thumb = await fs.stat(
      process.cwd() + '/thumb/encenadaport_thumb_200_200.jpg'
    );
    expect(thumb.isFile()).toBe(true);
  });

  it('promise is rejected when the image does not exist', async () => {
    await expectAsync(resizeImage('notHere', 200, 200)).toBeRejected();
  });
});
