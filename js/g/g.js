/**
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * Data
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * WebTileMapService: http://map.geoq.cn/ArcGIS/rest/services
 */

// this.init();

function init(){
        // osm
        // o = new ol.source.OSM();
        // console.log(Object.getOwnPropertyNames(o), o.urls, o.tileClass);

        // bingMaps
        let bingMaps = new ol.source.BingMaps({
          key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
          imagerySet: ['Aerial', 'AerialWithLabels'], // 'Road'
        });

//         fetch('https://dev.virtualearth.net/REST/v1/Imagery/Metadata/Aerial,AerialWithLabels?key=As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5').then(e=>{
//           console.warn(e);
//         })

        // Tile layer
        let osm = new ol.layer.Tile({ source: bingMaps });

        // map
        let map = new ol.Map({
          target: 'm',
          layers: [this.lInitVector()],
          view: this.initView(), 
        });

        // interaction
        // let draw = new ol.interaction.Draw({
        //   source: geoj,
        //   type: 'Point'
        // });
        // map.addInteraction(draw);

        // console.warn(map.getSize());
      }

      /**
       * 
       * aView
       * 
       */
      function initView(){
        let view = new ol.View({
            // default: projection: 'EPSG:3857'
            center: [0, 0],
            zoom: 5
          });

        return view;
      }

      /**
       * 
       * aLayer
       * 
       */

      function lInitVector(){
        let layer = new ol.layer.Vector({ 
          source: this.sInitVector(), 
        });

        return layer;
      }

      /**
       * 
       * aVectorSource
       * 
       */

      function sInitVector(){
          let geo = new ol.format.GeoJSON(),
              topo = new ol.format.TopoJSON(),
              wkt = new ol.format.WKT(),
              geoFeatures = geo.readFeatures(geojson),
              topoFeatures = topo.readFeatures(this.getJSON()),
              wktFeatures = wkt.readFeatures(this.getSFS());
          // console.error(geo.readGeometry({ type: 'Point', coordinates: [0, 0] }), geo.writeFeature(feature));

          // wktFeatures[0].setStyle(new ol.style.Style({
          //   image: new ol.style.Circle({ radius: 6, fill: new ol.style.Fill({ color: 'green' }) })
          // }));
          // topoFeatures[1].setStyle(new ol.style.Style({ stroke: new ol.style.Stroke({ color: 'blue', width: 4 }) }));
          // topoFeatures[2].setStyle(new ol.style.Style({ fill: new ol.style.Fill({ color: '#319FD3' }) }));

          let geoj = new ol.source.Vector({ 
                // features: geoFeatures
  //           format: new ol.format.GeoJSON(),
  //           loader(extent, res, proj){ console.error(extent, proj.getCode()); },
          });

          /**
           * Source: getProjection, getState, refresh, setAttributions
           * VectorSource: addFeature,
           */

          geoj.addFeature(this.fInitCenterPoint());
          geoj.addFeature(this.fInit('LineString', [ [-1e6, 0], [1e6, 0] ], 'x'));
          geoj.addFeature(this.fInit('LineString', [ [0, -1e6], [0, 1e6] ], 'y'));
          // geoj.addFeature(this.fInit('MultiPoint'));
          // geoj.addFeature(this.fInit('MultiLineString'));
          // geoj.addFeature(this.fInit('MultiPolygon'));
          // geoj.addFeature(this.fInit('MultiPolygon'));
          // geoj.addFeatures(wktFeatures);

          // geoj.clear();
          // geoj.forEachFeature((v) => console.error(v.getStyle()));
          // console.error(geoj.getFeatures(), geoj.getProjection(), geoj.getState(), geoj.refresh());
          return geoj;
      }
      
      function getSFS(){
        /**
         * define sf commont model and commont model in sql achieve 
         * db must 1. GEOMETRY_COLUMNS table 2. SPATIAL_REF_SYS table
         */
        let wkt = 'GeometryCollection( POINT(0 0), MultiPoint((2e5 2e5), (-2e5 -2e5)) )';

        return wkt;
      }

      function getJSON(){
        /**
         * always is Object, 1. @params {String} type 2. @params {Object} [crs] 3. @params {Array} [bbox] 
         * location is Array [lon/w-e, lat/n-s, h]
         * Point {location} coordinates, MultiPoint {Array<location>} coordinates
         * LineString {Array<location>2} coordinates, MultiLineString {Array<line coordinates>} coordinates, 线性环 is Array<location> first location = last location
         * polygon {Array<线性环 coordinates>} coordinates, MultiPolygon {Array<Polygon>} coordinates
         * GeometryCollection {Array<geometry>} geometries, Geometry {String} type
         * feature {Geometry} geometry, featureCollection {Array<Feature>} geometries 
         */
          let geo = { 
            type: 'GeometryCollection', 
            geometries: [
              { type: 'LineString', coordinates: [ [0, 0], [1e5, 1e5] ] },
              { type: 'Polygon', coordinates: [ [ [1e2, 1e2], [-1e5, 1e5], [-1e5, -1e5] ] ] }
            ],
          };
          let topology = {
            type: 'Topology',
            objects: {
              p: { type: 'Point', coordinates: [0, 0] },
              // l: { type: 'LineString', arcs: [-1] },
              ml: { type: 'MultiLineString', arcs: [ [1, 2] ] },
              // pg: { type: 'Polygon', arcs: [ [0, 1, 2] ] },
              mpg: { type: 'MultiPolygon', arcs: [ [ [0, 1, 2] ], [[3]] ] },
            },
            arcs: [
              [ [0, 0], [1e5, 0] ],
              [ [1e5, 0], [1e5, 1e5], [0, 1e5], [0] ],
              [ [0, 1e5], [0, 0] ],
              [ [0, 0], [-1e5, 0], [-1e5, -1e5], [0, -1e5] ],
            ]
          };

          return topology;
      }

