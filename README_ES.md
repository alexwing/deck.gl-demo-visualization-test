

- [1. Pincho sobre Cartografía, React y Deck.gl](#1-pincho-sobre-cartografía-react-y-deckgl)
- [2. Principios básicos sobre cartografía orientada a la web](#2-principios-básicos-sobre-cartografía-orientada-a-la-web)
  - [2.1. Coordenadas geográficas](#21-coordenadas-geográficas)
  - [2.2. Proyecciones cartográficas](#22-proyecciones-cartográficas)
  - [2.3. Formatos de datos geoespaciales](#23-formatos-de-datos-geoespaciales)
  - [2.4. Base de datos geoespaciales](#24-base-de-datos-geoespaciales)
- [3. QGIS](#3-qgis)
- [4. Formato GeoJSON](#4-formato-geojson)
- [5. @deck.gl Demo](#5-deckgl-demo)


# 1. Pincho sobre Cartografía, React y Deck.gl

En este pincho, vamos a explorar diferentes aspectos de la cartografía orientada a la web, los formatos de datos geoespaciales y las herramientas de edición y visualización de datos geoespaciales. También vamos a explorar diferentes aspectos de la librería de visualización de datos geoespaciales Deck.gl y cómo se puede integrar con React.

# 2. Principios básicos sobre cartografía orientada a la web

La cartografía es una disciplina que se encarga de la representación gráfica de la Tierra. En la actualidad, la cartografía se ha convertido en una herramienta fundamental para la toma de decisiones en diferentes ámbitos, como la planificación urbana, la gestión de recursos naturales, la gestión de desastres, la navegación, etc. un sin fin de usos que la han convertido en una herramienta fundamental para la toma de decisiones en diferentes ámbitos.

En este pincho, vamos a centrarnos en la cartografía orientada a la web, los formatos de datos geoespaciales y las herramientas de edición y visualización de datos geoespaciales.

## 2.1. Coordenadas geográficas

Las coordenadas geográficas son un sistema de referencia que se utiliza para representar la ubicación de un punto en la superficie de la Tierra. Las coordenadas geográficas se componen de dos valores: la latitud y la longitud.

<img src="./doc/coordenadas.png" alt="Coordenadas geográficas" width="500" style="display: block; margin: 0 auto;"/>

Los sistemas de coordenadas geográficas más utilizados son:

- WGS84: Las coordenadas geográficas en el sistema WGS84 se expresan en grados decimales.
  
        Ejemplos: - 40.7128° N, 74.0060° W  (formato decimal)
                  - 40° 42' 46.08" N, 74° 0' 21.6" W (formato grado, minuto, segundo)

- UTM: Las coordenadas geográficas en el sistema UTM se expresan en metros.
  
        Ejemplo: - 583964.601 4507344.285 (formato metros)
                 - 18T 583964.601 4507344.285 (formato UTM)


> Los valores positivos corresponden al hemisferio norte y al este del meridiano central, mientras que los valores negativos corresponden al hemisferio sur y al oeste del meridiano central.

> Este sistema programaticamente tiene algunos problemas, ya que la longitud y la latitud son valores angulares, y no lineales. Por lo que para realizar cálculos con coordenadas geográficas, es necesario realizar transformaciones de proyección. Por ejemplo, para calcular la distancia entre dos puntos en coordenadas geográficas, sino se realiza una transformación de proyección, el resultado no será correcto en el caso de distancias largas que implicarán un cambio en la latitud y la longitud. Por ello existen librerias como Turf.js que nos permiten realizar cálculos con coordenadas geográficas.

## 2.2. Proyecciones cartográficas

Las proyecciones cartográficas son transformaciones matemáticas que permiten representar la superficie de la Tierra en un plano. Existen diferentes tipos de proyecciones cartográficas, como la proyección cilíndrica, la proyección cónica, la proyección cenital, etc. Cada tipo de proyección cartográfica tiene sus propias características y ventajas, y se utiliza en diferentes contextos y aplicaciones.

<img src="./doc/proyecciones.jpg" alt="Proyecciones cartográficas" width="500" style="display: block; margin: 0 auto;"/>

>  Más info: http://mapasyotroscuentos.blogspot.com/2016/01/las-proyecciones-cartograficas-o-cuando.html

Hay que entender, que todas las proyecciones cartográficas tienen distorsiones, y que no existe una proyección cartográfica perfecta.

En la web, las proyecciones más utilizadas son:

- Proyección WGS84: es una proyección esférica que se utiliza para la representación de la Tierra en la web. su codificación es EPSG:4326.
- Proyección Web Mercator: es una proyección cilíndrica que se utiliza para la representación de la Tierra en la web. su codificación es EPSG:3857.

La proyección de Web Mercator es el estándar de facto para aplicaciones de mapas web. Saltó a la fama cuando Google Maps lo adoptó en 2005.​ Es utilizado por prácticamente todos los principales proveedores de mapas en línea, incluidos Google Maps, CARTO, Mapbox,3​ Bing Maps, OpenStreetMap, MapQuest, Esri y muchos otros.

Aunque en los últimos años, Google Maps en su versión de escritorio ha adoptado la proyección esférica WGS84.

Normamente cuando importamos un fichero GeoJSON, Shapefile, KML, etc. a una aplicación web, se debe tener en cuenta la proyección del fichero y la proyección del mapa. Si las proyecciones no coinciden, es necesario realizar una transformación de proyección.

## 2.3. Formatos de datos geoespaciales

Los datos geoespaciales son datos que describen la ubicación de objetos en la superficie de la Tierra. Los datos geoespaciales se pueden representar en diferentes formatos, como GeoJSON, Shapefile, KML, GML, etc. En este pincho, nos centraremos en el formato GeoJSON, que es un formato de datos geoespaciales basado en JSON.

Además del formato en si, existen diferencias fundamentales entre los datos geoespaciales vectoriales y raster. Esta diferencia se podría enumerar en los siguientes puntos:

- Datos vectoriales: representan la información geográfica como puntos, líneas y polígonos.
- Datos raster: representan la información geográfica como una cuadrícula de celdas.
- MDT (Modelo Digital del Terreno): representan la información geográfica como una cuadrícula de celdas con valores de altitud.

En cuanto a los formatos:

- GeoJSON: formato de datos geoespaciales basado en JSON.
- Shapefile: formato de datos geoespaciales desarrollado por ESRI.
- KML: formato de datos geoespaciales desarrollado por Google.
- GML: formato de datos geoespaciales basado en XML.
- MDT: Modelo Digital del Terreno.
- GeoTIF: formato de datos geoespaciales raster. (Existen otras variantes como GeoJP2, GeoPNG, etc.)

Por otra parte estan los servicios de mapas, que son servicios que proporcionan mapas y datos geoespaciales a través de la web. Algunos de los servicios de mapas más conocidos son Google Maps, Bing Maps, OpenStreetMap, Mapbox, etc.

También existen servidores dedicados, que pueden ser montados en un servidor propio. Algunos de los servidores de mapas más conocidos son GeoServer, MapServer, etc.

Estos serviciós requiren de un cliente para poder visualizar los datos, y es aquí donde entran en juego las librerías de visualización de datos geoespaciales. Las ás conocidas son Leaflet, OpenLayers, Mapbox GL, Deck.gl, etc.

## 2.4. Base de datos geoespaciales

Las bases de datos geoespaciales son bases de datos que permiten almacenar información geográfica y realizar consultas espaciales. Actualmente, existen diferentes bases de datos geoespaciales, como PostGIS, MongoDB, Cassandra, Oracle Spatial, etc. En este pincho, nos centraremos en PostGIS, que es una extensión espacial para PostgreSQL.

PostGIS proporciona una serie de funciones y operadores espaciales que permiten realizar consultas espaciales, como la intersección, la unión, la diferencia, el buffer, etc. PostGIS también proporciona un conjunto de funciones y operadores para realizar transformaciones de proyección, simplificar geometrías, calcular áreas y longitudes, etc.


<img src="./doc/postgis.png" alt="PostGIS" width="500" style="display: block; margin: 0 auto;"/>

Ejempos de consultas espaciales:
        
```sql
-- Consulta de todos los polígonos que intersectan con un punto
SELECT * FROM poligonos WHERE ST_Intersects(geom, ST_GeomFromText('POINT(0 0)', 4326));

-- Cambia la proyección de un polígono
SELECT ST_Transform(geom, 3857) FROM poligonos;

-- Calcula el área de un polígono
SELECT ST_Area(geom) FROM poligonos;

-- Calcula la longitud de una línea
SELECT ST_Length(geom) FROM lineas;

-- Genera un GeoJSON a partir de un polígono
SELECT ST_AsGeoJSON(geom) FROM poligonos;

-- Genera un GeoJSON a partir de un polígono con atributos
SELECT row_to_json((SELECT d FROM (SELECT id, nombre, ST_AsGeoJSON(geom) AS geom) AS d)) FROM poligonos;

-- Genera un GeoJSON a partir de un polígono con atributos y proyección
SELECT row_to_json((SELECT d FROM (SELECT id, nombre, ST_AsGeoJSON(ST_Transform(geom, 3857)) AS geom) AS d)) FROM poligonos;

-- tabla: spanish_provinces
-- campos: gid, geom, name

-- Consulta que genera un GeoJSON a partir de un polígono con atributos y proyección

SELECT jsonb_build_object(
    'type',     'FeatureCollection',
    'features', jsonb_agg(feature)
)
FROM (
  SELECT jsonb_build_object(
    'type',       'Feature',
    'geometry',   ST_AsGeoJSON(geom)::jsonb,
    'properties', to_jsonb(row) - 'geom'
  ) AS feature
  FROM (	
        select
                gid as cartodb_id,   		
                geom,
                name as name
        from
                public.spanish_provinces sp  
  )
 row) features;
  

```

Con un backend que utilice PostGIS, se pueden realizar consultas espaciales y generar GeoJSON a partir de los resultados de las consultas. Los datos geoespaciales en formato GeoJSON se pueden utilizar por ejemplo en Deck.gl para visualizar los datos en una aplicación web.

> PostGIS: https://postgis.net/


# 3. QGIS

QGIS es un Sistema de Información Geográfica (SIG) de código abierto que permite visualizar, editar y analizar datos geoespaciales. QGIS es una herramienta muy potente y versátil que se utiliza en diferentes ámbitos y aplicaciones rivalizando con otros programas de pago como ArcGIS.

<img src="./doc/qgis.png" alt="QGIS" width="500" style="display: block; margin: 0 auto;"/>

Desde el punto de vista como programadores, QGIS es una herramienta muy útil para la edición y visualización de datos geoespaciales. QGIS permite importar y exportar datos geoespaciales en diferentes formatos, realizar análisis espaciales, crear mapas temáticos, etc. 

No es nuestro objetivo la realización de mapas, eso es un trabajo de los cartógrafos, pero si nuestro objetivo la visualización de datos geoespaciales en aplicaciones web, es importante que sepamos cómo se realizan estos trabajos en QGIS para poder entender los datos que vamos a visualizar y poder realizar las transformaciones necesarias.

Algunas de la funcionalidaes que probablemente tengamos que usar en nuestros proyectos son:

- Importar y exportar datos geoespaciales en diferentes formatos.
- Realizar transformaciones de proyección.
- Añadir y editar atributos de datos geoespaciales.
- Combinar o dividir capas de datos geoespaciales.
- Simplificar o generalizar geometrías.
  
> QGIS: https://www.qgis.org/

# 4. Formato GeoJSON

El formato GeoJSON es un formato de datos geoespaciales basado en JSON, permite representar diferentes tipos de geometrías, como puntos, líneas y polígonos, y también permite representar atributos asociados a las geometrías.


El formato GeoJSON se compone de dos tipos de objetos:

- Geometrías: representan la forma y la ubicación de los objetos geoespaciales.
- Atributos: representan la información asociada a los objetos geoespaciales.
  
Un ejemplo de un objeto GeoJSON es el siguiente:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature", // Tipo de objeto (Feature, FeatureCollection)
      "geometry": {
        "type": "Point", // Tipo de geometría (Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon)
        "coordinates": [102.0, 0.5] // Coordenadas de la geometría
      },
      "properties": {
        "prop0": "value0" // Atributos asociados a la geometría
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

Por lo que la estructura de un fichero GeoJSON es la siguiente:

- Tipo de objeto:
    * **Feature**: representa un objeto geoespacial individual.
    * **FeatureCollection**: representa una colección de objetos geoespaciales.
- Geometría:
    * **Point**: representa un punto.
    * **LineString**: representa una línea.
    * **Polygon**: representa un polígono.
    * **MultiPoint**: representa una colección de puntos.
    * **MultiLineString**: representa una colección de líneas.
    * **MultiPolygon**: representa una colección de polígonos.

<img src="./doc/simple_feature_types.png" alt="Tipos de geometrías" width="500" style="display: block; margin: 0 auto; background-color: #FFF; padding: 20px;"/>

- Atributos: representan la información asociada a los objetos geoespaciales. Los atributos se representan como pares clave-valor, pueden ser de diferentes tipos, como texto, número, booleano, etc.


# 5. @deck.gl Demo

Aplicación de prueba de Deck.gl usando React. La aplicación se ha dividido en diferentes componentes de React que se comunican entre sí. En el panel de herramientas, se pueden realizar las siguientes modificaciones en el mapa:

* Cambiar vista (Mostrar GeoJsonLayer)
* Seleccionar el continente
* Grosor de la línea
* Escala de altura del color
* Color de la línea
* Color del polígono (el color será más oscuro dependiendo del nivel de población del país)
* Tabla con información del país al colocar el mouse sobre el polígono
* Leyenda de población y conteo de países por continente

Otras características que aún tengo que explorar:

* Probar algunos otros componentes como ArcLayer, HexagonLayer, GridCellLayer, etc.
* Poder seleccionar las capas que se mostrarán y hacer zoom en el alcance de cada una.

Aplicación de prueba en http://aaranda.es/static/deckgl/
