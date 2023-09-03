const knex = require("../db/connection");


function list() {
  return knex('comments').select('*');
}


function listCommenterCount() {
  return knex('comments')
    .select(
      knex.raw('users.user_email as commenter_email'),
      knex.raw('cast(count(comments.comment_id) as integer) as count')
    )
    .join('users', 'comments.commenter_id', 'users.user_id')
    .groupBy('commenter_email')
    .orderBy('commenter_email');
}


function read(commentId) {
  return knex('comments')
    .select(
      'comments.comment_id',
      'comments.comment',
      'comments.commenter_id',
      'comments.post_id'
      // Add other columns as needed
    )
    .where('comments.comment_id', commentId)
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
