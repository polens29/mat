/**
*
* DataFaq
*
*/

import React, { PropTypes } from 'react';
import { Collapse } from 'antd';

class DataFaq extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  closeAdvanceFilter = () => {
    this.props.toggleSidebarDisplay(false);
  }
  render() {
    const Panel = Collapse.Panel;

    return (
      <div sidebarDisplay={this.props.sidebarDisplay}>
        <Collapse accordion bordered={false} defaultActiveKey={['1']}>
          <Panel header="How reliable is Leadbook’s data?" key="1">
            <p>Leadbook aims to provide the most reliable data in the market, aggregated and validated from millions of corporate websites using advanced artificial intelligence techniques. However, we cannot claim to be 100% accurate all the time because business data is fast-changing. Therefore, we will only charge our customers for verified information. All the organisation profiles are verified in advance and will be deducted from the usage cap when unlocked. All contact profiles are verified in real-time when unlocking is requested. Only verified contacts are deducted from the usage cap. Information that cannot be verified by our systems will be offered free of charge, even when it is accurate.</p>
          </Panel>
          <Panel header="How is Leadbook different from professional networking sites such as Linkedin?" key="2">
            <p>Firstly, Leadbook is designed for Sales & Marketing teams and allows downloading of prospect information, lead enrichment and true CRM connectors, all of which are not available on social networks.</p>
            <p>Secondly, Leadbook gives you a complete picture of your lead from thousands of sources, including verified business contact emails.</p>
            <p>Finally, Leadbook lets you connect with leads in any way you choose. LinkedIn’s InMail looks like SPAM with no corporate branding, rich text formatting, or ability to attach collateral.</p>
          </Panel>
          <Panel header="How is Leadbook different from other data list providers?" key="3">
            <p>Firstly, only Leadbook will provide unlimited search, segmentation and preview of the data so users feel confident they are unlocking the right organisation or contact profiles.</p>
            <p>Secondly, Leadbook will deduct an unlocked profile from the usage cap only if the information is verified. Verification of the contact information is done by our back-end servers in real-time and will return a verified business email address before it is deducted from the usage cap. Information that cannot be verified by our systems will be offered free of charge, even when it is accurate.</p>
            <p>Finally, Leadbook will mark every record that has already been purchased by a user and keep the record online so you will never purchase duplicates from us.</p>
          </Panel>
          <Panel header="How does Leadbook collect its data? What are the sources?" key="4">
            <p>Leadbook gathers its data from primary public online sources such as search engines, social networks, job portals, marketplaces and from millions of corporate websites. We enrich our data and build it into a ready to use global leads database using the latest artificial intelligence techniques.</p>
          </Panel>
          <Panel header="Is Leadbook’s data safe to use?" key="5">
            <p>Users of Leadbook are free to use the data in the course of normal sales outreach but are not allowed to use the data for SPAM emails. Users are subject to the Personal Data Privacy Act of their home country. The regulation states that The Data Protection Provisions do apply to personal contact information but do not apply to business contact information</p>
            <p>Organisations are not required to obtain consent before collecting, using or disclosing any business contact information or comply with any other obligation in the Data Protection Provisions in relation to business contact information.</p>
          </Panel>
          <Panel header="Does Leadbook provide phone numbers?" key="6">
            <p>Phone numbers are collected directly from corporate websites. Therefore we will provide official office phone numbers and sometimes the local branch phone number.</p>
          </Panel>
          <Panel header="How often does Leadbook refresh its organisation and contact data?" key="7">
            <p>We currently update our organisation and contact profiles every quarter. The business contact email is verified in real-time when a user decides to unlock a contact profile.</p>
          </Panel>
          <Panel header="Why is data quality so elusive?" key="8">
            <p>Business data, by it’s nature, is ever-changing. Even the best data sets begin to change as soon as they are assembled. However accurate your data is today, it will be less accurate tomorrow. So, there is no such thing as perfect data, but make no mistake, there are better and worse data, so its important to know what you are getting.</p>
            <p>At Leadbook we are committed to providing the best data set, and we have built the technology and processes to do that. We are obsessive about data quality and we are constantly working on ways to further improve what we deliver to our customers.</p>
          </Panel>
          <Panel header="How do we measure data accuracy?" key="9">
            <p>For most users, Data Accuracy is what matters most. At Leadbook we are obsessive about continuously improving the accuracy of our data. We constantly measure it through regular sampling.</p>
            <p><strong>Here is how we do it:</strong>Each quarter, we randomly sample 100 company profiles with contacts. To determine accuracy, we manually check each of the main fields against various information sources: company websites, LinkedIn profiles, marketplaces, and other sources. Each data must be corroborated by at least one of these credible sources. Accuracy is assessed field-by-field, and our goal is to reach a benchmark of 85% average accuracy score across all fields and records.</p>
            <p>We use the learnings from this sampling to fix specific errors and, more important, assess the quality of our sources and improve our methods for processing and refreshing the data.</p>
            <p>Leadbook provides 100% verified contact email ID, with guaranteed free replacement up to 30-days after you unlock a profile.</p>
          </Panel>
          <Panel header="What does data quality mean?" key="10">
            <p>When it comes to choosing data providers, there are few criteria more important that data quality. But what does “quality” mean? If you care about data quality, it’s an important question to ask, because different providers define it in different ways.</p>
            <p>At Leadbook, we define data quality across 3 dimensions:</p>
            <ol>
              <li>Accuracy: Is the information correct? This is measured for each individual field.</li>
              <li>Completeness: How much of the essential information is included</li>
              <li>Coverage: How much of the market is accounted for in the data set?</li>
            </ol>
            <p>For each of these 3 data quality dimensions, we have extraordinarily high standards and apply rigorous methods to achieve them.</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

DataFaq.propTypes = {
  toggleSidebarDisplay: PropTypes.func,
  sidebarDisplay: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default DataFaq;
