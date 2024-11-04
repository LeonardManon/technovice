import { Router } from 'express';
import { watchesController } from '../controllers/watchesController.js';

const watchesRouter = Router();

// get all watches
watchesRouter.get('/api/watches/users/:user_id(\\d+)', watchesController.getAllWatchesByUserId);

// add a course to the list of courses started by a user
watchesRouter.post(
    '/api/watches/courses/:course_id(\\d+)/users/:user_id(\\d+)',
    watchesController.createWatch,
);

// delete a course from the list of courses started by a user
watchesRouter.delete(
    '/api/watches/courses/:course_id(\\d+)/users/:user_id(\\d+)',
    watchesController.deleteWatch,
);

export { watchesRouter };
