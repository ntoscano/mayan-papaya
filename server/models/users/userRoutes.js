var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js
  app.put('/', userController.updateScore);
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);

  app.get('/profile', userController.getUserData);
};

