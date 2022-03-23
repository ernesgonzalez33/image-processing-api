import supertest from 'supertest';
import app from '../index';

const req = supertest(app);

describe('Test endpoints', () => {
  it('gets the root endpoint', async () => {
    const res = await req.get('/');
    expect(res.status).toBe(200);
  });

  it('gets the main api endpoint', async () => {
    const res = await req.get('/api');
    expect(res.status).toBe(200);
  });

  it('returns 200 while resizing an image', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(res.status).toBe(200);
  });

  it('fails when the width is not a number', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=NaN&height=200'
    );
    expect(res.status).toBe(400);
  });
});
