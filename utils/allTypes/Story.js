import { objectType } from '@nexus/schema';

export const Story = objectType({
    name: 'Story',
    definition(t){
        t.string('title');
        t.string('description');
        t.id('_id');
    }
})