const knex = require("../db/connection");

function list() {
  return knex('users').select('user_email'); // Exclude password for security
}
function read(userId) {
  return knex('users')
    .select('user_email') // Assuming you want to fetch the user's email
    .where({ user_id: userId })
    .first();
}

module.exports = {
  list,
  read,
};
