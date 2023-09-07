export function getFileType(src) {
  // return type as sound, image, video, text, json, xml, html, css, js, wasm, font, other
  const ext = src.split(".").pop();
  const types = {
    mp3: "sound",
    wav: "sound",
    ogg: "sound",
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    mp4: "video",
    webm: "video",
    txt: "text",
    json: "json",
    xml: "xml",
    html: "html",
    css: "css",
    js: "js",
    wasm: "wasm",
    ttf: "font",
    otf: "font",
    woff: "font",
    woff2: "font",
  };
  if (types[ext]) {
    return types[ext];
  }
}

export async function loadFile(src) {
  const type = getFileType(src);
  if (type === "image") {
    const img = new Image();
    img.src = src;
    return new Promise((resolve) => {
      img.onload = () => {
        resolve(img);
      };
    });
  }
  if (type === "sound") {
    const audio = new Audio();
    audio.src = src;
    return new Promise((resolve) => {
      audio.oncanplaythrough = () => {
        resolve(audio);
      };
    });
  }
  if (type === "video") {
    const video = document.createElement("video");
    video.src = src;
    return new Promise((resolve) => {
      video.oncanplaythrough = () => {
        resolve(video);
      };
    });
  }
  if (type === "text") {
    const response = await fetch(src);
    return await response.text();
  }
  if (type === "json") {
    const response = await fetch(src);
    return await response.json();
  }
  if (type === "xml") {
    const response = await fetch(src);
    return await response.text();
  }
  if (type === "html") {
    const response = await fetch(src);
    return await response.text();
  }
  if (type === "css") {
    const response = await fetch(src);
    return await response.text();
  }
  if (type === "js") {
    const response = await fetch(src);
    return await response.text();
  }
  if (type === "wasm") {
    const response = await fetch(src);
    return await response.arrayBuffer();
  }
  if (type === "font") {
    const response = await fetch(src);
    return await response.arrayBuffer();
  }
  return null;
}
