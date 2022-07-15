import serveStatic from 'koa-static'
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import {
  koa,
  rest,
  bodyParser,
  errorHandler,
  parseAuthentication,
} from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import { configurationSchema } from './schemas/configuration.schema.js'
import { logErrorHook } from './logger.js'
import { sqlite } from './sqlite.js'

import { authentication } from './authentication.js'

import { services } from './services/index.js'
import { channels } from './channels.js'

const app = koa(feathers())

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationSchema))

// Set up Koa middleware
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())

// Configure services and transports
app.configure(rest())
app.configure(socketio())
app.configure(sqlite)

app.configure(authentication)

app.configure(services)
app.configure(channels)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logErrorHook],
  },
  before: {},
  after: {},
  error: {},
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: [],
})

export { app }
