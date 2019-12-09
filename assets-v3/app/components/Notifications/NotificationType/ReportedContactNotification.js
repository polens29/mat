/**
 *
 * ReportedUserNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';

const titleCase = (str) => {
  return str.replace(/\b\S/g, function(t) { return t.toUpperCase() });
}

// eslint-disable-next-line react/prefer-stateless-function
class ReportedContactNotification extends React.Component {
  render() {
    const { notification } = this.props;

    return (
      <Card>
        <div>
          <span className="notification-header">
            <span>Thank you for reporting the contact email address(es) as invalid. We will refund you the credits used for purchasing the contact(s) once we verified they are invalid.</span>
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
      </Card>
    );
  }
}

ReportedContactNotification.propTypes = {
  notification: PropTypes.object,
};

export default ReportedContactNotification;
