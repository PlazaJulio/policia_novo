export default function base64EmImagem(imagemEmBase64) {
    const binaryData = atob(imagemEmBase64);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: 'image/jpg' });
    return URL.createObjectURL(blob);
}