/**
 * 
 * aFeature
 * 
 */
function fInit(type, coordinates, name){
  let feature = new ol.Feature();

  feature.setGeometry(this[`gInit${type}`](coordinates));
  feature.set('geom', this[`gInit${type}`](coordinates));
  feature.setGeometryName('geom');

  feature.setStyle(this.styleFunction);

  feature.setId(`${name}轴`);

  return feature;
}

function fInitCenterPoint(cPoint){
  let point = this.gInitPoint(),
      feature = new ol.Feature();

  feature.setGeometry(point);
  feature.setId(12);
  feature.setStyle(this.styleFunction);
  // feature.setStyle(new ol.style.Style({
  //   renderer: function(pixel, state){ //     console.error('render function: ', pixel, state, state.context); //   }
  // }));

  return feature;
}

function transform(arr){
  let project,
      coordinate,
      p1 = new ol.proj.Projection({ code: 'EPSG:4326' }),
      webCoordinate = [10000, 0];

  // console.error(p1.getCode(), p1.getUnits(), p1.getExtent(), p1.isGlobal());

  project = ol.proj.get('EPSG:4326');
  console.error(ol.proj.toLonLat(webCoordinate), ol.proj.fromLonLat([0, 0]));

  coordinate = [0, 0];
  // let coordinate = ol.proj.transform(arr);
  // console.error('coordinate', coordinate);

  return coordinate;
}

/**
 * 
 * aStyle
 * 
 * style: https://www.cnblogs.com/lishanyang/p/6071528.html 
 * 用font设置图标样式 https://www.jianshu.com/p/8a1236cb7885
 * 
 */
function sInitMultiPolygon(){
  let style = new ol.style.Style();

  style.setFill(new ol.style.Fill({ color: 'green' }));

  return style;
}

function sInitPolygon(){
  let style = new ol.style.Style();

  style.setFill(new ol.style.Fill({ color: '#000' }));

  return style;
}

function sInitMultiLineString(){
  let style = new ol.style.Style();

  style.setStroke(new ol.style.Stroke({ color: 'black', width: 1, }));
  

  return style;
}

function sInitLineString(text){
  let style = new ol.style.Style();

  style.setStroke(this.initStroke());
  style.setText(new ol.style.Text({
    text,
    offsetX: text.includes('x') ? 200 : 10,
    offsetY: text.includes('x') ? 10 : 200,
  }));

  return style;
}

function sInitMultiPoint(){
  let style = new ol.style.Style();

  style.setImage(this.initImage());

  return style;
}

function sInitPoint(){
  // only Cirlce | Icon
  let style = new ol.style.Style();

  style.setImage(this.initImage());
  style.setText(this.initText('center point'));
  // style.setGeometry(function g(feature){
  //   let geometry = feature.getGeometry();

  //   console.error('geometry fun:', geometry.getType().toLowerCase());
  //   return geometry.getType() === 'Point' ? geometry : null;
  // });

  // console.warn('style: ', style.getFill(), style.getImage(), '-', style.getText());
  return style;
}

function initStroke(){
  let stroke = new ol.style.Stroke();

  stroke.setWidth(1);
  stroke.setColor('#000');
  // stroke.setLineDash([5, 10, 10]);
  // stroke.setLineDashOffset(1000);
  stroke.setLineCap('butt'); // butt | round | square
  stroke.setLineJoin('bevel'); // round | bevel | miter
  // stroke.setMiterLimit(4);
  // console.error(stroke.getWidth(), stroke.getColor(), stroke.getLineDash(), stroke.getLineDashOffset(), stroke.getLineCap(), stroke.getLineJoin());

  return stroke;
}

