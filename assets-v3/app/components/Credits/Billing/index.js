/**
 *
 * Billing
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Button,
    Icon,
} from 'antd';
import CalendarIcon from 'assets/svg/CalendarIcon';
import { Wrapper, StyledButton, Title, ChangePlanButton } from '../css';

// eslint-disable-next-line react/prefer-stateless-function
class Billing extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { subscription, payments, handleViewDetails } = this.props;
        const { plan } = subscription;
        return (
            <Wrapper>
                {subscription.plan &&
                    <div style={{ padding: 5, marginTop: 20 }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="Next Billing" headStyle={{
                                    backgroundColor: '#E1E1E1',
                                    textAlign: 'center',
                                    color: '#aaa',
                                    height:10
                                }}
                                    bodyStyle={{
                                        textAlign: 'center',
                                        height: 155,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                    }}
                                >
                                    <div className="calender-card">
                                        <CalendarIcon />
                                        <div className="calender-card-text">
                                            <div style={{ lineHeight: 0.5 }}>
                                                <span
                                                    style={{ fontSize: 20, fontWeight: 'bold' }}
                                                >
                                                    {subscription.billing_due_days}
                                                </span>
                                            </div>
                                            <span
                                                style={{ fontSize: 12, lineHeight: 0 }}
                                            >
                                                Days
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={16}>
                                <Card title="Plan Details" headStyle={{
                                    backgroundColor: '#E1E1E1',
                                    textAlign: 'center',
                                    color: '#aaa',
                                    height:10
                                }}
                                    bodyStyle={{
                                        textAlign: 'center',
                                        height: 155,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                    }}
                                >
                                    <div style={{ marginBottom: 5, fontSize: 12 }}>
                                        <Row>
                                            <Col span={10}>
                                                <Title>
                                                    <span>Plan Name</span>
                                                </Title>
                                            </Col>
                                            <Col span={2}>
                                                <span>:</span>
                                            </Col>
                                            <Col span={12}>
                                                <Title>
                                                    <span style={{ fontWeight: 'bold', marginRight: 10 }}>
                                                        {plan.interval === 'month' && 'Monthly'}
                                                        {plan.interval === 'year' && 'Yearly'}
                                                    </span>
                                                    <span style={{ color: '#1890ff', fontSize: 11 }}>
                                                        <a onClick={() => handleViewDetails()}>View Details</a>
                                                    </span>
                                                </Title>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}>
                                                <Title>
                                                    <span>Subscription Started</span></Title>
                                            </Col>
                                            <Col span={2}>
                                                <span>:</span>
                                            </Col>
                                            <Col span={12}>
                                                <Title>
                                                    <span style={{ fontWeight: 'bold' }}>
                                                        {moment(subscription.starts_at).format('LL')}
                                                    </span>
                                                </Title>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}>
                                                <Title>
                                                    <span>Status</span>
                                                </Title>
                                            </Col>
                                            <Col span={2}>
                                                <span>:</span>
                                            </Col>
                                            <Col span={12}>
                                                <Title>
                                                    <span style={{ fontWeight: 'bold' }}>
                                                        {subscription.status === 'active' && 'Currently active'}
                                                        {subscription.status === 'inactive' && 'Currently inactive'}
                                                    </span>
                                                </Title>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            width: '60%',
                                            margin: '0 auto',
                                            marginBottom: 20,
                                            paddingBottom: 10,
                                        }}
                                    >
                                        <ChangePlanButton
                                            className=" ant-btn ant-btn-primary"
                                            onClick={() => handleViewDetails()}
                                        >
                                            <span style={{ fontSize: '10px' }}>Change plan</span>
                                        </ChangePlanButton>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                }

                <div style={{ padding: 5, height: 500, overflow: 'auto', marginTop: 20 }}>
                    <Title>
                        <span style={{ fontWeight: 700 }}>Payment History</span>
                    </Title>

                    {payments.map((payment) => (
                        <Card id={payment.id} style={{ marginBottom: 20, marginTop: 20, height: 90 }}
                            bodyStyle={{ padding: 0 }}>
                            <div style={{ width: '85%', padding: 20, float: 'left' }}>
                                <Row>
                                    <Col span={16}>
                                        <Title>
                                            <span style={{ fontWeight: 'bold', marginRight: 10 }}>Invoice Number:</span>
                                            <span>{payment.invoice_number}</span>
                                        </Title>
                                    </Col>
                                    <Col span={8}>
                                        <Title>
                                            <span style={{ fontWeight: 'bold' }}>Amount Paid</span>
                                        </Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={16}>
                                        <Title>
                                            <span style={{ fontWeight: 'bold', marginRight: 10 }}>Paid on:</span>
                                            <span>{moment(payment.timestamp).format('ll')}</span>
                                        </Title>
                                    </Col>
                                    <Col span={8}>
                                        <Title>
                                            <span>
                                                {payment.amount.toLocaleString('en-US', { style: 'currency', currency: payment.currency })}
                                            </span>
                                        </Title>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ width: '15%', height: 88, float: 'right', border: '1px solid #e8e8e8' }}>
                                <div style={{ paddingTop: 30 , paddingBottom: 30 , paddingLeft: 10, paddingRight: 10, textAlign: 'center' }}>
                                    <a
                                        href={"/api/v3/pricing/payments/" + payment.id + "/invoice/"}
                                        target="_blank"
                                        style={{ color: '#000', display: 'flex', textAlign: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                        <span style={{ marginRight: 5 }}>
                                            <Icon type="eye" theme="filled" style={{ color: '#000', fontSize: 16 }} />
                                        </span>
                                        View
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Wrapper>
        );
    }
}

Billing.propTypes = {
    subscription: PropTypes.object,
    payments: PropTypes.array,
    handleViewDetails: PropTypes.func,
};

export default Billing;
