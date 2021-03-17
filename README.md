# Advanced Asset Widget for Cumulocity IoT platform

![Sample image of the advanced asset widget](./runtime-widget-template/styles/previewImage.png)

This project contains the advanced asset widget. It is a custom widget, which is build upon the c8y-data-grid.
## Overview

The target of this repository is to provide an example implementation of the c8y-data-grid - in this case by acting as `asset widget`. You can easily buid upon it and enhance the functionalities because of the feature richness of the c8y-data-grid, which offers builtin functionality such as:
- pagination
- lazy loading
- filtering
- sortation
- mobile layout
and is continously maintained and improved by the Cumulocity RnD team :) 

In the current implementation, the grid component is using pagination and performing filtration and sortation on the cloud-site. This means pagination is active and the grid component is connected to a service which acts as a datasource. The provided example is still very basic - only the filtration on strings is supported at the moment.

In principle the datasource needs to do 3 queries:
* count all entries if no filtration is done
* count all entries if current filtration is applied
* return resultset of the current query (containign the actual data and pagination info)

If the user now would set a filter for example on the name column of the grid, the onDataSourceModifier method would get invoked on the datasource. Our task is then to create a query based upon the filter and sortation settings the user has set - this is done in the createQueryFilter method.

The fetchCount methods basically work by setting the pageSize to exactly one so that one page would always contain just one element. If the responses pagination info would then contain 36 totalPages, we would know that there are exactly 36 devices matching our filter criteria. Unfortuntely there is no other way to retrieve the exact count - with a larger pageSize we would not know how many elements the last page would contain. Keep in mind though that such requests are very expensive! 

## Structure of this repository

You can find a customized cockpit app under the `cockpit-app` folder. It's really just the plain cockpit app with a `widgets` folder containing the advanced-assets-widget. The folder `runtime-widget-template` contains the same widget ready to be deployed via application builder. 

## Deployment

You have two options:
1. You can deploy the cockpit app onto your tenant using:
```
cd cockpit-app
npm i
npm run build
npm run deploy
```
Make sure to change the target tenant in the package.json!

2. You can go the runtime widget loader way:
If you intend to use the presales application builder tool with its widget upload wizard, you can follow the steps in the readme under the runtime-widget-template folder.


## Development

If you want to run locally you can use the cockpit-app folder. 

1. Install the dependencies:
```
cd cockpit-app
npm i
```
2. Start up against the tenant of your choice
```
npm run start -u https://your.tenant.com/
```

Since the widget code exists on 2 places, please make sure to keep both places up-to-date When doing changes on the widget.

1. Copy the contents from runtime-widget-template/src/advanced-asset-widget to demo/src/widget/advanced-asset-widget or vice versa
2. In the advanced-asset-widget.module.ts comment out import 'some-module/styles.css'

------------------------------

These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).

You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).
