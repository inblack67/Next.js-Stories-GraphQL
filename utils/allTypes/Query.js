import { queryType } from '@nexus/schema';
import { Story } from './Story'
import { connectDB } from '../connectDB'
import StoryModel from '../../models/Story'
// import { editDB } from '../editDB'

connectDB();
// editDB();

export const Query = queryType({
    definition(t) {
        t.list.field('stories', {
            type: Story,
            description: 'GET Stories',
            resolve: async () => {
                const stories = await StoryModel.find()
                return stories;
            }
        })
    }
})