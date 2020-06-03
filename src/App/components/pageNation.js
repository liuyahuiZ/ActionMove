import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon } = Components;

const { sessions, storage } = utils;

class PageNation extends Component {
    constructor(props) {
      super(props);
      const {allCount, allPage, currentPage, pageNumber, pageSize} = this.props.pageInfo
      this.state = {
         pageSize: pageSize,
         pageNumber: pageNumber,
         allPage: allPage,
         allCount: allCount,
         currentPage: pageNumber,
      };
    }
    componentDidMount() {
    }
    
    componentWillReceiveProps(nextProps){
        const {allCount, allPage, currentPage, pageNumber, pageSize} = nextProps.pageInfo
        this.setState({
            pageSize: pageSize,
            pageNumber: pageNumber,
            allPage: allPage,
            allCount: allCount,
            currentPage: pageNumber,
        })
    }

    getData(pageNum){
        this.props.getData(pageNum)
    }

    preClick(){
        const {currentPage, allPage} = this.state;
        if(currentPage==1) return;
        let pageNum = currentPage - 1
        if(pageNum<=0){
            pageNum = 1
        }
        this.props.getData(pageNum)
    }

    nextClick(){
        const {currentPage, allPage} = this.state;
        if(currentPage==allPage) return;
        let pageNum = currentPage + 1
        if(pageNum>=allPage){
            pageNum = allPage
        }
        this.props.getData(pageNum)
    }

    render() {
        const {allCount, allPage, currentPage, pageNumber, pageSize} = this.state;
        let pageNumDom = []
        const self = this;
        if(allPage && allPage >= 1){
            if(currentPage==allPage&&allPage>2){
                pageNumDom.push(<span className={`padding-left-1r cursor-pointer padding-right-1r font-size-12 textclolor-333`}
                    onClick={()=>{ self.preClick()}}>...</span>)
            }
            for(let i=1; i < allPage+1; i++){
                if(i==(currentPage-1)||i==currentPage||i==(currentPage+1)){
                    pageNumDom.push(<span key={`num-${i}`} className={`padding-left-1r cursor-pointer padding-right-1r font-size-12 ${currentPage==i? 'textclolor-333' : 'textclolor-black-low'}`}
                    onClick={()=>{ self.getData(i)}}>{i}</span>)
                }
            }
            if(currentPage==1&&allPage>2){
                pageNumDom.push(<span className={`padding-left-1r cursor-pointer padding-right-1r font-size-12 textclolor-333`}
                    onClick={()=>{ self.nextClick()}}>...</span>)
            }
            
        }
        return(
            <Row className='line-height-3r relative' justify={'center'}>
                {allCount?<Col className='absolute left-0' span={6}>共 {allCount||'--'} 条</Col>:''}
                {allCount?<Col span={16} className='text-align-center'>
                    <span  className={`width-3r text-align-right padding-right-1r cursor-pointer `} onClick={()=>{
                        self.preClick()
                    }}>
                        <Icon iconName={'ios-arrow-back '} iconPadding={'0'} size={'130%'} iconColor={ currentPage==1?'#999' :'#333'} />
                    </span>
                    {pageNumDom}
                    <span className={`width-3r text-align-left padding-left-1r cursor-pointer `} onClick={()=>{
                        self.nextClick()
                    }}>
                        <Icon iconName={'ios-arrow-forward '} iconPadding={'0'} size={'130%'} iconColor={ currentPage==allPage ? '#999':'#333'} />
                    </span>
                </Col>: '--'}
                
            </Row>
        );
    }
}
export default PageNation;
