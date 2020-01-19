# =============================================
# window
# =============================================

#
# shell 提供访问操作系统内核功能的软件
#   1. cli (bash)
#   2. gul (explorer)
# terminal 为cli shell提供gui(iTerm2)
# cmd, powershell 既是ternimal, 也是shell
# Powershell的打开方式不同会打开两种UI？ https://www.zhihu.com/question/63867578/answer/220101109
#

# 
# 为什么配置文件在用户目录 https://www.v2ex.com/amp/t/390576
# ProgramData folder用途 https://www.jianshu.com/p/677846a93056?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
# c盘目录解析 https://www.jianshu.com/p/17c2fd70426d?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
#

#
# #system
# ps (gcim Win32_OperatingSystem)
#   使用Win32_OperatingSystem获取操作系统信息: https://www.pstips.net/get-os-info-by-win32_operatingsystem.html
# systeminfo.exe (获取系统信息)
#
# #regedit
# win10(C:\Windows\System32\config)
# 注册表存放位置 https://blog.csdn.net/haiross/article/details/45171725 
# 注册表根键映射 https://blog.csdn.net/qq_24754061/article/details/70148116
# 注册表根键介绍 https://blog.csdn.net/u012562943/article/details/77503299
# 注册表基础优化 https://blog.csdn.net/wz_cow/article/details/88835569

#
# =============================================
# #net
# =============================================
#
# 互连网和互联网: https://juejin.im/post/5dc77d806fb9a04ab94e1563
# wlan(wireless local network): wifi(基于802.11协议)
# AP(access point)一般指路由器, STA通过它连接到network, soft-AP(无线网卡+驱动)提供和AP一致的功能  STA(Station工作站: 连接到wlan中的设备) 
# MITM(man-in-the-middle attack): http://www.aqee.net/post/man-in-the-middle-attack.html
#
# #TCP
# 3-Hand https://blog.csdn.net/hyg0811/article/details/102366854
# 3-hand与窗口 https://baijiahao.baidu.com/s?id=1617076284181702812&wfr=spider&for=pc
#
# #WebSocket
# 全双工通信(同时双向传输信息)
#
# #DNS
# browser cache -> host -> system cache -> local dnsServer -> root|TLD(top level)|authority(权威,持有dns record的server)
# 浏览器缓存只能等过期自动销毁, 修改host文件会清空系统缓存
# ps dnsclient module常用命令: https://jingyan.baidu.com/article/ca00d56c70fdf8e99eebcff2.html
#    gcm -module dnsclient
#    resolve-dnsName vs nslookup https://blog.csdn.net/weixin_34194087/article/details/89995843
#    clear-dnsclientCache 清空所有dns客户端缓存(系统缓存)，与ipconfig/flushdns一致
# nslookup dns解析(从本地dns service开始查询)
#   nslookup 待解析域名 [dns服务器地址]
#   nslookup命令 https://www.cnblogs.com/moonache/p/4569279.html
#   ipconfig -displaydns dns client缓存(hosts文件和系统缓存)
# DNS request timed out http://zhidao.game234.com/q/18356738.html
# 查ip信息 https://www.ipaddress.com/
#         https://www.17ce.com/
#
# #ICMP
# ps test-netconnection [-traceRoute]
# ping 网络连通性(host文件 -> local cache -> local dns service)
#   实质: 发icmp请求给目的主机，等待响应
#   ping 13.250.177.223, 直接使用13.250.177.223可以访问: https://blog.csdn.net/qq_34306360/article/details/79082126
#   github 用的 aws 的服务器本来就是禁 icmp 的,所以ping不通，但可以直接访问.
# tracert(trace route/路由跟踪)
#   tracert命令: https://blog.csdn.net/SouthWind0/article/details/80143835
#
# netstat
#
# netsh(network shell)
#
# /? 获取netsh上下文context列表
# https://blog.csdn.net/qq_38054198/article/details/77990914
# netsh interface ip show dns 本机dns服务器地址
# netsh wlan show profile WiFi名 key=clear 查看指定WiFi信息（密码以明文形式）
# netsh wlan export profile name='' key=clear folder='导出位置'
# 简单探究一下window下的wifi各种东西 https://www.cnblogs.com/yinghualuowu/p/10111035.html
# 防火墙 https://baike.baidu.com/item/netsh

