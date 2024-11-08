import { Router } from 'express';
import { watchesController } from '../controllers/watchesController.js';

const watchesRouter = Router();

// Obtenir les cours commencés par un utilisateur
watchesRouter.get('/api/watches/users/:user_id(\\d+)', watchesController.getAllWatchesByUserId);

// Ajouter un cours à la liste des cours commencés
watchesRouter.post(
    '/api/watches/courses/:course_id(\\d+)/users/:user_id(\\d+)',
    watchesController.createWatch,
);

// Supprimer un cours commencé (parce qu'on l'a fini en fait tavu)
watchesRouter.delete(
    '/api/watches/courses/:course_id(\\d+)/users/:user_id(\\d+)',
    watchesController.deleteWatch,
);

export { watchesRouter };
