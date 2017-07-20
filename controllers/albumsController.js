function index (req, res) {
  res.json(albums)
}

module.exports = {
  index: index
//  ,
//  create: create,
//  show: show,
//  destroy: destroy,
//  update: update
}
