
// TIME.JS
// 2016-03-08
// v0.1.0

var Time = Events.extend(function(base) {
  return {
    
    init: function(time, name) {
      base.init.apply(this, arguments);

      this.animation = true;
      this.name = name;
      this.time = moment(time * 1000);
    },

    offset: function(time) {
      if(!time) time = moment();

      return moment.duration(this.time.diff(time));
    },

    update_value: function(root, value) {
      if(!this.animation) {
        root.find('.value-1').addClass('to-bottom');
        root.find('.value-0').text(value);
        return;
      }
      
      var current = root.attr('data-current');
      var current_value = root.find('.value-' + current).text();

      if(current_value != value) {
        
        root.find('.value-' + current).removeClass('to-top to-bottom');
        root.find('.value-' + current).addClass('to-top');

        (function(c) {
          setTimeout(function() {
            root.find('.value-' + c).addClass('to-bottom');
          }, 300);
        })(current);
        
        current = 1 - current;
        root.attr('data-current', current);

        root.find('.value-' + current).removeClass('to-top to-bottom');
        root.find('.value-' + current).text(value);
      }
    },
    
    update_timer: function(root) {
      root = $(root);

      if(root.find('.time-name').text() != this.name)
        root.find('.time-name').text(this.name);
      
      var offset = this.offset();

      var days    = Math.floor(Math.abs(offset.asDays()));
      var hours   = lpad(Math.abs(offset.hours()), 2);
      var minutes = lpad(Math.abs(offset.minutes()), 2);
      var seconds = lpad(Math.abs(offset.seconds()), 2);

      if(offset.asSeconds() > 0)
        root.find('.time-sign').text('-');
      else
        root.find('.time-sign').text('+');

      this.update_value(root.find('.time-days'), days);
      this.update_value(root.find('.time-hours'), hours);
      this.update_value(root.find('.time-minutes'), minutes);
      this.update_value(root.find('.time-seconds'), seconds);

//      root.find('.time-days    .value').text(days);
//      root.find('.time-hours   .value').text(hours);
//      root.find('.time-minutes .value').text(minutes);
//      root.find('.time-seconds .value').text(seconds);
      
      root.find('.time-date .date').text(this.time.format('DD MMMM YYYY'));
      root.find('.time-date .time').text(this.time.format('h:mm:ss a'));
    }

  };
});

