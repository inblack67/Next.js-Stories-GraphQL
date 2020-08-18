import { idArg, stringArg, mutationType } from '@nexus/schema';
import { Story } from './Story'
import { connectDB } from '../connectDB'
import StoryModel from '../../models/Story'

connectDB();

export const Mutation = mutationType({
    definition(t) {
        t.typeName = 'StoryMutation';
        t.field('addStory', {
            type: Story,
            description: 'Add Story',
            args: { title: stringArg(), description: stringArg() },
            resolve: async (parent, { title, description }) => await StoryModel.create({ title, description })
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

                const story = await StoryModel.findByIdAndUpdate(args.id, body, { new: true });

                return story;
            }
        });

        t.field('deleteStory', {
            type: Story,
            description: 'Delete Story',
            nullable: true,
            args: { id: idArg() },
            resolve: async (parent, { id }) => await StoryModel.findByIdAndDelete(id)
        });

    }
})