# user
# 用户管理 https://baijiahao.baidu.com/s?id=1593063379778041306&wfr=spider&for=pc
# 用户组 https://www.cnblogs.com/lip-blog/p/7658839.html
# ps重置用户密码 https://www.sysgeek.cn/windows-10-change-account-password-powershell/
#
# 映射网络驱动器  https://blog.csdn.net/linda1000/article/details/9185467
# net use错误种类 https://blog.csdn.net/bcbobo21cn/article/details/51452972
# ipc https://blog.csdn.net/flyingleo1981/article/details/18763229
# 

# ==============================================
#   #PS
# ==============================================

#
# #operate
# 
# 类型运算符 -is|isnot|as [.Net Framework 类型]
# 如：ls | ?{ $_ -is [system.io.fileinfo] } 过滤文件类型
#     https://blog.51cto.com/020618/1891199
#
# BASH和PowerShell命令对照表 https://www.pstips.net/bash-and-powershell-quick-reference.html
#
# PowerShell保存剪贴板图片 https://blog.51cto.com/jiushu/2448543?source=dra
# PowerShell 对Internet Explorer的操作 https://blog.csdn.net/bihailan123/article/details/6554683
#

#
# alias https://www.cnblogs.com/micro-chen/p/5775170.html 
# 查看命令的alias https://blog.csdn.net/weixin_42545594/article/details/81204641
# gal|sal(get|set-alias)
# gcm(get-command)
# ?(where-object)
# %(forEach-object)
# h(get-history) // 查看已执行过命令的历史记录

# BASH和PowerShell命令对照表 https://www.pstips.net/bash-and-powershell-quick-reference.html
# ps调用.net，com，WMI类库 https://blog.csdn.net/qq_36150051/article/details/78195544
# #commend
# get-help [-full|detailed]  https://edu.51cto.com/center/course/lesson/index?id=286825

#
# #drive
# gdr|ndr|rdr(get|new|remove-psdrive)
# ndr -name driveName -psprovider filesystem -root 根目录
# get-psprovider 获取ps提供程序列表
#
# #variable: 变量驱动
# $variable:varName 查看驱动器变量对应值
# $($variable:) : $profile == $variable:profile
# nv|sv|gv|rv|clv(new|set|get|remove|clear-variable)
#     https://www.pstips.net/powershell-define-variable.html
#
#
# #env: 环境驱动
# $env:envVarName 查看环境变量对应值(副本) 
#     https://www.jb51.net/article/54883.htm
#     https://www.pstips.net/powershell-environment-variables.html
#
# 设置环境变量 [System.Environment]::SetEnvironmentVariable(variableName, value, 'user')
#     https://www.pstips.net/powershell-environment-variables.html
#
#
# #function: 函数驱动
# $function:funcName 查看函数
#

# #ExectionContext
# $executionContext 执行上下文
# & commend 
# 名字优先级及通过&突破优先级   https://www.pstips.net/powershell-call-operator.html
#
# $profile 配置文件路径
#     https://www.pstips.net/use-powershell-to-show-path-to-all-your-profiles.html
#

#
# set-executionPolicy [-scope]
# get-executionPolicy [-list]
#    https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-5.1
#    https://blog.csdn.net/PowerShell/article/details/1784441

# 
# #process
#
# #start(start-process)
# start name -verb runas(as admin)
# start file(open file by default soft)
# Start -FilePath www.jb51.net(open webPage by default browser)
#

#
# #file system
#
# \|/ 驱动器目录
# ~ 用户目录
#
# out-file(> is Out-File with some pre-defined parameter settings.)
#   1.file is no lock  2. default encoding Unicode(UTF-16LE)  3.create file when no file  4.
#   out-file和set-content区别 https://stackoverflow.com/questions/10655788/powershell-set-content-and-out-file-what-is-the-difference
# 
# ni(new-item) create file/directory
# ii(invoke-item) run file/directory by default program
# rvpa(resolve-path) 解析路径
#
# pushd(push-location) 当前位置压栈
# popd(pop-location) 栈顶元素出栈覆盖当前位置
#

