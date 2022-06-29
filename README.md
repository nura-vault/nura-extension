# nura extension

<div align="center" data-aos="flip-down">
  <a href="https://reactjs.org/" target="_blank">
    <img
      src="https://img.shields.io/badge/Written%20in-React-%23EF4041?style=for-the-badge"
      height="30"
    />
  </a>
  <a href="https://nura.micartey.dev/" target="_blank">
    <img
      src="https://img.shields.io/badge/live%20on-micartey-%27a147.svg?style=for-the-badge"
      height="30"
    />
  </a>
</div>

## 📚 Introduction

The nura-extension is an available extension usable with any [chromium](https://www.chromium.org/chromium-projects/) based browser. This includes `Chrome` and `Edge`. In order to use the nura extension, you have to first build it yourself since there is no official release up to this point. Furthermore, you need to have an account on your nura instance or use the official instance by clicking [here](https://nura.micartey.dev/login).


<div align="center" data-aos="flip-down">
    <img src="https://i.imgur.com/up92WVI.png">
    <i style="padding: 10px"></i>
    <img src="https://i.imgur.com/xFT8HVO.png">
</div>

## 💿 Installation

First of all, make sure to have `node` installed. Afterwards clone this repository and build the extension by executing following commands:

```shell
$ git clone https://github.com/nura-vault/nura-extension.git .
$ npm install
$ npm start
```

After the applciation has successfully started, press `Ctrl+C` to interrupt the task. Next go to your browser and go into the extenions settings. You can also enter `chrome://extensions` or `edge://extensions` into your url field depending on the browser you are using.

Next up, enable developer mode which can be founde at the top right or bottom left corner. After enabling the developer mode, a new button should appear to load unpacked extensions. Select the `dev` folder which has been created as an child directory of the project.

## 📥 Usage

Using the extension is pretty self explanatory. First you have to visit your nura instance an press `F5` and reopen the popup. This will sync your nura extension with the page. Everytime you want to use the extension you have to open the popup and actions will be taken.