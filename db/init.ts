require('dotenv').config()

import { User } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    User.sync({ alter: false, force: false }),
])

export default dbInit