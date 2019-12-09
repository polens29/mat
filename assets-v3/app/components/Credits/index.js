/**
 *
 * Credits
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import _ from 'lodash';
import {
  Alert, Button, Col, Input, Modal, Row, Icon, Divider, Drawer, notification, Card
} from 'antd';
import FreshdeskWidget from '@personare/react-freshdesk-widget';
import ConfirmSubscription from './ConfirmSubscription';
import ConfirmTopUp from './ConfirmTopUp';
import BankTransfer from './BankTransfer';
import Billing from './Billing';

import { creditColumn, NeedHelpSection } from './constants';

import { CreditsWrapper, PlanWrapper, Features, StyledButton, BillingButton, TableTitle, TableWrapper, Wrapper, InputCredit, StyledTable } from './css';

const { TextArea } = Input;

const errorMsg = 'Purchase any number of credits, with a minimum at 500.';

const promoCodeErrorMsg = 'Please enter the valid promo code.';

const planNamesMap = {
  month: 'Monthly',
  year: 'Annually',
};


const defaultValues = {
  value: 500,
  plan: null,
  stepSubscriptionPlan: 1,
  stepTopUp: 1,
  isPlanSelected: true,
  activeKey: '2',
  visible: false,
  note: '',
  selectedPlan: null,
  stripe: null,
  purchaseModal: false,
  step: 1,
  previous: 1,
  promoCode: '',
  verifiedPromoCode: null,
  isPromoCodeNotValid: false,
};

class Credits extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultValues,
    };
    this.update = _.debounce((event, target) => {
      this.props.getTopUpPricingCost(target.value < 500 ? 500 : target.value);
    }, 500);
    this.resetPlanAmount = _.debounce(() => {
      if (this.state.verifiedPromoCode) {
        this.props.resetPlanAmount();
        this.setState({
          verifiedPromoCode: null,
          isPromoCodeNotValid: false
        });
      }
    }, 500);
  }

  componentWillReceiveProps(props) {
    this.checkStripePublishableKey(props)
    this.checkSubscriptionApprovalUrl(props);
    this.checkTopUpApprovalUrl(props);
    this.showActiveStep();
    this.checkTopUpCheckoutSession(props);
    this.checkSubscriptionCheckoutSession(props);
    this.checkCancelLoading(props);
    this.checkPurchaseModal(props);
    this.checkPlanAmountTotal(props);
  }

  showActiveStep = () => {
    if (window.location.href.includes('topup=complete') || window.location.href.includes('subscription=active')) {
      this.setState({
        step: this.state.step,
      });
    }
  };

  checkPlanAmountTotal(props) {
    const totalAmount = props.planAmount.total_amount;
    const planAmountLoading = this.props.planAmountLoading;
    const newPlanAmountLoading = props.planAmountLoading;
    if (planAmountLoading && planAmountLoading != newPlanAmountLoading) {
      if (totalAmount !== null) {
        this.setState({
          isPromoCodeNotValid: false
        });
      } else {
        this.setState({
          verifiedPromoCode: null,
          isPromoCodeNotValid: true
        });
      }
    }
  }

  checkSubscriptionApprovalUrl(props) {
    const approvalUrl = this.props.subscribePlanResponse.approval_url;
    const newApprovalUrl = props.subscribePlanResponse.approval_url;
    if (newApprovalUrl !== null && approvalUrl !== newApprovalUrl) {
      window.location.replace(newApprovalUrl);
    }
  }

  checkTopUpApprovalUrl(props) {
    const approvalUrl = props.topUpResponse.approval_url;
    if (approvalUrl !== null) {
      window.location.replace(approvalUrl);
    }
  }


  checkStripePublishableKey(props) {
    const publishableKey = this.props.stripeConfig.publishable_key;
    const newPublishableKey = props.stripeConfig.publishable_key;
    if (newPublishableKey !== null && publishableKey != newPublishableKey) {
      if (window.Stripe) {
        this.setState({ stripe: window.Stripe(newPublishableKey) });
      } else {
        document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({ stripe: window.Stripe(newPublishableKey) });
        });
      }
    }
  }

  checkTopUpCheckoutSession(props) {
    const checkoutSession = this.props.topUpCheckoutSession.checkout_session;
    const newCheckoutSession = props.topUpCheckoutSession.checkout_session;
    if (newCheckoutSession !== null && checkoutSession != newCheckoutSession) {
      const { stripe } = this.state;
      if (stripe) {
        stripe.redirectToCheckout({
          sessionId: newCheckoutSession.id,
        }).then(function (result) {
          notification.error({
            message: 'Error',
            description: result.error.message,
            placement: 'topRight',
          });
        });
      }
    }
  }

  checkSubscriptionCheckoutSession(props) {
    const checkoutSession = this.props.subscriptionCheckoutSession.checkout_session;
    const newCheckoutSession = props.subscriptionCheckoutSession.checkout_session;
    if (newCheckoutSession !== null && checkoutSession != newCheckoutSession) {
      const { stripe } = this.state;
      if (stripe) {
        stripe.redirectToCheckout({
          sessionId: newCheckoutSession.id,
        }).then(function (result) {
          notification.error({
            message: 'Error',
            description: result.error.message,
            placement: 'topRight',
          });
        });
      }
    }
  }

  checkCancelLoading(props) {
    const cancelLoading = this.props.cancelLoading;
    const newCancelLoading = props.cancelLoading;
    if (newCancelLoading === false && newCancelLoading !== cancelLoading) {
      this.setState({
        visible: newCancelLoading
      });
    }
  }

  checkPurchaseModal(nextProps) {
    if (nextProps.purchaseModal != undefined && nextProps.purchaseModal != this.state.purchaseModal) {
      this.setState({ purchaseModal: nextProps.purchaseModal });
    }
  }

  handleViewDetails = () => {
    this.setState({
      step: 1,
    });
  }

  handleSubscriptionPlan = () => {
    const { plan, verifiedPromoCode } = this.state;
    let update = 'false';

    if (this.props.subscription.plan) {
      // User is trying to update the subscription
      update = 'true';
    }

    let payload = { plan, update };
    if (verifiedPromoCode != null) {
      const promo_code = verifiedPromoCode.code;
      payload = { plan, update, promo_code }
    }

    return this.props.subscribePlan(payload);
  };

  handleTopUp = () => {
    const { value } = this.state;
    return this.props.topUp({
      credits: parseInt(value, 10),
    });
  };

  updateCredit = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
    this.update(e, e.currentTarget);
  };

  updatePromoCode = (e) => {
    this.setState({
      promoCode: e.currentTarget.value,
    });
    this.resetPlanAmount();
  };

  handleApplyPromoCode = () => {
    const { plan, promoCode } = this.state;
    const selectedPlan = this.props.plans.find((p) => p.id === plan);
    const verifiedPromoCode = selectedPlan.promo_codes.find((promo) => promo.code === promoCode);
    if (verifiedPromoCode) {
      const payload = { plan, promo_code: promoCode };
      this.props.getPlanAmount(payload);
      this.setState({
        verifiedPromoCode
      });
    }
    else {
      this.setState({
        verifiedPromoCode: null,
        isPromoCodeNotValid: true
      });
    }
  };

  updateValue = (e, key) => {
    this.setState({
      [key]: e.currentTarget.value,
    });
  };

  handleBankTransfer = (step) => {
    const previous = this.state.step;
    this.setState({
      step,
      previous,
    });
  };

  handleClose = () => {
    this.setState({
      ...defaultValues,
    });
    this.props.hidePurchaseModal();
  };

  handleNextTopup = () => {
    return this.setState({
      step: 4,
    });
  };

  handleTopUpCheckout = () => {
    const { value } = this.state;
    return this.props.getTopUpCheckoutSession({
      credits: parseInt(value, 10),
    });
  };

  handleSubscriptionCheckout = () => {
    const { plan, verifiedPromoCode } = this.state;
    let update = 'false';

    if (this.props.subscription.plan) {
      // User is trying to update the subscription
      update = 'true';
    }

    let payload = { plan, update };

    if (verifiedPromoCode != null) {
      const promo_code = verifiedPromoCode.code;
      payload = { plan, update, promo_code }
    }

    return this.props.getSubscriptionCheckoutSession(payload);
  };

  showCancelSubscription = () => this.setState({
    visible: true,
  });

  handleOkCancelSubscription = () => {
    const { note } = this.state;
    const payload = {
      note: note ? note : 'Cancelling subscription',
    }
    this.props.cancelSubscription(payload);
  };

  handleCancelCancelSubscription = () => this.setState({
    visible: false,
  });

  updateNote = (e) => {
    this.setState({
      note: e.currentTarget.value,
    });
  };

  closeModal = () => {
    this.setState({ purchaseModal: false });
    this.props.hidePurchaseModal();
  };

  formatPlanCredits = (credits) => {
    return credits.toLocaleString('en-US')

  };

  capitalizePlanInterval = (interval) => {
    return interval.charAt(0).toUpperCase() + interval.slice(1);
  };

  handleSelectPlan = (plan) => {
    if (plan) {
      return this.setState({
        plan,
        step: 2,
      })
    }

    return this.setState({
      step: 3,
    })
  };

  handleBack = () => {
    const { step } = this.state;
    if (step == 2 || step == 3 || step == 6) {
      return this.setState({
        step: 1,
      })
    } else if (step == 4) {
      return this.setState({
        step: 3,
      })
    }
    else if (step == 5) {
      return this.setState({
        step: this.state.previous,
      })
    }
  };

  showBilling = () => this.setState({
    step: 6,
  });


  render() {
    const { is_enterprise } = this.props.credentials;
    const { topUpPricingList, subscription, topUpLoading,
      topUpPricingCost, payments, cancelLoading,
      planAmount, planAmountLoading,
    } = this.props;
    const { cost, pricing } = topUpPricingCost;
    const { step } = this.state;


    return (
      <CreditsWrapper>
        <Button onClick={() => this.props.showPurchaseModal("2")}>
          Credits: {this.props.credits ? this.props.credits.toLocaleString() : 0}
          <i className="material-icons">monetization_on</i>
        </Button>

      {/*
        {!is_enterprise && (
          
            <i className="material-icons credit-icon">add_circle_outline</i>
          </a>
        )}

        {this.props.credentials.is_enterprise && (
          <a
            href="#"
            onClick={() => this.props.showPurchaseModal("2")}
            style={{ outline: 'none' }}
          >
            <i className="material-icons credit-icon">add_circle_outline</i>
          </a>
        )}
      */}
        {this.props.credentials.is_enterprise && (
          <Modal
            visible={this.props.purchaseModal}
            onOk={this.props.hidePurchaseModal}
            onCancel={this.props.hidePurchaseModal}
            footer={[]}
          >
            <FreshdeskWidget
              url="https://leadbook.freshdesk.com"
              formTitle={'Purchase Credits'}
            />
          </Modal>
        )}
        <Modal
          title="Confirm Cancel Subscription"
          visible={this.state.visible}
          onOk={this.handleOkCancelSubscription}
          onCancel={this.handleCancelCancelSubscription}
          okText="Submit"
          cancelText="Cancel"
          wrapClassName="pa-modal-display"
          width={475}
          confirmLoading={cancelLoading}
        >
          <div>
            Are you sure you want to cancel your subscription plan?
              <br /><br />
            <strong>Note</strong> <br /><br />
            <TextArea rows={4} placeholder="Add a note" value={this.state.note} onChange={this.updateNote} />
          </div>
        </Modal>
        {!this.props.credentials.is_enterprise && (
          <Drawer
            title={
              <span>
                <span
                  className="ant-card-head-title"
                  style={{ padding: '0px' }}
                >
                  <Icon type="credit-card" />
                  <span style={{ marginLeft: 5, fontSize: 17 }}>
                    Purchase Credits
                  </span>
                </span>
                <button onClick={this.closeModal} className="custome-close">
                  <i
                    className="material-icons"
                    style={{ color: '#999999' }}
                  >
                    cancel
                  </i>
                </button>
              </span>
            }
            className="purchase-credits-drawer"
            visible={this.state.purchaseModal}
            onClose={() => this.handleClose()}
            width="750"
            style={{ padding: 30 }}
            closable={false}
          >

            <div style={{ marginBottom: 10 }}>
              {
                step > 1 && <div className="inline-flex left">
                  <BillingButton onClick={() => this.handleBack()}>
                    <Icon type="left" />
                    Back
              </BillingButton>
                </div>
              }

              {step == 1 && <div className="inline-flex right">
                <BillingButton onClick={() => this.showBilling()}>
                  Billing
                <Icon type="right" />
                </BillingButton>
              </div>
              }
            </div>

            <br />
            {step == 1 && <div style={{ textAlign: 'center', marginTop: 20 }}>
              {window.location.href.includes('subscription=active') &&
                <div>
                  <Alert message="Subscription Active" description="Thank you for subscribing to our plan. Once the payment is processed, the credits would be added to your account." type="success" />
                  <br />
                </div>
              }
              {window.location.href.includes('topup=complete') &&
                <div>
                  <Alert message="Top Up Successful" description="Thank you. Once the payment is processed, the credits would be added to your account." type="success" />
                  <br />
                </div>
              }
              <Row gutter={16}>
                {this.props.plans.map((plan) =>
                  <Col span={24 / (this.props.plans.length + 1)}>
                    <Card className="plan-card" title={planNamesMap[plan.interval]} style={{ height: 450, width: 220 }} headStyle={{ backgroundColor: '#2e6089' }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
                      <PlanWrapper>
                        <div className="plan-price">
                          {plan.prices.find((price) => price.currency === 'USD').amount.toLocaleString()} USD
                      </div>
                        <div className="plan-interval">
                          Per {this.capitalizePlanInterval(plan.interval)}
                        </div>
                        <Divider />
                        <div className="plan-credits">
                          {this.formatPlanCredits(plan.credits)} Credits{' '}
                          {plan.extra_credits > 0 &&
                            <span>
                              &nbsp; + {this.formatPlanCredits(plan.extra_credits)} Credits
                          </span>
                          }
                        </div>
                        <div className="plan-credits">
                          {plan.extra_credits == 0 &&
                            <span>Enough to reach out {this.formatPlanCredits(plan.credits / 0.05)} new contacts</span>
                          }
                          {plan.extra_credits > 0 &&
                            <span>Enough to reach out {this.formatPlanCredits((plan.extra_credits + plan.credits) / 0.05)} new contacts</span>
                          }
                        </div>
                      </PlanWrapper>
                      <Features>
                        Payment debited {plan.interval == 'month' && 'monthly'}  {plan.interval == 'year' && 'annually'}
                      </Features>
                      <Features>
                        Cancel anytime
                      </Features>
                      <Features>
                        Unlimited users
                      </Features>
                      <Features>
                        All Features
                      </Features>
                      <StyledButton className="ant-btn ant-btn-primary" onClick={() => this.handleSelectPlan(plan.id)} disabled={(subscription.plan && subscription.plan.id == plan.id)}>
                        {!subscription.plan && 'Purchase'}
                        {(subscription.plan && subscription.plan.id == plan.id) && 'Purchased'}
                        {(subscription.plan && subscription.plan.id !== plan.id) && <span>Switch to  {planNamesMap[plan.interval]}</span>}
                      </StyledButton>
                      <div className="margin-top-10">
                        <span style={{ fontSize: 10 }}><b>Auto renewal</b> on {plan.interval == 'month' && 'monthly'}  {plan.interval == 'year' && 'yearly'} plans</span>
                      </div>
                    </Card>
                  </Col>
                )}
                <Col span={24 / (this.props.plans.length + 1)}>
                  <Card className="plan-card" title="One Time" style={{ height: 450, width: 220 }} headStyle={{ backgroundColor: '#2e6089' }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
                    <PlanWrapper>
                      <div className="plan-price">
                        500 USD
                      </div>
                      <div className="plan-interval">
                        Start from
                    </div>
                      <Divider />
                      <div className="plan-credits">
                        500 Credits
                    </div>
                      <div className="plan-credits">
                        <span>Enough to reach out 10,000 new contacts</span>
                      </div>
                    </PlanWrapper>
                    <Features>
                      Payment debited one-time
                  </Features>
                    <Features>
                      Volume discount available
                  </Features>
                    <Features>
                      Unlimited users
                  </Features>
                    <Features>
                      All features
                  </Features>
                    <StyledButton className="ant-btn ant-btn-primary" onClick={() => this.handleSelectPlan()}>
                      Purchase
                    </StyledButton>
                    <div className="margin-top-10">
                      <span style={{ fontSize: 10 }}><b>No Auto renewal</b></span>
                    </div>
                  </Card>
                </Col>
              </Row>
              <NeedHelpSection
                subscription={subscription}
                showCancelSubscription={this.showCancelSubscription}
                topUpPricingList={topUpPricingList}
              />
            </div>
            }
            {step == 2 && <ConfirmSubscription
              plan_id={this.state.plan}
              promoCode={this.state.promoCode}
              updatePromoCode={this.updatePromoCode}
              handleApplyPromoCode={this.handleApplyPromoCode}
              handleSubscriptionPlan={this.handleSubscriptionPlan}
              subscribePlanLoading={this.props.subscribePlanLoading}
              plans={this.props.plans}
              handleBankTransfer={this.handleBankTransfer}
              handleSubscriptionCheckout={this.handleSubscriptionCheckout}
              checkoutLoading={this.props.checkoutLoading}
              verifiedPromoCode={this.state.verifiedPromoCode}
              isPromoCodeNotValid={this.state.isPromoCodeNotValid}
              promoCodeErrorMsg={promoCodeErrorMsg}
              planAmount={planAmount}
              planAmountLoading={planAmountLoading}
            />
            }
            {step == 3 && <Wrapper>
              <div>
                <Row>
                  <Col span={12}>
                    <div style={{ textAlign: 'left', marginBottom: '20px', fontWeight: '700' }}>
                      Credits
                          </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ textAlign: 'left', marginBottom: '20px', fontWeight: '700' }}>
                      Price (USD)
                          </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                      <InputCredit
                        placeholder="Credits"
                        type="number"
                        value={this.state.value}
                        onChange={this.updateCredit}
                        style={{
                          width: '150px',
                          marginRight: '10px',
                        }}
                      />
                      <p className="enough-to-reach-out">Enough to reach out to <span style={{ color: '#7EC078', fontWeight: 'bold' }}>{this.formatPlanCredits(this.state.value / 0.05)}</span> Contacts</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                      <b>
                        {this.state.value < 500 ? (
                          <span style={{ color: '#7EC078', fontSize: '14px' }}>
                            {errorMsg}
                          </span>
                        ) : (
                            <span>
                              ${cost.toLocaleString()}{' '}
                              <span style={{ color: '#7EC078', fontSize: '12px' }}>
                                (Save {pricing.discount}
                                %)
                                  </span>
                            </span>
                          )}
                      </b>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <TableTitle>
                  Pricing Table
                </TableTitle>
                <TableWrapper>
                  <StyledTable
                    columns={creditColumn}
                    dataSource={topUpPricingList}
                    pagination={false}
                    width={650}
                    locale={{
                      emptyText: 'No data found.',
                    }}
                    size="small"
                  />
                </TableWrapper>
                <div className="margin-top-10" style={{ textAlign: 'center' }}>
                  <StyledButton
                    onClick={this.handleNextTopup}
                    className=" ant-btn ant-btn-primary"
                    disabled={this.state.value < 500}
                  >
                    <span style={{ fontSize: '14px' }}>Purchase Credits</span>
                    <Icon type="right" style={{ fontSize: '14px' }} />
                  </StyledButton>
                </div>
              </div>
            </Wrapper>
            }
            {
              step == 4 && <ConfirmTopUp
                handleTopUp={this.handleTopUp}
                topUpLoading={topUpLoading}
                topUpPricingCost={topUpPricingCost}
                value={this.state.value}
                handleBankTransfer={this.handleBankTransfer}
                handleTopUpCheckout={this.handleTopUpCheckout}
                checkoutLoading={this.props.checkoutLoading}
              />
            }
            {
              step == 5 && <BankTransfer
                handleClose={this.handleClose}
              />
            }
            {
              step == 6 && <Billing
                subscription={subscription}
                payments={payments}
                handleViewDetails={this.handleViewDetails}
              />
            }
          </Drawer>
        )}
      </CreditsWrapper>
    );
  }
}

