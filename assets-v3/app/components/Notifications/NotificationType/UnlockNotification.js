/**
 *
 * UnlockNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';

class UnlockNotification extends React.Component {
  renderSuccessNotification = (notification) => {
    const notificationType = this.props.getNotificationHeader(
      notification.data.lead_type
    );

    return (
      <Card>
        <div>
          <span className="notification-header">
            {notificationType} successfully unlocked
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
        <div>
          <span className="notification-details">
            {notification.data.count} {notificationType}
          </span>
          <span className="notification-timestamp">
            {notification.actor.first_name} {notification.actor.last_name}
          </span>
        </div>
      </Card>
    );
  };

  renderErrorNotification = (notification) => {
    const notificationType = this.props.getNotificationHeader(
      notification.data.lead_type
    );
    return (
      <Card>
        <div>
          <span className="notification-header">
            Unable to unlock {notificationType}
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
        <div>
          <span className="notification-details">
            {notification.data.count} {notificationType}
          </span>
          <span className="notification-timestamp">
            {notification.actor.first_name} {notification.actor.last_name}
          </span>
        </div>
      </Card>
    );
  };

  render() {
    const { notification } = this.props;
    if (notification.level === 'success') {
      return this.renderSuccessNotification(notification);
    }
    return this.renderErrorNotification(notification);
  }
}

UnlockNotification.propTypes = {
  notification: PropTypes.object,
  getNotificationHeader: PropTypes.func,
};

export default UnlockNotification;
