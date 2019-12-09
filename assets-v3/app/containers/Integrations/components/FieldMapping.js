/**
 *
 * FieldMapping
 *
 */

import React, { PropTypes } from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Button,
  Input,
  DatePicker,
  message,
} from 'antd';
import styled from 'styled-components';
const FormItem = Form.Item;
const Option = Select.Option;

const Wrapper = styled.div`
  .table-header {
    font-size: 13px;
    font-weight: 500;
    line-height: 15px;
    color: #333333;
    margin-bottom: 15px;
  }

  .ant-row .ant-form-item {
    margin-top: -10px;
    margin-bottom: 10px;
    height: 30px;
  }

  .ant-form-explain {
    display: none !important;
  }

  .ant-calendar-picker {
    width: 100%;
  }
`;

const FieldFormWrapper = styled.div`
  height: 400px;
  overflow-y: scroll;
  padding: 15px 0;
  border-top: 2px solid #ececec;
  border-bottom: 2px solid #ececec;
  margin-bottom: 20px;
`;

// eslint-disable-next-line react/prefer-stateless-function
class FieldMapping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }

  onIntegrationChoice = (objectid) => {
    const {
      updateIntegrationsObject,
      chosenIntegration,
      leadType,
    } = this.props;
    updateIntegrationsObject(leadType, chosenIntegration, objectid);
  };

  dateChange(date, formKey) {
    const key = formKey.split('.');
    this.setState({
      fields: {
        ...this.state.fields,
        [key[1]]: date,
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      saveIntegrationsMapping,
      handleOkIntegration,
      chosenIntegration,
      leadType,
      form,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const payload = {
          mappings: values.mappings,
          defaults: {
            ...values.defaults,
            ...this.state.fields,
          },
        };
        saveIntegrationsMapping(leadType, chosenIntegration, payload);
        return handleOkIntegration();
      }
      return message.error(
        'Please enter information on the highlighted fields',
        2.5
      );
    });
  };

  renderSelectBox = (choices, defaultValue, formKey, app) => {
    const { getFieldDecorator } = this.props.form;

    const decoratorObj = {
      rules: [{ required: app.required }],
    };

    if (defaultValue) {
      decoratorObj.initialValue = defaultValue;
    }

    return (
      <FormItem hideRequiredMark>
        {getFieldDecorator(formKey, decoratorObj)(
          <Select
            showSearch
            allowClear
            placeholder={app.label}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {choices.map((choice) => (
              <Option value={choice.id}>{choice.label}</Option>
            ))}
          </Select>
        )}
      </FormItem>
    );
  };

  renderInputBox = (defaultValue, formKey, app) => {
    const { getFieldDecorator } = this.props.form;

    return (
      <FormItem hideRequiredMark>
        {getFieldDecorator(formKey, {
          rules: [{ required: app.required, max: app.max_length }],
          initialValue: defaultValue,
        })(<Input placeholder={app.label} />)}
      </FormItem>
    );
  };

  renderDatePicker = (defaultValue, formKey, app) => {
    const { getFieldDecorator } = this.props.form;

    return (
      <FormItem hideRequiredMark>
        {getFieldDecorator(formKey, {
          rules: [{ required: app.required }],
          initialValue: defaultValue,
        })(
          <DatePicker
            placeholder={app.label}
            disabledTime
            format="YYYY-MM-DD"
            onChange={(moment, date) => this.dateChange(date, formKey)}
          />
        )}
      </FormItem>
    );
  };

  renderField = (applicationField) => {
    const { fields } = this.props.integrationFormat.mappings;
    let defaultValue = '';
    if(fields && fields.hasOwnProperty(applicationField.id)){
      defaultValue = fields[applicationField.id].default;
    } 
    const { id } = applicationField;

    if (applicationField.type === 'choice') {
      const { choices } = applicationField;
      const mappedChoices = choices.map((choice) => ({
        id: choice[0],
        label: choice[1],
      }));

      return this.renderSelectBox(
        mappedChoices,
        defaultValue,
        `defaults.${id}`,
        applicationField
      );
    }

    if (applicationField.type === 'boolean') {
      const choices = [
        {
          id: true,
          label: 'True',
        },
        {
          id: false,
          label: 'False',
        },
      ];

      return this.renderSelectBox(
        choices,
        defaultValue,
        `defaults.${id}`,
        applicationField
      );
    }

    if (applicationField.type === 'date') {
      return this.renderDatePicker(
        defaultValue,
        `defaults.${id}`,
        applicationField
      );
    }

    return this.renderInputBox(
      defaultValue,
      `defaults.${id}`,
      applicationField
    );
  };

  render() {
    const { integrationFormat, integrationObject } = this.props;
    const {
      leadbook_fields: leadbookFields,
      application_fields: applicationFields,
    } = integrationFormat;

    return (
      <Wrapper>
        {this.props.chosenIntegration === 'Salesforce' && (
          <Select
            showSearch
            value={integrationObject.selected}
            style={{ width: 300, marginBottom: '20px' }}
            onChange={this.onIntegrationChoice}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {integrationObject.choices.map((choice) => (
              <Option value={choice.id}>{choice.label}</Option>
            ))}
          </Select>
        )}

        <Row gutter={4} className="table-header">
          <Col span={8}>{this.props.chosenIntegration} Field</Col>
          <Col span={8}>Leadbook Field</Col>
          <Col span={8}>Default</Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <FieldFormWrapper>
            {applicationFields.map((applicationField) => {
              const { fields } = this.props.integrationFormat.mappings;
              let defaultValue = '';
              if(fields && fields.hasOwnProperty(applicationField.id)){
                defaultValue = fields[applicationField.id].leadbook_field;
              }

              if (applicationField.type === 'date') {
                // temporary
                return;
              }

              return (
                <Row gutter={16} className="margin-btm-10">
                  <Col span={8}>
                    {applicationField.label}{' '}
                    {applicationField.required && (
                      <span style={{ color: '#de5c5c' }}>*</span>
                    )}
                  </Col>
                  <Col span={8}>
                    {this.renderSelectBox(
                      leadbookFields,
                      defaultValue,
                      `mappings.${applicationField.id}`,
                      { label: 'Leadbook Field', required: false }
                    )}
                  </Col>
                  <Col span={8}>{this.renderField(applicationField)}</Col>
                </Row>
              );
            })}
          </FieldFormWrapper>

          <FormItem>
            <Button type="primary" htmlType="submit" className="right">
              Update
            </Button>
            {this.props.canRefresh &&
              <Button onClick={this.props.onRefresh} type="default" htmlType="button" className="right">
                Refresh
              </Button>
            }
          </FormItem>
        </Form>
      </Wrapper>
    );
  }
}

FieldMapping.propTypes = {
  updateIntegrationsObject: PropTypes.func,
  saveIntegrationsMapping: PropTypes.func,
  handleOkIntegration: PropTypes.func,
  leadType: PropTypes.string,
  chosenIntegration: PropTypes.string,
  integrationObject: PropTypes.object,
  integrationFormat: PropTypes.object,
  form: PropTypes.object,
  canRefresh: PropTypes.bool,
  onRefresh: PropTypes.func,
};

const FieldMappingForm = Form.create()(FieldMapping);

export default FieldMappingForm;
