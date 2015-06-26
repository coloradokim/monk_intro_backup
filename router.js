var routes = require('routes') (),
    fs = require('fs'),
    db = require('monk') ('localhost/music'),
    bands = db.get('bands'),
    qs = require('qs');

//to display the index
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
  //to post information from the "new band" form
  if (req.method === 'POST') {
    var data = ''
    req.on('data', function(chunk) {
      data += chunk
    })
  req.on('end', function () {
    var band = qs.parse(data)
    bands.insert(band, function (err, doc) {
      if (err) throw err
      res.writeHead(302, {'Location': '/bands'})
      res.end()
      })
    })
  }
})
//to GET the new band form
routes.addRoute('/bands/new', function (req, res, url) {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    fs.readFile('templates/bands/new.html', function (err, file) {
      if (err) throw err
      res.end(file.toString())
    })
}
})

//to display all band names in the data base, and ensure they have a link, and URL that is /bands/:id
routes.addRoute('/bands/:id', function (req, res, url) {
      if (req.method === 'GET') {
        bands.findOne({_id: url.params.id}, function (err, doc) {
          if (err) throw err
          res.end(doc.name)
        })
      }
    })

    module.exports = routes
