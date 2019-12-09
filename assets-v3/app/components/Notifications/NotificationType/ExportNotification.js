/**
 *
 * ExportNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';
import theme from 'styles/theme';

class ExportNotification extends React.Component {
  renderSuccessNotification = (notification) => {
    const notificationType = this.props.getNotificationHeader(
      notification.data.lead_type
    );
    const { created, updated, errored } = notification.data;
    const successCount = created + updated;
    const successTotal = successCount + errored;
    return (
      <Card>
        <div>
          <span className="notification-header">
            Exported {successCount} out of {successTotal} {notificationType} to
            Salesforce
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
        <div>
          <span className="notification-details">
            {created > 0 && `${created} created `}
            {updated > 0 && `${updated} updated `}
            {errored > 0 && (
              <span style={{ color: theme.colorNames.red }}>
                {errored} error
              </span>
            )}
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
            Unable to export {notificationType}
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
    if (notification.verb === 'salesforce_export') {
      return this.renderSuccessNotification(notification);
    }
    return this.renderErrorNotification(notification);
  }
}

ExportNotification.propTypes = {
  notification: PropTypes.object,
  getNotificationHeader: PropTypes.func,
};

export default ExportNotification;
