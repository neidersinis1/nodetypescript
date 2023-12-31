import express from 'express';
import { merge, get } from 'lodash';

import { getUserBySessionToken } from '../services/users';
import { MiddlewareError, handleHttp } from '../utils/error.handle';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['ANTONIO-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    handleHttp(res.status(400), "ERROR_MIDDLEWARE_USER", new MiddlewareError('ERROR_MIDDLEWARE_USER'));
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    handleHttp(res.status(400), "ERROR_MIDDLEWARE_USER", new MiddlewareError('ERROR_MIDDLEWARE_USER'));
    return res.sendStatus(400);
  }
}