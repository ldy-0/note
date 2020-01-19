/**
 * 
 * dsl: https://blog.csdn.net/game3108/article/details/71525610
 * 瀑布流：设计，分析全部完成->开发全部完成->test
 * 敏捷:   cycle(多个task)->cycle()
 *     https://blog.csdn.net/andylauren/article/details/70880119
 * 
 * 程序员的职业建议  https://www.cnblogs.com/cherry0327/p/6057345.html
 * 
 * 网站
 * 图片压缩网站: https://tinypng.com/
 * icp/域名备案查询 https://beian.miit.gov.cn/#/Integrated/recordQuery
 * 公安/联网备案信息查询: http://www.beian.gov.cn/portal/recordQuery?token=afb2ab49-dde6-457d-9b50-02d1343e9eec
 * 搜索引擎: https://magi.com/
 */

/**
 * 
 * #web
 * 
 * bytes -> character -> token -> node -链接到-> tree
 * layout(reflow): 计算node位置和大小
 * 在DOM构建node时遇到script标签, 停止DOM构建,下载，执行js
 * <script async></script>DOM继续构建，下载好js文件后，如果DOM还在构建，暂停DOM构建，执行js
 * <script defer></script>DOM继续构建，下载好js文件后，如果DOM还在构建，等待DOM构建完成, 执行js, 触发DOMContentLoad事件
 * 
 * script标签与event loop在W3C规范及浏览器中的表现 https://segmentfault.com/a/1190000008299659
 * 
 * refresh
 * 区别页面刷新和关闭 https://blog.csdn.net/cscscssjsp/article/details/90444506?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
 * 无论任何浏览器不管是刷新或者是关闭都会执行下面两个方法 onbeforeunload  onunload
 * 因为刷新和关闭 在执行onunload方法时的时间不一样，一般情况下经过测试
 * 关闭时时间差不大于3毫秒
 * 刷新时即使只有一个简单的helloworld页面都不少于10毫秒,而一般网站网页内容更多，时间差达到了100多毫秒
 * js刷新当前页面:  https://www.cnblogs.com/12344321hh/p/8533359.html
 * web人: https://blog.csdn.net/dongyang0311/article/details/51303046
 * 
 * state 
 * Session机制详解 https://www.iteye.com/blog/justsee-1570652
 * mobild浏览器中sessionStorage失效 https://blog.csdn.net/anni1107qf/article/details/89460281
 * 
 * 
 * blob
 * 持有字节序列的对象
 * file
 * 有name属性的blob对象 
 * 如果file是os文件系统的文件引用，必须有type
 * 
 * 每个页面都有blobURL store, 页面关闭时销毁blobURL store, blobURL store是Map对象, key: 生成的url, value: blobURL entry{ blob或mediasource, realmObject }
 * blobURL: `blob:${origin}/${UUID}`
 * createObjectURL(object) 1. 创建blobURL  2. 将映射关系添加到blobURL store
 * revokeObjectURL(url) 将映射关系从blobURL store删除
 * 
 * 下载/保存
 * 1. <a href="url" download="filename"></a>
 *    UA先判断能否解析url对应的资源, 可以解析直接打开(img)  https://blog.csdn.net/xiaoqiangbigbrother/article/details/81218365
 *    先转换为blob, 再通过blobURI下载
 * 2. MIME octed-stream
 * 
 * 打印
 * JS 调用打印  https://zhuanlan.zhihu.com/p/136438020
 * 
 * ckeditor  https://blog.csdn.net/wangxiuyan0228/article/details/83378416
 * 
 * IE6-IE11兼容性问题列表及解决办法总结  https://www.javascriptcn.com/read-324.html
 * 
 * 开源网站 https://awehunt.com/
 * 
 */

/**
 * 
 * #mobile 
 * 
 * screen
 *   屏幕分辨率决定了屏幕有多少设备像素,屏幕分辨率和屏幕尺寸决定了1个设备像素的物理尺寸  https://zhuanlan.zhihu.com/p/44553199
 *   可视视口(visual viewport): 实际屏幕区域
 *   布局视口(layout viewport): 页面布局区域 可通过<meta name="viewport" content="width = ">设置
 *   图片模糊，1px线问题  https://www.cnblogs.com/superlizhao/p/8729190.html
 *   canvas图片模糊  https://blog.csdn.net/qyaroon/article/details/51916150
 * 
 * invoke app 
 *   h5网页唤起app:           http://uusama.com/493.html
 *   微信内置浏览器无法唤起app https://blog.csdn.net/coder_nice/article/details/43796245 
 *   浏览器如何检测是否安装app https://www.cnblogs.com/yexiaochai/p/3439179.html
 *   invoke app兼容方案：     https://blog.csdn.net/xiaoWebNo/article/details/78919346
 * 
 * pay
 *   支付宝支付  https://blog.csdn.net/shi851051279/article/details/92801626
 *   前端直接通过http方式支付  https://www.cnblogs.com/hss-blog/p/10214329.html
 *   微信内置browser, 非微信内置browser微信支付  https://blog.csdn.net/qq_36710522/article/details/90483194
 *   微信支付常见问题  https://www.cnblogs.com/dragondean/p/10220804.html
 * 
 * cache
 *   微信内置浏览器禁止缓存的问题  https://www.cnblogs.com/zdz8207/p/vue-cache-weixin.html
 *   返回上一页默认读取缓存触发  pageshow https://zhuanlan.zhihu.com/p/39346171
 * 
 * net
 *   wireshark过滤器使用  https://www.cnblogs.com/wangqiguo/p/4529250.html 
 *
 * 
 * 无缝不定宽度swiper https://blog.csdn.net/weixin_44135121/article/details/87887306
 */

