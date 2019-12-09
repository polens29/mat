/**
 *
 * CategorySelect
 *
 */

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { searchParams } from 'containers/HomePage/constants';

import { CategorySelectWrapper } from './css';

class CategorySelect extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { defaultTab: this.getLocation(), selected: 'Contact' };
    this.selectCategoryHandler = this.selectCategoryHandler.bind(this);
    this.servicesMenuClick = this.servicesMenuClick.bind(this);
  }
  

  getLocation() {
    // add more conditions if we will add more tabs on header
    const currentLocation = browserHistory.getCurrentLocation();

    if (currentLocation.pathname === '/app/v3/') {
      return 'Contact';
    }

    if (currentLocation.pathname.includes('services')) {
      return 'Requests';
    }

    if (currentLocation.pathname.includes('contact')) {
      return 'Contact';
    }
    
    if (currentLocation.pathname.includes('campaigns')) {
      return 'Campaigns';
    }

    return '';
  }

  selectCategoryHandler({ category }) {
    const { router } = this.context;
    this.props.selectCategory(category);
    let keywords = this.props.keywords || [];
    const { campaign_statuses, campaigns } = this.props.searchParams.filters;
    if (campaign_statuses.length || campaigns.length) {
      this.props.setKeywords([], searchParams);
    } else {
      this.props.setKeywords(this.props.keywords, this.props.searchParams);
    }
    this.setState({
      defaultTab: 'Contact',
      selected: 'Contact',
    });
    if (router.location.pathname !== '/app/v3/contact') {
      router.push({
        pathname: '/app/v3/contact',
        state: { searchParams: this.props.searchParams || searchParams, category, keywords},
      });
    }
  }

  campaigns = () => {
    const { router } = this.context;
    router.push({
      pathname: '/app/v3/campaigns',
    });
    this.setState({
      defaultTab: 'Campaigns',
      selected: 'Campaigns',
    });
  };

  servicesMenuClick = () => {
    const { router } = this.context;
    this.setState({
      defaultTab: 'Requests',
      selected: 'Requests',
    });
    router.push({
      pathname: '/app/v3/services/dataanalytics',
    });
  };

  exchangeMenuClick = () => {
    const { router } = this.context;
    this.setState({
      defaultTab: 'Exchange',
      selected: 'Exchange',
    });
    router.push({
      pathname: '/app/v3/dataexchange',
    });
  };

  // add this at the bottom if data exchange is now possible in platform

  render() {
    const { defaultTab } = this.state;
    return (
      <CategorySelectWrapper
        categoryValue={this.props.category}
        disable={this.props.sidebarDisplay}
      >
        <button
          className={`${
            defaultTab === 'Contact' ? 'category selected' : 'category'
          }`}
          onClick={() => this.selectCategoryHandler({ category: this.props.category || 'Contact' })}
        >
          <span>Database</span>
        </button>
        <button
          className={`campaigns ${
            defaultTab === 'Campaigns' ? 'category selected' : 'category'
          }`}
          onClick={this.campaigns}
        >
          <span>Campaigns</span>
        </button>
      	<button
      	  className={`exchange ${
      	    defaultTab === 'Exchange' ? 'category selected' : 'category'
      	  }`}
      	  onClick={this.exchangeMenuClick}
      	>
      	  <span>
      	    Exchange
      	    <span
      	      style={{
            		fontSize: 8,
            		color: '#E65E5A',
            		marginTop: -4,
            		position: 'absolute',
      	      }}
      	    >
      	      Beta
      	    </span>
      	  </span>
      	</button>
        <button
          className={`services ${
            defaultTab === 'Requests' ? 'category selected' : 'category'
          }`}
          onClick={this.servicesMenuClick}
        >
          <span>Requests</span>
        </button>
      </CategorySelectWrapper>
    );
  }
}

CategorySelect.propTypes = {
  selectCategory: PropTypes.func,
  category: PropTypes.string,
  sidebarDisplay: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  setKeywords: PropTypes.func,
  keywords: PropTypes.array,
  searchParams: PropTypes.object,
};

export default CategorySelect;
