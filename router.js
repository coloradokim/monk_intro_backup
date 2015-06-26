var routes = require('routes') (),
    fs = require('fs'),
    db = require('monk') ('localhost/music'),
    bands = db.get('bands');

routes.addRoute('/bands', function (req, res, url) {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {

  var template = ''
  bands.find({}, function(err, docs) {
    if (err) throw err
    docs.forEach(function(doc) {
      template += '<h2><a href="/bands/' + doc._id + ' ">' + doc.name + '</a></h2>'
    })
    res.end(template)
    })
  }
})
    routes.addRoute('/bands/:id', function (req, res, url) {
      if (req.method === 'GET') {
        bands.findOne({_id: url.params.id}, function (err, doc) {
          if (err) throw err
          res.end(doc.name)
        })
      }
    })

    module.exports = routes
