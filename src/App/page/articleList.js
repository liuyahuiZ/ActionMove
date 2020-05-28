import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { articleList, typeList } from '../api/article';
import LoadText from '../components/LoadText';
import ImageBird from '../components/imageBird';
import Search from '../components/music/search';
import PageNation from '../components/pageNation';
import { showArticleDetail } from '../utils/domUtil';
import List from '../components/list';
const {
    Toaster,
    Row,
    Col,
    Icon,
    LoadMore, PopContainer, AnTransition
  } = Components;
const { sessions, storage, date } = utils;
class PayDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          enableLoad: 'canload',
          currentPage: 1,
          pageSize: 5,
          articleListArr: [],
          loadStatus: 'LOADING', //'LOADING', 'ERROR', 'SUCCESS', 'NODATA',
          typeListArr: [],
          typeloadStatus: 'LOADING',
          pageInfo: {},
          searchObg: {},
          activeType: '',
          isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }

    componentDidMount(){
      console.log();
      console.log('this.props', this.props)
      if(this.props.pageIn=='pageOut') return
      const { currentPage, pageSize } = this.state
      this.getArticleList({current: currentPage, pageSize: pageSize });
      this.getTypeList();
    }

    getTypeList(){
        typeList({}).then((res)=>{
            if(res.code=='0000'){
                this.setState({
                    typeListArr: res.data,
                    typeloadStatus: 'SUCCESS',
                })
            }else{
              this.setState({
                typeListArr: [],
                typeloadStatus: 'NODATA'
              })
            }
        }).catch((err)=>{
            console.log('err',err)
            this.setState({
                typeListArr: [],
                typeloadStatus: 'ERROR'
            })
        })
    }
    getArticleList(obg){
      articleList(obg).then((res)=>{
          if(res.code=='0000'){
              this.setState({
                  articleListArr: res.data.list,
                  loadStatus: res.data.list.length==0? 'NODATA': 'SUCCESS',
                  pageInfo: res.data.pageInfo
              })
          }else{
            this.setState({
              articleListArr: [],
              loadStatus: 'NODATA'
            })
          }
      }).catch((err)=>{
          console.log('err',err)
          this.setState({
            articleListArr: [],
            loadStatus: 'ERROR'
          })
      })
    }
  
    render() {
        const { articleListArr, enableLoad, loadStatus, typeListArr, typeloadStatus, pageInfo, currentPage, pageSize, searchObg, activeType, isPhone } = this.state;
        const self = this;
        let typeDom = typeListArr&&typeListArr.length>0 ? typeListArr.map((itm, idx)=>{
            return (<Col span={isPhone ? 10 : 6} className={` textclolor-333 margin-bottom-2r relative margin-right-1r padding-all-1r border-radius-5f overflow-hide cursor-pointer`} key={`${idx}-article`}
            onClick={()=>{
                let typeValue = itm.typeValue
                let searchObg = { type: itm.typeValue}
                if(activeType==itm.typeValue){
                    typeValue = ''
                    searchObg = {}
                }
                self.setState({
                    activeType: typeValue,
                    searchObg: searchObg
                }, ()=>{
                    self.getArticleList({current: 1, pageSize: pageSize, searchObg: searchObg })
                })
            }}>
                <Row justify={'center'} className='relative'>
                    <Col className={`${activeType== itm.typeValue ? 'textcolor-fff': 'textcolor-333'} font-size-large zindex-20 cursor-pointer`} onClick={()=>{}}>{itm.typeKey}</Col>
                    <Col className='textcolor-fff font-size-small margin-top-1r zindex-20'>{itm.remark} / {date.momentFormate(itm.createTime, 'YYYY-MM-DD')} </Col>
                </Row>
                <div className={` absolute top-0 left-0 border-radius-5f overflow-hide heightp-100 margin-top-2r`}>
                <ImageBird imgName={itm.imgGroup}  /></div>
            </Col>)
        }) : <LoadText loadTextStatus={typeloadStatus} refreshBack={()=>{this.getTypeList()}} ></LoadText>

        return(
        <Row justify='center'>
            <Col span={20} className="content-dom "><Row justify='center'>{typeDom}</Row></Col>
            <Col span={14} className="margin-bottom-2r"><Search callBack={(k)=>{
                    console.log(k);
                    self.getArticleList({current: 1, pageSize: pageSize, searchObg: searchObg, keyWord: k});
                }} /></Col>
            <Col span={18} className="content-dom"><List articlesArr={articleListArr} loadStatus={loadStatus} /></Col>
            <Col span={isPhone? 20 : 14}><PageNation getData={(pageNum)=>{
                self.setState({
                    currentPage: pageNum
                },()=>{ self.getArticleList({current: pageNum, pageSize: pageSize, searchObg: searchObg }) })
                
            }} pageInfo={pageInfo} /></Col>
        </Row>
        );
    }
}
export default PayDoc;
