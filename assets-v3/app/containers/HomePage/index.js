/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { Modal, Col, Progress } from 'antd';
import FreshdeskWidget from '@personare/react-freshdesk-widget';

import ContactTable from 'components/ContactTable';
import ContactOptions from 'components/ContactOptions';
import Footer from 'components/Footer';
import MapLanding from 'components/MapLanding';

import {
  makeSelectLBLists,
  makeSelectProgressBar,
  makeSelectProgress,
  makeSelectTotalContact,
  makeSelectListName,
  makeSelectUpdatedLBLists,
  makeSelectAddLbListsLoading,
} from 'containers/Lists/selectors';

import {
  getlbLists,
  createlbLists,
  addTolbLists,
  filterList,
  deleteList,
  copyList,
  renameList,
  removeFromlbLists,
  purchaseList
} from 'containers/Lists/actions';

import { makeSelectSavedSearches } from 'containers/SavedSearch/selectors';
import {
  getSavedSearches,
  createSavedSearch,
  renameSavedSearch,
  deleteSavedSearch,
  copySavedSearch,
  updateSavedSearch,
} from 'containers/SavedSearch/actions';

import {
  makeSelectCredits,
  makeSelectDisplayColumns,
} from 'containers/App/selectors';
import { setColumnDisplay, toggleSidebarDisplay } from 'containers/App/actions';

import Search from 'components/Search';

import {
  fetchLists,
  updateSelectedRows,
  selectAllLeadResults,
  toggleFavorites,
  removeKeywords,
  updateSearchParams,
  specialFilters,
  unlockContact,
  unlockContacts,
  reportContacts,
  addKeywords,
  clearKeywords,
  deleteContacts,
  updateFromRouterState,
  getSearchSuggestions,
  getTagsSuggestions,
  getFilters,
  setSystemFilter,
  selectCategories,
  getExportToCsvCount,
  exportDataThirdParty,
  getCampaigns,
  getCreditCost,
  suppressCompanyContacts,
  emptySelectedRows,
} from './actions';

import {
  makeSelectList,
  makeSelectKeywords,
  makeSelectSearchParams,
  makeSelectCategories,
  makeSelectFetching,
  makeSelectTableColumns,
  makeSelectActiveSpecialFilter,
  makeSelectSearchValue,
  makeSelectTotal,
  makeSelectAggregations,
  makeSelectSearchSuggestions,
  makeSelectTagsSuggestions,
  makeSelectGetLocations,
  makeSelectGetIndustries,
  makeSelectGetSeniority,
  makeSelectGetDepartments,
  makeSelectGetPopularList,
  makeSelectGetRegions,
  makeSelectRowKeys,
  makeSelectAllLeads,
  makeSelectGetLocationsHierarchy,
  makeSelectRows,
  makeSelectExportToCsvCount,
  makeSelectCsvUrl,
  makeSelectIsListSelected,
  makeSelectCampaigns,
  makeSelectCreditCost,
  makeSelectGetTechnologies,
  makeSelectGetTechnologiesHierarchy,
  makeSelectErrorMsg,
  makeSelectSuppressAllCompanyContacts,
  makeSelectProgressBarUnlock,
  makeSelectProgressUnlcok,
  makeSelectTotalContactUnlock,
  makeSelectTotalToUnlock
} from './selectors';

