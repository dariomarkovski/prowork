const ExtractJwt = require('passport-jwt').ExtractJwt;
export const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secrets'
};