var path = "assets/";

$LAB
  .script(path + 'bower/underscore/underscore.js').wait()
  .script(path + 'bower/jquery/dist/jquery.js').wait()
  .script(path + 'bower/bootstrap/dist/js/bootstrap.js').wait()
  .script(path + 'bower/backbone/backbone.js').wait()
  .script(path + 'bower/marionette/lib/backbone.marionette.js').wait(function () {
    window.App = new Backbone.Marionette.Application();
  })
  .script(path + 'js/app.js').wait()
  .wait(function () {
    App.start();
  });