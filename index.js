// Use the same keys that you are going to use for Arduino code with Johnny-Five

 var pubnub = new PUBNUB({
  publish_key: 'pub-c-ef86a323-a70a-4df8-a6b5-14911c879e48',
  subscribe_key: 'sub-c-68d782b8-c234-11e6-8036-0619f8945a4f'
});


// Use the same channel name
var channel = 'led';

var button = document.querySelector('button');

var blinkState = true;

/***
Subscribe data from all subscibers of the channel to set the button state correctly
***/
pubnub.subscribe({
  channel: channel,
  message: function(m) {
    blinkState = m.blink; // the raw data
    blinkState = !blinkState; // toggle it to lable the button
    button.textContent = (blinkState) ? 'Empezar' : 'Terminar';
    console.log(blinkState);
  }
});

/*
Upon a button click, publish the data.
Arduino will subscribe it and blink LED
*/
button.addEventListener('click', function(e) {
  pubnub.publish({
    channel: channel,
    message: {blink: blinkState},
    callback: function(m) {
      console.log(m);
    }
  });

});


var red = document.getElementById('red');
var blue = document.getElementById('blue');
var green = document.getElementById('green');

red.addEventListener('change', function(){
  pubnub.publish({
    channel: 'smart-led',
    message: {color: 'red', brightness: +this.value}
  });
}, false);


blue.addEventListener('change', function(){
  pubnub.publish({
    channel: 'smart-led',
    message: {color: 'blue', brightness: +this.value}
  });
}, false);

green.addEventListener('change', function(){
  pubnub.publish({
    channel: 'smart-led',
    message: {color: 'green', brightness: +this.value}
  });
}, false);
