import expressJwt from "express-jwt";
import { config } from '../config';
export const checkJwt = expressJwt({
    secret: config.JWT.secret
});
