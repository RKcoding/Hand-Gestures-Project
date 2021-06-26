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