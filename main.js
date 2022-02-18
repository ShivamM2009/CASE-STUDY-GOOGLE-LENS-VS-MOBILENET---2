function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",ml);
}
function ml(){
  console.log("Model Is Loaded")
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);

}
var pr = "";
function gotResult(error,result){
if(error){console.error(error)}
else{
  if((result[0].confidence > 0.5)&& (pr != result[0].label)){
    console.log(result);
    pr = result[0].label;
    var synth = window.speechSynthesis;
    speakdata ="object detected is "+result[0].label;
    var ut = new SpeechSynthesisUtterance(speakdata);
    synth.speak(ut);
    document.getElementById("Object").innerHTML = result[0].label;
    document.getElementById("Accu").innerHTML = result[0].confidence.toFixed(3);
  }
}
}


