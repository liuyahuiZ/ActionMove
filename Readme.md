###引言

为啥要搭建自己的博客，秀技术？推广自己？还是技术沉淀？对，都有，哈哈哈哈哈😄
作为一个it业内人士，当别人问起来，你平时的工作是干吗的，为了避免例如“修电脑”的词汇再次出现，个人博客会是一个比较好的合理解释，咳咳，不多说了，直接上干货～

博客地址： www.wetalks.cn  http://121.89.184.22/
前端代码架构:  react+neo-ui（自己造的ui框架轮子）代码地址 https://github.com/liuyahuiZ/MyMove
后端代码架构:  koa2+node+mongo   react+neo-ui（管理平台） git地址 https://github.com/liuyahuiZ/server-koa

nei-ui可以参考 http://121.89.184.22/neo-ui-doc/#/info/doc

###初始构想阶段
首先头脑风暴下，博客里要展示哪些内容，例如技术文章，生活记录，比较酷炫的图片特效，留言板，音乐，单页应用，响应式，前后端分离，页面资源按需加载等等。。。我们可以初步的将需求分解为业务需求和技术需求。
其中最基础的需求就是文章的展示与管理，围绕着文章，我们可以继续拓展，例如文章评论，文章分类，文章查看量还有一些文章数据的可视化等。然后我们还需要一个有助于我们博客改善的窗口——留言板，浏览者可以在这里反馈一些问题。
技术方面我用的都是我最擅长的技术框架。如react16，webpack4，nginx，mongodb，node，当然还有自己造过的轮子，如neo-ui框架，这是一款响应式的UI组件框架。我们需要更快的加载页面，还有缓存已经加载进来的资源不会重复加载，所以页面之间切换采用了根据页面路由进行打包拆分的按需加载机制和keepAlive提供的页面缓存机制，会在下边进行代码展示。mongodb作为轻量型数据库，是个人博客文章类的首选。

###实施阶段
有了初步的构想，接下来就进行实施。是时候表演真正的技术了 ：）
主体框架的搭建，利用webpack4^脚手架工具搭建一个空的react16^项目，创建入口文件以及路由文件，可以采用这样的引入路由方式，webpack在打包时会将代码拆分成chunk文件，动态加载。

```js
const CreateArticleDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/createArticle').default)
  },'CreateArticleDoc')
};

 <Router history={hashHistory}>
   <Route path={'/'} component={LayOut} >
     <IndexRedirect to="/Home"/>
     <Route path={'CreateArticle'} getComponent={CreateArticleDoc} />
  </Route>
</Router>

```

接下来是页面的具体开发了。首页要尽量展示出核心内容，这也是给访客留下第一印象的页面。
我在首页的一屏里展示的是一个全背景的banner动图。配上一串很装X的文字，会显得大气一些。

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904790457308.png'>


二屏紧接着展示博客文章，这些都是按查看量排序的热门文章
<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904778455318.png'>

三屏展示的是一些热门的分类信息

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/1590478054648.png'>

菜单部分

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904781899557.png'>

keepalive会将路由对应的页面缓存在浏览器dom中，这样页面在切换的时候，不会去重复加载，增强用户体验。

```js
import { Provider, KeepAlive } from 'react-keep-alive'

<Provider>
    <KeepAlive name={this.props.location.pathname|| 'home'}>
       <ErrorBounDary>{components}</ErrorBounDary>
    </KeepAlive>
</Provider>
```

配合音乐，可以边看博客，边听音乐，是不是档次又提升了。。。手撸了一个播放器。音乐列表采用的是网易开源的音乐接口，在此表示感谢。