function initText(text){
  let mark = new ol.style.Text();

  mark.setText(text);
  mark.setFont('10px sans-serif');
  // mark.setFill(new ol.style.Fill({ color: 'green' }));
  // mark.setStroke(new ol.style.Stroke({ color: 'red', width: 1 }));
  // mark.setPadding([8, 8, 8, 8]);
  // mark.setBackgroundFill(new ol.style.Fill({ color: '#ccc' }));
  // mark.setBackgroundStroke(this.initStroke());
  // mark.setOffsetX(10);
  // mark.setOffsetY(10);

  return mark;
}

function initImage(){
  // ol.style.Image - icon / RegularShape - Circle
  let regularShape = new ol.style.RegularShape({ fill: new ol.style.Fill({ color: 'red' }), radius: 4 }),
      circle = new ol.style.Circle({ fill: new ol.style.Fill({ color: '#afc' }), radius: 4 }),
      imgURL = 'https://image-static.segmentfault.com/242/285/2422858747-59bb89180b2b2_articlex',
      iconOpt = { rotation: 3.14 / 180 * 360, src: imgURL, size: [50, 50], offset: [40, 50], offsetOrigin: 'bottom-left' },
      icon = new ol.style.Icon(iconOpt);

  // console.error(regularShape.getRadius(), regularShape.getFill(), circle.getRadius(), circle.getFill() );
  return icon;
}

function styleFunction(feature, resolution){
  let geometry = feature.getGeometry(),
      typeArr = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'];

  // console.error(`style ${geometry.getType()}: `, geometry, resolution);

  for(let i = 0, len = typeArr.length; i < len; i++){
    let type = typeArr[i];

    if(geometry.getType() === type) return this[`sInit${type}`](feature.getId());
  } 
}

/**
 * aGeometry
 * setCoordinates, getCoordinates, getType, clone
 * 
 */
function gInitMultiPolygon(){
  let mpo = new ol.geom.MultiPolygon(),
      coordinate = [ 
        [ 
          [ [0, 0], [1e6, 0], [1e6, 1e5], [0, 1e5], [0, 0] ] 
        ] 
      ];

  // mpo.setCoordinates(coordinate);
  mpo.appendPolygon(this.gInitPolygon());
  // console.error('multiPolygon geometry', mpo.getPolygon(0), mpo.getPolygons(), mpo.getInteriorPoints(), mpo.getArea());

  return mpo;
}

function gInitMultiLineString(coordinate){
  let mls = new ol.geom.MultiLineString();

  // mls.appendLineString(new ol.geom.LineString([ [0, -1e6], [0, 1e6] ]));
  // mls.appendLineString(new ol.geom.LineString([ [-1e6, 0], [1e6, 0] ]));
  // console.error('multiLineString geometry:', mls.getLineString(0), mls.getLineStrings());

  return mls;
}

function gInitMultiPoint(){
  let mp = new ol.geom.MultiPoint(),
      coordinate = [];
  
  mp.setCoordinates(coordinate);
  mp.appendPoint(new ol.geom.Point([1e6, 0]));
  // console.error('multi Point', mp.getPoint(1), mp.getPoints());

  return mp;
}

function gInitPolygon(){
  let polygon = new ol.geom.Polygon(),
      coordinate = [ [ [0, 0], [1e6, 0], [1e6, 2e5], [0, 2e5], [0, 0] ] ];

  polygon.setCoordinates(coordinate);
  polygon.appendLinearRing(new ol.geom.LinearRing([ [1e5, 1e5], [1e6 - 1e5, 1e5], [1e6 - 1e5, 2e5], [1e5, 2e5], [1e5, 1e5] ]));
  // console.error('polygon geometry:', polygon.getLinearRing(0), polygon.getLinearRings(), polygon.getLinearRingCount(), polygon.getInteriorPoint(), polygon.getArea());

  return polygon;
}

function gInitLineString(coordinates){
  let ls = new ol.geom.LineString();

  ls.setCoordinates(coordinates);
  // ls.appendCoordinate();
  // console.error('lineString geometry', ls.getCoordinateAt(0.9), ls.getCoordinateAtM(0.9), ls.getLength());

  // ls.applyTransform(function(v1, v2, v3){
  //   console.error('trnasform: ', v1, v2, v3);
  //   v1[v1.length - 2] = 5e5;
  //   return v1;
  // });

  return ls;
}

function gInitPoint(param) { 
  let point = new ol.geom.Point();

  point.setCoordinates([0, 0]);
  // console.error(point.getType(), point.getCoordinates(), point.clone());
  // point.applyTransform(function(v1, v2, v3){
  //   console.error('trnasform: ', v1, v2, v3);
  // });
  console.error('geom.SimpleGeometry', point.getFirstCoordinate(), point.getLastCoordinate(), point.getLayout());

  return point;
}


