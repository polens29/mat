/**
 *
 * BankTransfer
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';

import BankTransferImg from 'assets/bank-transfer.png';
import BankTransferLogo from 'assets/bank-transfer-logo.png';
import { Wrapper, StyledButton, Title, Img } from '../css';

const beneficiaryName = 'Leadbook Pte Ltd';
const bankAccount = '0048005046-01-2';
const beneficiaryBank = 'DBS Bank Ltd, Singapore';
const SWIFTBIC = 'DBSSSGSGXXX';
// eslint-disable-next-line react/prefer-stateless-function
class BankTransfer extends React.PureComponent {

  render() {
    const { handleClose } = this.props;
    return (
      <Wrapper>
        <Title>
          <Img src={BankTransferLogo} style={{ marginRight: 10 }} />
          <Img src={BankTransferImg} style={{ height: 12 }} />
        </Title>

        <div
          style={{
            marginTop: 40,
            marginBottom: 40 }}
        >
          <table className="table">
            <tr>
              <td className="col-left">
                Name of Beneficiary
              </td>
              <td className="col-right">
                { beneficiaryName }
              </td>
            </tr>
            <tr>
              <td className="col-left">
                Bank Account
              </td>
              <td className="col-right">
                { bankAccount }
              </td>
            </tr>
            <tr>
              <td className="col-left">
                Beneficiary Bank
              </td>
              <td className="col-right">
                { beneficiaryBank }
              </td>
            </tr>
            <tr>
              <td className="col-left">
                SWIFT BIC
              </td>
              <td className="col-right">
                { SWIFTBIC }
              </td>
            </tr>
            <tr>
              <td className="col-left">
                Address of Bank:
              </td>
              <td className="col-right">
                12 Marine Boulevard,<br />
                DBS Asia Central,<br />
                BayMarina Bay Financial Center Tower 3,<br />
                Singapore - 018982
              </td>
            </tr>
          </table>
        </div>
        <div
          style={{
            textAlign: 'center',
            width: '60%',
            margin: '0 auto' }}
        >
          <StyledButton
            onClick={() => handleClose()}
            className=" ant-btn ant-btn-primary"
          >
            <span style={{ fontSize: '14px' }}>Thanks, I will pay</span>
          </StyledButton>
        </div>
      </Wrapper>
    );
  }

}

BankTransfer.propTypes = {
  handleClose: PropTypes.func,
};

export default BankTransfer;
