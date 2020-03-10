import expressJwt from 'express-jwt';
import { config } from '../Config';
export const checkJwt = expressJwt({
    secret: config.JWT.secret
});
