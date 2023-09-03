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
  const { data } = req.body;
  const newPost = await service.create(data);
  res.status(201).json({ data: newPost[0] });
}

async function update(req, res) {
  const postId = req.params.postId;
  const { data } = req.body;
  const updatedPost = await service.update(postId, data);
  res.json({ data: updatedPost[0] });
}

async function deletePost(req, res) {
  const postId = req.params.postId;
  await service.destroy(postId);
  res.status(204).json();
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(deletePost)],
};
