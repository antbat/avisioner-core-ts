import expressJwt from 'express-jwt';
import { config } from '../IConfig';
export const checkJwt = expressJwt({
    secret: config.JWT.secret
});