```js
//音乐播放器的核心方法是控制audio组件的播放与暂停，与当前播放音乐的地址

addListenr(){
      let o=this;
      let myVid=document.getElementById("audioPlay");
      myVid.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
          function() {
            let allTime=o.timeChange(myVid.duration)
            // console.log(myVid.duration,allTime)
            o.setState({allTime:allTime});
            o.setState({allString:myVid.duration});
              setInterval(function() {
                  let nowTime=o.timeChange(myVid.currentTime);
                  // console.log(nowTime);
                  // console.log(myVid.currentTime,myVid.duration)
                  if(parseInt(myVid.duration)-parseInt(myVid.currentTime)<=2){
                    o.setNext();
                  }
                  o.setState({currentTime:nowTime});
                  o.setState({currentString:myVid.currentTime});
              }, 1000);
          }, false);
    }

    
    //播放
    setPlay(){
      const {autoPlay} = this.state;
      let myVid=document.getElementById("audioPlay");
      if(autoPlay==''){
        this.setState({autoPlay: 'autoPlay'});
        myVid.play();//audio.play();// 这个就是播放
      }else{
        this.setState({autoPlay: ''});
        myVid.pause();// 这个就是暂停
      }
    }
    //下一首
    setNext(){
      const {musicList, nowIndex} = this.state;
      let next = nowIndex+1
      if(next >= musicList.length){
        next=0
      }
      this.getMusicDetail(musicList[next],next)
    }
    //上一首
    setPre(){
      const {musicList, nowIndex} = this.state;
      let pre = nowIndex-1
      if(pre<0){
        pre = musicList.length-1
      }
      this.getMusicDetail(musicList[pre],pre)
    }
    // 修改进度
    changeCurrent(percent){
      const {allString}= this.state;
      console.log(allString);
      let myVid=document.getElementById("audioPlay");
      myVid.currentTime = parseFloat(allString*(percent/100).toFixed(2));
      console.log(parseFloat(allString)*(percent/100));
    }
    
<audio src={theMusic&&theMusic.fileUrl} autoPlay={autoPlay} loop="loop" id="audioPlay" >
            </audio>
            <MusicPlayer options={{
              autoPlay: autoPlay,
              theMusic: theMusic,
              theLyric: theLyric,
              currentTime: currentTime, 
              currentString: currentString, 
              allString: allString, 
              allTime: allTime,
              setPlay: ()=>{self.setPlay()},
              setNext: ()=>{self.setNext()},
              setPre: ()=>{self.setPre()},
              changeCurrent: (p)=>{self.changeCurrent(p)},
              listPop: ()=>{self.doPopContainer()}
            }} />



```

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904791511416.png'>

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904791748172.png'>

博客列表，手撸一个简单的分页，本来考虑的是下拉加载，但是考虑到简便，还是简单的分页更轻快，（ nei-ui里有下拉加载和上拉刷新的组件  ：）

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904784496846.png'>


###后端api部分
项目可以参考server-koa https://github.com/liuyahuiZ/server-koa

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904785852372.png'>

在设计接口的时候，也都是非常基础的增删改查接口

```js
博客文章api
/article/getArticle  获取文章列表，列表不返回文章content字段
/article/typeArticleList 根据类型获取文章列表
/article/createArctile 创建文章
/article/updateArctile 修改文章
/article/articleDetail  获取文章详情，在详情中有content
/article/findCommit 根据文章id获取评论列表
/article/makeCommit  创建文章评论

文章类型api
/blockType/typeList 类型列表
/blockType/addType  新增类型
/blockType/updateType 修改类型
/blockType/removeType 删除类型

动态图片api
/banner/bannerListForCode  根据code获取banner列表
/banner/addBanner
/banner/updateBanner
/banner/removeBanner

留言api
/messages/messagesList 留言列表
/messages/addMessages 新增留言
/banner/removeMessages 删除留言

文件管理api
/files/fileUp 文件上传
/files/getTheImage 根据path获取文件
/files/fileList 文件列表
/files/removeFile 删除文件
```


管理平台用的是基于页面配置化生成引擎candys-tool生成的，只要简单的配一下，页面就生成了，具体可参考lowcode探索那篇文章。

<img src='http://121.89.184.22/nodeApi/files/getTheImage?path=/uploads/2020-5-26/15904785367969.png'>


###下面附上心路历程

day 1 
主体框架搭建

day2
文章管理接口，分类管理接口， 增删改查，获取图片
根据分类查询文章

day3
分页，音乐， keepAlive，banner性能优化

day 4
图表， 留言， 文章评论，个人收藏（卡片形式）， banner动态化，

day5
 banner动态化，
首页加载优化
keepAlive页面优化
音乐页面优化
留言

day6 
文章评论功能，
评论列表展示
留言列表

day7 
阿里云服务器部署nginx，node，mongo
解决阿里云mongo启动问题 --fork

day8 
banner 跟进code获取
查询框动态效果
首页列表根据查看量排序

