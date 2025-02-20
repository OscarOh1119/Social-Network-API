import { Router } from 'express';
import thoughtController from '../../controllers/thoughtController';

const router = Router();

const { getThoughts, createThought, addReaction, removeReaction, getThoughtById, updateThought, deleteThought } = thoughtController;

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

export default router;
