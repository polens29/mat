/**
 *
 * Help
 *
 */

/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { PropTypes } from 'react';

import { HelpWrapper } from './css';
import Book from 'assets/icons/book.png';

class Help extends React.Component {
  constructor(props) {
    super(props);
  }

  openHelp = () => {
    this.props.toggleSidebarDisplay('helpFromBtn');
  };

  render() {
    return (
      <HelpWrapper>
        <a className="how-it-works" onClick={this.openHelp}>
          <img src={Book} style={{'verticalAlign':'text-top', 'marginRight':'5px'}} />
          How it works
        </a>
      </HelpWrapper>
    );
  }
}

Help.propTypes = {
  toggleSidebarDisplay: PropTypes.func,
};

export default Help;
