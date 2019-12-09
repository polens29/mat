/**
 *
 * Advance
 *
 */

import React, { PropTypes } from 'react';
import KeywordFilter from '../KeywordFilter';
import JobTitleFilter from '../JobTitleFilter';
import FeaturedFIlter from '../FeaturedFIlter';
import LocationFilter from '../LocationFilter';
import TechnologyFilter from '../TechnologyFilter';
import IndustryFilter from '../IndustryFilter';
import OrganizationFilter from '../OrganizationFilter';
import ListFilter from '../ListFilter';
import CreateList from '../ListFilter/CreateList';
import SaveFilter from '../SaveFilter';
import MySavedFilter from '../MySavedFilter';
import List from 'components/List';
import Help from '../Help';
import UserBlack from 'assets/icons/user_black.png';
import UserWhite from 'assets/icons/user_white.png';
import CompanyBlack from 'assets/icons/company_black.png';
import CompanyWhite from 'assets/icons/company_white.png';

import { determineBrowser } from 'utils/helper';
import Star from 'assets/icons/star.png';
import Invalid from 'assets/icons/invalid.png';
import Outdated from 'assets/icons/outdated.png';
import Unlock from 'assets/icons/unlock.png';
import DND from 'assets/icons/dnd.png';
import User from 'assets/icons/all_contacts.png';
import Company from 'assets/icons/company_black.png';
import Pages from 'components/TableComponents/Pages';

import { AdvanceWrapper, FilterWrapper, AdvanceWrapper2, MyDataWrapper } from './css';

import styled from 'styled-components';

const Spacer = styled.p`
  display: block:
  padding: 0px 3px 0px 3px;
  float: right;
  font-size: 8px;
  text-align: right;
  margin-top: -4px;
  margin-left: -2px;
`;

