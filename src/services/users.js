import { KnexService } from '@feathersjs/knex'

import { resolveAll } from '@feathersjs/schema'
import { authenticate } from '@feathersjs/authentication'
import { usersResolvers } from '../resolvers/users.resolver.js'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UsersService extends KnexService {}

export const hooks = {
  around: {
    all: [],
    get: [authenticate('jwt'), resolveAll(usersResolvers)],
    find: [authenticate('jwt'), resolveAll(usersResolvers)],
    create: [resolveAll(usersResolvers)],
    patch: [authenticate('jwt'), resolveAll(usersResolvers)],
    update: [authenticate('jwt'), resolveAll(usersResolvers)],
    remove: [authenticate('jwt'), resolveAll(usersResolvers)],
  },
  before: {},
  after: {},
  error: {},
}

// A configure function that registers the service and its hooks via `app.configure`
export function users(app) {
  const options = {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'users'
    // Service options will go here
  }

  // Register our service on the Feathers application
  app.use('users', new UsersService(options), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service('users').hooks(hooks)
}
