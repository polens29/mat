/**
 *
 * JobTitleFilter
 *
 */

import React, { PropTypes } from 'react';
import { Input, Icon, Dropdown, Checkbox, Radio } from 'antd';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';
import styled from 'styled-components';
import { JobTitleFilterWrapper } from './css';
import JobTitle from 'assets/icons/jobtitle.png';

const Spacer = styled.p`
  display: block:
  width: 100%;
  color: red;
  padding: 0px 3px 0px 3px;
  float: right;
  font-size: 9px;
  text-align: right;
  margin-top: -4px;
  margin-left: -2px;
`;

class JobTitleFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checkedSeniorityIds: [],
      checkedDepartmentIds: [],
      seniority: 'and',
      departments: 'and'
    };
    this.submitKeyword = this.submitKeyword.bind(this);
  }

  onSelectedSeniority = (e) => {
    this.setState({
      checkedSeniorityIds: [
        ...this.state.checkedSeniorityIds,
        e.target.value.id,
      ],
    });
    const { name, id } = e.target.value;
    const selectedKeyword = {
      type: 'Seniority',
      category: this.props.category,
      filters: 'seniority',
      mode: 'Contact',
      name,
      id,
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.setState({
        checkedSeniorityIds: this.state.checkedSeniorityIds.filter(
          (t) => t !== e.target.value.id
        ),
      });
      this.props.removeKeyword(selectedKeyword);
    }
  };

  onSelectedDepartment = (e) => {
    this.setState({
      checkedDepartmentIds: [
        ...this.state.checkedDepartmentIds,
        e.target.value.id,
      ],
    });
    const { name, id } = e.target.value;
    const selectedKeyword = {
      type: 'Department',
      category: this.props.category,
      filters: 'department',
      mode: 'Contact',
      name,
      id,
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.setState({
        checkedDepartmentIds: this.state.checkedDepartmentIds.filter(
          (t) => t !== e.target.value.id
        ),
      });
      this.props.removeKeyword(selectedKeyword);
    }
  };

  setInitialState = () => {
    this.setState({
      checkedSeniorityIds: this.props.keywords
        .filter((t) => t.type === 'Seniority')
        .map((t) => t.id),
      checkedDepartmentIds: this.props.keywords
        .filter((t) => t.type === 'Department')
        .map((t) => t.id),
    });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  submitKeyword(e) {
    e.preventDefault();
    const { target } = e;
    if (target.value.trim() === '') {
      return;
    }
    // this.props.clearKeyword('or_keywords');
    target.value
      .split(',')
      .filter((t) => t.trim() !== '')
      .map((t) => {
        const selectedKeyword = {
          type: 'JOB',
          category: this.props.category,
          filters: 'job_title',
          name: t.trim(),
          mode: 'Contact',
        };
        return this.props.addKeyword(selectedKeyword);
      });
    target.value = '';
  }

  handleAndOr(type, e){
    let andOr = {
      type: 'And Or Filter',
      category: '',
      filters: '',
      name: '',
    };

    switch(type) {
      case 'seniority':
        this.setState({
          seniority: e.target.value
        });
        andOr.filters = 'seniority_filter'
        break;
      case 'departments': 
        this.setState({
          departments: e.target.value
        });
        andOr.filters = 'department_filter'
        break;
    }

    andOr.name = e.target.value;
    this.props.addKeyword(andOr)

  }

  render() {
    if (this.props.category === 'Organization') {
      return <span />;
    }
    const aggregations = this.props.aggregations.seniority || {};

    let departments = this.props.departments;
    departments = departments.sort((a, b) => (a.name > b.name) ? 1 : -1)

    const menuStyle = {
      minWidth: 320,
      maxHeight: 400,
      overflow: 'auto',
      paddingBottom: 10,
    };

    let andorStyle = {
      width: 'fit-content',
      margin: 'auto',
      position: 'absolute',
      marginTop: '-12px',
      right: 0,
      left: 0,
      backgroundColor: 'white'
    }

    let dividerStyle = {
      borderBottom: '1px solid #ebebeb'
    }

    const menu = (
      <Menu style={menuStyle}>
        <MenuItemGroup title="Job Title">
          <MenuItem>
            <Input
              className="search-keyword"
              placeholder={'Director, CEO, Project Manager'}
              onPressEnter={this.submitKeyword}
              name="job-title"
            />
          </MenuItem>
        {/*
          <MenuItem>
            <div style={{"margin": "13px 0px 5px"}}>
              <div style={andorStyle}>
                <Radio.Group onChange={this.handleAndOr.bind(this, 'seniority')}
                  buttonStyle='solid'
                  size='small'
                  value={this.state.seniority}
                  >
                  <Radio value="and">AND</Radio>
                  <Radio value="or">OR</Radio>
                </Radio.Group>
              </div>
              <div style={dividerStyle}></div>
            </div>
          </MenuItem>
          */}
        </MenuItemGroup>
        <MenuItemGroup title="Seniority">
          {this.props.seniority.map((t) => (
            <MenuItem className="list-items">
              <Checkbox
                value={t}
                onChange={this.onSelectedSeniority}
                checked={this.state.checkedSeniorityIds.includes(t.id)}
              >
                {t.name}
                {aggregations && typeof aggregations[t.id] === 'undefined'
                  ? ''
                  : ` (${aggregations[t.id].toLocaleString()})`}
              </Checkbox>
            </MenuItem>
          ))}
        {/*
          <MenuItem>
            <div style={{"margin": "13px 0px 5px"}}>
              <div style={andorStyle}>
                <Radio.Group onChange={this.handleAndOr.bind(this, 'departments')}
                  buttonStyle='solid'
                  size='small'
                  value={this.state.departments}
                >
                  <Radio value="and">AND</Radio>
                  <Radio value="or">OR</Radio>
                </Radio.Group>
              </div>
              <div style={dividerStyle}></div>
            </div>
          </MenuItem>
          */}
        </MenuItemGroup>
        <MenuItemGroup title="Departments">
          {departments.map((t) => (
            <MenuItem className="list-items">
              <Checkbox
                value={t}
                onChange={this.onSelectedDepartment}
                checked={this.state.checkedDepartmentIds.includes(t.id)}
              >
                {t.name}
                {aggregations && typeof aggregations[t.id] === 'undefined'
                  ? ''
                  : ` (${aggregations[t.id].toLocaleString()})`}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuItemGroup>
      </Menu>
    );
    return (
      <JobTitleFilterWrapper>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          onClick={this.setInitialState}
          visible={this.state.visible}
        >
          <span>
            <i className="material-icons">business_center</i>
            Job Title
            <Icon type="down" />
            <br />
            <Spacer />
          </span>
        </Dropdown>
      </JobTitleFilterWrapper>
    );
  }
}

JobTitleFilter.propTypes = {
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  category: PropTypes.string,
  seniority: PropTypes.array,
  keywords: PropTypes.array,
  departments: PropTypes.array,
  aggregations: PropTypes.object,
};

export default JobTitleFilter;
