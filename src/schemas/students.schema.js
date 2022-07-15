import { schema, querySyntax } from '@feathersjs/schema'

// Schema for the basic data model (e.g. creating new entries)
export const studentsDataSchema = schema({
  $id: 'StudentsData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    text: {
      type: 'string',
    },
  },
})

// Schema for making partial updates
export const studentsPatchSchema = schema({
  $id: 'StudentsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...studentsDataSchema.properties,
  },
})

// Schema for the data that is being returned
export const studentsResultSchema = schema({
  $id: 'StudentsResult',
  type: 'object',
  additionalProperties: false,
  required: [...studentsDataSchema.required, 'id'],
  properties: {
    ...studentsDataSchema.properties,
    id: {
      type: 'string',
    },
  },
})

// Schema for allowed query properties
export const studentsQuerySchema = schema({
  $id: 'StudentsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(studentsResultSchema.properties),
  },
})
