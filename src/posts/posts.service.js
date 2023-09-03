const knex = require("../db/connection");

function create(newPost) {
  return knex('posts').insert(newPost).returning('*');
}
function read(postId) {
  return knex('posts')
    .select('post_body') // Assuming you want to fetch the post's body/content
    .where({ post_id: postId })
    .first();
}

function update(postId, updatedPost) {
  return knex('posts')
    .where({ post_id: postId })
    .update(updatedPost)
    .returning('*');
}

function destroy(postId) {
  return knex('posts').where({ post_id: postId }).del();
}

module.exports = {
  create,
  read,
  update,
  destroy,
};