#
# console
# chcp 65001 获取/修改代码页
# iTerm Themes
#     https://iterm2colorschemes.com/
#

#
# Net
# 
# gip(Get-NetIpConfiguration) 查看网络
# get-NetIpInterface | set-NetIpInterface -interfaceIndex 9 -AutomaticMetric enabled
# win10系统修改接口跃点数的两种方法 http://www.xitongcheng.com/jiaocheng/win10_article_43144.html
# 网络都有一个跃点,跃点数越低优先级越高，自动跃点计数情况下默认值为10. (跃点数越低就代表优先通过此网关节点发送需要访问网关外地数据)
#

#
# WebClient,wget https://www.360zhijia.com/360anquanke/229882.html
# iex https://ss64.com/ps/invoke-expression.html
#     https://blog.csdn.net/qq_27446553/article/details/73635429
# 一款不错的PowerShell后门 https://bbs.ichunqiu.com/thread-23660-1-1.html
#



#
# package|soft
# 包管理
# doc:  https://docs.microsoft.com/en-us/powershell/module/packagemanagement/get-package?view=powershell-7
# 安装源:  
# install|uninstall|get|find|save-package(get 已安装软件)
# 卸载  get-package -name 软件名 | uninstall-package
# 
# get-appxPackage(get 系统自带软件)
#     http://www.xitongtiandi.net/wenzhang/soft/27873.html
# 
#     oneGet https://segmentfault.com/a/1190000002522573
#     ps package架构图 https://blog.csdn.net/itanders/article/details/74278801
#     删除soft https://www.pstips.net/powershell-uninstall-software.html
# 通过注册表查看软件列表 https://www.pstips.net/get-installedsoftwares.html
# 
# 数据恢复 https://blog.csdn.net/Alexhcf/article/details/107125441
#
#

#
# service
#     https://blog.csdn.net/n5xxxx__zy/article/details/90704516
#

# -------------------------------------------------------------------------------------------------------------------------------------
#     #bat
# -------------------------------------------------------------------------------------------------------------------------------------
#
# Variable
# %~dp0 文件所在路径
# %cd% 命令所在路径
# %PATHEXT% https://blog.csdn.net/iclam/article/details/41867113 
# set variable = v1
# echo %variable
#
# @echo off和echo off区别:  https://blog.csdn.net/albertsh/article/details/52777987
# pause>nul
#
# REM 路径中有空格添加引号
# @SETLOCAL https://blog.csdn.net/qq_33336155/article/details/53516976 
#
# bat常见命令 https://www.jianshu.com/p/f9e7113a4ce2?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
# start,call https://www.cnblogs.com/Braveliu/p/5078283.html
#

# -------------------------------------------------------------------------------------------------------------------------------------
#     cmd
# -------------------------------------------------------------------------------------------------------------------------------------

#
# start https://blog.csdn.net/SoaringLee_fighting/article/details/77975861
# 批处理命令——call 和 start https://www.cnblogs.com/Braveliu/p/5078283.html
#

# -------------------------------------------------------------------------------------------------------------------------------------
#     scoop
# -------------------------------------------------------------------------------------------------------------------------------------

# scoop help
#    https://www.sspai.com/post/52496
#    https://sspai.com/post/52710
#    https://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/


#
# colortool  PowerShell配色
#    https://sspai.com/post/52868


#
# concfg

#
# #usb
# usb概念，分类 https://www.cnblogs.com/k1two2/p/5193535.html
# ALU,RAM,CPU https://blog.csdn.net/qq_43413123/category_9704473.html


# ens(以太坊域名解析系统) https://www.jianshu.com/p/7c31b4df16b9?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation 


# =============================================
# Linux
# =============================================

# linux 源码:  https://elixir.bootlin.com/linux/latest/source

# stat函数和stat命令  https://www.cnblogs.com/xiaoshiwang/p/10764243.html
# tar进行解/压缩，加密 https://blog.csdn.net/qq_32599479/article/details/100065494?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param