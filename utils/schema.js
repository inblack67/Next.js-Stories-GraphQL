import { makeSchema } from '@nexus/schema';
import * as types from './allTypes'
import path from 'path'

export const schema = makeSchema({
    types,
    outputs: {
        schema: path.join(process.cwd()) + "/generated/schema.graphql",
        typegen: path.join(process.cwd()) + "/generated/typings.ts",
    },
})