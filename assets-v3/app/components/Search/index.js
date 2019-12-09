/**
 *
 * Search
 *
 */
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          import React, { PropTypes } from 'react';
import ReactTags from 'react-tag-autocomplete/dist-es5/ReactTags';

import Advance from 'components/Advance';

import { SearchWrapper, NavWrapper, FilterNameWrapper } from './css';

import EmployeeSize from 'assets/tagicons/EmployeeSize.png';
import Factory from 'assets/tagicons/Factory.png';
import Industry from 'assets/icons/industry.png';
import Location from 'assets/tagicons/Location.png';
import FeaturedList from 'assets/icons/featured.png';
import JobTitle from 'assets/icons/jobtitle.png';
import Organisation from 'assets/icons/company_filter.png';
import Revenue from 'assets/tagicons/Revenue.png';
import Technology from 'assets/icons/technology.png';
import SaveFilter from '../SaveFilter';
import Star from 'assets/icons/star.png';
import Invalid from 'assets/icons/invalid.png';
import Outdated from 'assets/icons/outdated.png';
import Unlock from 'assets/icons/unlock.png';
import DND from 'assets/icons/dnd.png';
import ListIcon from 'assets/icons/list.png';
import Mail from 'assets/icons/mail.png';
import MySavedFilter from '../MySavedFilter';

const getClassNameTag = (tag, selectedTagClassName) => tag.type === 'Exclude' ?
  `${selectedTagClassName} tags-selected-exclude` : selectedTagClassName;

// eslint-disable-next-line react/prefer-stateless-function
class TagComponent extends React.Component {
  renderIcon(tag){
    switch (tag.type) {
      case 'Industry':
        return(<img src={Industry} style={{ marginTop: '-2', height: 16, marginRight: 3 }} />);
        break;
      case 'Location':
        return(<i className="material-icons">room</i>);
        break;
      case 'Seniority':
        return(<i className="material-icons">business_center</i>);
        break;
      case 'Department':
        return(<i className="material-icons">business_center</i>);
        break;
      case 'Company Type':
        return(<i className="material-icons">business</i>);
        break;
      case 'Technologies':
        return(<img src={Technology} style={{ marginTop: '-5', height: 18, marginRight: 3 }} />);
        break;
      case 'Employee Size':
        return(<i className="material-icons">people</i>);
        break;
      case 'Featured':
        return(<img src={FeaturedList} style={{height: 16, marginRight: 3 }} />);
        break;
      case 'Revenue':
        return(<img src={Revenue} style={{ marginTop: '-5', height: 18, marginRight: 3 }} />);
        break;
      case 'Unlocked':
        return(<i className="material-icons">lock_open</i>);
        break;
      case 'Favorites':
        return(<i className="material-icons">star_border</i>);
        break;
      case 'Trash':
        return(<i className="material-icons">not_interested</i>);
        break;
      case 'Reported':
        return(<i className="material-icons">report_problem</i>);
        break;
      case 'Outdated':
        return(<i className="material-icons">event_busy</i>);
        break;
      case 'List':
        return(<img src={ListIcon} style={{ marginTop: '-5', width: 12, height: 12, marginRight: 3 }} />);
        break;
      case 'Campaigns':
        return(<img src={Mail} style={{ marginTop: '-5', width: 12, height: 12, marginRight: 3 }} />);
        break;
      default:
        '';
    }
  }
  render() {
    if (
      this.props.tag.mode &&
      this.props.tag.mode !== this.props.tag.category
    ) {
      return (
        <button className="disabled-tag">
          <span className={this.props.classNames.selectedTagName}>
            { this.renderIcon(this.props.tag) }
           {this.props.tag.name}
          </span>
        </button>
      );
    }
    return (
      <button
        type="button"
        className={getClassNameTag(this.props.tag, this.props.classNames.selectedTag)}
        title="Click to remove tag"
        onClick={this.props.onDelete}
      >
        <span className={this.props.classNames.selectedTagName}>
          { this.renderIcon(this.props.tag) }

          {this.props.tag.name}
        </span>
      </button>
    );
  }
}
TagComponent.propTypes = {
  category: PropTypes.string,
  classNames: PropTypes.object,
  tag: PropTypes.object,
  onDelete: PropTypes.func,
};

