import React , { Component }from 'react';
import { Components, utils } from 'neo';
import './light.scss';

class Light extends Component {
    constructor(props) {
      super(props);
      this.state = {
         nowStyle: {},
      };
    }

    render() {
        return(
            <div class="stage">
            <div class="scene">
                <div class="halo">
                    <i></i>
                    <span class="halo-star"></span>
                    <span class="halo-star"></span>
                    <span class="halo-star"></span>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="lantern">
                    <div class="lantern-handle"></div>
                    <div class="lantern-inner">
                        <div class="lantern-chain"></div>
                        <div class="lantern-head"></div>
                        <div class="lantern-body">
                            <div class="lantern-spark"></div>
                            <div class="lantern-spark"></div>
                            <div class="lantern-spark"></div>
                            <div class="lantern-flame"></div>
                        </div>
                        <div class="lantern-base"></div>
                    </div>
                </div>
                <div class="planets">
                    <div class="planet"></div>
                    <div class="planet"></div>
                    <div class="planet"></div>
                    <div class="planet"></div>
                    <div class="planet"></div>
                    <div class="planet"></div>
                </div>
            </div>
        </div>
        );
    }
}
export default Light;
