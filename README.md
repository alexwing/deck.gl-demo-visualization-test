# @deck.gl/carto Demo

Test application of Deck.gl using React

The application has been divided into different components of React, communicating with each other.

In the tool panel, the following modifications can be made on the map:

* Change view (Show GeoJsonLayer)
* Select the continent 
* Thickness of the line
* Color scale height
* Line colour
* Colour of the polygon (the colour will be darker depending on the population level of the country)
* Table with country information when you place the mouse over the polygon
* Legend population and country count by Continent

A GeoJsonLayer has been added with another Json file different from the one you propose in the practice since I am having problems with this one, and I have to see why.

Other features I have yet to explore:

* Try some other ArcLayer, HexagonLayer, GridCellLayer components, etc
* To be able to select the layers to be displayed and to zoom into the scope of each one.
* Create the widget grouped by continents that indicates the test using CARTO SQL API.

Test app in http://deckgl.aaranda.es/
