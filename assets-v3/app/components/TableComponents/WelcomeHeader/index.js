/**
*
* WelcomeHeader
*
*/

import React from 'react';
import { Card, Col, Row, Modal } from 'antd';
import FreshdeskWidget from '@personare/react-freshdesk-widget';

import { Wrapper } from './css';

class WelcomeHeader extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <Wrapper>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Card style={{ width: 510 }} noHovering>
                <p className="welcome-to-leadbook">
                  Global Customer Intelligence Platform
                </p>
                <br />
                <Row>
                  <Col span={12}>
                    <span>
                      <i
                        className="material-icons"
                        style={{
                          fontSize: '41px',
                          color: 'rgba(131, 131, 131, 0.4)',
                        }}
                      >
                        account_box
                      </i>
                      <span className="verified-numbers">20,000,000</span>
                      <span className="verified-label verified-contact">
                        Verified contacts
                      </span>
                    </span>
                  </Col>
                  <Col span={12}>
                    <span>
                      <i
                        className="material-icons"
                        style={{
                          fontSize: '41px',
                          color: 'rgba(131, 131, 131, 0.4)',
                        }}
                      >
                        business
                      </i>
                      <span className="verified-numbers">4,000,000</span>
                      <span className="verified-label verified-company">
                        Verified organizations
                      </span>
                    </span>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 10 }}>
            <Col span={8}>
              <Card style={{ width: 510, fontSize: 13 }} noHovering>
                <p className="welcome-to-leadbook">Search the database</p>
                <br />
                <p>
                  Start your search and create your own list of prospects. Type
                  on the <i>Search field</i> above to get started.
                </p>
                <br />
                <p>
                  Example: if you are looking for a manager of Human Resource
                  based in United States, you can type the comma seperated
                  keywords in the search field as{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
                    Manager, HR, Human Resource, United States
                  </span>
                </p>
                <br />
                <div>
                  <button
                    style={{ color: ' #0000FF', textDecoration: 'underline' }}
                    onClick={this.showModal}
                  >
                    Get Help
                  </button>
                  <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[]}
                  >
                    <FreshdeskWidget url="https://leadbook.freshdesk.com" />
                  </Modal>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Wrapper>
    );
  }
}

WelcomeHeader.propTypes = {};

export default WelcomeHeader;
