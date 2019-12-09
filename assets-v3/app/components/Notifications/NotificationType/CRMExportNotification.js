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
class CRMExportNotification extends React.Component {

  searchDB = (error, lead_type, e) => {

    let selectedKeyword = {}
    if(this.props.notification.data.lead_type == 'company'){
      selectedKeyword = {
        category: "Contact",
        filters: "company_name",
        id: error.leadbook_id,
        mode: "",
        type: "Company",
        name: error.name,
      }
    }
    else {
      selectedKeyword = {
        category: "Contact",
        filters: "contact_name",
        id: error.leadbook_id,
        mode: "Contact",
        name: error.name,
        type: "Contact"
      }
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
    let exported = notification.data.exported;
    let lead_type = notification.data.lead_type;
    let exportLabel = lead_type == 'company' ? 'Organizations': 'Contacts';
    let crm_platform = 'HubSpot';

    if(notification.data.crm_platform){
      crm_platform = notification.data.crm_platform;
      if(crm_platform == "Zendesksell"){
        crm_platform = "Zendesk Sell";
      }
    }



    let lastElement = null;
    let errors = exported.error;
    if(!(_.isEmpty(exported.error))){
      lastElement = errors[errors.length - 1];
    }

    return (
      <Card>
        <div>
          <span className="notification-header">
            {notification.level == "success" &&
              <span>
                {exportLabel} has been exported to {crm_platform} successfully. <br/>
                No. of {exportLabel} Exported: {exported.success} <br/>
                No. of {exportLabel} Updated: {exported.update} <br/>
                {
                  errors.length != 0 && (
                    <span> Errors: &nbsp;
                    {
                      _.map(errors, (error, index) => {
                        return (
                          <label style={{"color": "blue", "cursor":"pointer"}}
                            onClick={this.searchDB.bind(this, error)}
                          >
                            {error.name}
                            {
                              lastElement != error && (
                                ", "
                              )
                            }
                            &nbsp;
                          </label> 
                        )
                      })
                    }
                    </span>
                  )
                }
                
              </span>
            }
            {notification.level === "error" &&
              <span>
                There was an error in exporting to HubSpot.
              </span>
            }
          </span>
          <span className="notification-timestamp">
            {moment(notification.timestamp).fromNow()}
          </span>
        </div>
      </Card>
    );
  }
}

CRMExportNotification.propTypes = {
  notification: PropTypes.object,
  selectCategory: PropTypes.func,
  keywords: PropTypes.array
};

export default CRMExportNotification;
