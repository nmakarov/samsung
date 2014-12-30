App.addInitializer(function () {

  // define model
  App.Device = Backbone.Model.extend({});

  // define collection
  App.Devices = Backbone.Collection.extend({
    model: App.Device,
    showTablet: false,

    url: function () {
      var url = '/assets/json/' + (this.showTablet ? 'tablets.json' : 'phones.json');
      return url;
    }
  });

  // define device view
  App.DeviceView = Marionette.ItemView.extend({
    template: '#device-template',

    initialize: function () {
      this.$el.on("click", _.bind(this.showDetails, this));
    },

    showDetails: function () {
      var $popup = $('#myModal');
      $popup.find('#modal-title').text(this.model.get('title'));
      $popup.find('#modal-description').text(this.model.get('description'));
      $popup.find('#modal-img').attr('src', '/assets/' + this.model.get('img_url'));
      $popup.modal();
    }
  });

  // define collection view
  App.DeviceList = Marionette.CollectionView.extend({
    template: false,
    el: '.device-list',
    childView: App.DeviceView,
  });

  // define tabs view
  App.TabView = Marionette.ItemView.extend({
    template: false,
    el: '.nav-tabs',

    ui: {
      phones: '#phones',
      tablets: '#tablets'
    },

    triggers: {
      'click @ui.phones': 'phonesClicked',
      'click @ui.tablets': 'tabletsClicked'
    },

    onPhonesClicked: function () {
      this.options.collection.showTablet = false;
      this.options.collection.fetch();
      this.ui.phones.addClass('active');
      this.ui.tablets.removeClass('active');
    },
    onTabletsClicked: function () {
      this.options.collection.showTablet = true;
      this.options.collection.fetch();
      this.ui.tablets.addClass('active');
      this.ui.phones.removeClass('active');
    },
  });

  // instantiate collection
  var devices = new App.Devices();

  // bind tabs view
  (new App.TabView({collection: devices})).render();

  // fetch json and bind/render devices view
  devices.fetch().then(function () {
    (new App.DeviceList ({
      collection: devices,
    })).render();
  });


});
