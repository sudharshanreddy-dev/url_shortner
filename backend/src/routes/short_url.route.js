import {Router} from 'express';
import {create_short_url} from "../controllers/short_url.controller.js";

const short_url_route = Router();

short_url_route.get('/', create_short_url);


export default short_url_route;