const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
  const users = await service.list();
  res.json({ data: users });
}
async function read(req, res) {
  const userEmail = req.params.userEmail; // Assuming you use userEmail as the route parameter
  const user = await service.read(userEmail);

  if (!user) {
    return res.status(404).json({ error: 'User cannot be found' });
  }

  res.json({ data: user });
}


module.exports = {
  list: asyncErrorBoundary(list),
  read,
};
