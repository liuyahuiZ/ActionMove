import React from 'react';
import { throttle } from '../../utils/throttle';
import './index.scss';

// interface ProgressBarProps {
//   enableDrag?: boolean;
//   defaultPercent?: number;
//   onPercentChange?: (params?: any) => void;
//   hasTransForm?: boolean;
//   containerStyle?: any;
// }

class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      percent: 0, // 底线距左距离
      leftScroll: 0, // 底线宽度
      startX: 0,
      drag: false,
    };
  }

  handleClick(e) {
    const pageSite = this.props.hasTransForm ? e.pageY : e.pageX;
    const percent =
      (100 * (pageSite - this.$$barContainerRef.offsetLeft)) /
      this.$$barContainerRef.clientWidth;
    this.$$bar.style.width = percent + '%';
    this.props.onPercentChange && this.props.onPercentChange(percent);
  }

  touchStart(e) {
    const touch = e.touches[0];
    if (touch) {
      this.setState({
        drag: true,
      });
    }
  }
  perChange = throttle((percent) => {
    console.log('onPercentChange ======');
    this.props.onPercentChange && this.props.onPercentChange(percent);
  }, 100);

  touchMove(e) {
    const touch = e.touches[0];
    // console.log('touch', touch.pageX, this.$$barContainerRef.offsetLeft);
    if (this.state.drag) {
      const pageSite = this.props.hasTransForm ? touch.pageY : touch.pageX;
      const percent =
        (100 * (pageSite - this.$$barContainerRef.offsetLeft)) /
        this.$$barContainerRef.clientWidth;
      this.$$bar.style.width = percent + '%';
      this.perChange(percent);
    }
  }

  touchEnd(e) {
    this.setState({
      drag: false,
    });
  }

  changeBarPercent(percent) {
    this.$$bar.style.width = 100 * Number(percent) + '%';
  }

  render() {
    const { defaultPercent, containerStyle } = this.props;
    const self = this;
    defaultPercent && this.changeBarPercent(defaultPercent);
    return (
      <div
        className="progress-bar"
        style={containerStyle || {}}
        ref={(r) => {
          this.$$barContainerRef = r;
        }}
        onTouchEnd={(e) => self.touchEnd(e)}
        onClick={(e) => self.handleClick(e)}
      >
        <div
          className="bar"
          ref={(r) => {
            this.$$bar = r;
          }}
        >
          <div
            className="bar-round"
            ref={(r) => {
              this.$$barRoundRef = r;
            }}
            onTouchStart={(e) => self.touchStart(e)}
            onTouchMove={(e) => self.touchMove(e)}
            onTouchEnd={(e) => self.touchEnd(e)}
          ></div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
