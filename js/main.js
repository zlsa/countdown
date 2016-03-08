
var Main = Events.extend(function(base) {
  return {
    
    init: function() {
      base.init.apply(this, arguments);
      
      this.init_loader();

      this.init_extra_values();

      this.time = new Time(1459468800, 'SpaceX CRS-8');

      this.update_time();
      
    },

    init_extra_values: function() {
      var root = $('#timer');

      root.find('.value').replaceWith($('<span class="value value-0"></span><span class="value value-1"></span>'));
      root.find('.has-value').attr('data-current', '0');
    },

    init_loader: function() {
      this.loader = new Loader();
      
      this.loader.on('finished', with_scope(this, this.loaded));
    },

    update_time: function() {
      this.time.update_timer($('#timer'));
      
      var main = this;
      
      setTimeout(function() {
        main.update_time.call(main);
      }, 500);
    }

  };
});

var m;

$(document).ready(function() {
  m = new Main();
});
