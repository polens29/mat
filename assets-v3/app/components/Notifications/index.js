/**
 *
 * Notifications
 *
 */

import React, { PropTypes } from 'react';
import { Card } from 'antd';
import UnlockNotification from 'components/Notifications/NotificationType/UnlockNotification';
import ExportNotification from 'components/Notifications/NotificationType/ExportNotification';
import OutdatedLeadNotification from 'components/Notifications/NotificationType/OutdatedLeadNotification';
import NewLeadNotification from 'components/Notifications/NotificationType/NewLeadNotification';
import UpdatedLeadNotification from 'components/Notifications/NotificationType/UpdatedLeadNotification';
import CreditedUserNotification from 'components/Notifications/NotificationType/CreditedUserNotification';
import RefundUserNotification from 'components/Notifications/NotificationType/RefundUserNotification';
import ReportedContactNotification from 'components/Notifications/NotificationType/ReportedContactNotification';
import CRMExportNotification from 'components/Notifications/NotificationType/CRMExportNotification';
import CampaignFinishedtNotification from 'components/Notifications/NotificationType/CampaignFinishedtNotification';
import CampaignFailedNotification from 'components/Notifications/NotificationType/CampaignFailedNotification';


import ClickOutHandler from 'react-onclickout';
import { Wrapper } from './css';

function notificationHeader(leadType) {
  if (leadType === 'contact') {
    return 'Contacts';
  }
  return 'Companies';
}

class Notifications extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  onClickOut = () => {
    const { sidebarDisplay } = this.props;
    if (sidebarDisplay === 'notifications') {
      this.closeNotifications();
    }
  };

  closeNotifications = () => {
    this.props.toggleSidebarDisplay(false);
  };

  renderNotificationCard(notification) {
    // unlock
    // salesforce_export
    // salesforce_export_failure
    if (notification.verb === 'unlock') {
      return (
        <UnlockNotification
          key={notification.id}
          getNotificationHeader={notificationHeader}
          notification={notification}
        />
      );
    }
    if (notification.verb === 'outdated_lead') {
      return (
        <OutdatedLeadNotification
          key={notification.id}
          notification={notification}
        />
      );
    }

    if (notification.verb === 'updated_lead') {
      return (
        <UpdatedLeadNotification
          key={notification.id}
          notification={notification}
        />
      );
    }

    if (notification.verb === 'credited_user') {
      return (
        <CreditedUserNotification
          key={notification.id}
          notification={notification}
        />
      );
    }

    if (notification.verb === 'refunded' || notification.verb === 'not_refunded') {
      return (
        <RefundUserNotification
          key={notification.id}
          notification={notification}
        />
      );
    }

    if (notification.verb === 'reported') {
      return (
        <ReportedContactNotification
          key={notification.id}
          notification={notification}
        />
      );
    }

    if (notification.verb === 'hubspot_export') {
      return (
        <CRMExportNotification
          key={notification.id}
          notification={notification}
          addKeyword={this.props.addKeyword}
          selectCategory={this.props.selectCategory}
          keywords={this.props.keywords}
        />
      );
    }

    if (notification.verb === 'campaign_sent') {
      return (
        <CampaignFinishedtNotification
          key={notification.id}
          notification={notification}
          addKeyword={this.props.addKeyword}
          selectCategory={this.props.selectCategory}
          keywords={this.props.keywords}
        />
      );
    }

    if (notification.verb === 'campaign_failed') {
      return (
        <CampaignFailedNotification
          key={notification.id}
          notification={notification}
          addKeyword={this.props.addKeyword}
          selectCategory={this.props.selectCategory}
          keywords={this.props.keywords}
        />
      );
    }

    if (notification.verb === 'new_lead') {
      return (
        <NewLeadNotification
          key={notification.id}
          notification={notification}
          addKeyword={this.props.addKeyword}
          selectCategory={this.props.selectCategory}
          keywords={this.props.keywords}
        />
      );
    }

    return (
      <ExportNotification
        key={notification.id}
        getNotificationHeader={notificationHeader}
        notification={notification}
      />
    );
  }

  render() {
    const { keywords, sidebarDisplay, notifications, addKeyword } = this.props;

    if (sidebarDisplay === 'notifications') {
      return (
        <ClickOutHandler onClickOut={this.onClickOut}>
          <Wrapper keywords={keywords} sidebarDisplay={sidebarDisplay}>
            <Card
              className="org-prof-card"
              title={
                <span>
                  <i
                    className="material-icons"
                    style={{ position: 'relative', top: 6 }}
                  >
                    notifications
                  </i>
                  <span style={{ marginLeft: 5, fontSize: 17 }}>
                    Notifications
                  </span>
                </span>
              }
              extra={
                <button onClick={this.closeNotifications}>
                  <i
                    className="material-icons"
                    style={{ color: '#999999', position: 'relative', top: 0 }}
                  >
                    cancel
                  </i>
                </button>
              }
              style={{ height: '100%' }}
            >
              {notifications.length ? (
                notifications.map((notification) =>
                  this.renderNotificationCard(notification)
                )
              ) : (
                <Card>
                  <div>
                    <span className="notification-header">
                      No notifications available.
                    </span>
                  </div>
                </Card>
              )}
            </Card>
          </Wrapper>
        </ClickOutHandler>
      );
    }
    return <div />;
  }
}

Notifications.propTypes = {
  keywords: PropTypes.array,
  notifications: PropTypes.array,
  sidebarDisplay: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  toggleSidebarDisplay: PropTypes.func,
  addKeyword: PropTypes.func,
  selectCategory: PropTypes.func,
  keywords: PropTypes.array,
};

export default Notifications;
