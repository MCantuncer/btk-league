import { Request, Response } from 'express';

const express = require('express');

export function expressApp(): any {
  const app = express();

  app.get('/_health-check', (req: Request, res: Response, next) => {
    res.status(200).send('ok');
  });

  return app;
}