/**
 * 
 * wx
 * 
 * 小程序接入图片验证码: https://cloud.tencent.com/document/product/1110/36844
 * 
 * 基于Wepy开发小程序插件推荐  https://segmentfault.com/a/1190000019936820?utm_source=tag-newest
 * 
 * 微信小程序:
 * 1. 原生组件层级问题(input层级高于弹窗)
 * 2. scroll-view换行问题  https://segmentfault.com/q/1010000007532480
 * 3. canvas相关问题 https://blog.csdn.net/qq_40126542/article/details/80317745
 *    canvas设置z-index无效
 * 4. 图片不支持svg  通过background使用SVG https://blog.csdn.net/rolan1993/article/details/79863422
 * 
 * canvasToTempFilePath:create bitmap failed
 *  1. 部分安卓机的性能不强 
 *  2. canvas没显示在界面
 *  解决方案: 多次调用
 *     if(e.errMsg === 'canvasToTempFilePath:fail:create bitmap failed' && this.currentCount < this.maxErrCount) return this.savePoster(this.currentCount++);
 * 
 */

/**
 * 
 * iot
 * 
 * 下一代物联网开发 https://blog.csdn.net/u010708922/article/details/80129268
 * 
 */

/**
 * 
 * #app 
 * 
 * native:
 *   1. 
 * 
 * hy:
 * 
 * flutter、rn、uni-app比较: https://ask.dcloud.net.cn/article/36083
 * 苹果宣称将来会对 H5 以及热更新的 App 采取更加严格的审核机制: https://www.zhihu.com/question/352468066/answer/870101321 
 * weex还在更新: http://www.easemob.com/news/3458
 * ionic:       https://blog.csdn.net/u011321546/category_7747644.html
 * Xamarin: ms快平台app(c#)
 * 
 * uni:
 *   不同编译模式介绍: https://ask.dcloud.net.cn/article/36074
 * 
 *  android studio run config中没有module(需要在file中同步) https://www.cnblogs.com/51ma/p/11277516.html
 *  android studio生成证书时JKS错误  https://blog.csdn.net/azj2019/article/details/105912049?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param
 * 未添加videoplayer模块:  https://blog.csdn.net/weixin_45936690/article/details/108400196
 */

let webapp = {
      name: 'webapp',
      renderEngine: 'webview engine',
      skill: ['js'],
      update: true,
      performence: 3,
    },
    weex = {
      name: 'weex',
      renderEngine: 'weex engine',
      skill: ['js'],
      update: true,
      ui: 'generic',
      performence: 2,
    },
    flutter = { 
      name: 'flutter', 
      renderEngine: 'dart engine',
      skill: ['dart'], 
      update: false,
      ui: 'native',
      performence: 1,
    };

    hybird = [flutter, weex];
	
	
let uni = {
	nvue: {
		html: {
			note: [
				{ type: 'component', desc: '不支持全局组件', time: '2019-12-27' },
			]
		},
		css: {
			note: [
				{ desc: '不支持属性缩写', time: '2019-12-26' },
				{ desc: '不支持%,em,rem', time: '2019-12-26' },
				{ desc: 'px与设备相关(width750)(classObj, styleObj为绝对单位), wx为绝对单位', time: '2019-12-27' },
				
				{ desc: '除<text>不支持font相关属性', time: '2019-12-26' },
				
				{ desc: '默认flex layout, direction: column', time: '2019-12-27' },
				{ desc: '只支持class selector', time: '2019-12-27' },
				{ desc: '不支持全局样式', time: '2019-12-27' },
				{ desc: '不支持预编译less,scss', time: '2019-12-27' },
			]
		},
		js: {
			
		},
		route: {
			note: [
				{ desc: 'navigateback会触发上个页面onshow callback' },
			]
		}
	},
	vue: {
		css: {
			note: [
				{ desc: "style不支持变量对象(不支持:style='styleObj', 只支持:style='{ width: width }')", time: '2020-01-19', },
				{ desc: "onload中无响应式", time: '2020-01-19', },
				{ desc: "component", time: '2020-01-19', },
			],
		},
		component: {
			note: [
				{ desc: '父组件传子组件数据修改后没有实时更新', time: '2021-02-03', url: 'https://blog.csdn.net/weixin_43972992/article/details/103794729', },
			]
		},
	},
}

/**
 * 
 * #test
 * 
 * Selenium: https://blog.csdn.net/TestingGDR/article/details/81950593
 * E2E测试: https://blog.csdn.net/qq_39300332/article/details/81197503 
 * 代码覆盖率: https://blog.csdn.net/fangqi0132/article/details/83712027
 * 
 */

/**
 * 
 * #error
 * 
 * 137(net::ERR_NAME_RESOLUTION_FAILED:  https://www.cnblogs.com/crazy00/archive/2013/08/02/3232030.html
 * 
 */

/**
 * 
 * UI
 * android: material design质感设计(色彩明亮,强调动态感,立体感)
 * ios: flat design扁平化设计(拟物(抛弃细节，立体),线条简单,色彩明亮)
 * window: metro design地铁设计(强调文字(内容大于装饰))
 *         fluent design流畅设计(强调动态，立体感)
 * 
 * 
 */