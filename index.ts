import express from 'express';
import bodyParser from 'body-parser';



import { AdminRoute, VendorRoute, HomeRoute } from './routes'
import { connectDB } from './config/database'


const app = express();

connectDB()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))




// Middleware
app.use('/', HomeRoute)
app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)







app.listen(8000, () => {
    console.log('App is listening on the port 8000')
})