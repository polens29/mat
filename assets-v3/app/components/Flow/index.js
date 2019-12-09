/**
 *
 * Database Flow
 *
 */

import React, { PropTypes } from 'react';
import { Card, Tabs } from 'antd';
import ClickOutHandler from 'react-onclickout';

import { FlowWrapper } from './css';
import Help from 'components/Help';

import Check from 'assets/icons/check-mark.png';
import Lock from 'assets/icons/unlock1.png';
import Plane from 'assets/icons/flow-campaign.png';

class Flow extends React.PureComponent {

  onChangeMenu(key, e){
    this.props.onChangeMenu(key);
  }

  render() {
    return (
      <FlowWrapper>
        <div className='text1'>
          Rent contacts
        </div>
        <div className='text2'>
          Purchase contacts
        </div>
        <div className="divider1"></div>
        <div className="middle-group">
          <div className="upper">
            <div className="icon">
              <i className="material-icons">
                search
              </i>
            </div>
            <label onClick={this.onChangeMenu.bind(this, 2)}>Identify target audience</label>
          </div>
          <div className="upper">
            <div className="icon">
              <i className="material-icons">
                edit
              </i>
            </div>
            <label onClick={this.onChangeMenu.bind(this, 3)}>Send Personalised Campaign</label>
          </div>
          <div className="upper">
            <div className="icon">
              <i className="material-icons">
                remove_red_eye
              </i>
            </div>
            <label onClick={this.onChangeMenu.bind(this, 4)}>View Marketing Leads</label>
          </div>
          <div className="upper">
            <div className="icon">
              <i className="material-icons">
                cloud_upload
              </i>
            </div>
            <label onClick={this.onChangeMenu.bind(this, 5)}>Unlock and export qualified leads</label>
          </div>
        </div>
        <div className="export">
          <div className="icon">
            <i className="material-icons">
              cloud_upload
            </i>
          </div>
          <label onClick={this.onChangeMenu.bind(this, 5)}>Unlock and export qualified leads</label>
        </div>
      </FlowWrapper>
    );
  }
}

Flow.propTypes = {
  toggleSidebarDisplay: PropTypes.func,
  sidebarDisplay: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default Flow;