/**
 * 
 * aBaseObject
 * sub: Geometry, Feature, Source, View
 * 
 */
function initBaseObject(){
  let o = new ol.Object();

  o.on('change:name', e => console.warn(e.target));
  o.on('change:name', e => console.warn('two: ', e.target));

  o.set('name', 'base');
  o.setProperties({ type: 'base' });

  o.unset('name');

  console.error(o.getKeys(), o.get('name'), o.getProperties());
}

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * openlayer
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * csdn
 * ol项目分析: https://blog.csdn.net/giser_whu/article/details/45748507
 * ol阅读: https://blog.csdn.net/u013240519/article/details/81324976 
 * ol source https://blog.csdn.net/mingzai624/article/details/44599721
 * https://blog.csdn.net/future_todo/article/details/52689394
 * openlayers3加载各种底图: https://blog.csdn.net/u014529917/article/details/52241389
 * OpenLayers 图层(Layers) 详解: https://blog.csdn.net/qingyafan/article/details/45398131
 * openlayers4xy坐标转为经纬度坐标  https://blog.csdn.net/qq_21423963/article/details/80907964
 * 
 * https://www.cnblogs.com/jenry/archive/2010/06/03/1750422.html
 * 完整版例子 https://www.cnblogs.com/benmumu/p/8081136.html
 * 
 * 
 */
          
// 
          
/**
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * Arcgis
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * official doc 基础概念解释 http://resources.arcgis.com/zh-cn/help/main/10.1/index.html#/na/003r00000008000000/
 *              api https://developers.arcgis.com/labs/browse/?product=javascript&topic=any
 * 
 */


/**
 * bd js 
 * bd map api doc:  http://lbsyun.baidu.com/jsdemo.htm#c2_5
 * 
 */

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * Bing Map
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * official doc:  https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata
 */

/**
 * 
 * gis js
 * 
 * ESRI的Geodatabase设计指导 https://blog.csdn.net/zqf5816/article/details/2360080
 * coordtransform 坐标转换库: https://www.jianshu.com/p/22a1f8181bf2
 * 
 */

/**
 * 
 * postgreSql
 * psql常用命令 https://www.cnblogs.com/happyhotty/articles/1920455.html
 * psql创建,管理表 https://segmentfault.com/a/1190000015730413
 * 
 * 利用 citus 支持地理大数据: https://blog.csdn.net/qingyafan/article/details/86503076
 * 
 */

/**
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * theory
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 地理坐标系、大地坐标系与地图投影与重投影详解 https://blog.csdn.net/u011511601/article/details/81706636
 * 地理坐标系与投影坐标系的区别 https://blog.csdn.net/aganliang/article/details/81784133
 * coordinate transform https://github.com/wandergis/coordtransform
 * GCJ02经纬度,GCJ02 Web 墨卡托投影 http://www.rivermap.cn/news/show-1829.html
 * 
 * 地理编码 https://www.cnblogs.com/gissuifeng/p/5778347.html
 * 
 * 图论 https://www.cnblogs.com/z360/p/6369041.html
 * 
 * 新一代三维GIS技术白皮书: http://www.gissky.net/Item/11030.aspx
 * 
 * 开源GIS总结: https://blog.csdn.net/xcymorningsun/article/details/80400719
 * 浅谈Mapbox开源技术 https://zhuanlan.zhihu.com/p/45518647
 * 
 * 研究生（硕士）期末试卷: https://blog.csdn.net/two_bin/article/details/8490461
 * 
 * 地理类国际顶级期刊汇总 https://blog.csdn.net/yyx20125084014/article/details/83067904
 * 帝国论坛 http://www.gisempire.com/bbs/
 * GIS方面的网站 https://blog.csdn.net/cesium/article/details/1528903?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase
 * GIS方面博客 https://zhuanlan.zhihu.com/p/27190303
 * 
 * GIS Tech Stack技术栈 https://www.jianshu.com/p/3b3efa92dd6d
 * GIS开发实战图谱 https://zhuanlan.zhihu.com/p/151445930
 * 
 * webGIS
 * WebGIS 原理、设计、实现(系列) https://www.cnblogs.com/naaoveGIS/category/600559.html
 * 
 * 
 * standard
 * WMTS服务初步理解与读取: https://blog.csdn.net/supermapsupport/article/details/50423782
 * OGC标准介绍 https://wenku.baidu.com/view/b33e0621dd36a32d73758187.html?sxts=1545124296909
 * OGC-WMTS规范  http://www.doc88.com/p-908712006695.html
 * 
 */

/**
 * 
 * 
 * https://www.giserdqy.com/gis/opengis/3d/threejs/
 * 
 */

/**
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * data 
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 高分7号16m影像数据: http://www.cnsageo.com/#/
 * 
 */

/**
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * company
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 锐视智汇
 * 
 */