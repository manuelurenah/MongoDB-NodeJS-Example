const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/MainController'),
    userController = require('./controllers/userController'),
    messagesController = require('./controllers/MessagesController'),
    commentsController = require('./controllers/CommentsController');

module.exports = router;

router.get('/', mainController.showHome);

router.get('/user/login', userController.loginUser);
router.post('/user/login', userController.processLogin);
router.get('/user/register', userController.createUser);
router.post('/user/register', userController.processCreate);
router.get('/logout', userController.logoutUser);

router.get('/messages', messagesController.showMessages);
router.get('/messages/add', messagesController.addMessages);
router.post('/messages/add', messagesController.saveMessage);
router.get('/messages/top', messagesController.topMessages);
router.get('/messages/:id', messagesController.viewMessage);
router.get('/messages/:id/delete', messagesController.deleteMessage);

router.post('/comments/add', commentsController.addComment);
router.get('/comments/top', commentsController.topWords);
