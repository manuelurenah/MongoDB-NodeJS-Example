const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/MainController'),
    userController = require('./controllers/userController'),
    commentsController = require('./controllers/CommentsController');

module.exports = router;

router.get('/', mainController.showHome);

router.get('/user/login', userController.loginUser);
router.post('/user/login', userController.processLogin);
router.get('/user/register', userController.createUser);
router.post('/user/register', userController.processCreate);
router.get('/logout', userController.logoutUser);

router.get('/comments', commentsController.showComments);
router.get('/comments/seed', commentsController.seedComments);
router.get('/comments/add', commentsController.addComments);
router.post('/comments/add', commentsController.saveComment);
router.get('/comments/:id/delete', commentsController.deleteComment);
