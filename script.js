const data = new Date();
console.log(data);
let streamCamera;
async function abrirCamera(){
    try{
        streamCamera = await navigator.mediaDevices.getUserMedia(
            {video: true});
        document.getElementById("camera").srcObject = streamCamera;
    } catch (erro) {
        alert("Autorize a sua Câmera.");
        console.log(erro);}
}
function fecharCamera(){
    if(streamCamera){
        streamCamera.getTracks().forEach(track => {
            track.stop();
        });
    }
}
// registro de foto
function capturarFoto(){
    const imagem = document.getElementById("camera");
    const canvas = document.getElementById("foto");
    const contexto = canvas.getContext("2d");
    canvas.getContext("2d");
    contexto.drawImage(
        imagem,
        0,
        0,
        canvas.width,
        canvas.height,
    );
    const horario = new Date();
    document.getElementById("data").innerHTML = "Data: " + horario.toLocaleDateString ("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"}
    );
    document.getElementById("hora").innerHTML = "Hora: " + horario.toLocaleTimeString ("pt-BR");
    const diaSemana = horario.toLocaleDateString("pt-BR", {
        weekday:"long"}
    );
    const diaFormatado = diaSemana.charAt (0).toUpperCase() + diaSemana.slice(1);
    document.getElementById("dia").innerHTML = diaFormatado;
    const hora = horario.getHours();
}