class Advance extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

     this.selectSpecialFilterHandler = this.selectSpecialFilterHandler.bind(this)
  }

  selectCategoryHandler = (category) => {
    this.props.selectCategory(category);
    this.props.keywords
      .filter((keyword) => keyword.filters !== 'list')
      .map((keyword) => this.props.addKeyword({ ...keyword, category }));
  };

  selectSpecialFilterHandler = (value, e) => {
    const { category } = this.props;
    const unlockedKeyword = {
      category,
      filters: 'unlocked',
      name: 'Unlocked',
    };
    const reportedKeyword = {
      category,
      filters: 'reported',
      name: 'Reported',
    };
    const outdatedKeyword = {
      category,
      filters: 'outdated',
      name: 'Outdated',
    };
    const archivedKeyword = {
      category,
      filters: 'trash',
      name: 'Trash',
    };
    const favoriteKeyword = {
      category,
      filters: 'favorites',
      name: 'Favorites',
    };

    let name = value;
    if(value == 'Trash'){
      name = "Do not contact";
    }
    else if(value == 'Unlocked'){
      name = "Unlocked";
    }
    const selectedKeyword = {
      category,
      filters: value == 'Unlocked' ? 'unlocked' : value.toLowerCase(),
      name: name
    };

    if (e.key === 'all') {
      this.props.setSystemFilter('All');
    } else {
      this.props.addKeyword(selectedKeyword);
    }
  };

  render() {
    const {
      keywords,
      addKeyword,
      category,
      clearKeyword,
      removeKeyword,
      departments,
      seniority,
      popularList,
      aggregations,
      lbLists,
      createlbLists,
      addTolbLists,
      filterList,
      deleteList,
      copyList,
      renameList,
      getlbLists,
      updateCampaignParams,
      locations,
      locationsHierarchy,
      technologies,
      technologiesHierarchy,
      industries,
      searchValue,
      setSearchValue,
      regions,
      savedSearches,
      updateSavedSearchParams,
      createSavedSearch,
      renameSavedSearch,
      deleteSavedSearch,
      copySavedSearch,
      searchParams,
      updateSavedSearch,
      fetchTagsSuggestions,
      tagsSuggestions,
      toggleSidebarDisplay,
      showManageListsModal,
      listModalVisible,
      listCreated,
      handleListCreated,
      updateSearchParams,
      total,
      setColumns,
      displayColumns,
    } = this.props;

    let browser = determineBrowser();

    let divWidth = "59%";
    if(browser == 'safari'){
      divWidth = "815px";
    }
    return (
      <div style={{padding: '0px 15px'}}>
        <AdvanceWrapper>         
          <div className="filtersClass">
            <LocationFilter
              keywords={keywords}
              addKeyword={addKeyword}
              category={category}
              clearKeyword={clearKeyword}
              aggregations={aggregations}
              locations={locations}
              locationsHierarchy={locationsHierarchy}
              regions={regions}
              removeKeyword={removeKeyword}
            />
            <IndustryFilter
              keywords={keywords}
              addKeyword={addKeyword}
              category={category}
              clearKeyword={clearKeyword}
              aggregations={aggregations}
              industries={industries}
            />
            <JobTitleFilter
              keywords={keywords}
              addKeyword={addKeyword}
              category={category}
              clearKeyword={clearKeyword}
              seniority={seniority}
              removeKeyword={removeKeyword}
              aggregations={aggregations}
              departments={departments}
            />
            <OrganizationFilter
              keywords={keywords}
              addKeyword={addKeyword}
              category={category}
              removeKeyword={removeKeyword}
              clearKeyword={clearKeyword}
              aggregations={aggregations}
            />
            <KeywordFilter
              keywords={keywords}
              removeKeyword={removeKeyword}
              addKeyword={addKeyword}
              category={category}
              clearKeyword={clearKeyword}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              fetchTagsSuggestions={fetchTagsSuggestions}
              tagsSuggestions={tagsSuggestions}
              aggregations={aggregations}
              technologies={technologies}
              technologiesHierarchy={technologiesHierarchy}
            />
            <FeaturedFIlter
              keywords={keywords}
              addKeyword={addKeyword}
              category={category}
              clearKeyword={clearKeyword}
              popularList={popularList}
              removeKeyword={removeKeyword}
              aggregations={aggregations}
            />
            <div className="pages">
              <Pages
                updateSearchParams={updateSearchParams}
                searchParams={searchParams}
                category={category}
                setColumnDisplay={setColumns}
                displayColumns={displayColumns}
                specialFilter={this.props.specialFilter}
                activeSpecialFilter={this.props.activeSpecialFilter}
                setSystemFilter={this.props.setSystemFilter}
                userProfile={this.props.userProfile}
              />
            </div>
          {/*
            <List
              addKeyword={addKeyword}
              category={category}
              activeSpecialFilter={this.props.activeSpecialFilter}
              removeKeyword={removeKeyword}
              setSystemFilter={this.props.setSystemFilter}
            />
          */}
          </div>
        </AdvanceWrapper>
        {/*<AdvanceWrapper2>
          
          <MyDataWrapper>My Data :</MyDataWrapper>
          <MySavedFilter
            savedSearches={savedSearches}
            updateSavedSearchParams={updateSavedSearchParams}
            category={category}
            addKeyword={addKeyword}
            renameSavedSearch={renameSavedSearch}
            deleteSavedSearch={deleteSavedSearch}
            copySavedSearch={copySavedSearch}
            clearKeyword={clearKeyword}
          />
          <CreateList
            createlbLists={createlbLists}
            category={category}
            listCreated={listCreated}
            handleListCreated={handleListCreated}
            lbLists={lbLists}
            filterList={filterList}
          />
          <ListFilter
            keywords={keywords}
            addKeyword={addKeyword}
            category={category}
            clearKeyword={clearKeyword}
            lbLists={lbLists}
            createlbLists={createlbLists}
            addTolbLists={addTolbLists}
            filterList={filterList}
            removeKeyword={removeKeyword}
            deleteList={deleteList}
            copyList={copyList}
            renameList={renameList}
            getlbLists={getlbLists}
            showManageListsModal={showManageListsModal}
            listModalVisible={listModalVisible}
          />
        
        </AdvanceWrapper2>*/}
      </div>
    );
  }
}

Advance.propTypes = {
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  clearKeyword: PropTypes.func,
  keywords: PropTypes.array,
  locations: PropTypes.array,
  locationsHierarchy: PropTypes.array,
  industries: PropTypes.array,
  category: PropTypes.string,
  setSearchValue: PropTypes.func,
  searchValue: PropTypes.string,
  aggregations: PropTypes.object,
  selectCategory: PropTypes.func,
  createlbLists: PropTypes.func,
  addTolbLists: PropTypes.func,
  filterList: PropTypes.func,
  deleteList: PropTypes.func,
  copyList: PropTypes.func,
  renameList: PropTypes.func,
  updateCampaignParams: PropTypes.func,
  lbLists: PropTypes.array,
  seniority: PropTypes.array,
  popularList: PropTypes.array,
  getlbLists: PropTypes.array,
  technologies: PropTypes.array,
  technologiesHierarchy: PropTypes.array,
  departments: PropTypes.array,
  regions: PropTypes.array,
  savedSearches: PropTypes.array,
  updateSavedSearchParams: PropTypes.func,
  createSavedSearch: PropTypes.func,
  renameSavedSearch: PropTypes.func,
  deleteSavedSearch: PropTypes.func,
  copySavedSearch: PropTypes.func,
  searchParams: PropTypes.object,
  updateSavedSearch: PropTypes.func,
  toggleSidebarDisplay: PropTypes.func,
  showManageListsModal: PropTypes.func,
  listModalVisible: PropTypes.string
};

export default Advance;
