import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import LayOut from './core/LayOut';
import ListDoc from './page/list';
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

class MyRouter extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <Router history={hashHistory}>
      <Route path={'/'} component={LayOut} >
        {/* <IndexRoute component={ListDoc} /> */}
        <IndexRedirect to="/Home"/>
        <Route path={'Home'} component={Home} />
        <Route path={'Lists'} component={ListDoc} />
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
      </Route>
    </Router>
    )
  }
}
export default MyRouter
