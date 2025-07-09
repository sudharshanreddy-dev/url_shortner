import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./src/utils/db.js";
import short_url_route from "./src/routes/short_url.route.js";


dotenv.config();

//constants
const PORT = process.env.PORT || 3000;


//express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use('/api',short_url_route);

//starting server

const start_server = () => {
    connectDB()
        .then(() => {

            app.listen(PORT, () => {
                console.log('app is running on http://localhost:3000');
            })
        })
        .catch((error) => {
            console.error(error);
        })
}

start_server();
