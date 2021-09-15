song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() { console.log('PoseNet Is Initialized'); }

function ModelLoaded() {
    console.log("Model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log("scoreLeftWrist = " + scoreLeftWrist)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        rightWristX = results[0].pose.rightWrist.x
        rightWristX = results[0].pose.rightWrist.y
        console.log("leftWristX = " + leftWristX, "leftWristY = " + leftWristY)
        console.log("rightWristX = " + rightWristX, "rightWristY = " + rightWristY)
        results[0].pose.keypoints[10].score;
    }
}


function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000")
    stroke("#FF0000")
    if (scoreLeftWrist > 0.0) {
        circle(leftWristX, leftWristY, 20)
        x = Number(leftWristY)
        y = floor(x)
        volume = y / 500
        document.getElementById("volume").innerHTML = "volume " + volume
        song.setVolume(volume);
    }
}

function start() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}