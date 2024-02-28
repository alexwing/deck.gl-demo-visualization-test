- [1. Pincho on Cartography, React, and Deck.gl](#1-pincho-on-cartography-react-and-deckgl)
- [2. Basic Principles on Web-Oriented Cartography](#2-basic-principles-on-web-oriented-cartography)
  - [2.1. Geographic Coordinates](#21-geographic-coordinates)
  - [2.2. Cartographic Projections](#22-cartographic-projections)
  - [2.3. Geospatial Data Formats](#23-geospatial-data-formats)
  - [2.4. Geospatial Databases](#24-geospatial-databases)
- [3. QGIS](#3-qgis)
- [4. GeoJSON Format](#4-geojson-format)
- [5. @deck.gl Demo](#5-deckgl-demo)

# 1. Pincho on Cartography, React, and Deck.gl

In this pincho, we'll explore various aspects of web-oriented cartography, geospatial data formats, and tools for editing and visualizing geospatial data. We'll also delve into different aspects of the geospatial data visualization library Deck.gl and how it can be integrated with React.

# 2. Basic Principles on Web-Oriented Cartography

Cartography is a discipline that deals with the graphical representation of the Earth. Nowadays, cartography has become a fundamental tool for decision-making in various fields such as urban planning, natural resource management, disaster management, navigation, etc.

In this pincho, we'll focus on web-oriented cartography, geospatial data formats, and tools for editing and visualizing geospatial data.

## 2.1. Geographic Coordinates

Geographic coordinates are a reference system used to represent the location of a point on the Earth's surface. Geographic coordinates consist of two values: latitude and longitude.

<img src="./doc/coordenadas.png" alt="Coordenadas geográficas" width="500" style="display: block; margin: 0 auto;"/>

The most commonly used geographic coordinate systems are:

- WGS84: Geographic coordinates in the WGS84 system are expressed in decimal degrees.
  
        Examples: - 40.7128° N, 74.0060° W  (decimal format)
                  - 40° 42' 46.08" N, 74° 0' 21.6" W (degree, minute, second format)

- UTM: Geographic coordinates in the UTM system are expressed in meters.
  
        Example: - 583964.601 4507344.285 (meter format)
                 - 18T 583964.601 4507344.285 (UTM format)

> Positive values correspond to the northern hemisphere and east of the central meridian, while negative values correspond to the southern hemisphere and west of the central meridian.

> Programmatically, this system has some issues because latitude and longitude are angular values, not linear. Therefore, to perform calculations with geographic coordinates, it's necessary to perform projection transformations. For example, to calculate the distance between two points in geographic coordinates, if a projection transformation is not performed, the result will not be correct for long distances that involve a change in latitude and longitude. Hence, there are libraries like Turf.js that allow us to perform calculations with geographic coordinates.

## 2.2. Cartographic Projections

Cartographic projections are mathematical transformations that allow representing the Earth's surface on a plane. There are different types of cartographic projections, such as cylindrical projection, conical projection, zenithal projection, etc. Each type of cartographic projection has its own characteristics and advantages and is used in different contexts and applications.

<img src="./doc/proyecciones.jpg" alt="Proyecciones cartográficas" width="500" style="display: block; margin: 0 auto;"/>

>  More info: http://mapasyotroscuentos.blogspot.com/2016/01/las-proyecciones-cartograficas-o-cuando.html
> 
It's essential to understand that all cartographic projections have distortions, and there is no perfect cartographic projection.

On the web, the most commonly used projections are:

- WGS84 Projection: It's a spherical projection used for representing the Earth on the web. Its encoding is EPSG:4326.
- Web Mercator Projection: It's a cylindrical projection used for representing the Earth on the web. Its encoding is EPSG:3857.

The Web Mercator projection is the de facto standard for web map applications. It gained fame when Google Maps adopted it in 2005. It is used by virtually all major online map providers, including Google Maps, CARTO, Mapbox, Bing Maps, OpenStreetMap, MapQuest, Esri, and many others.

Although in recent years, Google Maps in its desktop version has adopted the WGS84 spherical projection.

Usually, when importing a GeoJSON, Shapefile, KML, etc., into a web application, it's necessary to consider the projection of the file and the projection of the map. If the projections do not match, a projection transformation is required.

## 2.3. Geospatial Data Formats

Geospatial data are data that describe the location of objects on the Earth's surface. Geospatial data can be represented in different formats, such as GeoJSON, Shapefile, KML, GML, etc. In this pincho, we'll focus on the GeoJSON format, which is a JSON-based geospatial data format.

In addition to the format itself, there are fundamental differences between vector and raster geospatial data. This difference can be enumerated as follows:

- Vector Data: Represent geographic information as points, lines, and polygons.
- Raster Data: Represent geographic information as a grid of cells.
- DTM (Digital Terrain Model): Represent geographic information as a grid of cells with altitude values.

Regarding formats:

- GeoJSON: JSON-based geospatial data format.
- Shapefile: Geospatial data format developed by ESRI.
- KML: Geospatial data format developed by Google.
- GML: XML-based geospatial data format.
- DTM: Digital Terrain Model.
- GeoTIF: Raster geospatial data format. (There are other variants like GeoJP2, GeoPNG, etc.)

Additionally, there are map services, which are services that provide maps and geospatial data over the web. Some of the well-known map services are Google Maps, Bing Maps, OpenStreetMap, Mapbox, etc.

There are also dedicated servers, which can be deployed on a self-owned server. Some of the well-known map servers are GeoServer, MapServer, etc.

These services require a client to visualize the data, and this is where geospatial data visualization libraries come into play. The most well-known ones are Leaflet, OpenLayers, Mapbox GL, Deck.gl, etc.

## 2.4. Geospatial Databases

Geospatial databases are databases that allow storing geographic information and performing spatial queries. Currently, there are different geospatial databases, such as PostGIS, MongoDB, Cassandra, Oracle Spatial, etc. In this pincho, we'll focus on PostGIS, which is a spatial extension for PostgreSQL.

PostGIS provides a set of spatial functions and operators that allow performing spatial queries, such as intersection, union, difference, buffer, etc. PostGIS also provides a set of functions and operators to perform projection transformations, simplify geometries, calculate areas and lengths, etc.

<img src="./doc/postgis.png" alt="PostGIS" width="500" style="display: block; margin: 0 auto;"/>


Examples of spatial queries:

```sql
-- Query for all polygons intersecting with a point
SELECT * FROM polygons WHERE ST_Intersects(geom, ST_GeomFromText('POINT(0 0)', 4326));

-- Change the projection of a polygon
SELECT ST_Transform

(geom, 3857) FROM polygons;

-- Calculate the area of a polygon
SELECT ST_Area(geom) FROM polygons;

-- Calculate the length of a line
SELECT ST_Length(geom) FROM lines;

-- Generate a GeoJSON from a polygon
SELECT ST_AsGeoJSON(geom) FROM polygons;

-- Generate a GeoJSON from a polygon with attributes
SELECT row_to_json((SELECT d FROM (SELECT id, name, ST_AsGeoJSON(geom) AS geom) AS d)) FROM polygons;

-- Generate a GeoJSON from a polygon with attributes and projection
SELECT row_to_json((SELECT d FROM (SELECT id, name, ST_AsGeoJSON(ST_Transform(geom, 3857)) AS geom) AS d)) FROM polygons;

-- table:full_world_borders
-- fields: gid, iso3, status, color_code, name, continent, region, iso_3166_1, geom

-- Query that generates a GeoJSON from a polygon with attributes and projection and filters by the European continent

SELECT json_agg(row_to_json(fc))
FROM (
  SELECT 
    'FeatureCollection' AS type,
    array_to_json(array_agg(f)) AS features
  FROM (
    SELECT 
      'Feature' AS type,
      row_to_json((SELECT l FROM (SELECT gid, iso3, status, color_code, name, continent, region, iso_3166_1) AS l)) AS properties,
      ST_AsGeoJSON(ST_Transform(geom, 3857))::json AS geometry
    FROM 
      full_world_borders        
    WHERE 
      continent = 'Europe'
  ) AS f
) AS fc;
```

With a backend that uses PostGIS, spatial queries can be performed, and GeoJSON can be generated from the query results. Geospatial data in GeoJSON format can be used, for example, in Deck.gl to visualize the data in a web application.

> PostGIS: https://postgis.net/

# 3. QGIS

QGIS is an open-source Geographic Information System (GIS) that allows visualizing, editing, and analyzing geospatial data. QGIS is a powerful and versatile tool used in various fields and applications, competing with other paid programs such as ArcGIS.

<img src="./doc/qgis.png" alt="QGIS" width="500" style="display: block; margin: 0 auto;"/>

From a programmer's point of view, QGIS is a very useful tool for editing and visualizing geospatial data. QGIS allows importing and exporting geospatial data in different formats, performing spatial analysis, creating thematic maps, etc.

It's not our goal to create maps, that's the job of cartographers, but if our goal is geospatial data visualization in web applications, it's important to understand how these tasks are done in QGIS to understand the data we're going to visualize and to perform necessary transformations.

Some of the functionalities that we might need in our projects are:

- Importing and exporting geospatial data in different formats.
- Performing projection transformations.
- Adding and editing attributes of geospatial data.
- Combining or splitting geospatial data layers.
- Simplifying or generalizing geometries.

> QGIS: https://www.qgis.org/

# 4. GeoJSON Format

The GeoJSON format is a JSON-based geospatial data format that allows representing different types of geometries, such as points, lines, and polygons, and also allows representing attributes associated with the geometries.

The GeoJSON format consists of two types of objects:

- Geometries: Represent the shape and location of geospatial objects.
- Attributes: Represent the information associated with geospatial objects.

An example of a GeoJSON object is as follows:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature", // Object type (Feature, FeatureCollection)
      "geometry": {
        "type": "Point", // Geometry type (Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon)
        "coordinates": [102.0, 0.5] // Geometry coordinates
      },
      "properties": {
        "prop0": "value0" // Attributes associated with the geometry
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [105.0, 1.0]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": 0.0
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": {
          "this": "that"
        }
      }
    }
  ]
}
```

So, the structure of a GeoJSON file is as follows:

- Object type:
    * **Feature**: Represents an individual geospatial object.
    * **FeatureCollection**: Represents a collection of geospatial objects.
- Geometry:
    * **Point**: Represents a point.
    * **LineString**: Represents a line.
    * **Polygon**: Represents a polygon.
    * **MultiPoint**: Represents a collection of points.
    * **MultiLineString**: Represents a collection of lines.
    * **MultiPolygon**: Represents a collection of polygons.

- Attributes: Represent the information associated with geospatial objects. Attributes are represented as key-value pairs and can be of different types, such as text, number, boolean, etc.

# 5. @deck.gl Demo

Deck.gl test application using React. The application has been divided into different React components that communicate with each other. In the tool panel, the following modifications can be made to the map:

* Change view (Show GeoJsonLayer)
* Select the continent
* Line thickness
* Color scale height
* Line color
* Polygon color (the color will be darker depending on the country's population level)
* Table with country information when hovering over the polygon
* Population legend and country count by continent

Other features that I still need to explore:

* Try some other components like ArcLayer, HexagonLayer, GridCellLayer, etc.
* Be able to select the layers to be displayed and zoom in on the scope of each one.

Test application at http://aaranda.es/static/deckgl/
