import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import Video from '../components/video';
import { articleDetail, articleMakeCommit } from '../api/video';

const {
    Row,
    Col,
    Icon, 
  } = Components;
const { date, sessions } = utils;
class ArticleDetail extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          comment: [],
          isPhone: sessions.getStorage('screenWidth') < 800,
          hasTransForm: false,
          style: {}
      };
    }

    setValue(key,val){
        this.setState({[key]: val});
    }
    getDetail(){
      const self = this;
      let obg = UrlSearch();
      articleDetail({ id: obg.id }).then((res)=>{
        if(res.code=='0000'){
          self.setState({
            article: res.data.video || {},
            comment: res.data.comment || []
          })
        }else{
          
        }
      }).catch((err)=>{
          console.log('err',err)
      })
    }

    getStyles(){
      const content = document.getElementById('layoutContent');
      console.log('content=== ', content.offsetHeight, content.offsetWidth);
      this.setState({
        style: {
          width: `${content.offsetHeight}px`,
          height: `${content.offsetWidth}px`,
          transform: 'rotate(90deg)',
          transformOrigin: '0% 0%',
          left: `${content.offsetWidth}px`,
        }
      })
    }
    toggle(){
      const { hasTransForm } = this.state;
      const status = !hasTransForm;
      this.setState({
        hasTransForm: status,
      })
      
    }
    componentDidMount(){
      this.getDetail();
      this.getStyles();
    }
        

    render() {
        const { article, comment, isPhone, hasTransForm, style } = this.state;
        // const comentDom = comment&&comment.length>0?comment.map((itm, idx)=>{
        //   return <Row className="textclolor-333 margin-bottom-3r">
        //       <Col className='textclolor-black-low font-size-small margin-top-1r'>
        //       <Icon iconName={'android-happy'} size={'190%'} iconColor={'#999'} /> <span className='font-size-large textclolor-333'>{itm.user||'--'}</span> / 评论于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD HH:mm:ss')} </Col>
        //       <Col className='textclolor-333 font-size-normal'><div dangerouslySetInnerHTML={{__html: itm.content}} /></Col>
        //   </Row>
        //  }): ''
        return(
          <Row justify={'center'} align={"center"}
            className='absolute width-100 heightp-100'
            style={hasTransForm ? style : {}} >
            {article && article.info && <Video souceUrl={article.info} >
              <Row className="absolute share-content" justify="center" direction="column">
                <Col><Icon iconName='ios-heart ' iconColor="#fff" size="200%" /></Col>
                <Col className="font-size-small textcolor-fff">赞</Col>
                <Col className="margin-top-1r"><Icon iconName='ios-redo' iconColor="#fff" size="200%" /></Col>
                <Col className="font-size-small textcolor-fff">分享</Col>
                <Col className="margin-top-1r" onClick={()=>{ this.toggle(); }}><Icon iconName='arrow-expand ' iconColor="#fff" size="200%" /></Col>
              </Row>
              <Row className="absolute info-content">
                <Col className='textcolor-fff font-size-normal  cursor-pointer'>{article.title}</Col>
                {/* <Col span={24} className="border-radius-6 overflow-hide"><ImageBird imgName={article.imgGroup}  /></Col> */}
                <Col className='textcolor-fff font-size-small'>作者 {article.user} / 发布于 {date.momentFormate(article.createTime, 'YYYY-MM-DD')}  / 查看 {article.sea} / 属于 {article.type}</Col>
              </Row>
            </Video>}
            {/* <Col className="padding-all border-bottom border-color-e5e5e5">{article.title}</Col> */}
              {/* <Row className="margin-top-3r">
                  <Col className="font-size-large textclolor-333">评论列表</Col>
                  <Col className="margin-top-1r margin-bottom-2r"><Commit articleId={article._id} /></Col>
                  {comentDom}
              </Row> */}
          </Row>
        );
    }
}
export default ArticleDetail;