import { makeSelectCredentials, makeSelectUserProfile } from 'containers/App/selectors';
import { getCredentials } from 'containers/App/actions';

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const leadType = this.props.category === 'Organization' ? 'company' : 'contact';
    this.state = {
      campaignParams: {
        status: '',
        query: '',
        page: 1,
        pageSize: 50,
      },
      savedSearchParams: {
        leadType,
        query: '',
        page: 1,
        pageSize: 20,
      },
      visible: false,
      showFreshDesk: false,
      visibleSize: false,
      selectedRows: [],
      showListsModal: false,
      checkedKeys: [],
      listUpdated: false,
      listCreated: false,
      showMap: true
    };
  }

  // need to do initial api call for search te get count for aggregation
  componentDidMount() {
    const {
      searchParams,
      category,
      getList,
      params,
      updateRouterState,
      getSearchFilters,
    } = this.props;
    const { router } = this.context;
    const { location } = router;
    const { state } = location;

    getSearchFilters();

    this.props.getCampaigns(this.state.campaignParams);
    this.props.getlbLists(category);
    this.props.getSavedSearches(this.state.savedSearchParams);
    this.props.getCredentials();

    // check if router has state properties(coming from deep view). So that it loads this props instead of the usual props.
    if (typeof state === 'object') {
      const { campaign_statuses, campaigns } = state.searchParams.filters;
      if (campaign_statuses.length || campaigns.length || this.props.list.length > 0) {
        return updateRouterState(
          state.searchParams,
          state.category,
          state.keywords,
          params.id,
          state.activeSpecialFilter || 'All'
        );
      }
    }
    return getList(searchParams, category);
  }

  // do a api call everytime search parameters is changed even own empty filters
  componentDidUpdate(prevProps) {
    const { searchParams, category, getList } = this.props;
    const searchParamChanged = !_.isEqual(searchParams, prevProps.searchParams);
    if (category !== prevProps.category) {
      this.props.getlbLists(category);
      const leadType = category === 'Organization' ? 'company' : 'contact';
      this.updateSavedSearchParams('leadType', leadType);
      sessionStorage.setItem('category', category);
    }
    if (searchParamChanged) {
      getList(searchParams, category);
      this.props.updateSelectedRows([], []);
    }
    // Empty selected rows when add to list is completed
    this.checkAddLbListsLoading(prevProps);

    if (this.props.userProfile && this.props.userProfile.show_guided_flow) {
      if (localStorage.getItem('fromLogin')) {
        this.props.toggleSidebarDisplay('help');
      }
    }
  }

  checkAddLbListsLoading(prevProps) {
    const prevAddLbListsLoading = prevProps.addLbListsLoading;
    const addLbListsLoading = this.props.addLbListsLoading;
    if (!addLbListsLoading && addLbListsLoading != prevAddLbListsLoading) {
      this.props.emptySelectedRows();
    }
  };

  getCampaigns = () => {
    this.props.getCampaigns(this.state.campaignParams);
  };


  getSavedSearches = () => {
    this.props.getSavedSearches(this.state.savedSearchParams);
  };

  updateCampaignParams = (key, value) => {
    this.state.campaignParams[key] = value;
    this.getCampaigns();
  };

  updateSavedSearchParams = (key, value) => {
    this.state.savedSearchParams[key] = value;
    this.getSavedSearches();
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeInfoModal = () => {
    this.setState({
      visible: false,
      showFreshDesk: false,
    });
  };

  unlockLimitErr = () => (
    <Col className="pa-modal-info">
      {this.props.errorMsg} To increase this limit{' '}
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          this.setState({ showFreshDesk: true });
        }}
      >
        contact us
      </a>{' '}
      or email us at{' '}
      <a href={'mailto:customer_success@leadbook.com'}>
        customer_success@leadbook.com
      </a>
    </Col>
  );

  handleShowListDropDown = (flag) => {
    this.setState({ visibleSize: flag });
  };

  handleHideListDropDown = () => {
    this.setState({ visibleSize: false });
  };

  showManageListsModal = (value) => {
    this.setState({
      showListsModal: value
    })
  }

  setCheckedKeys(keys) {
    this.setState({
      checkedKeys: keys
    })
  }

  handleListUpdated(flag) {
    this.setState({
      listUpdated: flag
    })
  }
  removeCampaignsFromFilter(keyword) {
    this.props.removeKeyword(
      keyword,
      this.props.searchParams
    );
    console.log('Deleted keyword');
    console.log(keyword);
  }


  handleListCreated(flag) {
    this.setState({
      listCreated: flag
    })
  }

  toggleMap(){
    this.setState({
      showMap: !this.state.showMap
    })
  }

  render() {
    
const {keywords}=this.props;
    /// keykord checking to remove campaign results 
    if (keywords) {
      if (keywords.length > 0) {
       
        let campaignsKeyword =  keywords.find((keyword, i) => {
          if (keyword.type === "CampaignStatuses" || keyword.type === "Campaigns") {
              return true; 
          }else{
            return false;
          }
          
      });

      if(campaignsKeyword){
        keywords.map((keyword, i) => {
          this.removeCampaignsFromFilter(keyword);
        
      });
      }
        
      }

    }

    return (
      <div>
        <Modal
          title="Information"
          visible={this.state.visible}
          onOk={this.closeInfoModal}
          onCancel={this.closeInfoModal}
          footer={null}
        >
          {!this.state.showFreshDesk &&
            this.props.errorMsg.includes('You can unlock a maximum') &&
            this.unlockLimitErr()}
          {this.state.showFreshDesk && (
            <FreshdeskWidget url="https://leadbook.freshdesk.com" />
          )}
          {!this.state.showFreshDesk &&
            !this.props.errorMsg.includes('You can unlock a maximum') &&
            this.props.errorMsg &&
            this.props.errorMsg}
        </Modal>
        <Modal
          title="Progress"
          visible={this.props.progressBar}
          footer={null}
          closable={false}
        >
          <p>
            {this.props.progress == 100 ? (
              <p>Successfully added {this.props.totalContact} contacts to {this.props.listName} </p>
            ) : (
                <p>Adding {this.props.totalContact} contacts to {this.props.listName}</p>
              )}

          </p>
          <Progress percent={this.props.progress} />
        </Modal>
        <Modal
          title="Unlock Progress"
          visible={this.props.progressBarUnlock}
          footer={null}
          closable={false}
        >
          <p>
            {this.props.progressUnlcok == 100 ? (
              <p>Successfully unlocked {this.props.totalContactUnlock} contacts</p>
            ) : (
                <p>Unlocking {this.props.totalContactUnlock} contacts</p>
              )}

          </p>
          <Progress percent={this.props.progressUnlcok} />
        </Modal>

        {
          !this.state.showMap && (
            <div>
              <Search
                {...this.props}
                updateCampaignParams={this.updateCampaignParams}
                updateSavedSearchParams={this.updateSavedSearchParams}
                showManageListsModal={this.showManageListsModal.bind(this)}
                listModalVisible={this.state.showListsModal}
                listCreated={this.state.listCreated}
                handleListCreated={this.handleListCreated.bind(this)}
              />
              <ContactOptions
                showInfoModal={this.showModal}
                visibleSize={this.state.visibleSize}
                handleHideListDropDown={this.handleHideListDropDown}
                handleShowListDropDown={this.handleShowListDropDown}
                {...this.props}
                showManageListsModal={this.showManageListsModal.bind(this)}
                listModalVisible={this.state.showListsModal}
                checkedKeys={this.state.checkedKeys}
                setCheckedKeys={this.setCheckedKeys.bind(this)}
                listUpdated={this.state.listUpdated}
                handleListUpdated={this.handleListUpdated.bind(this)}
                listCreated={this.state.listCreated}
                handleListCreated={this.handleListCreated.bind(this)}
              />

              <ContactTable showInfoModal={this.showModal} selectedRows={this.state.selectedRows} handleShowListDropDown={this.handleShowListDropDown} checkedKeys={this.state.checkedKeys} {...this.props} listUpdated={this.state.listUpdated} handleListUpdated={this.handleListUpdated.bind(this)} />

              <Footer {...this.props}/>
            </div>
          )
        }
        {
          this.state.showMap && (
            <MapLanding toggleMap={this.toggleMap.bind(this)}/>
          )
        }

          
      </div>
    );
  }
}

