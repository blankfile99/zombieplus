"use strict";

const { Router } = require('express');

const authModule = require('./app/middlewares/auth');
const auth = authModule.default || authModule;

const SessionController = require('./app/controllers/SessionController');
const CompanyController = require('./app/controllers/CompanyController');
const FeaturedController = require('./app/controllers/FeaturedController');
const MovieController = require('./app/controllers/MovieController');
const TvShowController = require('./app/controllers/TvShowController');
const LeadController = require('./app/controllers/LeadController');

const SessionStoreValidator = require('./app/validators/SessionStoreValidator');
const PKValidator = require('./app/validators/PKValidator');
const MovieCreateValidator = require('./app/validators/MovieCreateValidator');
const TvShowCreateValidator = require('./app/validators/TvShowCreateValidator');
const LeadCreateValidator = require('./app/validators/LeadCreateValidator');

const sessionController = SessionController.default || SessionController;
const companyController = CompanyController.default || CompanyController;
const featuredController = FeaturedController.default || FeaturedController;
const movieController = MovieController.default || MovieController;
const tvShowController = TvShowController.default || TvShowController;
const leadController = LeadController.default || LeadController;

const sessionStoreValidator = (SessionStoreValidator.default || SessionStoreValidator);
const pkValidator = (PKValidator.default || PKValidator);
const movieCreateValidator = (MovieCreateValidator.default || MovieCreateValidator);
const tvShowCreateValidator = (TvShowCreateValidator.default || TvShowCreateValidator);
const leadCreateValidator = (LeadCreateValidator.default || LeadCreateValidator);

const routes = Router();

routes.post('/sessions', sessionStoreValidator, sessionController.store);
routes.get('/companies', auth, companyController.index);
routes.get('/movies', auth, movieController.index);
routes.post('/movies', auth, movieCreateValidator, movieController.store);
routes.get('/movies/:id', auth, pkValidator, movieController.show);
routes.delete('/movies/:id', auth, pkValidator, movieController.delete);

routes.get('/tvshows', auth, tvShowController.index);
routes.post('/tvshows', auth, tvShowCreateValidator, tvShowController.store);
routes.get('/tvshows/:id', auth, pkValidator, tvShowController.show);
routes.delete('/tvshows/:id', auth, pkValidator, tvShowController.delete);

routes.get('/leads', auth, leadController.index);
routes.post('/leads', leadCreateValidator, leadController.store);
routes.get('/leads/:id', auth, pkValidator, leadController.show);
routes.delete('/leads/:id', auth, pkValidator, leadController.delete);

routes.get('/catalog', featuredController.index);

module.exports = routes;
