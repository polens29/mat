/**
 *
 * Faq
 *
 */

import React, { PropTypes } from 'react';
import { Card, Tabs } from 'antd';
import ClickOutHandler from 'react-onclickout';

import DataFaq from './data';
import PriceFaq from './price';

import { FaqWrapper } from './css';

const TabPane = Tabs.TabPane;

class Faq extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  onClickOut = () => {
    const { sidebarDisplay } = this.props;
    if (sidebarDisplay === 'faq') {
      this.closeFaqSlider();
    }
  };

  closeFaqSlider = () => {
    this.props.toggleSidebarDisplay(false);
  };

  render() {
    if (this.props.sidebarDisplay === 'faq') {
      return (
        <ClickOutHandler onClickOut={this.onClickOut}>
          <FaqWrapper sidebarDisplay={this.props.sidebarDisplay}>
            <Card
              title={
                <span>
                  <i
                    className="material-icons"
                    style={{ position: 'relative', top: 6 }}
                  >
                    live_help
                  </i>
                  <span style={{ marginLeft: 10, fontSize: 17 }}>
                    Frequently Asked Questions
                  </span>
                </span>
              }
              noHovering
              extra={
                <button onClick={this.closeFaqSlider}>
                  <i
                    className="material-icons"
                    style={{ color: '#999999', position: 'relative', top: 6 }}
                  >
                    cancel
                  </i>
                </button>
              }
              style={{ height: '100%' }}
            >
              <Tabs defaultActiveKey="1">
                <TabPane tab="Data" key="1">
                  <DataFaq />
                </TabPane>
                <TabPane tab="Pricing" key="2">
                  <PriceFaq />
                </TabPane>
              </Tabs>
            </Card>
          </FaqWrapper>
        </ClickOutHandler>
      );
    }
    return <div />;
  }
}

Faq.propTypes = {
  toggleSidebarDisplay: PropTypes.func,
  sidebarDisplay: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default Faq;
