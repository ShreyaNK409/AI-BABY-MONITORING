mage = "";
status = "";
objects = [];
song = "";

function preload() {
  song = loadSound("old_telephone.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  object_detector = ml5.objectDetector("Cocossd", modelLoaded);
  document.getElementById("stat").innerHTML = "Detecting objects";
}

function modelLoaded() {
  console.log("Model loaded !");
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}

function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    object_detector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      fill("Red");
      pecent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + pecent + "%", objects[i].x, objects[i].y);
      textSize(25);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      document.getElementById("stat").innerHTML = "Detected objects"
      document.getElementById("no_object").innerHTML = "No of objects detected :" + objects.length;
      if (objects[i].label == "person") {
        document.getElementById("no_object").innerHTML = "Baby Found";
        console.log(objects[i].label);
        song.stop();
      } else {
        document.getElementById("no_object").innerHTML = "Baby Not Found";
        song.play();
      }
    }

    if (objects.length == 0) {
      document.getElementById("no_object").innerHTML = "Baby Not Found";
      console.log("play");
      song.play();
    }

  }

}