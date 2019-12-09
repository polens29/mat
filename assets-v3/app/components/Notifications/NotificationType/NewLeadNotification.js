/**
 *
 * NewLeadNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';

function notificationHeader(leadType) {
  if (leadType === 'contact') {
    return 'contact(s)';
  }
  return 'organisation(s)';
}

// eslint-disable-next-line react/prefer-stateless-function
class NewLeadNotification extends React.Component {
  render() {
    const { notification } = this.props;
    const notificationType = notificationHeader(notification.data.lead_type);
    let timestamp = notification.timestamp.substring(0,10)
    timestamp = moment(timestamp, 'YYYY-MM-DD');
    return (
      <Card>
        <div>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
        <div>
          <span className="notification-details">
            Good News! We have added {notification.data.total} new {notificationType} on {timestamp.format('MMMM d, YYYY')}.
          </span>
        </div>
      </Card>
    );
  }
}

NewLeadNotification.propTypes = {
  notification: PropTypes.object,
};

export default NewLeadNotification;
