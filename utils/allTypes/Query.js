import { queryType, idArg } from '@nexus/schema';
import { Story } from './Story'
import { connectDB } from '../connectDB'
import StoryModel from '../../models/Story'

connectDB();

export const Query = queryType({
    definition(t) {
        t.typeName = 'SingleStory'
        t.list.field('stories', {
            type: Story,
            description: 'GET Stories',
            resolve: async () => await StoryModel.find()
        });

        t.field('story', {
            type: Story,
            description: 'GET Single Story',
            nullable: true,
            args: { id: idArg() },
            resolve: async (parent, { id }) => await StoryModel.findById(id)
        });
    }
})