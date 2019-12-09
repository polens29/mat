/**
 *
 * OutdatedLeadNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';

function notificationHeader(leadType) {
  if (leadType === 'contact') {
    return 'contacts';
  }
  return 'organisations';
}

// eslint-disable-next-line react/prefer-stateless-function
class OutdatedLeadNotification extends React.Component {
  render() {
    const { notification } = this.props;
    const notificationType = notificationHeader(notification.data.lead_type);

    return (
      <Card>
        <div>
          <span className="notification-header">
            [Data Refresh] Outdated {notificationType}
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
        <div>
          <span className="notification-details">
            {notification.data.leadbook_ids.length} {notificationType}
          </span>
        </div>
      </Card>
    );
  }
}

OutdatedLeadNotification.propTypes = {
  notification: PropTypes.object,
};

export default OutdatedLeadNotification;
