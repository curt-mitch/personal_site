'use strict';

import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import next from 'next';

const app = next({ dev })

// app.use(logger('short'));
// app.use(helmet());

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })

app.use(function (req, res) {
  res.statusCode = 404;
  res.end('404 page');
});
