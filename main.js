Status="";
input_text="";

function setup(){
    canvas=createCanvas(400,350);
    canvas.center();
    video=createCapture(VIDEO);
    
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input_text=document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status=true;
}

function draw(){
    image(video,0,0,400,350);
}