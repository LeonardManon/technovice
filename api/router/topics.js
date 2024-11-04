import { Router } from 'express';
import { topicController } from '../controllers/topicsController.js';
import validators from '../middlewares/validator.js';

const topicRouter = Router();

// SUBJECT IN THE FORUM

// get all topics
topicRouter.get('/api/topics', topicController.getAllTopics);

// geta topic by id
topicRouter.get('/api/topics/:topic_id(\\d+)', topicController.getOneTopicById);

// create a topic
topicRouter.post('/api/topics',validators('topics'), topicController.createTopic);

// update a topic
topicRouter.patch('/api/topics/:topic_id(\\d+)', topicController.updateTopic);

// delete a topic
topicRouter.delete('/api/topics/:topic_id(\\d+)', topicController.deleteTopic);

export { topicRouter };