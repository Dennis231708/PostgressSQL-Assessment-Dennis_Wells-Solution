const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  const { body } = req;
  const newPost = await service.create(body);
  res.status(201).json({ data: newPost });
}

async function update(req, res) {
  const { postId } = req.params;
  const { body } = req;

  const updatedPost = await service.update(postId, body);

  res.json({ data: updatedPost });
}

async function destroy(req, res) {
  const { postId } = req.params;

  const deleted = await service.destroy(postId);

  if (deleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};