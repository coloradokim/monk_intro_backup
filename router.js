var routes = require('routes')(),
    fs = require('fs'),
    // Configure Monk Driver in the router
    db = require('monk')('localhost/music'),
    music = db.get('music');

routes.addRoute('/music', function(req, res, url) {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    // Find a collection for the index page
    music.find({}, function(err, docs) {
      var template = ''
      docs.forEach(function(band){
        template += '<h2>' + band.name + '</h2>'
      })
      res.end(template)
      })
    }
  })
module.exports = routes
