import { Router, Request, Response } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController';

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

router.get('/test', (_req: Request, res: Response) => {
    res.send('Test route works!');
});

export default router;
