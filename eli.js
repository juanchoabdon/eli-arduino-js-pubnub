var five = require("johnny-five");

var board = new five.Board();


var pubnub = require('pubnub').init({
  publish_key: 'pub-c-ef86a323-a70a-4df8-a6b5-14911c879e48',
  subscribe_key: 'sub-c-68d782b8-c234-11e6-8036-0619f8945a4f'
});


var channel = 'led';


board.on("ready", function() {

  var led = new five.Led(13);
    var ledi = new five.Led.RGB({
   pins: { // pin numbers
     red: 6,
     green: 5,
     blue: 3
   }

 });
 ledi.on();
  ledi.color({red: 0, blue: 0, green: 0});


pubnub.subscribe({
channel: channel,
message: function(m) {
  if (m.blink === true) {

    led.blink(500);



  } else {
    led.stop();

    led.off();
    
  }
},

error: function(err) { console.log(err);  }

});
var r = 0;
var b = 0;
var g = 0;
pubnub.subscribe({
  channel: 'smart-led',
  callback: function(m) {
    if(ledi) {

      if (m.color === 'red' ) {

        r = m.brightness;
      }

      if (m.color === 'blue' ) {

        b = m.brightness;
      }

      if (m.color === 'green' ) {

        g = m.brightness;
      }

      ledi.color({red: r, blue: b, green: g});

      console.log( 'color change to...' );
      console.log( ledi.color() );
    }
  },
  error: function(err) {console.log(err);}
});

});
