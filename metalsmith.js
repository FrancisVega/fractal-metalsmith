var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var excerpts    = require('metalsmith-excerpts');
var collections = require('metalsmith-collections');
var twig        = require('metalsmith-twig');

Metalsmith(__dirname)
  .metadata({
    title: "title",
    description: "description",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(collections({
    posts: {
      pattern: 'posts/*.md'
    }
  }))
  .use(markdown())
  .use(excerpts())
  .use(permalinks())
  .use(twig({
    directory: 'layouts',
    cache: false
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
