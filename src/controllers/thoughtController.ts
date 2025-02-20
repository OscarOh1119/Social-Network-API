import { Request, Response } from 'express';
import { User, Thought } from '../models';


const thoughtController = {
    async getThoughts(req: Request, res: Response): Promise<void> {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
        }
    },

    async createThought(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
        }
    },

    async getThoughtById(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findById(req.params.id).populate('reactions');
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
        }
    },

    async updateThought(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
        }
    },

    async deleteThought(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
        }
    },

    async addReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
        }
    },

    async removeReaction(req: Request, res: Response): Promise<void> {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
        }
    }
};

export default thoughtController;
