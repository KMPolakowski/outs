# WebRTC_SimpleP2P

WebRtc_SimpleP2P is the code part of a WebRTC tutorial. Destination was:

- demonstrating a complete audio/video peer to peer communication between two clients including signaling server
- reduce the code to just the essential components to not obscure the basic working principle

The sample uses node.js with socket.io as signaling server. It will just run either in Google Chrome or Opera browsers because it does not consider browser dependencies in favor of simplicity. Furthermore it will just work for two peers and both must reside in a LAN because the sample does not define STUN servers. 

The intention was to provide a very compact sample which may be used as a starting point for more complex WebRTC projects. The samples which are normally available in the WEB do often not provide a real signaling server and try to simulate both peers of a connection in one client app. That makes the interpretation which signaling information is transported in which direction confusing. Other expamples provide tons of code including css, error handling or additional functionality which is not necessary to explain the basic principles. That sample demonstrates the important parts in less then 100 lines of code. 

This should help the beginner as a starting point. The belonging tutorial can be found at [here](https://melavi.de/811/).

### Tech

The sample uses the following components:

* [node.js] - as signaling server
* [Express] - as server framework to provide the web application
* [socket.io] - as signaling channel for server and client
* [jQuery] - as client side framework to simplify DOM access

### Installation

It is assumed that node.js is already installed.

```sh
$ npm install
$ node app.js
```
Now open two browser windows - either Google Chrome or Opera - and access this url:

```sh
http://ip:7000/peer.html
```

ip is either localhost or the address of the computer which runs the node server. The two peers may run on the same machine or on different machines but inside a LAN.

Each of the two browsers will prompt you now to permit access to the local USB-camera. After that you see the video of the local camera in the left video element. Clicking the dial button starts a connection to the other peer. 





