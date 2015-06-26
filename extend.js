var routes = require('routes')(),
    fs = require('fs'),
    // Configure Monk Driver in the router
    db = require('monk')('localhost/music'),
    music = db.get('music');

routes.addRoute('/music', function(req, res, url) {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    var template = ''
    music.find({}, function(err, docs) {
      if (err) res.end('Broken')
      docs.forEach(function(band){
        template += '<h2><a href ="/bands' + doc._id + '">' + doc.name + '</h2>'
      })
      res.end(template)
    })
  }
})

routes.addRoute('/bands/:id', function (req, res, url) {
  console.log(url.params.id)
})

module.exports = routes
