/**
 *
 * CreditedUserNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';

const titleCase = (str) => {
  return str.replace(/\b\S/g, function(t) { return t.toUpperCase() });
}

// eslint-disable-next-line react/prefer-stateless-function
class CreditedUserNotification extends React.Component {
  render() {
    const { notification } = this.props;

    return (
      <Card>
        <div>
          <span className="notification-header">
            {notification.data.credits > 0 &&
              <span>
                You have received {notification.data.credits} credit{notification.data.credits !== 1 && 's'} from the data exchange
              </span>
            }
            {notification.data.credits === 0 &&
              <span>
                We could not find any new contacts from the data exchange
              </span>
            }
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
        <div>
          <span className="notification-details">
            Type:
            {notification.data.type === 'upload' && ' CSV File'}
            {notification.data.type === 'social' && ` ${titleCase(notification.data.provider)} Authentication`}
          </span>
        </div>
      </Card>
    );
  }
}

CreditedUserNotification.propTypes = {
  notification: PropTypes.object,
};

export default CreditedUserNotification;
