import React, {PropTypes} from 'react';

import { CreditsTableWrapper, TableWrapper, DiscountTable } from './css';


export const creditColumn = [
  {
    title: 'Credits',
    width: 50,
    render: (obj) => {
      if (obj.range_min === 0) {
        return `< ${obj.range_max.toLocaleString()}`;
      }
      if (obj.range_max === 0) {
        return `> ${obj.range_min.toLocaleString()}`;
      }
      return `${obj.range_min.toLocaleString()} - ${obj.range_max.toLocaleString()}`;
    },
  },
  {
    title: 'Cost per credit (USD)',
    width: 50,
    render: (obj) => `$${parseFloat(obj.cost_per_credit).toFixed(2)}`,
  },
  {
    title: 'Discount',
    width: 50,
    render: (obj) => `${obj.discount}%`,
  },
];

export const NeedHelpSection = ({ subscription, showCancelSubscription, topUpPricingList }) => {
  return (
    <div
      style={{ marginTop: 20 }}
    >
      <div>
        {
          subscription.plan && (
            <div style={{ float: "right", marginBottom: '5px', fontSize: 13 }}>
              <div style={{ color: '#444444', paddingRight: 10 }}>Need to cancel your subscription?</div>
              <div style={{ color: '#108ee9', paddingRight: 10 }}>
                <a style={{ color: '#108ee9' }} onClick={() => showCancelSubscription()}>Cancel my subscription</a>
              </div>
            </div>
          )
        }
      </div>
      <CreditsTableWrapper>
        <div style={{ textAlign: 'left', marginBottom: '10px', fontWeight: '500', fontSize: 13 }}>
          <br/>
          Credit Usage
        </div>
        <table className="table">
          <tr className="white-color">
            <td>
              2 credits <br /> per verified contact
              </td>
            <td>
              0.05 credits <br /> per rented email contact
              </td>
            <td>
              10 credits <br /> per marketing lead
              </td>
          </tr>
          <tr>
            <td>
              30 days guaranteed free replacement for invalid contact emails.
              Data updated free of charge for valid subscribers
            </td>
            <td>
              Credits deducted for each delivered email, not for sending.
              Includes usage of Leadbook's email campaign engine, SPAM checks and servers
            </td>
            <td>
              Marketing leads are recipients who have shown interest for your products
              or services, following an email campaign.
            </td>
          </tr>
        </table>
      </CreditsTableWrapper>

      <CreditsTableWrapper>
        <div style={{ textAlign: 'left', marginBottom: '10px', fontWeight: '500', fontSize: 13 }}>
          Volume Discount
        </div>
        <TableWrapper>
          <DiscountTable
            columns={creditColumn}
            dataSource={topUpPricingList}
            pagination={false}
            width={500}
            locale={{
              emptyText: 'No data found.',
            }}
            size="small"
          />
        </TableWrapper>
      </CreditsTableWrapper>
    </div>
  );
}

NeedHelpSection.propTypes = {
  subscription: PropTypes.object,
  showCancelSubscription: PropTypes.func,
  topUpPricingList: PropTypes.array,
};
