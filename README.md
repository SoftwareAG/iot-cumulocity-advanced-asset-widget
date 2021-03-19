
# Cumulocity IoT Advanced Asset Widget

![Sample image of the advanced asset widget](./runtime-widget-template/styles/previewImage.png)

This project contains the advanced asset widget. It is a custom widget, build using the c8y-data-grid, displaying the child assets of a managed object.
In the configuration of the widget you can choose either a group or device, provide a title for the widget and a title for the table.

## Overview
The target of this repository is to provide an example implementation of the **c8y-data-grid** - in this case by wrapping it into a widget. The implementation of the grid is very basic. It shall act as a blueprint/ starting point for your own table widget.

You can find a customized cockpit app under the `cockpit-app` folder. It's really just the plain cockpit app with extended by a `widgets` folder containing the advanced-assets-widget. The folder `runtime-widget-template` contains the same widget ready to be deployed via application builder.

## Development

If you want to run locally you can use the cockpit-app folder.
1. Install the dependencies:
```
$ cd cockpit-app
$ npm i
```
2. Start up against the tenant of your choice

```
$ npm run start -u https://your.tenant.com/
```
## Deployment

You have two options:
1. You can **deploy the cockpit app** onto your tenant using:
```
$ cd cockpit-app
$ npm i
$ npm run build
$ npm run deploy
```
> Make sure to change the target tenant in the package.json!

2. You can go the **runtime widget loader** route:
If you intend to use the presales *application builder tool* with its widget upload wizard, you can follow the steps in the readme under the runtime-widget-template folder - here a short excerpt:
```
$ npm i
$ npm run build
```
After the build completes, the `/dist` folder will contain a `widget.zip` file. This is your deployable widget.
In the application builder you can now upload the widget using the upload widget wizard. For more information please check out the documentation for the [Cumulocity IoT Runtime Widget Loader](https://github.com/SoftwareAG/cumulocity-runtime-widget-loader)

> Since the widget code exists on 2 places, please make sure to keep both places up-to-date When doing changes on the widget.
> 1. Copy the contents from runtime-widget-template/src/advanced-asset-widget to demo/src/widget/advanced-asset-widget or vice versa
> 2. In the advanced-asset-widget.module.ts comment out import 'some-module/styles.css'

## Feel the power of c8y-data-grid!
Just create a fork and get your hands on the awesome and  feature rich c8y-data-grid.
The grid is continuously maintained and improved by the Cumulocity RnD team and already offers built-in:
- pagination
- lazy loading
- filtering
- sortation
- mobile layout
- actions per row
- bulk actions
 
### What can I find here? 
In the current implementation, the grid component is implemented as if a big dataset was expected. In order to improve the performance, it is using **pagination** and performing **filtration** and **sortation** on the cloud-site. This means pagination is enabled and the grid component is connected to a service which acts as a datasource. The provided example is very basic - only the natively supported filtration on strings is possible at the moment.

### Datasource
In principle the datasource needs to do 3 queries:
* count all entries if no filtration is done
* count all entries if current filtration is applied
* return resultset of the current query (containign the actual data and pagination info)

*Example*
If the user would set a filter on the name column of the grid, the *onDataSourceModifier* method would get invoked on the datasource as soon as the user applies the filter. Our task is then to create a query based upon the filter and sortation configuration that the user has set. This translation of the column information to a query string is done in the *createQueryFilter* method. It already can handle string filter queries and sortation.

*Why fetch the count?*
The count information is needed so that the table nows how much elements are displayed on the current page, how many pages exist and how many elements exist in total. 

The *fetchCount* methods basically work by setting the pageSize to exactly one so that one page would always contain just one element. If the responses pagination info would then contain 36 totalPages, we would know that there are exactly 36 elements matching our filter criteria. Unfortunately there is no other way to retrieve the exact count - with a pageSize > 1 we would not know how many elements the last page would contain and thus could not provide exact values. 
> Please keep in mind that count requests using withTotalPages: true combined with a pageSize: 1 are very expensive!

### Widget Configuration dialog

![Configuration dialog](./docs/configuration-dialog.png)

The configuration currently contains the following fields:
* Title (1)
* Group/ Device selection (2)
* Table name input (3)

**Title**
The widget title input is added automatically by ngx-components, neither did we add it, nor can we remove it.

**Group/ Device selection**
The group/ device selection gets added by setting *groupsSelectable: true* in the *advanced-asset-widget.module.ts*. During development, you can only see this selection working on a hybrid project such as the cockpit app. The reason is that this component is still written in AngularJS. On a native Angular app (e.g. the tutorial app) you would not see the group selector during development, but as soon as you'd deploy the widget to the tenant.

**Table name input**
The table name input can be found in the *advanced-asset-widget-config.component.ts*. 

**Extending the configuration** 
You can easily add more inputs - just add them to the HTML markup in the *advanced-asset-widget-config.component.ts*. The important part is to bind the value of these inputs to the config property so that the user input is accessible on other parts of the widget (e.g. the datasource). 

The *onBeforeSave* method currently always returns true. If you for example add required fields, make sure to add some validation logics there. I added the return type intentionally - as you can see it is also possible to return boolean Promises or Observables, meaning if you need to do a query in order to validate, this is possible, too!

### Customize your table!

**Column Layout**
Feel free to play with the layout of the columns of the grid, either by defining **your own content projection** inside the *advanced-asset-widget.component.html*.

We already did it for the **id** and **lastUpdated** columns:

    <c8y-data-grid ...>
	    ...
	    <c8y-column name="id">
		    <ng-container *c8yCellRendererDef="let context">
			    <a [routerLink]="['/device', context.value]">{{ context.value }}</a>
			</ng-container>
		</c8y-column>
		<c8y-column name="lastUpdated">
			<ng-container *c8yCellRendererDef="let context">
				{{ context.value | date: "dd MMM yyyy, HH:mm:ss" }}
			</ng-container>
		</c8y-column>
		...
	</c8y-data-grid>
> The name of the c8y-column needs to match the value of the name attribute of the column you want to customize.

Or you can change the columns behavior and style by creating **your own cell renderer components**. Just create a new component and add that to the column configuration in *getDefaultColumns* by using the *cellRendererComponent* property. Make sure to add your new render component to the entryComponents and declarations arrays in the *advanced-assets-widget.module.ts*.

**Custom Filter**
Will be added soon.

------------------------------
These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).
You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).
