import express from 'express';

import { getUserByEmail, createUser } from '../services/users';
import { authentication, random } from '../helpers';
import { ValidationLoginError, ValidationRegisterError, handleHttp } from '../utils/error.handle';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).send('Email and password is required');
    }

    if (!password) {
      return res.status(400).send('Password is required');
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json(user).end();
  } catch (error) {
    handleHttp(res, "ERROR_LOGIN", new ValidationLoginError('ERROR_LOGIN'));
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send('Email, username, Password is required');
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send('El Usuario ya existe');
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    handleHttp(res, "ERROR_REGISTER", new ValidationRegisterError('ERROR_REGISTER'));
    return res.sendStatus(400);
  }
}