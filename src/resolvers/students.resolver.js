import { resolve } from '@feathersjs/schema'
import {
  studentsDataSchema,
  studentsPatchSchema,
  studentsResultSchema,
  studentsQuerySchema,
} from '../schemas/students.schema.js'

// Resolver for the basic data model (e.g. creating new entries)
export const studentsDataResolver = resolve({
  schema: studentsDataSchema,
  validate: 'before',
  properties: {},
})

// Resolver for making partial updates
export const studentsPatchResolver = resolve({
  schema: studentsPatchSchema,
  validate: 'before',
  properties: {},
})

// Resolver for the data that is being returned
export const studentsResultResolver = resolve({
  schema: studentsResultSchema,
  validate: false,
  properties: {},
})

// Resolver for query properties
export const studentsQueryResolver = resolve({
  schema: studentsQuerySchema,
  validate: 'before',
  properties: {},
})

// Export all resolvers in a format that can be used with the resolveAll hook
export const studentsResolvers = {
  result: studentsResultResolver,
  data: {
    create: studentsDataResolver,
    update: studentsDataResolver,
    patch: studentsPatchResolver,
  },
  query: studentsQueryResolver,
}
