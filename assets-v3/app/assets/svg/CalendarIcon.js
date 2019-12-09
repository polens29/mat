import React from 'react';
import PropTypes from 'prop-types';

const CalendarIcon = ({ bgColor, width, height }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 103 88">
        <title>Group</title>
        <desc>Created with Sketch.</desc>
        <g id="Billing" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-816.000000, -208.000000)" id="Group">
                <g transform="translate(816.000000, 209.000000)">
                    <rect id="Rectangle" fill="#EDEDED" x="0" y="21" width="103" height="66" rx="5"></rect>
                    <rect id="Rectangle" fill="#214B6C" x="0" y="6" width="103" height="20"></rect>
                    <path d="M27,0.5 L27,12" id="Line-4" stroke="#D7D7D7" stroke-width="2" stroke-linecap="square"></path>
                    <path d="M78,0.5 L78,12" id="Line-4" stroke="#D7D7D7" stroke-width="2" stroke-linecap="square"></path>
                </g>
            </g>
        </g>
    </svg>
);

CalendarIcon.defaultProps = {
    bgColor: '',
    width: '103',
    height: '88',
};

CalendarIcon.propTypes = {
    bgColor: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default CalendarIcon;
