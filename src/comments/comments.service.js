const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments")
    .join("users", "comments.user_id", "users.user_id")
    .select("users.user_email as commenter_email")
    .count("comments.comment_id as comment_count")
    .groupBy("users.user_email")
    .orderBy("users.user_email");
}


function read(commentId) {
  return knex("comments")
    .select("comments.comment_id", "comments.comment", "users.user_email as commenter_email", "posts.post_body as commented_post")
    .join("users", "comments.user_id", "users.user_id")
    .join("posts", "comments.post_id", "posts.post_id")
    .where("comments.comment_id", commentId)
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};