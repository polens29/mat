/**
*
* PriceFaq
*
*/

import React, { PropTypes } from 'react';
import { Collapse } from 'antd';

class PriceFaq extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  closeAdvanceFilter = () => {
    this.props.toggleSidebarDisplay(false);
  }
  render() {
    const Panel = Collapse.Panel;

    return (
      <div sidebarDisplay={this.props.sidebarDisplay}>
        <Collapse accordion bordered={false} defaultActiveKey={['1']}>
          <Panel header="How can I pay?" key="1">
            <p>We accept all major credit cards. The subscriptions renew automatically at the end of each billing cycle. For customers on an annual subscription plan, we also accept bank transfers.</p>
          </Panel>
          <Panel header="Are are there any additional costs?" key="2">
            <p>No, there are no additional costs beyond the subscription fees for your chosen plan and you won’t be charged anything extra.</p>
          </Panel>
          <Panel header="Are there any discounts available? " key="3">
            <p>Yes, you can get a 15% discount for subscribing for 12 months. This represents 2 months free on an annual subscription</p>
          </Panel>
          <Panel header="Do I have to pay for each user?" key="4">
            <p>Yes, you have to buy a subscription for each user on the platform.</p>
          </Panel>
          <Panel header="Do you provide telesales or lead generation reps?" key="5">
            <p>No, we provide the leads databases and tools for your teams. Please contact us if you want a demo or need help with using our platform.</p>
          </Panel>
          <Panel header="How is my usage cap calculated?" key="6">
            <p>Your usage cap is determined by the subscription plan you have chosen. You consume your usage cap each time you unlock an organization profile or obtain a verified contact.</p>
          </Panel>
          <Panel header="When is my usage cap expiring?" key="7">
            <p>Your usage cap will expire at the end of each subscription period and will reset anew at the beginning of the new subscription period, either monthly or annually.</p>
          </Panel>
          <Panel header="Can I try Leadbook for free?" key="8">
            <p>Of course! Your first 5 credits are on us. Sign up for a new Leadbook account.</p>
          </Panel>
          <Panel header="What is a Lead?" key="9">
            <p>A subscription to Leadbook enables you to unlock new leads subject to usage cap.</p>
            <p>The term “Lead” is used to cover an organisation profile or a contact profile.</p>
          </Panel>
          <Panel header="What is “Verified Contact”?" key="10">
            <p>“Verified Contact” means Leadbook returns a valid contact email ID, with guarantee free replacement up to 30-days after you unlock a profile.</p>
          </Panel>
          <Panel header="How do I add more credits?" key="11">
            <p>Add more credits by adding more users or upgrading your plan. A credit is used each time you unlock a verified contact or an organisation profile. Credits are shared among all users.</p>
          </Panel>
          <Panel header="How do I add or remove users?" key="12">
            <p>You can add and remove users as your team changes. We’ll make sure you are charged for the right number of users based on your team size.</p>
            <p>At the end of each billing month, you will be billed for the following month’s subscription based the number of Leadbook users you have.</p>
            <p>Credits are shared among all users.</p>
          </Panel>
          <Panel header="Can I cancel my subscription?" key="13">
            <p>You can cancel your subscription at any time in the panel under Settings/Billing/Downgrade to Free Plan. After downgrading to a Free Plan, your subscription will not be renewed either monthly or annually. We do not offer refunds on already processed payments.</p>
          </Panel>
          <Panel header="What is your refund policy?" key="14">
            <p>If you decide not to renew your subscription, you can switch to a Free Account. But we do not offer refunds on already processed payments.</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

PriceFaq.propTypes = {
  toggleSidebarDisplay: PropTypes.func,
  sidebarDisplay: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default PriceFaq;