Credits.propTypes = {
  credits: PropTypes.number,
  credentials: PropTypes.object,
  hidePurchaseModal: PropTypes.func,
  showPurchaseModal: PropTypes.func,
  purchaseModal: PropTypes.bool,
  topUpPricingList: PropTypes.array,
  getTopUpPricingCost: PropTypes.func,
  topUpPricingCost: PropTypes.object,
  getTopUpRequest: PropTypes.func,
  plans: PropTypes.array,
  subscribePlan: PropTypes.func,
  subscribePlanResponse: PropTypes.object,
  subscribePlanLoading: PropTypes.bool,
  subscription: PropTypes.object,
  topUp: PropTypes.func,
  topUpResponse: PropTypes.object,
  topUpLoading: PropTypes.bool,
  payments: PropTypes.array,
  cancelSubscription: PropTypes.func,
  getTopUpCheckoutSession: PropTypes.func,
  checkoutLoading: PropTypes.bool,
  topUpCheckoutSession: PropTypes.object,
  stripeConfig: PropTypes.object,
  subscriptionCheckoutSession: PropTypes.object,
  getSubscriptionCheckoutSession: PropTypes.func,
  cancelLoading: PropTypes.bool,
  planAmountLoading: PropTypes.bool,
  planAmount: PropTypes.object,
  getPlanAmount: PropTypes.func,
  resetPlanAmount: PropTypes.func,
};

export default Credits;
