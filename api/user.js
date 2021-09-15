const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');

module.exports = app => {
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    ageVerification,
    strongPassword
  } = app.api.validation;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  const save = async (req, res) => {
    const user = { ...req.body }
    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, 'Usuário não informado.')
      ageVerification(user.age, 'Idade menor que 18 anos.')
      existsOrError(user.city, 'Cidade não informada.')
      existsOrError(user.email, 'E-mail não informado.')
      strongPassword(user.password, 'A senha precisa de ao menos 6 caracteres.')
      existsOrError(user.confirmPassword, 'Confirme a senha!')
      equalsOrError(user.password, user.confirmPassword,
        'As senhas não conicidem.')

        const userFromDB = await app.db('users')
          .where({ email: user.email }).first()
          if (!user.id) {}
          notExistsOrError(userFromDB, 'E-mail já cadastrado.')
    } catch(msg) {
      res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);
    delete user.confirmPassword

    if (user.id) {
      app.db('users')
        .update(user)
        .where({ id: user.id })
        .whereNull('deletedAt')
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      app.db('users')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const get = (req, res) => {
    app.db('users')
      .select('id', 'name', 'age', 'city', 'email')
      .whereNull('deletedAt')
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err))
  }

  const getById = (req, res) => {
    app.db('users')
      .select('id', 'name', 'age', 'city', 'email')
      .where({ id: req.params.id })
      .whereNull('deletedAt')
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err))
  }

  const remove = async (req, res) => {
    try {
      const posts = await app.db('posts')
        .where({ userId: req.params.id })
      notExistsOrError(posts, 'Usuário possue postagens.')

      const rowsUpdate = await app.db('users')
        .update({ deletedAt: new Date() })
        .where({ id: req.params.id })
      existsOrError(rowsUpdate, 'Usuário não foi encontrado.')

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }

  return { save, get, getById };
  }

  return { save, get, getById, remove };
}
