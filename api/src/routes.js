"use strict";

const { Router } = require('express');
const multer = require('multer');

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
const uploadConfigModule = require('./config/upload');
const uploadConfig = uploadConfigModule.default || uploadConfigModule;
const upload = multer(uploadConfig);

const sessionController = SessionController.default || SessionController;
const companyController = CompanyController.default || CompanyController;
const featuredController = FeaturedController.default || FeaturedController;
const movieController = MovieController.default || MovieController;
const tvShowController = TvShowController.default || TvShowController;
const leadController = LeadController.default || LeadController;

const sessionStoreValidator = SessionStoreValidator.default || SessionStoreValidator;
const pkValidator = PKValidator.default || PKValidator;
const movieCreateValidator = MovieCreateValidator.default || MovieCreateValidator;
const tvShowCreateValidator = TvShowCreateValidator.default || TvShowCreateValidator;
const leadCreateValidator = LeadCreateValidator.default || LeadCreateValidator;

const routes = Router();

routes.post('/sessions', sessionStoreValidator, sessionController.store.bind(sessionController));
routes.get('/companies', auth, companyController.index.bind(companyController));
routes.get('/movies', auth, movieController.index.bind(movieController));
routes.post('/movies', auth, upload.single('cover'), movieCreateValidator, movieController.store.bind(movieController));
routes.get('/movies/:id', auth, pkValidator, movieController.show.bind(movieController));
routes.delete('/movies/:id', auth, pkValidator, movieController.delete.bind(movieController));

routes.get('/tvshows', auth, tvShowController.index.bind(tvShowController));
routes.post('/tvshows', auth, upload.single('cover'), tvShowCreateValidator, tvShowController.store.bind(tvShowController));
routes.get('/tvshows/:id', auth, pkValidator, tvShowController.show.bind(tvShowController));
routes.delete('/tvshows/:id', auth, pkValidator, tvShowController.delete.bind(tvShowController));

routes.get('/leads', auth, leadController.index.bind(leadController));
routes.post('/leads', leadCreateValidator, leadController.store.bind(leadController));
routes.get('/leads/:id', auth, pkValidator, leadController.show.bind(leadController));
routes.delete('/leads/:id', auth, pkValidator, leadController.delete.bind(leadController));

routes.get('/catalog', featuredController.index.bind(featuredController));

module.exports = routes;
