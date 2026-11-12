function playSound(sampleName) {
  var sample = document.getElementById(sampleName);
  sample.play();

}

window.addEventListener('keydown', function (event) {
    var k=event.keyCode;
 
    if(k===13) playSound('Q');
   
})