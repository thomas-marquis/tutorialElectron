const { ipcRenderer, remote } = require("electron");
const path = require("path");
const { getCurrentWindow } = remote;

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", event => {
  const window = getCurrentWindow();
  window.close();
});

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", event => {
  ipcRenderer.send(
    "update-notify-value",
    document.getElementById("notifyVal").value
  );
  const window = getCurrentWindow();
  window.close();
});
