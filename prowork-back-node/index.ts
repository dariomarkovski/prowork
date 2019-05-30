import express from "express";
import passport from 'passport';
import { jwtOptions } from "./src/config/config";
import Sequelize from './src/models/index';
import User from './src/models/User.model';
import { accessRouter } from "./src/routes/access";
import { commentRouter } from "./src/routes/comment";
import { issueRouter } from "./src/routes/issue";
import { userRouter } from "./src/routes/user";
const cors = require('cors');
import bodyParser = require("body-parser");
const JwtStrategy = require('passport-jwt').Strategy;

const models = Sequelize.models;

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload: any, done: any) => {
    let user = await User.findOne({ where: { username: jwt_payload.username } });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));
let passportHandler = passport.initialize();

let app = express();
app.use(passportHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/api/access', accessRouter);
app.use('/api/user', userRouter);
app.use('/api/issue', issueRouter);
app.use('/api/comment', commentRouter);

app.listen(8080, () => {
    console.log('Listening on port 8080');
})