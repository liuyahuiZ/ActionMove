import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Transition from '../Transition';
import PageTransition from '../PageTransition';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      id: 0,
      display: 'hide',
      action: 'leave'
    };
    this.rmMsg = this.rmMsg.bind(this);
  }

  toaster(arr) {
    if(this.state.display==='hide'){
        this.setState({ options: arr, display: 'show', action: 'enter' });
    } else {
      this.setState({ options: arr, display: 'hide', action: 'leave' });
    }
  }

  rmMsg(key) {
    this.setState({action: 'leave' }, ()=>{
      setTimeout(() => {
        this.setState({
          display: 'hide'
        })
      }, 1000);
    });
  }
  render() {
    const self = this;
    const { options, action, display } = this.state;
    const contbg = display==='show' ? (<Transition
      act={action}
      duration={166}
      enter={'modalbg-enter'}
      leave={'modalbg-leave'}
    ><div style={styles.boxbg} ref={(r) => {
      self.$$boxbg = r;
    }} onClick={()=>{
      self.rmMsg();
    }} /></Transition>) : '';

    const cellDom = display==='show' ? <PageTransition
      act={action}
      duration={166}
      enter={`actionSheet-${options.type}enter`}
      leave={`actionSheet-${options.type}leave`}
    ><div style={Object.assign({}, styles.cont, options.containerStyle)}>{options.content}</div></PageTransition> : '';

    return (
      <div style={styles.container} className="transi">
        {cellDom}
        {contbg}
      </div>
    );
  }
}

Modal.propTypes = {
  callbackRM: PropTypes.func
  // style: PropTypes.shape({})
};

Modal.defaultProps = {
  options: {},
  callbackRM: () => {}
};

export default Modal;
