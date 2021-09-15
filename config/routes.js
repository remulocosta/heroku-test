module.exports = app => {
  app.post('/signup', app.api.user.save)
    .post('/signin', app.api.auth.signin)
    .post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.get)

  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(app.api.user.save)
    .get(app.api.user.getById)
    .delete(app.api.user.remove)
    
  app.route('/posts')
    .all(app.config.passport.authenticate())
    .post(app.api.post.save)
    .get(app.api.post.get)

  app.route('/posts/:id')
    .all(app.config.passport.authenticate())
    .put(app.api.post.save)
    .get(app.api.post.getById)
    .delete(app.api.post.remove)
    
  app.route('/evaluations')
    .all(app.config.passport.authenticate())
    .post(app.api.evaluation.save)
    .get(app.api.evaluation.getById)

  app.route('/evaluations/:userId/:postId')
    .all(app.config.passport.authenticate())
    .put(app.api.evaluation.save)
}
