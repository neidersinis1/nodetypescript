import express, { Router } from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';

const router = Router()

router.get('/', isAuthenticated, getAllUsers);
router.delete('/:id', isAuthenticated, isOwner, deleteUser);
router.patch('/:id', isAuthenticated, isOwner, updateUser);

export { router }
