/**
 *
 * RefundUserNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';

const titleCase = (str) => {
  return str.replace(/\b\S/g, function(t) { return t.toUpperCase() });
}

// eslint-disable-next-line react/prefer-stateless-function
class RefundUserNotification extends React.Component {
  render() {
    const { notification } = this.props;

    return (
      <Card>
        <div>
          <span className="notification-header">
            <span>
            {
              notification.verb === 'refunded' && (
                <span>{notification.data.credits} credit have been added to your account for reporting invalid email address.</span>
              )
            }
            {
              notification.verb === 'not_refunded' && (
                <span>'{notification.data.email}' seems to be a valid email address.</span>
              )
            }
            </span>
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
      </Card>
    );
  }
}

RefundUserNotification.propTypes = {
  notification: PropTypes.object,
};

export default RefundUserNotification;
