# learn2crack-lite-node
This project is specifically aimed at **learn2crack.com**.

Desktop website can be rendered as a WebView in a hybrid Android app but it will be heavy and loads many stuff which can be implemented natively in Android app in a more effective way. 

This node project creates a proxy server which fetches original site html from learn2crack.com and strips unneeded content like ad, analytics scripts, sidebar sections and other unnneeded scripts and sends back the minimal html to the client.

The images below shows hybrid Android app with native Toolbar, Navigation Drawer, Floating Action Button with lite website loaded as WebView.

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1331108/24588485/e62101a6-17e6-11e7-921a-20a2668ccb18.png" width="250"/>
  <img src="https://cloud.githubusercontent.com/assets/1331108/24588487/e624b7ec-17e6-11e7-840a-45913473aa31.png" width="250"/>
  <img src="https://cloud.githubusercontent.com/assets/1331108/24588486/e622ccac-17e6-11e7-98f5-28ca5778708b.png" width="250"/>
</p>

## Config

The website url, the url in which the proxy server runs, port and a secret key which can be use to purge the cached html files can be defined in the **config.json** file.

## To Run the Project

```
npm install
node app
```

## Advantages

Pages loads faster and less data is transmitted.

## Limitations

Loading posts via Ajax is not supported now since CORS is disabled in learn2crack.com.

