/**
 *
 * KeywordFilter
 *
 */

import React, { PropTypes } from 'react';
import { Input, Icon, Dropdown, Checkbox, Spin } from 'antd';
// import Menu from 'antd/lib/menu';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';

import styled from 'styled-components';
import { KWrapper, AdvancedSearchWrapper, TagsListWrapper } from './css';
import _ from 'underscore';
import AdvancedIcon from 'assets/icons/advanced.png';
import TechnologyFilter from 'components/TechnologyFilter';

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

class KeywordFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      query: "",
      tagsSuggestions: [],
      showLoading: false,
      phoneKeyword: {
        type: 'Phone Number',
        category: '',
        filters: 'has_phone_number',
        name: 'Phone Number',
      },
      businessEmailsKeyword: {
        type: 'Business Emails Filter',
        category: '',
        filters: 'business_emails',
        name: 'Business Emails',
      },
      hasContactsKeyword: {
        type: 'Org Contacts Filter',
        category: '',
        filters: 'org_has_contacts',
        name: 'Has Contacts',
      },
      phoneChecked: false,
      hasContacts: false,
      businessEmails: false
    };
    this.submitKeyword = this.submitKeyword.bind(this);
    this.submitHasPhoneNumber = this.submitHasPhoneNumber.bind(this);
    this.submitBusinessEmails = this.submitBusinessEmails.bind(this);
    this.submitHasContacts = this.submitHasContacts.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showSuggestions = this.showSuggestions.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.keywords){
      if(_.indexOf(nextProps.keywords, this.state.phoneKeyword) != -1){
        this.setState({
          phoneChecked: true
        })
      }
      else {
        this.setState({
          phoneChecked: false
        })
      }

      if(_.indexOf(nextProps.keywords, this.state.businessEmailsKeyword) != -1){
        this.setState({
          businessEmails: true
        })
      }
      else {
        this.setState({
          businessEmails: false
        })
      }

      if(_.indexOf(nextProps.keywords, this.state.hasContactsKeyword) != -1){
        this.setState({
          hasContacts: true
        })
      }
      else {
        this.setState({
          hasContacts: false
        })
      }
    }

    this.setState({
      tagsSuggestions: nextProps.tagsSuggestions,
      showLoading: false
    })
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  handleInputChange(e){
    this.setState({
      tagsSuggestions: [],
      showLoading: true
    })
    
    let query = e.target.value;
    this.setState({
      query
    })

    this.props.fetchTagsSuggestions(query);
  }

  submitHasPhoneNumber(e){
    if(e.target.checked){  
      this.props.addKeyword(this.state.phoneKeyword);
    }
    else {
      this.props.removeKeyword(this.state.phoneKeyword);
    }
  }

  submitBusinessEmails(e){
    if(e.target.checked){  
      this.props.addKeyword(this.state.businessEmailsKeyword);
    }
    else {
      this.props.removeKeyword(this.state.businessEmailsKeyword);
    }
  }

  submitHasContacts(e){
    if(e.target.checked){  
      this.props.addKeyword(this.state.hasContactsKeyword);
    }
    else {
      this.props.removeKeyword(this.state.hasContactsKeyword);
    }
  }

  submitTag(name, e){
    e.preventDefault();
    if (name.trim() === '') {
      return;
    }
    
    name
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

    this.setState({
      visible: false,
      query: "",
      tagsSuggestions: []
    })
  }

  submitKeyword(e) {
    e.preventDefault();
    const { target } = e;
    if (target.value.trim() === '') {
      return;
    }
    // this.props.clearKeyword('not_keywords');
    target.value
      .split(',')
      .filter((t) => t.trim() !== '')
      .map((t) => {
        const selectedKeyword = {
          type: 'Exclude',
          category: this.props.category,
          filters: 'not_keywords',
          name: t.trim(),
        };
        return this.props.addKeyword(selectedKeyword);
      });
    target.value = '';
  }

  showSuggestions() {
    let tagsSuggestions = this.state.tagsSuggestions;
    let items = null;

    if(!tagsSuggestions.length){
      return (
        <label>No tags found</label>
      )
    }

    else {
      return (
        <TagsListWrapper>
          <Menu>
            <MenuItemGroup>
              {
                _.map(tagsSuggestions, (tag, index) => {
                  return (
                    <MenuItem>
                        <label onClick={this.submitTag.bind(this, tag.text)}>{tag.text}</label>
                    </MenuItem>
                  )
                })
              }
            </MenuItemGroup>
          </Menu>
        </TagsListWrapper> 
      )
    }
  }

  render() {
    let category = this.props.category + "s";
    const menu = (
      <Menu style={{ width: 320, padding: '0px' }}>
        <MenuItemGroup>
          <MenuItem>
            <AdvancedSearchWrapper>
              <label>Tags</label>
              <Input
                className="tags-keyword"
                value={this.state.query}
                onChange={this.handleInputChange}
                placeholder="Search for keywords associated with contacts / organizations"
                id="tags"
                name="tags"
              />
              {
                this.state.query ?
                  this.state.showLoading ? 
                    <div className="spinner">
                      <Spin />
                    </div>
                    :
                    this.showSuggestions()
                  :
                  null
              }
            </AdvancedSearchWrapper>
          </MenuItem>
          <MenuItem>
            <TechnologyFilter
              keywords={this.props.keywords}
              addKeyword={this.props.addKeyword}
              category={this.props.category}
              clearKeyword={this.props.clearKeyword}
              aggregations={this.props.aggregations}
              technologies={this.props.technologies}
              technologiesHierarchy={this.props.technologiesHierarchy}
            />
          </MenuItem>
          <MenuItem>
            <AdvancedSearchWrapper>
              <label>Exclude</label>
              <Input
                className="search-keyword"
                onPressEnter={this.submitKeyword}
                placeholder="Type keywords to exclude"
                id="notKeyword"
                name="Exclude"
                style={{'marginBottom': '10px'}}
              />
              <Input
                className="search-keyword"
                placeholder="Type website URL to exclude"
                onPressEnter={this.submitKeyword}
                id="notKeyword"
                name="Exclude"
              />
            </AdvancedSearchWrapper>
          </MenuItem>
          <MenuItem>
            <AdvancedSearchWrapper>
              <label>Display {category} with</label>
              <div>
                <Checkbox
                  checked={this.state.phoneChecked}
                  className="search-keyword"
                  onChange={this.submitHasPhoneNumber}
                />
                <label>Phone numbers</label>
              </div>
              {
                category == 'Contacts' ?
                <div>
                  <Checkbox
                    checked={this.state.businessEmails}
                    className="search-keyword"
                    onChange={this.submitBusinessEmails}
                  />
                  <label>Business email domains</label>
                </div>
                :
                <div>
                  <Checkbox
                    checked={this.state.hasContacts}
                    className="search-keyword"
                    onChange={this.submitHasContacts}
                  />
                  <label>Contacts</label>
                </div>
              }
            </AdvancedSearchWrapper>
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    );
    return (
      <KWrapper style={{
        "display": "inline-block",
        "marginLeft": "23px",
        "fontWeight": "500",
        "color": "#444",
        "position": "relative",
        "cursor": "pointer",  
        "width": "fit-content"
      }}>
        <Dropdown
          style={{ width: 300 }}
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <span>
            <img src={AdvancedIcon} style={{'verticalAlign':'top', 'marginRight':'5px', 'height': '18px'}} />
            Advanced Search
            <Icon type="down" />
            <br />
            <Spacer />
          </span>
        </Dropdown>
      </KWrapper>
    );
  }
}

KeywordFilter.propTypes = {
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  category: PropTypes.string,
  fetchTagsSuggestions: PropTypes.func,
  tagsSuggestions: PropTypes.array
};

export default KeywordFilter;
