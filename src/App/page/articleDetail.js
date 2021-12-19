import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import ImageBird from '../components/imageBird';
import Commit from '../components/commit';
import { articleDetail, articleMakeCommit } from '../api/article';

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
          isPhone: sessions.getStorage('screenWidth') < 800 
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
            article: res.data.article || {},
            comment: res.data.comment || []
          })
        }else{
          
        }
      }).catch((err)=>{
          console.log('err',err)
      })
    }

    componentDidMount(){
      this.getDetail();
    }
        

    render() {
        const { article, comment, isPhone } = this.state;
        const comentDom = comment&&comment.length>0?comment.map((itm, idx)=>{
          return <Row className="textclolor-333 margin-bottom-3r">
              <Col className='textclolor-black-low font-size-small margin-top-1r'>
              <Icon iconName={'android-happy'} size={'190%'} iconColor={'#999'} /> <span className='font-size-large textclolor-333'>{itm.user||'--'}</span> / 评论于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD HH:mm:ss')} </Col>
              <Col className='textclolor-333 font-size-normal'><div dangerouslySetInnerHTML={{__html: itm.content}} /></Col>
          </Row>
      }): ''
        return(
          <section className="">
            <Row justify={'center'} className='padding-top-1r'>
            {/* <Col className="padding-all border-bottom border-color-e5e5e5">{article.title}</Col> */}
            <Col span={isPhone ? 23 :20} className="heighth-80 padding-all-1r">
                <Row justify={'center'}>
                    <Col className='textclolor-333 font-size-large margin-bottom-1r cursor-pointer'>{article.title}</Col>
                    <Col span={24} className="border-radius-6 overflow-hide"><ImageBird imgName={article.imgGroup}  /></Col>
                    <Col className='textclolor-black-low margin-top-1r'>作者 {article.user} / 发布于 {date.momentFormate(article.createTime, 'YYYY-MM-DD')}  / 查看 {article.sea} / 属于 {article.type}</Col>
                    <Col className='textclolor-333 border-radius-6 detail-article-content bg-show'><div dangerouslySetInnerHTML={{__html: article.content}} /></Col>
                </Row>
                <Row className="margin-top-3r">
                    <Col className="font-size-large textclolor-333">评论列表</Col>
                    <Col className="margin-top-1r margin-bottom-2r"><Commit articleId={article._id} /></Col>
                    {comentDom}
                </Row>
            </Col>
            </Row>
          </section>
        );
    }
}
export default ArticleDetail;
