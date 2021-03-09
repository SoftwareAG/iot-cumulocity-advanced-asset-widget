# Advanced Asset Widget for Cumulocity IoT platform
You can find a working demo under the demo folder. If you want to build the widget and use it right away, cd into the runtime-widget-template folder and follow the steps outlined there. The id of the widget is advanced.asset.widget
##  Demo

The demo is based on the latest tutorial app, cut down to just the dashboard components and with the advanced asset widget added. 

1. Install the dependencies:
```
cd demo
npm i --legacy-peer-deps
```
2. Target your tenant
```
npm run start -u https://your.tenant.com/
```
3. Start
```
npm run start
```

## Changes

When doing changes on the code please also update the demo code:

1. Copy the contents from runtime-widget-template/src/advanced-asset-widget to demo/src/widget/advanced-asset-widget

2. In the advanced-asset-widget.module.ts comment out import 'some-module/styles.css' and previewImage: require("~styles/previewImage.png")

------------------------------

These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).

You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).
