export function toBase64(arr) {
  arr = new Uint8Array(arr); //if it's an ArrayBuffer
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}
export function serverbase64(arr) {
  arr = new Uint8Array(arr);
  return Buffer.from(arr, 'binary').toString('base64');
  // var arrayBufferView = new Uint8Array(arr);
  // var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
  // var urlCreator = window.URL || window.webkitURL;
  // var imageUrl = urlCreator.createObjectURL(blob);
  // return imageUrl;
}
