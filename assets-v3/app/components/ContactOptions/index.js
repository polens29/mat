/**
 *
 * ContactOptions
 *
 */

import React, { PropTypes } from 'react';
import Pages from 'components/TableComponents/Pages';
import PageActions from 'components/TableComponents/PageActions';

import { Wrapper } from './css';

// eslint-disable-next-line react/prefer-stateless-function
class ContactOptions extends React.Component {
  render() {
    const {
      keywords,
      total,
      updateSearchParams,
      searchParams,
      reportContacts,
      loading,
      category,
      selectedRows,
      unlockContacts,
      deleteContacts,
      selectAllLeads,
      exportToCsvCount,
      csvUrl,
      credits,
      setColumns,
      displayColumns,
      exportData,
      lbLists,
      creditCost,
      showInfoModal,
      suppressAllCompanyContacts,
      showManageListsModal
    } = this.props;
    // returns keywords base on the category selected
    const activeKeyword = keywords.filter(
      (keyword) => keyword.category === category
    );
    return (
      <Wrapper keywords={activeKeyword}>
        {/* <PageActions
          credentials={this.props.credentials}
          unlockContacts={unlockContacts}
          category={category}
          selectedRows={selectedRows}
          searchParams={searchParams}
          reportContacts={reportContacts}
          deleteContacts={deleteContacts}
          exportData={exportData}
          total={total}
          selectAllLeads={selectAllLeads}
          getExportToCsvCount={this.props.getExportToCsvCount}
          activeSpecialFilter={this.props.activeSpecialFilter}
          exportToCsvCount={exportToCsvCount}
          csvUrl={csvUrl}
          credits={credits}
          lbLists={lbLists}
          createlbLists={this.props.createlbLists}
          addTolbLists={this.props.addTolbLists}
          removeFromlbLists={this.props.removeFromlbLists}
          filterList={this.props.filterList}
          isListSelected={this.props.isListSelected}
          keywords={this.props.keywords}
          getCreditCost={this.props.getCreditCost}
          creditCost={creditCost}
          showInfoModal={showInfoModal}
          handleHideListDropDown={this.props.handleHideListDropDown}
          handleShowListDropDown={this.props.handleShowListDropDown}
          visibleSize={this.props.visibleSize}
          suppressCompanyContacts={this.props.suppressCompanyContacts}
          suppressAllCompanyContacts={suppressAllCompanyContacts}
          showManageListsModal={showManageListsModal}
          {...this.props}
        />
        <Pages
          total={total}
          updateSearchParams={updateSearchParams}
          searchParams={searchParams}
          loading={loading}
          category={category}
          setColumnDisplay={setColumns}
          displayColumns={displayColumns}
          keywords={this.props.keywords}
          addKeyword={this.props.addKeyword}
          removeKeyword={this.props.removeKeyword}
          clearKeyword={this.props.clearKeyword}
          specialFilter={this.props.specialFilter}
          activeSpecialFilter={this.props.activeSpecialFilter}
          setSystemFilter={this.props.setSystemFilter}
          userProfile={this.props.userProfile}
        /> */}
      </Wrapper>
    );
  }
}

ContactOptions.propTypes = {
  credentials: PropTypes.object,
  updateSearchParams: PropTypes.func,
  unlockContacts: PropTypes.func,
  reportContacts: PropTypes.func,
  deleteContacts: PropTypes.func,
  getExportToCsvCount: PropTypes.func,
  exportData: PropTypes.func,
  setColumns: PropTypes.func,
  createlbLists: PropTypes.func,
  addTolbLists: PropTypes.func,
  removeFromlbLists: PropTypes.func,
  filterList: PropTypes.func,
  searchParams: PropTypes.object,
  keywords: PropTypes.array,
  selectedRows: PropTypes.array,
  lbLists: PropTypes.array,
  total: PropTypes.number,
  exportToCsvCount: PropTypes.number,
  credits: PropTypes.number,
  creditCost: PropTypes.number,
  loading: PropTypes.bool,
  selectAllLeads: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool,
  ]),
  category: PropTypes.string,
  csvUrl: PropTypes.string,
  displayColumns: PropTypes.object,
  activeSpecialFilter: PropTypes.string,
  specialFilter: PropTypes.func,
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  clearKeyword: PropTypes.func,
  setSystemFilter: PropTypes.func,
  isListSelected: PropTypes.bool,
  getCreditCost: PropTypes.func,
  showInfoModal: PropTypes.func,
  handleHideListDropDown: PropTypes.func,
  handleShowListDropDown: PropTypes.func,
  visibleSize: PropTypes.bool,
  suppressCompanyContacts: PropTypes.func,
  suppressAllCompanyContacts: PropTypes.bool,
};

export default ContactOptions;