// eslint-disable-next-line react/prefer-stateless-function, react/no-multi-comp
class Search extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  
  constructor(props){
    super(props);
    this.state = {
      query: '',
    };

    this.selectCategoryHandler = this.selectCategoryHandler.bind(this)
  }

  selectCategoryHandler(category){
    this.props.selectCategory(category);
    this.props.keywords
      .filter((keyword) => keyword.filters !== 'list')
      .map((keyword) => this.props.addKeyword({ ...keyword, category }));
  };

  getSuggestions = () => {
    const type = {
      and_keywords: 'Keyword',
      job_title: 'Job title',
      location: 'Location',
      industry: 'Industry',
      company_name: 'Organization',
      contact_name: 'Contact',
      tag: 'Tag',
      company_website: 'Company website',
    };

    const { query } = this.state;

    const suggestions = this.props.suggestions
      // .filter((suggestion) => suggestion.type !== 'contact_name')
      .map((suggestion, index) => ({
        id: query ? index + 1 : index,
        name: `${suggestion.text} - ${type[suggestion.type]}`,
        ...suggestion,
      }));

    if (query) {
      const currentQuery = {
        id: 0,
        name: `${query} - Search All`,
      };

      return [currentQuery, ...suggestions];
    }

    return suggestions;
  };

  handleDelete = (index) => {
    /**
     * current implementation for removing the keyword is passing the keyword object and filtering it out
     * but the library onlu returns the index so hence the lookup.
     */
    if (index >= 0) {
      this.props.removeKeyword(
        this.props.keywords[index],
        this.props.searchParams
      );
    }
  };

  handleAddition = (tag) => {
    if (!tag) {
      return;
    }
    const tagType = tag.type || 'and_keywords';
    let selectedKeyword = {
      category: this.props.category,
      filters: tagType,
      name: tag.name.split(' -')[0],
      mode: '',
    };

    // Case when no suggestion is selected
    if (tagType === 'and_keywords') {
      selectedKeyword = {
        type: 'Keyword',
        ...selectedKeyword,
      };
    }

    // Case when job_title suggestion is selected
    if (tagType === 'job_title') {
      selectedKeyword = {
        type: 'JOB',
        ...selectedKeyword,
        mode: 'Contact',
      };
    }

    // Case when location suggestion is selected
    if (tagType === 'location') {
      selectedKeyword.filters = 'locations';
      selectedKeyword = {
        type: 'Location',
        code: tag.value,
        id: Object.values(tag.value)[0].toString(),
        ...selectedKeyword,
      };
    }

    // Case when industry suggestion is selected
    if (tagType === 'industry') {
      selectedKeyword = {
        type: 'Industry',
        industry_code: tag.value,
        id: Object.values(tag.value)[0],
        ...selectedKeyword,
      };
    }

    // Case when company name suggestion is selected
    if (tagType === 'company_name') {
      selectedKeyword = {
        type: 'Company',
        id: tag.leadbook_id,
        ...selectedKeyword,
      };
    }

    // Case when contact name suggestion is selected
    if (tagType === 'contact_name') {
      selectedKeyword = {
        type: 'Contact',
        id: tag.leadbook_id,
        ...selectedKeyword,
        mode: 'Contact',
      };
    }

    // Case when tag suggestion is selected
    if (tagType === 'tag') {
      selectedKeyword = {
        type: 'Tag',
        ...selectedKeyword,
      };
    }

    // Case when company website suggestion is selected
    if (tagType === 'company_website') {
      selectedKeyword = {
        type: 'Company',
        id: tag.leadbook_id,
        ...selectedKeyword,
      };
    }

    this.setState({
      query: '',
    });
    this.props.addKeyword(selectedKeyword);
  };

  handleInputChange = (query) => {
    this.setState({
      query,
    });
    const leadType =
      this.props.category.toLowerCase() === 'organization'
        ? 'company'
        : this.props.category.toLowerCase();
    this.props.fetchSearchSuggestions(query, leadType);
  };

  render() {
    const {
      keywords,
      category,
      addKeyword,
      clearKeyword,
      removeKeyword,
      aggregations,
      specialFilter,
      searchParams,
      locations,
      locationsHierarchy,
      technologies,
      technologiesHierarchy,
      industries,
      regions,
      activeSpecialFilter,
      setSystemFilter,
      selectCategory,
      lbLists,
      createlbLists,
      addTolbLists,
      filterList,
      seniority,
      popularList,
      deleteList,
      copyList,
      renameList,
      getlbLists,
      campaigns,
      departments,
      updateCampaignParams,
      savedSearches,
      updateSavedSearchParams,
      createSavedSearch,
      renameSavedSearch,
      deleteSavedSearch,
      copySavedSearch,
      updateSavedSearch,
      fetchTagsSuggestions,
      tagsSuggestions,
      toggleSidebarDisplay,
      showManageListsModal,
      listModalVisible,
      listCreated,
      handleListCreated,
      updateSearchParams
    } = this.props;

    const placeholder =
      category === 'Contact'
        ? 'Search by Industry, Job title, Location, etc.'
        : 'Search by Industry, Organization Name, Location, etc.';

    return (
      <SearchWrapper categoryValue={category} queryValue={this.state.query}>
        <NavWrapper>
          <button
            className={category === 'Contact' ? 'active contacts' : 'contacts'}
            onClick={() => this.selectCategoryHandler('Contact')}
          >
            Contacts
          </button>
          <button
            className={
              category === 'Organization'
                ? 'active organizations'
                : 'organizations'
            }
            onClick={() => this.selectCategoryHandler('Organization')}
          >
            Organizations
          </button>
        </NavWrapper>
        <FilterNameWrapper>
          <div>
            <span>Filter name<label style={{color: 'red'}}>*</label></span>
            <input type="text" placeholder='E.g.: Singapore CEO' />
          </div>
          <div>
            <span>Description</span>
            <input type="text" placeholder='Add description for your reference' />
          </div>
        </FilterNameWrapper>
        <div style={{'width':'100%',backgroundColor:'#fff', padding: '0px 15px'}}>
          <div className="react-tags-wrapper">
            <i
              className="material-icons search-icon"
              style={{
               marginTop:'11px',

                zIndex: '1',
                paddingLeft: '13px',
                color: 'rgba(51,51,51,0.85)',
              }}
            >
              search
            </i>
            <ReactTags
              allowNew
              tags={keywords}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleInputChange={this.handleInputChange}
              autofocus
              placeholder={placeholder}
              suggestions={this.getSuggestions()}
              maxSuggestionsLength={this.getSuggestions().length}
              tagComponent={TagComponent}
            />
          </div>
      {/*
        <div className="saved">
          <SaveFilter
            savedSearches={savedSearches}
            updateSavedSearchParams={updateSavedSearchParams}
            category={category}
            createSavedSearch={createSavedSearch}
            searchParams={searchParams}
            keywords={keywords}
            updateSavedSearch={updateSavedSearch}
          />

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
        </div>
      */}
      </div>

        <Advance
      	  keywords={keywords}
      	  category={category}
      	  addKeyword={addKeyword}
      	  clearKeyword={clearKeyword}
      	  removeKeyword={removeKeyword}
      	  aggregations={aggregations}
      	  specialFilter={specialFilter}
      	  searchParams={searchParams}
      	  locations={locations}
      	  locationsHierarchy={locationsHierarchy}
      	  technologies={technologies}
      	  technologiesHierarchy={technologiesHierarchy}
      	  industries={industries}
      	  regions={regions}
      	  activeSpecialFilter={activeSpecialFilter}
      	  setSystemFilter={setSystemFilter}
      	  selectCategory={selectCategory}
      	  lbLists={lbLists}
      	  createlbLists={createlbLists}
      	  addTolbLists={addTolbLists}
      	  filterList={filterList}
      	  seniority={seniority}
      	  popularList={popularList}
      	  deleteList={deleteList}
      	  copyList={copyList}
      	  renameList={renameList}
      	  getlbLists={getlbLists}
      	  campaigns={campaigns}
      	  departments={departments}
      	  updateCampaignParams={updateCampaignParams}
          savedSearches={savedSearches}
          updateSavedSearchParams={updateSavedSearchParams}
          createSavedSearch={createSavedSearch}
          renameSavedSearch={renameSavedSearch}
          deleteSavedSearch={deleteSavedSearch}
          copySavedSearch={copySavedSearch}
          updateSavedSearch={updateSavedSearch}
          fetchTagsSuggestions={fetchTagsSuggestions}
          tagsSuggestions={tagsSuggestions}
          toggleSidebarDisplay={toggleSidebarDisplay}
          showManageListsModal={showManageListsModal}
          listModalVisible={listModalVisible}
          listCreated={listCreated}
          handleListCreated={handleListCreated}
          updateSearchParams={updateSearchParams}
          {...this.props}
        />
      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  addKeyword: PropTypes.func,
  keywords: PropTypes.array,
  removeKeyword: PropTypes.func,
  clearKeyword: PropTypes.func,
  updateCampaignParams: PropTypes.func,
  category: PropTypes.string,
  activeSpecialFilter: PropTypes.string,
  searchParams: PropTypes.object,
  aggregations: PropTypes.object,
  specialFilter: PropTypes.func,
  suggestions: PropTypes.array,
  locations: PropTypes.array,
  locationsHierarchy: PropTypes.array,
  regions: PropTypes.array,
  industries: PropTypes.array,
  fetchSearchSuggestions: PropTypes.func,
  setSystemFilter: PropTypes.func,
  selectCategory: PropTypes.func,
  createlbLists: PropTypes.func,
  addTolbLists: PropTypes.func,
  filterList: PropTypes.func,
  lbLists: PropTypes.array,
  seniority: PropTypes.array,
  popularList: PropTypes.array,
  getlbLists: PropTypes.func,
  deleteList: PropTypes.func,
  copyList: PropTypes.func,
  renameList: PropTypes.func,
  campaigns: PropTypes.array,
  technologies: PropTypes.array,
  technologiesHierarchy: PropTypes.array,
  departments: PropTypes.array,
  savedSearches: PropTypes.array,
  updateSavedSearchParams: PropTypes.func,
  createSavedSearch: PropTypes.func,
  renameSavedSearch: PropTypes.func,
  deleteSavedSearch: PropTypes.func,
  copySavedSearch: PropTypes.func,
  updateSavedSearch: PropTypes.func,
  fetchTagsSuggestions: PropTypes.func,
  toggleSidebarDisplay: PropTypes.func,
};

export default Search;
