songBts="";
songBP="";

leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";

leftWristY_score=0;
rightWristY_score=0;

function preload(){
    songBP= loadSound("BP_BetUWanna.mp3");
    songBts= loadSound("BTS_FilterJimin.mp3");
}

function setup(){
    canvas=createCanvas(550,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized")
}

function gotPoses(results){
      if(results.length > 0){
          console.log(results);
          leftWristX=results[0].pose.leftWrist.x;
          leftWristY=results[0].pose.leftWrist.y;
          rightWristX=results[0].pose.rightWrist.x;
          rightWristY=results[0].pose.rightWrist.y;

          console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY+"rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
          
          leftWristY_score=results[0].pose.keypoints[9].score;
          console.log(leftWristY_score);

          rightWristY_score=results[0].pose.keypoints[10].score;
          console.log(rightWristY_score);
        }
}

function draw(){
    image(video,0,0,550,500);
    fill("#ffffff");
    stroke("#000000");

    if( leftWristY_score > 0.2){
        circle(leftWristX,leftWristY,15);
        songBP.stop();
    }
    if(songBts == false){
        songBts.isPlaying();
        document.getElementById("song_name_id").innerHTML="Song : Bet You Wanna BlackPink ft.Cardi B";
    }
}
if(rightWristY_score > 0.2){
    circle(rightWristX,rightWristY,15);
    songBts.stop();
}
if(songBts == false){
    songBP.stop();
    document.getElementById("song_name_id").innerHTML="Song : Filter Jimin BTS Solo song";
}

function play(){
    songBts.isPlaying();
    songBts.setVolume(1);
    songBts.rate(1);
    songBP.setVolume(1);
    songBP.rate(1);
}