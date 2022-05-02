# Image Processing API

Repository with an Image Processing API built for Full Stack JavaScript Nanodegree at Udacity.

## How to run in local

To only build the code:

```
npm run build
```

If you want to build the code and run tests:

```
npm run test
```

And to run the server after building the code:

```
node dist/.
```

## How to create a Docker image

Run the following to build the image:

```
podman build . -t ernesgonzalez33/image-processing-api
```

To run the image:

```
podman run -p 3000:3000 localhost/ernesgonzalez33/image-processing-api
```

Alternatively, you can pull it from Quay:

```
podman pull quay.io/ernesgonzalez33/image-processing-api
```

## How to use the image processing api

The images you can use are in the `full` directory. To process them you just have to go to the following page:

`http://localhost:3000/api/images?filename=<imagename>&width=<width>&height=<height>`

for example:

http://localhost:3000/api/images/?filename=fjord&width=200&height=200

All the images will be saved in local in the `thumb` directory.
