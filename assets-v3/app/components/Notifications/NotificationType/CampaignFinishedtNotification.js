/**
 *
 * HubSpotExportNotification
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card } from 'antd';
import _ from 'underscore';
import { browserHistory } from 'react-router';

const titleCase = (str) => {
  return str.replace(/\b\S/g, function(t) { return t.toUpperCase() });
}

// eslint-disable-next-line react/prefer-stateless-function
class CampaignFinishedtNotification extends React.Component {
  constructor(props){
    super(props);
    this.searchDB = this.searchDB.bind(this);
  }

  searchDB() {
    let notif = this.props.notification.data

    let selectedKeyword = {
      category: "Contact",
      filters: "campaigns",
      id: notif.campaign_id,
      mode: "Contact",
      name: notif.title,
      type: "Contact"
    }

    this.props.addKeyword(selectedKeyword);
    const currentLocation = browserHistory.getCurrentLocation();
    if(currentLocation.pathname != '/app/v3/contact'){
      browserHistory.push({ 
        pathname: '/app/v3/contact' 
      });
    }
  }

  render() {
    const { notification } = this.props;
    let title = notification.data.title;

    return (
      <Card>
        <div>
          <span className="notification-header">
            {title} outreach campaign is completed. Click on <a onClick={this.searchDB}>results</a> to view marketing lead.
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
      </Card>
    );
  }
}

CampaignFinishedtNotification.propTypes = {
  notification: PropTypes.object,
  selectCategory: PropTypes.func,
  keywords: PropTypes.array
};

export default CampaignFinishedtNotification;
