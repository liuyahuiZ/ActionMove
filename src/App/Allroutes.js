import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import LayOut from './core/LayOut';
import Home from './page/home';

const DomeDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/demo').default)
  },'DomeDoc')
};


const TabDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/tab').default)
  },'TabDoc')
};

const CreateArticleDoc = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/createArticle').default)
  },'CreateArticleDoc')
};

const ArticleDetail = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/articleDetail').default)
  },'ArticleDetail')
};

const Pictures = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/pictures').default)
  },'Pictures')
};

const Trans = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/trans').default)
  },'Trans')
};

const MusicCategory = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/musicCategory').default)
  },'MusicCategory')
};

const Music = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/music').default)
  },'Music')
};


const Search = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/search').default)
  },'Search')
};

const MyRecords = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/myRecords').default)
  },'MyRecords')
};

const BindUser = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/bindUser').default)
  },'BindUser')
};

const Registor = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/registor').default)
  },'Registor')
};

const MyChartsPage = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/myCharts').default)
  },'MyChartsPage')
};

const UserInfo = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/userInfo').default)
  },'UserInfo')
};

const Clender = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/Clender').default)
  },'Clender')
};

const ArticleList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/articleList').default)
  },'ArticleList')
};

const Messages = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/messages').default)
  },'Messages')
};

const Chat = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/chat').default)
  },'Chat')
};

const MyCenter = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/my').default)
  },'MyCenter')
};

const VideoList = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/videoList').default)
  },'VideoList')
};

const VideoDetail = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/videoDetail').default)
  },'VideoDetail')
};

class MyRouter extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <Router history={hashHistory}>
      <Route path={'/'} component={LayOut} >
        {/* <IndexRoute component={ListDoc} /> */}
        <IndexRedirect to="/VideoList"/>
        <Route path={'Home'} component={Home} />
        <Route path={'Demo'} getComponent={DomeDoc} />
        <Route path={'Tab'} getComponent={TabDoc} />
        <Route path={'CreateArticle'} getComponent={CreateArticleDoc} />
        <Route path={'ArticleDetail'} getComponent={ArticleDetail} />
        <Route path={'Pictures'} getComponent={Pictures} />
        <Route path={'Trans'} getComponent={Trans} />
        <Route path={'Music'} getComponent={Music} />
        <Route path={'MusicCategory'} getComponent={MusicCategory} />
        <Route path={'Search'} getComponent={Search} />
        <Route path={'MyRecords'} getComponent={MyRecords} />
        <Route path={'Registor'} getComponent={Registor} />
        <Route path={'BindUser'} getComponent={BindUser} />
        <Route path={'MyCharts'} getComponent={MyChartsPage} />
        <Route path={'UserInfo'} getComponent={UserInfo} />
        <Route path={'Clender'} getComponent={Clender} />
        <Route path={'ArticleList'} getComponent={ArticleList} />
        <Route path={'Messages'} getComponent={Messages} />
        <Route path={'Chat'} getComponent={Chat} />
        <Route path={'MyCenter'} getComponent={MyCenter} />
        <Route path={'VideoList'} getComponent={VideoList} />
        <Route path={'VideoDetail'} getComponent={VideoDetail} />
      </Route>
    </Router>
    )
  }
}
export default MyRouter
