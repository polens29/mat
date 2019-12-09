/**
 *
 * OrganizationFilter
 *
 */
/* eslint-disable no-underscore-dangle */
import React, { PropTypes } from 'react';
import { Checkbox, Dropdown, Icon, Input } from 'antd';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';
import { companyTypes } from './constant';

import styled from 'styled-components';
import { OrganizationFilterWrapper } from './css';
import CompanyFilter from 'assets/icons/company_filter.png';

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


class OrganizationFilter extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      visibleSize: false,
      visibleRevenue: false,
      visibleAge: false,
      EmployeeSizeChecked: [],
      OrganizationAgeChecked: [],
      checkedType: [],
    };
  }

  onChange = (e) => {
    this.setState({
      EmployeeSizeChecked: [
        ...this.state.EmployeeSizeChecked,
        e.target.value[1],
      ],
    });
    const selectedKeyword = {
      type: e.target.value[3],
      category: this.props.category,
      filters: e.target.value[2],
      name: e.target.value[0],
      code: e.target.value[1],
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.setState({
        EmployeeSizeChecked: this.state.EmployeeSizeChecked.filter(
          (t) => t !== e.target.value[1]
        ),
      });
      this.props.removeKeyword(selectedKeyword);
    }
  };

  onSelectedList = (e) => {
    const { name, id } = e.target.value;
    this.setState({
      checkedType: [...this.state.checkedType, name],
    });
    const selectedKeyword = {
      type: 'Company Type',
      category: this.props.category,
      filters: 'company_type',
      name,
      id: id === 'Undisclosed' ? null : id,
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.setState({
        checkedType: this.state.checkedType.filter((t) => t !== e.target.value.id),
      });
      this.props.removeKeyword(selectedKeyword);
    }
  };

  handleSubmit = (e) => {
    this.setState({
      OrganizationAgeChecked: [
        ...this.state.OrganizationAgeChecked,
        e.target.value[2],
      ],
    });
    const min = e.target.value[0];
    const max = e.target.value[1];
    const selectedKeyword = {
      type: 'Organization age',
      category: this.props.category,
      filters: 'company_age',
      name: max ? `${min} - ${max}` : min,
      code: e.target.value[2],
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.setState({
        OrganizationAgeChecked: this.state.OrganizationAgeChecked.filter(
          (t) => t !== e.target.value[2]
        ),
      });
      this.props.removeKeyword(selectedKeyword);
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ visibleSize: flag });
  };

  submitCompanyName = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.value.trim() === '') {
      return;
    }
    // this.props.clearKeyword('and_keywords');
    target.value
      .split(',')
      .filter((t) => t.trim() !== '')
      .map((t) => {
        const selectedKeyword = {
          type: 'Company',
          category: this.props.category,
          filters: 'company_name',
          name: t.trim(),
        };
        return this.props.addKeyword(selectedKeyword);
      });
    target.value = '';
  };

  submitSIN = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.value.trim() === '') {
      return;
    }
    // this.props.clearKeyword('and_keywords');
    target.value
      .split(',')
      .filter((t) => t.trim() !== '')
      .map((t) => {
        const selectedKeyword = {
          type: 'Company',
          category: this.props.category,
          filters: 'company_sin',
          name: 'SIN:'+ t.trim(),
          id: t.trim()
        };
        return this.props.addKeyword(selectedKeyword);
      });
    target.value = '';
  };

  submitCompanyWebsite = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.value.trim() === '') {
      return;
    }
    // this.props.clearKeyword('and_keywords');
    target.value
      .split(',')
      .filter((t) => t.trim() !== '')
      .map((t) => {
        const selectedKeyword = {
          type: 'Company',
          category: this.props.category,
          filters: 'company_website',
          name: t.trim(),
        };
        return this.props.addKeyword(selectedKeyword);
      });
    target.value = '';
  };

  submitCompanyTags = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.value.trim() === '') {
      return;
    }
    // this.props.clearKeyword('and_keywords');
    target.value
      .split(',')
      .filter((t) => t.trim() !== '')
      .map((t) => {
        const selectedKeyword = {
          type: 'Tag',
          category: this.props.category,
          filters: 'tag',
          name: t.trim(),
        };
        return this.props.addKeyword(selectedKeyword);
      });
    target.value = '';
  };

  submitCompanyDescription = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.value.trim() === '') {
      return;
    }
    // this.props.clearKeyword('and_keywords');
    target.value
      .split(',')
      .filter((t) => t.trim() !== '')
      .map((t) => {
        const selectedKeyword = {
          type: 'Company Keyword',
          category: this.props.category,
          filters: 'company_keywords',
          name: t.trim(),
        };
        return this.props.addKeyword(selectedKeyword);
      });
    target.value = '';
  };

  setInitialState = () => {
    this.setState({
      EmployeeSizeChecked: this.props.keywords
        .filter((t) => t.type === 'Employee Size')
        .map((t) => t.code),
      OrganizationAgeChecked: this.props.keywords
        .filter((t) => t.type === 'Organization age')
        .map((t) => t.code),
      checkedType: this.props.keywords
        .filter((t) => t.type === 'Company Type')
        .map((t) => t.name),
    });
  };

  render() {
    const companyAgeCount = this.props.aggregations.company_age || '';
    const employeeSizeCount = this.props.aggregations.employee_size || '';
    const menuStyle = {
      width: 300,
      height: 400,
      overflow: 'auto',
      paddingBottom: 10,
    };
    const employeeSizeMenu = (
      <Menu style={menuStyle}>
        <MenuItemGroup
          className="keyword-filter-label"
          title="Organization Name"
        >
          <MenuItem>
            <Input
              className="search-keyword"
              placeholder={'IBM, Facebook'}
              onPressEnter={this.submitCompanyName}
              name="company-name"
            />
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup
          className="keyword-filter-label"
          title="Organization Website"
        >
          <MenuItem>
            <Input
              className="search-keyword"
              placeholder="Search by ‘www.leadbook.com’"
              onPressEnter={this.submitCompanyWebsite}
              name="company-website"
            />
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup
          className="keyword-filter-label"
          title="Organization Description"
        >
          <MenuItem>
            <Input
              className="search-keyword"
              placeholder={'Words included in Organization Description'}
              onPressEnter={this.submitCompanyDescription}
              name="company-keyword"
            />
          </MenuItem>
        </MenuItemGroup>
         <MenuItemGroup
          className="keyword-filter-label"
          title="Standard Identification Number"
        >
          <MenuItem>
            <Input
              className="search-keyword"
              placeholder={'Search for organization UEN, CRN, etc'}
              onPressEnter={this.submitSIN}
              name="company-SIN"
              disabled={true}
            />
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="Organization Type">
          {companyTypes.map((t) => (
            <MenuItem className="list-items">
              <Checkbox
                value={t}
		onChange={this.onSelectedList}
                checked={this.state.checkedType.includes(t.id)}
              >
                <span className="margin-right-10" />
                {t.name}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuItemGroup>
        <MenuItemGroup title="Organization Size">
          <MenuItem className="list-items">
            <Checkbox
              value={['1-9', 0, 'employee_size', 'Employee Size']}
              onChange={this.onChange}
              checked={this.state.EmployeeSizeChecked.includes(0)}
            >
              {'1-9'}
              {employeeSizeCount && employeeSizeCount[0] !== 0
                ? ` (${employeeSizeCount[0].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={['10-49', 1, 'employee_size', 'Employee Size']}
              onChange={this.onChange}
              checked={this.state.EmployeeSizeChecked.includes(1)}
            >
              {'10-49'}
              {employeeSizeCount && employeeSizeCount[1] !== 0
                ? ` (${employeeSizeCount[1].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={['50-149', 2, 'employee_size', 'Employee Size']}
              onChange={this.onChange}
              checked={this.state.EmployeeSizeChecked.includes(2)}
            >
              {'50-149'}
              {employeeSizeCount && employeeSizeCount[2] !== 0
                ? ` (${employeeSizeCount[2].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={['150-499', 3, 'employee_size', 'Employee Size']}
              onChange={this.onChange}
              checked={this.state.EmployeeSizeChecked.includes(3)}
            >
              {'150-499'}
              {employeeSizeCount && employeeSizeCount[3] !== 0
                ? ` (${employeeSizeCount[3].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={['500 - 999', 4, 'employee_size', 'Employee Size']}
              onChange={this.onChange}
              checked={this.state.EmployeeSizeChecked.includes(4)}
            >
              {'500 - 999'}
              {employeeSizeCount && employeeSizeCount[4] !== 0
                ? ` (${employeeSizeCount[4].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={['1000+', 5, 'employee_size', 'Employee Size']}
              onChange={this.onChange}
              checked={this.state.EmployeeSizeChecked.includes(5)}
            >
              {'1000+'}
              {employeeSizeCount && employeeSizeCount[5] !== 0
                ? ` (${employeeSizeCount[5].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={['Undisclosed', null, 'employee_size', 'Employee Size']}
              onChange={this.onChange}
              checked={this.state.EmployeeSizeChecked.includes(null)}
            >
              {'Undisclosed'}
              {employeeSizeCount && employeeSizeCount.__missing__ !== 0
                ? ` (${employeeSizeCount.__missing__.toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="Organization Age">
          <MenuItem className="list-items">
            <Checkbox
              value={[1, 5, 0]}
              onChange={this.handleSubmit}
              checked={this.state.OrganizationAgeChecked.includes(0)}
            >
              {'1 - 5'}
              {companyAgeCount && companyAgeCount[0] !== 0
                ? ` (${companyAgeCount[0].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={[6, 10, 1]}
              onChange={this.handleSubmit}
              checked={this.state.OrganizationAgeChecked.includes(1)}
            >
              {'6 - 10'}
              {companyAgeCount && companyAgeCount[1] !== 0
                ? ` (${companyAgeCount[1].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={[11, 15, 2]}
              onChange={this.handleSubmit}
              checked={this.state.OrganizationAgeChecked.includes(2)}
            >
              {'11 - 15'}
              {companyAgeCount && companyAgeCount[2] !== 0
                ? ` (${companyAgeCount[2].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={[15, null, 3]}
              onChange={this.handleSubmit}
              checked={this.state.OrganizationAgeChecked.includes(3)}
            >
              {'15+'}
              {companyAgeCount && companyAgeCount[3] !== 0
                ? ` (${companyAgeCount[3].toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
          <MenuItem className="list-items">
            <Checkbox
              value={['undisclosed', null, null]}
              onChange={this.handleSubmit}
              checked={this.state.OrganizationAgeChecked.includes(null)}
            >
              {'Undisclosed'}
              {companyAgeCount && companyAgeCount.__missing__ !== 0
                ? ` (${companyAgeCount.__missing__.toLocaleString()})`
                : ''}
            </Checkbox>
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    );

    return (
      <OrganizationFilterWrapper className="oragnization-menu">
        <div>
          <Dropdown
            overlay={employeeSizeMenu}
            trigger={['click']}
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.visibleSize}
            onClick={this.setInitialState}
          >
            <span>
              <i className="material-icons">business</i>
              Organization
              <Icon type="down" />
            <br />
            <Spacer />
            </span>
          </Dropdown>
        </div>
      </OrganizationFilterWrapper>
    );
  }
}

OrganizationFilter.propTypes = {
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  category: PropTypes.string,
  keywords: PropTypes.array,
  aggregations: PropTypes.object,
};

export default OrganizationFilter;
