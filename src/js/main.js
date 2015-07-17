var context = new AudioContext();


function loadAudio( object, url) {

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) { //old style
      object.buffer = buffer;
    });
  }
  request.send();
}


function addAudioProperties(object) {
    object.name = object.id;
    object.source = $(object).data('sound');
    loadAudio(object, object.source);
    object.play = function () {
      console.log("context=", context);
        var s = context.createBufferSource();
        console.log("s=", s);
        s.buffer = object.buffer;
        s.connect(context.destination);
        s.start(0);
        object.s = s;
    }
}


$(function() {
  $('.aud div').each(function() {
    addAudioProperties(this);
  });

  $('.aud div').click(function() {
    this.play();
    console.log(this);
  });
});
