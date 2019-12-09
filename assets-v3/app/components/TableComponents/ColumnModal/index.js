/**
 *
 * Pagination
 *
 */

import React, { PropTypes } from 'react';
import { Col, Checkbox } from 'antd';
import styled from 'styled-components';

import theme from 'styles/theme';
const CheckboxGroup = Checkbox.Group;

export const ColumnWrapper = styled.div`
  .ant-col-xs-8:hover {
    background-color: #eff6ff;
  }

  .ant-checkbox-wrapper {
    font-size: 12px !important;
  }
`;
// eslint-disable-next-line react/prefer-stateless-function
class ColumnModal extends React.Component {
  render() {
    const {
      category,
      tableColumns,
      checkedList,
      indeterminate,
      checkAll,
      onCheck,
      onCheckAllChange,
      type,
    } = this.props;

    return (
      <ColumnWrapper>
        {type === 'column-picker' && (
          <div
            style={{
              borderBottom: `1px solid ${theme.colorNames.darkGrey}`,
              marginBottom: '10px',
            }}
          >
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Show all columns
            </Checkbox>
          </div>
        )}
        <div style={{ minHeight: '75px' }}>
          {type === 'column-picker' && (
            <div>
              <Col xs={8}>
                <Checkbox checked value={'name'} disabled>
                  Name
                </Checkbox>
              </Col>
              {category === 'Contact' && (
                <Col xs={8}>
                  <Checkbox checked value={'job_title'} disabled>
                    Job Title
                  </Checkbox>
                </Col>
              )}
            </div>
          )}
          <CheckboxGroup value={checkedList} onChange={onCheck}>
            {Array.from({ length: tableColumns.length }).map((u, index) => (
              <Col xs={8}>
                <Checkbox value={tableColumns[index].value} disabled={(category === 'Contact' && tableColumns[index].value == 'social') ? true : false}>
                  {tableColumns[index].label}
                </Checkbox>
              </Col>
            ))}
            {
              category == 'Organization' && (
                <Col xs={8}>
                  <Checkbox disabled={true}>
                    Standard Identification Number
                  </Checkbox>
                </Col>
              )
            }
            
          </CheckboxGroup>
        </div>
      </ColumnWrapper>
    );
  }
}

ColumnModal.propTypes = {
  category: PropTypes.string,
  type: PropTypes.string,
  tableColumns: PropTypes.array,
  checkedList: PropTypes.array,
  indeterminate: PropTypes.bool,
  checkAll: PropTypes.func,
  onCheck: PropTypes.func,
  onCheckAllChange: PropTypes.func,
};

export default ColumnModal;
