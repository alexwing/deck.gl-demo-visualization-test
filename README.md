# Create an application with @deck.gl/carto module

## Intro

We work a lot with maps. It's part of our job here to build UIs around them and also to work in the underlying mapping libraries. This practice is about this type of real tasks.

## Part 1

The main objective is to take the data available here [https://public.carto.com/tables/ne_50m_admin_0_countries/public/map](https://public.carto.com/tables/ne_50m_admin_0_countries/public/map) and **implement a UI** 

- [ ]  **Fixed style component**

The component/s will let users change these visual attributes for the layer:

- polygon color
- stroke size
- stroke color

The data layer should be refreshed when any change happens. 

## Part 2

Here is a list with some other ideas to explore: you need to pick one of them.

- [ ]  **Increase compatibility of @[deck.gl](http://deck.gl)/carto with other deck.gl layers**

You might have already discovered that CartoSQLLayer is based (at the end) on a GeoJSONLayers, but what does it happen if someone wants to visualize a dataset from CARTO using other layers available in [deck.gl](http://deck.gl) like ArcLayer, HexagonLayer, GridCellLayer, IconLayer, HeatmapLayer, etc...? 

If we're talking about datasets <50MB, there is a pretty straight forward solution! 

Try to build a mechanism to easily visualize a GridLayer, HexagonLayer or HeatmapLayer using a datasets of points (<50MB) in CARTO. The lower code you generate for the final users the better. The simpler the better. 

If you want you can use the following dataset, but feel free to pick any other.

[https://cartovl.carto.com/api/v2/sql?&q=select * from taxi_50k](https://cartovl.carto.com/api/v2/sql?&q=select%20*%20from%20taxi_50k). 

- [ ]  **Widgets**

In this part we would like you to build 2 widgets to represent some data from the layer

- 1st: number of countries, grouped by continent
- 2nd: population per continent (using the field *pop_est*)

Widgets refresh the data on every viewport change (zoom, pan...). So every time the user moves around the maps making those 2 widgets refresh their data.

The 'bars' in the category widgets should act as visibility toggles for those features. For example, if you click on Europe and Asia the map will only show the polygons of Europe and Asia. 

**Note**: To get the data for the widgets you need to use [CARTO SQL API](https://carto.com/developers/sql-api/).

**Note**: we currently have solutions for these widgets, like those in our BUILDER (see image below). You can signup in CARTO, see how they works and take them as a general reference, but it doesn't mean you have to create that exact look & feel (keep it simple!)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5e3a713-c725-46fa-9825-062e2c279847/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5e3a713-c725-46fa-9825-062e2c279847/Untitled.png)

## Rules

- For the application itself, you need to use React.
- For rendering the map you have to use **deck.gl**, and **@deck.gl/carto** module:
    - The code of the module is available at [https://github.com/visgl/deck.gl/tree/master/modules/carto](https://github.com/visgl/deck.gl/tree/master/modules/carto) and the doc at [https://carto.com/developers/deck-gl/](https://carto.com/developers/deck-gl/)
- You need to create a modern/scalable architecture to connect the different UI components and their events.

## How to send the test or contact us?

- If you have any question, contact **frontend@carto.com** or use the [cartodb/deck-gl](https://github.com/CartoDB/deck.gl) Github repo
- If you want to submit the test, you have several options, please upload your solution to GitHub or any other online code service.
- In any case, don't forget to attach a **README.md** file with the detailed decisions you made along the way.

