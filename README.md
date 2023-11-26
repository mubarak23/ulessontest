## Description

an EdTech site built on Node.js, focusing on stability, scalability, and good coding principles. The system allows users to browse and stream video lessons, create notes linked to specific video segments, complete quizzes with score tracking, and view comprehensive reports. The design emphasizes modularity for easy extension by junior developers. The system optimizes database access through caching mechanisms.

## Installation

```bash
$ npm install
```

## Setup .env file

APP_ENV=development
PORT=
SENTRY_DNS=
DB_HOST=localhost
DB_PORT=5432
DB_TYPE=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET_KEY=
JWT_EXPIRATION_TIME=

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## swagger Docs

/api/docs#

response sample

# user's note on lesson video response

- route -> /note, GET Request, Protected
  {
  "data": [
  {
  "id": "1709c229-5372-40b9-9a5e-d561e5a6ee66",
  "content": "note contents",
  "videotime": "34:45",
  "lessonvideoId": null,
  "lessonId": "b35cd1b9-8ee5-4112-823a-d7e4df2ab648",
  "userId": "08994f09-fc31-4e87-b937-24e7038ed68c",
  "createdDate": "2023-11-24T07:54:24.227Z",
  "updatedDate": "2023-11-24T19:11:50.739Z",
  "deletedDate": null,
  "user": {
  "id": "08994f09-fc31-4e87-b937-24e7038ed68c",
  "email": "demo1@gmail.com",
  "firstName": "spark",
  "lastName": "Doe",
  "otherName": "John",
  "isEmailVerified": false,
  "createdDate": "2023-11-22T13:50:21.149Z",
  "updatedDate": "2023-11-22T13:50:21.149Z",
  "deletedDate": null
  },
  "lesson": {
  "id": "b35cd1b9-8ee5-4112-823a-d7e4df2ab648",
  "name": "non metals",
  "description": "demo description of the lesson",
  "numberofVideo": 5,
  "createdDate": "2023-11-22T22:24:41.879Z",
  "updatedDate": "2023-11-22T22:24:41.879Z",
  "deletedDate": null,
  "userLesson": null
  }
  }
  ]
  }
