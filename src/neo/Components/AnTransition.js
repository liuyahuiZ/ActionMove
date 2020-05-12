import React, { cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { addClass, removeClass, removeAllClass } from '../utils/dom';

export default class PageTransition extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      act: this.props.act,
      delay: this.props.delay
    }
  }
  componentDidMount() {
    this.element = findDOMNode(this);
    this.element.display = 'none';
    addClass(this.element, 'display-none')
    if(this.props.disable){
      this.doAction(this.props.act);
    }
    
  }

  componentWillReceiveProps(nextProps) {
    const { act } = this.state;
    if (nextProps.act !== act) {
      if(nextProps.disable){
        this.doAction(nextProps.act);
      }
    }
  }

  doAction(act){
    
    const {delay} = this.state;
    const self = this;
    if(delay) {
      setTimeout(()=>{
        self.action(act);
      }, delay)
    } else {
      self.action(act);
    }
  }

  action(act) {
    removeClass(this.element, 'display-none');
    switch (act) {
      case 'enter':
        this.enter();
        break;
      case 'leave':
        this.leave();
        break;
      default :
        this.enter();
    }
  }

  enter() {
    if (this.leaving) {
      clearTimeout(this.leaving);
    }
    const { enter, leave } = this.props;
    const el = this.element;
    addClass(el, leave);
    setTimeout(() => {
      removeClass(el, leave);
      addClass(el, enter);
    }, 10);
  }

  leave() {
    const { leave, enter } = this.props;
    const el = this.element;
    addClass(el, enter);
    setTimeout(() => {
      removeClass(el, enter);
      addClass(el, leave);
    }, 10);
  }

  render() {
    const { children, duration } = this.props;
    // const styles = {
    //   transitionDuration: `${duration}ms`,
    // };
    this.duration = duration;
    return cloneElement(children);
  }
}

PageTransition.propTypes = {
  // act: PropTypes.oneOf(['enter', 'leave']),
  disable: PropTypes.bool,
  act: PropTypes.string,
  children: PropTypes.element,
  duration: PropTypes.number,
  enter: PropTypes.string,
  leave: PropTypes.string,
  delay: PropTypes.number,
};

PageTransition.defaultProps = {
  duration: 400,
  tf: '',
  act: '',
  children: '',
  enter: '',
  leave: '',
  disable: true,
  delay: 0
};
