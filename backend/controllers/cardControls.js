const Card = require('../models/Card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        const owner = card.owner.toString();
        if (owner !== req.user._id) {
          next(new ForbiddenError('Можно удалять только свою карточку'));
        } else {
          return card;
        }
      }
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      Card.findByIdAndRemove(card._id.toString())
        .then(() => res.send(card))
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)

  .then((likes) => {
    if (likes) {
      res.send(likes);
    } else {
      next(new NotFoundError('id не найден'));
    }
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((likes) => {
    if (likes) {
      res.send(likes);
    } else {
      next(new NotFoundError('id не найден'));
    }
  })
  .catch(next);
