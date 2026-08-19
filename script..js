import {
    FaceDetector,
    FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

const camera = document.getElementById("camera");
const mensagem = document.getElementById("mensagem");
const botaoCamera = document.getElementById("botaoCamera");

let detector;
let cameraLigada = false;
//Usando o MediaPipe
async function carregarDetector() {
    mensagem.innerHTML = "Carregando o detector de rosto..."
    //O Holehon copiou e colou de um site
    const vision = 
    await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
        detector = 
        await FaceDetector.createFromOptions (
            vision,
            {baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite"
}, 
    runningMode: "VIDEO"
    }); 
}
//abrir camera
async function abrirCamera(){
    try{
        const stream = 
        await navigator.mediaDevices.getUserMedia({
            video: true
        })
        camera.srcObject = stream;
        cameraLigada = true;
        detectarRosto();
    }
    catch (erro){
        mensagem.innerHTML = "Não foi possível ligar a câmera.";
        console.log(erro);
    }
}
//DETECTAR O ROSTO
function detectarRosto(){
    if(!cameraLigada){
        return;
    }
    if(camera.readyState >= 2){
        const resultado = detector.detectForVideo(
            camera,
            performance.now()
        );
    if (resultado.detections.length > 0){
        mensagem.innerHTML = "Rosto identificado!"
        acesso.innerHTML = "Acesso Liberado!"

    } else{
        mensagem.innerHTML = "Nenhum rosto identificado."
        acesso.innerHTML = "Acesso Negado!"
    }}
    requestAnimationFrame(detectarRosto);
}
botaoCamera.addEventListener("click", abrirCamera);
carregarDetector();
