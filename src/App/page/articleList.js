import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import { articleList } from '../api/article';

const {
    Buttons,
    Toaster,
    Header,
    Row,
    Col,
    Icon,
    Modal,
    Carousel,
    LoadMore
  } = Components;
  
class PayDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          enableLoad: 'canload',
          currentPage: 1,
          pageSize: 5,
          articleListArr: []
      };
    }

    componentDidMount(){
      console.log();
      this.getArticleList()
    }

    getArticleList(){
      articleList({current: 1,pageSize: 5
      }).then((res)=>{
          if(res.code=='0000'){
              this.setState({
                  articleListArr: res.data.list
              })
          }
      }).catch((err)=>{
          console.log('err',err)
      })
    }
    
  
    render() {
        const { articleListArr, enableLoad } = this.state;
        const listMap = [{ tabName: 'first', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-FECAAD textclolor-gray-red border-radius-100 ">抢100优惠券</div></div>), isActive: true },
        { tabName: 'second', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">1元秒杀24期免息</div></div>), isActive: false },
        { tabName: 'thired', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">小白卡满1000减30</div></div>), isActive: false }]

        const productListDom = articleListArr.map((itm, idx)=>{
          return (
          <Row className="padding-all padding-bottom-3 bg-show border-bottom border-color-f5f5f5"  key={`${idx}-itm`} onClick={()=>{
            this.handleClick(`/articleDetail?id=${itm._id}`)
        }}>
            <Col className="padding-all">
              {itm.title}{itm.tirtle}
            </Col>
            <Col className="padding-all">
            {itm.imgGroup ? <img className='width-100'
        src={`http://localhost:2019/files/getTheImage?path=${(itm.imgGroup.filePath + '/'+itm.imgGroup.fileName)}`}
      /> : ''}
            {itm.img_group ? <img className='width-100'
        src={`http://localhost:2019/files/getTheImage?path=${'/uploads/'+itm.img_group[0].photopath}`}
          /> : ''}</Col>
            <Col  className="padding-all font-size-8">{itm.info}</Col>
          </Row>)
        });

        return(
          <LoadMore enableLoad={enableLoad} percent={20}  loadfunc={()=>{this.loadmore()}} className="bg-f5f5f5">
            <Row justify='center'>
              <Col>{productListDom}</Col>
            </Row>
          </LoadMore>
        );
    }
}
export default PayDoc;
