/**
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * 
 * Doc 
 * 
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
 * official
 *   翻译：  https://wenku.baidu.com/view/14991cf9ad51f01dc381f11a.html
 *   翻译：  http://blog.csdn.net/ptrunner/article/category/8970180
 * 
 * svg系列:  https://blog.csdn.net/mydriverc/article/category/347365
 * 
 * 小程序正式支持SVG:  https://my.oschina.net/u/3919887/blog/3038862
 * 
 * svg转base64: 
 *   "data:image/svg+xml, %3csvg xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill='none' stroke='%2300ff00' d='M0 0 V100 H100z' /%3e %3csvg%3e"
 * svg转png:  http://fex.baidu.com/blog/2015/11/convert-svg-to-png-at-frontend/ 
 * 
 */

/**
 * 
 * 面向对象(离散)
 * 
 * Type
 * <integer>: /^[-+]?\d+$/       [-2**31, 2**31 - 1]
 * <number>:  /^[-+]?\d*\.\d*$/  [-3.4E38, 3.4E38]
 * 
 * globalAttribute
 * id class style
 */
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
  /**
   * basic shape
   * line polyline polygon rect
   * circle ellipse
   */
  
  <path d='M0 0z' />

  /**
   * 
   * 定位点位于文字左下角
   * 
   */
  <text x='0' y='20' style='font-size: 20'>this is text.</text>

  /**
   * SVGGradientElement: gradientTransform
   * SVGLinearGradientElement: x1,y1,x2,y2
   */
  <linearGradient x1='0' y1='0' x2='1' y2='0' id='lg'>
    <stop offset='10%' stop-color='#ff0000'  />
    <stop offset='50%' stop-color='#00ff00' />
  </linearGradient>

  /**
   * 
   * SVGDefsElement
   * 
   */
  <defs>
  </defs>
</svg>
