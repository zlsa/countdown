
// TIME.JS
// 2016-03-08
// v0.1.0

var Time = Events.extend(function(base) {
  return {
    
    init: function(time, name) {
      base.init.apply(this, arguments);

      this.animation = true;
      this.name = name || 'Countdown';
      this.time = moment((time || Date.now() / 1000) * 1000);
    },

    from_url: function(url) {
      var args = URI(url).search(true);
      var hash = URI(url).hash();

      if('name' in args) this.name = args.name;
      if('unix' in args) this.time = moment(args.unix * 1000);

      if(hash) {
        var split = null;
        if(hash.indexOf(':') >= 0)
          split = hash.indexOf(':');

        if(split) {
          this.name = hash.substr(1, split - 1);
          this.time = moment(parseInt(hash.substr(split + 1)) * 1000);
        } else {
          this.time = moment(parseInt(hash.substr(1, split)) * 1000);
        }
      }
      
    },
    
    offset: function(time) {
      if(!time) time = moment();

      return moment.duration(this.time.diff(time));
    },

    update_value: function(root, value, never_hide) {
      
      var new_value = lpad(Math.abs(value), 2);
      
      if(!value && !never_hide) {
        root.addClass('hidden');
      } else {
        root.removeClass('hidden');
      }
        
      if(!this.animation || $(window).width() < 960) {
        root.find('.value').removeClass('to-bottom to-top');
        root.find('.value-1').addClass('to-bottom');
        root.find('.value-0').text(new_value);
        return;
      }

      var current = root.attr('data-current');
      var current_value = root.find('.value-' + current).text();

      if(current_value != new_value) {
        
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
        root.find('.value-' + current).text(new_value);
      }

    },
    
    update_timer: function(root) {
      root = $(root);

      if(root.find('.time-name').text() != this.name)
        root.find('.time-name').text(this.name);
      
      var offset = this.offset();

      var years   = offset.years();
      var months  = offset.months();
      var days    = offset.days();
      var hours   = offset.hours();
      var minutes = offset.minutes();
      var seconds = offset.seconds();

      if(offset.asSeconds() > 0)
        root.find('.time-sign').text('-');
      else
        root.find('.time-sign').text('+');

      this.update_value(root.find('.time-years'), years);
      this.update_value(root.find('.time-months'), months);
      this.update_value(root.find('.time-days'), days);
      this.update_value(root.find('.time-hours'), hours);
      this.update_value(root.find('.time-minutes'), minutes, true);
      this.update_value(root.find('.time-seconds'), seconds, true);

//      root.find('.time-days    .value').text(days);
//      root.find('.time-hours   .value').text(hours);
//      root.find('.time-minutes .value').text(minutes);
//      root.find('.time-seconds .value').text(seconds);
      
      root.find('.time-date .date').text(this.time.format('DD MMMM YYYY'));
      root.find('.time-date .time').text(this.time.format('h:mm:ss a'));
    }

  };
});

