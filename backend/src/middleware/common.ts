import express from 'express';
import { routes as caserouter } from '../router/routes';
import {routes as caseroutes} from '../router/Caseroutes';
import {app} from '../config/applicationconfig';
export const CommonMiddleware  =  () => {
    app.use('/',caserouter);
    app.use('/cases',caseroutes);
}