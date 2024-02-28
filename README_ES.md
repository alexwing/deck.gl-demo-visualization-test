- [1. Pincho sobre Cartografía, React y Deck.gl](#1-pincho-sobre-cartografía-react-y-deckgl)
- [2. Principios básicos sobre cartografía orientada a la web](#2-principios-básicos-sobre-cartografía-orientada-a-la-web)
  - [2.1. Coordenadas geográficas](#21-coordenadas-geográficas)
  - [2.2. Proyecciones cartográficas](#22-proyecciones-cartográficas)
  - [2.3. Formatos de datos geoespaciales](#23-formatos-de-datos-geoespaciales)
  - [2.4. Base de datos geoespaciales](#24-base-de-datos-geoespaciales)
- [3. QGIS](#3-qgis)
- [4. Formato GeoJSON](#4-formato-geojson)
- [5. @deck.gl](#5-deckgl)
- [6. Aplicación de demostración de Deck.gl](#6-aplicación-de-demostración-de-deckgl)


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

Estos serviciós requiren de un cliente para poder visualizar los datos, y es aquí donde entran en juego las librerías de visualización de datos geoespaciales. Las más conocidas son Leaflet, OpenLayers, Mapbox GL, Deck.gl, etc.

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
    'type',     'FeatureCollection', /* Genera un objeto GeoJSON de tipo FeatureCollection */
    'features', jsonb_agg(feature) /* Genera un array de objetos GeoJSON */
)
FROM (
  SELECT jsonb_build_object(
    'type',       'Feature', /* Genera un objeto GeoJSON de tipo Feature */
    'geometry',   ST_AsGeoJSON(geom)::jsonb, /* Genera el campo geom en formato GeoJSON */
    'properties', to_jsonb(row) - 'geom' /* Añade el resto de campos como atributos y elimina el campo geom */
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

No es nuestro objetivo la realización de mapas, eso es un trabajo de los cartógrafos, pero si es nuestro objetivo la visualización de datos geoespaciales en aplicaciones web, es importante que sepamos cómo se realizan estos trabajos en QGIS para poder entender los datos que vamos a visualizar y poder realizar las transformaciones necesarias.

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

# 5. @deck.gl

Deck.gl es un framework de visualización con tecnología de WebGL que proporciona una variedad de visualizaciones de datos en 2D y 3D fáciles de usar y compatibles con grandes conjuntos de datos.


Las capas en deck.gl se dividen en varias categorías:

1. Capas Básicas: Son las capas fundamentales que se utilizan como bloques de construcción para visualizaciones de datos. Incluyen capas como ArcLayer, BitmapLayer, ColumnLayer, etc.

2. Capas de Agregación: Estas capas agregan datos de entrada y los visualizan en representaciones alternativas, como cuadrículas, binning hexagonal, contornos y mapas de calor.

3. Capas Geoespaciales: Dirigidas específicamente a la visualización de datos geoespaciales, incluyendo soporte para teselas de mapas, sistemas de indexación geoespacial populares, formatos GIS, etc.

4. Capas de Malla: Visualizan modelos 3D, con soporte experimental para escenas en formato glTF.

Cada categoría tiene su conjunto de capas especializadas que se adaptan a diferentes necesidades de visualización de datos.

Algunas de las más comunes son:

- **GeoJsonLayer**: Renderiza datos geoespaciales en formato GeoJSON.
- **IconLayer**: Representa iconos rasterizados en coordenadas dadas. 
- **TextLayer**: Renderiza texto en coordenadas dadas.
- **BitmapLayer**: Renderiza imágenes georreferenciadas.
- **ArcLayer**: Renderiza arcos elevados que unen pares de coordenadas de origen y destino.
- **ColumnLayer**: Renderiza cilindros extruidos (polígonos regulares teselados) en coordenadas dadas. 
- **GridCellLayer**: Aagrega datos en un mapa de calor basado en cuadrícula.
y muchas más... 

> Más info: https://deck.gl/docs/api-reference/layers


Para añadir de fondo un mapa estático, se puede utilizar el componente `StaticMap` que proporciona Deck.gl. Este componente permite añadir un mapa estático de Mapbox, Google Maps, OpenStreetMap, etc.

```jsx
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import Map  from "react-map-gl";

/* Capa GeoJsonLayer 
*  Representa datos de la ciudad de Vancouver en formato GeoJSON
*  Cada polígono representa un bloque de la ciudad
*  La altura de cada polígono se basa en el valor de la propiedad valuePerSqm
*  El color de cada polígono se basa en el valor de la propiedad growth
*/
const geojsonLayer = new GeoJsonLayer({
  id: 'geojson-layer',
  data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json',
  opacity: 0.8,
  stroked: false,
  filled: true,
  extruded: true,
  wireframe: true,
  getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 500,
  getFillColor: f => colorScale(f.properties.growth),
  getLineColor: [255, 255, 255],
  pickable: true
});
// Vista inicial del mapa, las coordenadas son de la ciudad de Vancouver 
// con inclinación y orientación de la cámara para dar un efecto 3
const INITIAL_VIEW_STATE = {
  latitude: 49.254,
  longitude: -123.13,
  zoom: 11,
  bearing: 140,
  pitch: 60
};D

<DeckGL
  initialViewState={INITIAL_VIEW_STATE} // Vista inicial
  controller={true} // Habilita el control de la cámara
  layers={[geojsonLayer]}>
    <Map
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json"
        /> <!-- Mapa de fondo usando Mapbox y los servicios de Carto -->
</DeckGL>

```

# 6. Aplicación de demostración de Deck.gl

Esta aplicación React demuestra las capacidades de Deck.gl para la visualización geoespacial interactiva. Permite a los usuarios explorar datos de población mundial, filtrar por continente, ajustar parámetros de estilo y mostrar información adicional al pasar el cursor.

**Características clave:**

- **Mapa interactivo:** Utiliza `react-map-gl` para renderizar un mapa base y posicionar la visualización.
- **Datos de población mundial:** Aprovecha las capas GeoJSON para mostrar las fronteras mundiales y los datos de población.
- **Filtrado por continente:** Permite a los usuarios seleccionar un continente específico para resaltar países.
- **Estilo dinámico:** Proporciona controles para ajustar el ancho de línea, las escalas de color y la elevación en función de la población.
- **Interacciones al pasar el cursor:** Muestra información detallada sobre los países al pasar el cursor, incluidas las estimaciones de población.

**Uso:**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/alexwing/deck.gl-demo-visualization-test.git
   ```
2. **Instalar dependencias:**
   ```bash
   cd deck.gl-demo-visualization-test
   npm install
   ```
3. **Ejecutar la aplicación:**
   ```bash
   npm start
   ```

**Demostración en vivo:**

Visite [enlace a la demostración en vivo] para experimentar la aplicación de forma interactiva.

**Estructura del código:**

- `App.tsx`: El componente principal que renderiza la aplicación y maneja el estado global.
- `DeckMap.tsx`: El componente principal responsable de renderizar el mapa, las capas y manejar las interacciones del usuario.
- `Utils.js`: Contiene funciones de utilidad para la manipulación y cálculo del color.
- `ToolsPanel.tsx`: El componente que proporciona controles para ajustar el estilo y el filtrado de datos.
- `MenuTop.tsx`: El componente que proporciona controles para seleccionar dos vistas predefinidas.
- `db/`: Almacena los archivos de datos GeoJSON (`vancouver-blocks.geojson`, `world-population.geojson`, `spain.geojson`).

**Detalles técnicos:**

- **Bibliotecas:** React, react-map-gl, Deck.gl
- **Formato de datos:** GeoJSON

**Mejoras futuras:**

- Explorar capas Deck.gl adicionales como ArcLayer, HexagonLayer y GridCellLayer.
- Implementar la funcionalidad de zoom para ajustar a capas específicas o datos filtrados.
- Integrar una leyenda para visualizar la escala de color y la distribución de la población.

**Consideraciones a tener en cuenta:**

Usar la versión de "react-map-gl": "5.3.21" ya que a partir de la versión 6.0.0, se requiere una clave de acceso a Mapbox para usar el servicio de mapas. Ya existen un proyecto de código abierto llamado mapLibre que permite usar mapas de Mapbox sin necesidad de una clave de acceso, pero aun no es compatible con "react-map-gl".

> *Con la v2.0, Mapbox GL JS se volvió propietario y requiere una cuenta de Mapbox para usarlo, incluso si no carga teselas del servicio de datos de Mapbox. Los forks de la comunidad del código base v1, como MapLibre GL JS, generalmente se pueden usar como un reemplazo directo de mapbox-gl.*



