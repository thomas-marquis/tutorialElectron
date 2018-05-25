const { ipcRenderer, remote } = require("electron");
const path = require("path");
const { BrowserWindow } = remote;
const axios = require("axios");

const notifyBtn = document.getElementById("notifyBtn");
let price = document.getElementById("price");
let targetPrice = document.getElementById("targetPrice");

function getBtc() {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
    )
    .then(res => {
      const crypto = res.data.BTC.USD;
      price.innerHTML = `$${crypto.toLocaleString("en")}`;
    });
}
getBtc();
setInterval(getBtc, 10000);

notifyBtn.addEventListener("click", event => {
  const modalPath = path.join("file://", __dirname, "add.html");
  let win = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    height: 200,
    transparent: true,
    width: 400
  });
  win.on("close", () => (win = null));
  win.loadURL(modalPath);
  win.show();
});

ipcRenderer.on("update-notify-value", (event, arg) => {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = `$${targetPriceVal.toLocaleString("en")}`;
});
