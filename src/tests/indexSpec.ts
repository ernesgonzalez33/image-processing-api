import supertest from 'supertest';
import app from '../index';

const req = supertest(app);

describe('Correct testing of endpoints', () => {
  it('gets the root endpoint', async () => {
    const res = await req.get('/');
    expect(res.status).toBe(200);
  });

  it('gets the main api endpoint', async () => {
    const res = await req.get('/api');
    expect(res.status).toBe(200);
  });

  it('gets the api images endpoint', async () => {
    const res = await req.get('/api/images');
    expect(res.status).toBe(200);
  });

  it('returns 200 while resizing an image', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(res.status).toBe(200);
  });
});

describe('Error handling of endpoints', () => {
  it('fails when the width is not a number', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=NaN&height=200'
    );
    expect(res.status).toBe(400);
  });

  it('fails when the width is not an integer', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=-200&height=200'
    );
    expect(res.status).toBe(400);
  });

  it('fails when the width is zero', async () => {
    const res = await req.get('/api/images?filename=fjord&width=200&height=0');
    expect(res.status).toBe(400);
  });

  it('fails when the height is not a number', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=200&height=test'
    );
    expect(res.status).toBe(400);
  });

  it('fails when the height is not an integer', async () => {
    const res = await req.get(
      '/api/images?filename=fjord&width=200&height=-200'
    );
    expect(res.status).toBe(400);
  });

  it('fails when the height is zero', async () => {
    const res = await req.get('/api/images?filename=fjord&width=200&height=0');
    expect(res.status).toBe(400);
  });

  it('http response is 400 when the image does not exist', async () => {
    const res = await req.get(
      '/api/images?filename=fjord1&width=200&height=200'
    );
    expect(res.status).toBe(400);
  });
});
