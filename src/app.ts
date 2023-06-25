import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo por el puerto http://localhot:${PORT}`)
})
