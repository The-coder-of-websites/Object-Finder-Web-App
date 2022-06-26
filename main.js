Status="";
input_text="";
objects=[];


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
    if(Status != ""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==input_text){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_found").innerHTML=input_text+" Found";
                var synth=window.speechSynthesis;
                var utterThis=new SpeechSynthesisUtterance(input_text+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML=input_text+" Not Found";
            }

        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}