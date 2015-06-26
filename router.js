var routes = require('routes')(),
    fs = require('fs'),
    // Configure Monk Driver in the router
    db = require('monk')('localhost/music'),
    bands = db.get('bands');

routes.addRoute('/bands', function(req, res, url) {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    // Find a collection for the index page
    bands.find({}, function(err, docs) {
      console.log(docs);
    })
    // Accumulate documents into a string template
    bands.find({}, function(err, docs) {
    var template = ''
      docs.forEach(function(docs){
        template += '<h2>' + doc.name + '</h2>'
      })
      res.end(template)
      })
    }
  })
module.exports = routes
