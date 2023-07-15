import express, { Router } from 'express';

import { getAllUsers, deleteUser, updateUser, getAllUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';

const router = Router()

router.get('/', isAuthenticated, getAllUsers);
router.get('/:id', isAuthenticated, getAllUser);
router.delete('/:id', isAuthenticated, isOwner, deleteUser);
router.patch('/:id', isAuthenticated, isOwner, updateUser);

export { router }
