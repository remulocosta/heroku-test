module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = (req, res) => {
    const evaluation = { ...req.body };
    if (req.params.id) evaluation.id = req.params.id

    try {
      existsOrError(evaluation.description, 'Descreva a sua postagem.');
      existsOrError(evaluation.image_url, "Envie a foto ou vídeo.")
    } catch (msg) {
      return res.status(400).send(msg)
    }

    if (evaluation.id) {
      app.db('evaluations')
        .update(evaluation)
        .where({ id: evaluation.id })
        .whereNull('deletedAt')
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      app.db('evaluations')
        .insert(evaluation)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  };

  // const get = (req, res) => {
  //   app.db('evaluations')
  //     .select('review', 'rate', 'userId', 'postId')
  //     .whereNull('deletedAt')
  //     .then(evaluations => res.json(evaluations))
  //     .catch(err => res.status(500).send(err))
  // };

  const getById = (req, res) => {
    app.db('evaluations')
      .select('review', 'rate', 'userId', 'postId')
      .where({ id: req.params.id })
      .whereNull('deletedAt')
      .first()
      .then(evaluation => res.json(evaluation))
      .catch(err => res.status(500).send(err))
  };

  // const remove = async (req, res) => {
  //   try {
  //     const users = await app.db('users')
  //       .where({ userId: req.params.id })
  //     notExistsOrError(users, 'Avaliação possue usuário.')
  //     const posts = await app.db('posts')
  //       .where({ postId: req.params.id })
  //     notExistsOrError(posts, 'Avaliação possue postagem.')

  //     const rowsUpdate = await app.db('users', 'post')
  //       .update({ deletedAt: new Date() })
  //       .where({ id: req.params.id })
  //     existsOrError(rowsUpdate, 'Avaliação não foi encontrada.')

  //     res.status(204).send();
  //   } catch (msg) {
  //     res.status(400).send(msg);
  //   }
  // };

  return { save, getById };
}
