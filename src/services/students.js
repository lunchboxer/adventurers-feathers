import { KnexService } from '@feathersjs/knex'

import { resolveAll } from '@feathersjs/schema'
import { authenticate } from '@feathersjs/authentication'
import { studentsResolvers } from '../resolvers/students.resolver.js'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class StudentsService extends KnexService {}

export const hooks = {
  around: {
    all: [authenticate('jwt'), resolveAll(studentsResolvers)],
  },
  before: {},
  after: {},
  error: {},
}

// A configure function that registers the service and its hooks via `app.configure`
export function students(app) {
  const options = {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'students'
    // Service options will go here
  }

  // Register our service on the Feathers application
  app.use('students', new StudentsService(options), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service('students').hooks(hooks)
}
