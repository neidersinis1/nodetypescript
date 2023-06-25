import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
const app = express()

app.use(cors())

const PORT = process.env.PORT || 3002

app.use(router)

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo por el puerto http://localhot:${PORT}`)
})
