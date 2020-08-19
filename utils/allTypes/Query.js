import { queryType, idArg } from '@nexus/schema';
import { Story } from './Story'
import { connectDB } from '../connectDB'
import StoryModel from '../../models/Story'
import { ApolloError } from 'apollo-server-micro';

connectDB();

export const Query = queryType({
    definition(t) {
        t.typeName = 'SingleStory'
        t.list.field('stories', {
            type: Story,
            description: 'GET Stories',
            resolve: async () => {
                try {
                    return await StoryModel.find();
                } catch (err) {
                    console.error(err);
                    return new ApolloError('Server error', 500);
                }
            }
        });

        t.field('story', {
            type: Story,
            description: 'GET Single Story',
            nullable: true,
            args: { id: idArg() },
            resolve: async (parent, { id }) => {
                try {
                    const story = await StoryModel.findById(id);
                    if (!story) {
                        return new ApolloError('Story does not exists', 400);
                    }
                    return story;
                } catch (err) {
                    console.error(err);
                    return new ApolloError('Story does not exists', 400);
                }
            }
        });
    }
})