HomePage.propTypes = {
  getCredentials: PropTypes.func,
  credentials: PropTypes.object,
  searchParams: PropTypes.object,
  params: PropTypes.object,
  updateSelectedRows: PropTypes.func,
  getList: PropTypes.func,
  updateRouterState: PropTypes.func,
  category: PropTypes.string,
  getSearchFilters: PropTypes.func,
  getlbLists: PropTypes.func,
  getCampaigns: PropTypes.func,
  errorMsg: PropTypes.string,
  getSavedSearches: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  credentials: makeSelectCredentials(),
  list: makeSelectList(),
  keywords: makeSelectKeywords(),
  searchParams: makeSelectSearchParams(),
  category: makeSelectCategories(),
  loading: makeSelectFetching(),
  tableColumns: makeSelectTableColumns(),
  activeSpecialFilter: makeSelectActiveSpecialFilter(),
  searchValue: makeSelectSearchValue(),
  total: makeSelectTotal(),
  credits: makeSelectCredits(),
  aggregations: makeSelectAggregations(),
  suggestions: makeSelectSearchSuggestions(),
  tagsSuggestions: makeSelectTagsSuggestions(),
  locations: makeSelectGetLocations(),
  locationsHierarchy: makeSelectGetLocationsHierarchy(),
  technologies: makeSelectGetTechnologies(),
  technologiesHierarchy: makeSelectGetTechnologiesHierarchy(),
  industries: makeSelectGetIndustries(),
  lbLists: makeSelectLBLists(),
  updatedList: makeSelectUpdatedLBLists(),
  departments: makeSelectGetDepartments(),
  seniority: makeSelectGetSeniority(),
  popularList: makeSelectGetPopularList(),
  regions: makeSelectGetRegions(),
  selectedRowKeys: makeSelectRowKeys(),
  displayColumns: makeSelectDisplayColumns(),
  selectAllLeads: makeSelectAllLeads(),
  selectedRows: makeSelectRows(),
  exportToCsvCount: makeSelectExportToCsvCount(),
  csvUrl: makeSelectCsvUrl(),
  isListSelected: makeSelectIsListSelected(),
  campaigns: makeSelectCampaigns(),
  creditCost: makeSelectCreditCost(),
  totalToUnlock: makeSelectTotalToUnlock(),
  errorMsg: makeSelectErrorMsg(),
  savedSearches: makeSelectSavedSearches(),
  suppressAllCompanyContacts: makeSelectSuppressAllCompanyContacts(),
  progressBar: makeSelectProgressBar(),
  progress: makeSelectProgress(),
  totalContact: makeSelectTotalContact(),
  listName: makeSelectListName(),
  progressBarUnlock: makeSelectProgressBarUnlock(),
  progressUnlcok: makeSelectProgressUnlcok(),
  totalContactUnlock: makeSelectTotalContactUnlock(),
  addLbListsLoading: makeSelectAddLbListsLoading(),
  userProfile: makeSelectUserProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getCredentials: () => dispatch(getCredentials()),

    /* List Building---------------------------------------- */
    getlbLists: (category) => dispatch(getlbLists(category)),
    createlbLists: (name, category) => dispatch(createlbLists(name, category)),
    filterList: (query) => dispatch(filterList(query)),
    deleteList: (list) => dispatch(deleteList(list)),
    copyList: (list, index) => dispatch(copyList(list, index)),
    renameList: (list, newName, index) =>
      dispatch(renameList(list, newName, index)),
    addTolbLists: (leads, category, lbLists, filters, addAll, total) =>
      dispatch(addTolbLists(leads, category, lbLists, filters, addAll, total)),

    removeFromlbLists: (leads, category, lbLists, filters, addAll, total) =>
      dispatch(
        removeFromlbLists(leads, category, lbLists, filters, addAll, total)
      ),

    purchaselbLists: (payload) => dispatch(purchaseList(payload)),
    /* ----------------------------------------------------- */

    getList: (params, category) => dispatch(fetchLists(params, category)),

    /* Filters--------------------------------------------- */
    removeKeyword: (list, searchParams) =>
      dispatch(removeKeywords(list, searchParams)),
    updateSearchParams: (key, value) =>
      dispatch(updateSearchParams(key, value)),
    specialFilter: (category, activeSpecialFilter) =>
      dispatch(specialFilters(category, activeSpecialFilter)),
    clearKeyword: (typeOfKeyword, all) =>
      dispatch(clearKeywords(typeOfKeyword, all)),
    getSearchFilters: () => dispatch(getFilters()),
    setSystemFilter: (filter) => dispatch(setSystemFilter(filter)),
    /* ----------------------------------------------------- */

    unlockContact: (contact, params) => {
      const { searchParams, category, unlockCall, showInfoModal } = params;
      return dispatch(
        unlockContact(
          contact,
          searchParams,
          category,
          unlockCall,
          showInfoModal
        )
      );
    },
    unlockContacts: (contacts, params) => {
      const {
        searchParams,
        category,
        unlockAll,
        unlockCall,
        total,
        showInfoModal,
      } = params;

      const getLockedContacts = contacts.filter((contact) => !contact.unlocked);

      return dispatch(
        unlockContacts(
          getLockedContacts,
          searchParams,
          category,
          unlockAll,
          unlockCall,
          total,
          showInfoModal
        )
      );
    },
    reportContacts: (leadIds, checkedList, reportDescription) =>
      dispatch(reportContacts(leadIds, checkedList, reportDescription)),

    updateSelectedRows: (selectedRowKeys, selectedRows) =>
      dispatch(updateSelectedRows(selectedRowKeys, selectedRows)),

    selectAllLeadFunc: (value) => dispatch(selectAllLeadResults(value)),
    addKeyword: (keyword) => dispatch(addKeywords(keyword)),

    suppressCompanyContacts: (value) => dispatch(suppressCompanyContacts(value)),

    deleteContacts: (
      selectedRows,
      category,
      searchParams,
      fromDeepView,
      request,
      suppressAllCompanyContacts
    ) =>
      dispatch(
        deleteContacts(
          selectedRows,
          category,
          searchParams,
          fromDeepView,
          request,
          suppressAllCompanyContacts
        )
      ),
    updateRouterState: (
      searchParams,
      category,
      keywords,
      organizationID,
      activeSpecialFilter
    ) =>
      dispatch(
        updateFromRouterState(
          searchParams,
          category,
          keywords,
          organizationID,
          activeSpecialFilter
        )
      ),
    fetchSearchSuggestions: (query, leadType) =>
      dispatch(getSearchSuggestions(query, leadType)),

    fetchTagsSuggestions: (query, leadType) =>
      dispatch(getTagsSuggestions(query, leadType)),

    toggleFavorites: (lead, category, activeSpecialFilter, searchParams) =>
      dispatch(
        toggleFavorites(lead, category, activeSpecialFilter, searchParams)
      ),

    selectCategory: (category) => dispatch(selectCategories(category)),

    getExportToCsvCount: (category, searchParams, exportAll, selectedRows) =>
      dispatch(
        getExportToCsvCount(category, searchParams, exportAll, selectedRows)
      ),
    setColumns: (category, columns, modalEdit, email) =>
      dispatch(setColumnDisplay(category, columns, modalEdit, email)),
    exportData: (selectedRows, category, filters, selectAllLeads, apiCall) =>
      dispatch(
        exportDataThirdParty(
          selectedRows,
          category,
          filters,
          selectAllLeads,
          apiCall
        )
      ),
    getCampaigns: (status, query, page, pageSize) => {
      dispatch(getCampaigns(status, query, page, pageSize));
    },
    getCreditCost: () => {
      dispatch(getCreditCost());
    },
    getSavedSearches: (leadType, query, page, pageSize) => {
      dispatch(getSavedSearches(leadType, query, page, pageSize));
    },
    createSavedSearch: (name, category, filters, keywords) => {
      dispatch(createSavedSearch(name, category, filters, keywords));
    },
    renameSavedSearch: (savedSearch, newName, index) => {
      dispatch(renameSavedSearch(savedSearch, newName, index));
    },
    deleteSavedSearch: (savedSearch) => {
      dispatch(deleteSavedSearch(savedSearch));
    },
    copySavedSearch: (savedSearch, index) => {
      dispatch(copySavedSearch(savedSearch, index));
    },
    updateSavedSearch: (savedSearch, filters, keywords) => {
      dispatch(updateSavedSearch(savedSearch, filters, keywords));
    },
    toggleSidebarDisplay: (display) => {
      dispatch(toggleSidebarDisplay(display));
    },
    emptySelectedRows: () => dispatch(emptySelectedRows()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
