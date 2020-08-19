import { idArg, stringArg, mutationType } from '@nexus/schema';
import { Story } from './Story'
import { connectDB } from '../connectDB'
import StoryModel from '../../models/Story'
import { ApolloError } from 'apollo-server-micro'

connectDB();

export const Mutation = mutationType({
    definition(t) {
        t.typeName = 'StoryMutation';
        t.field('addStory', {
            type: Story,
            description: 'Add Story',
            args: { title: stringArg(), description: stringArg() },
            resolve: async (parent, { title, description }) => {
                try {
                    const newStory = await StoryModel.create({ title, description });
                    return newStory;
                } catch (err) {
                    // console.error(err);
                    if (err.code === 11000) {
                        const message = `Story already exists`;
                        throw new ApolloError(message, 401);
                    }
                    else if (err.name === 'ValidationError') {
                        const message = Object.values(err.errors).map(value => value.message);
                        throw new ApolloError(message, 400);
                    }

                    else {
                        throw new ApolloError('Server error', 500);
                    }
                }
            }
        });

        t.field('updateStory', {
            type: Story,
            description: 'Add Story',
            nullable: true,
            args: { id: idArg(), title: stringArg({ nullable: true }), description: stringArg({ nullable: true }) },
            resolve: async (parent, args) => {

                let body = {};

                if (args.title) {
                    body.title = args.title;
                }

                if (args.description) {
                    body.description = args.description;
                }
                try {
                    const story = await StoryModel.findByIdAndUpdate(args.id, body, { new: true });
                    return story;
                } catch (err) {
                    if (err.name === 'CastError') {
                        const message = `Story does not exists`;
                        throw new ApolloError(message, 400);
                    }
                    else {
                        throw new ApolloError('Server error', 500);
                    }
                }
            }
        });

        t.field('deleteStory', {
            type: Story,
            description: 'Delete Story',
            nullable: true,
            args: { id: idArg() },
            resolve: async (parent, { id }) => {
                try {
                    return await StoryModel.findByIdAndDelete(id)
                } catch (err) {
                    if (err.name === 'CastError') {
                        const message = `Story does not exists`;
                        throw new ApolloError(message, 400);
                    }
                    else {
                        throw new ApolloError('Server error', 500);
                    }
                }
            }
        });

    }
})