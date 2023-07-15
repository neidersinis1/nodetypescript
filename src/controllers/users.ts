import express from 'express';
import {
  ConnectionError,
  ValidationDeleteUserError,
  ValidationGetUsersError,
  ValidationUpdateUserError,
  handleHttp
} from "../utils/error.handle";

import { deleteUserById, getUsers, getUserById, getUser } from '../services/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    handleHttp(res, "ERROR_GET_USERS", new ValidationGetUsersError('ERROR_GET_USERS'));
    return res.sendStatus(400);
  }
};

export const getAllUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400)

    const user = await getUser(id);

    return res.status(200).json(user);
  } catch (error) {
    handleHttp(res.status(400), "ERROR_GET_USER", new ValidationGetUsersError('ERROR_GET_USER'));
    return res.status(400);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_USER", new ValidationDeleteUserError('ERROR_DELETE_USER'));
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_USER", new ValidationUpdateUserError('ERROR_UPDATE_USER'));

    console.log(error);
    return res.sendStatus(400);
  }
}