Webcam.set({
    height: 300,
    width: 300,
    image_format: 'png',
    png_quality: 90,
});

camera = document.getElementById("webcam")
Webcam.attach(camera);

function TakeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("image").innerHTML = '<img id = "captured_image" src = "' + data_uri + '"/>';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NemGUVMAA/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!!!");
}

function CheckSnapshot() {
    CapturedImage = document.getElementById("captured_image");
    classifier.classify(CapturedImage, GotResult);
}

function GotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("hand_gesture_name").innerHTML = results[0].label;
        Prediction = results[0].label;
        speak();
        if (results[0].label == "Amazing") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128076;";
        }
        if (results[0].label == "Good") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128077;";
        }
        if (results[0].label == "Bad") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128078;";
        }
        if (results[0].label == "Left") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#128072;";
        }
        if (results[0].label == "Power") {
            document.getElementById("hand_gesture_icon").innerHTML = "&#9994;";
        }
    }
}

function speak() {
    var SpeechSynth = window.speechSynthesis;
    SpeakData = "The results are " + Prediction;
    var utterThis = new SpeechSynthesisUtterance(SpeakData);
    SpeechSynth.speak(utterThis);
}
