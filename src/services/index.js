import { students } from './students.js'

import { users } from './users.js'

export const services = (app) => {
  app.configure(students)
  app.configure(users)
  // All services will be registered here
}
