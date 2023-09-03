const service = require("./comments.service");
const userService = require('../users/users.service')
const postService = require('../posts/posts.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function commentExists(req, res, next) {
  const { commentId } = req.params;
  const comment = await service.read(commentId);
  if (comment) {
    res.locals.comment = comment;
    return next();
  }
  return next({ status: 404, message: `Comment cannot be found.` });
}

async function list(req, res) {
  const comments = await service.list();
  res.json({ data: comments });
}


async function listCommenterCount(req, res) {
  const commenterCount = await service.listCommenterCount();
  res.json({ data: commenterCount });
}

async function read(req, res) {
  const commentId = req.params.commentId;
  const comment = await service.read(commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment cannot be found' });
  }

  // Fetch the related user and post data
  const userData = await userService.read(comment.commenter_id); // Assuming you have a UserService to fetch user data
  const postData = await postService.read(comment.post_id); // Assuming you have a PostService to fetch post data

  // Combine the data into a response object
  const responseData = {
    comment_id: comment.comment_id,
    comment: comment.comment,
    commented_post: postData.post_body,
    commenter_email: userData.user_email,
  };

  res.json({ data: responseData });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listCommenterCount: asyncErrorBoundary(listCommenterCount),
  read: [asyncErrorBoundary(commentExists), read],
};
