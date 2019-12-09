/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types, consistent-return */
/* eslint-disable no-undef, func-names */
import React from 'react';
import { Button, Tooltip } from 'antd';
import InstagramIcon from 'assets/svg/InstagramIcon';

export const filterHierarchy = ({ items, query }) =>
  items.map((item) => {
    let hide = true;
    let newItem = { ...item };
    if (item.children) {
      const children = filterHierarchy({ items: item.children, query });
      const matchedChildren = children.filter((child) => !child.hide);
      if (matchedChildren.length > 0) {
        hide = false;
      }
      newItem = { ...newItem, children };
    }
    if (isMatch(item.title, query)) {
      hide = false;
    }
    return { ...newItem, hide };
  });

export const isMatch = (name, query) => {
  const words = name.toLowerCase().split(' ');
  for (let i = 0; i < words.length; i += 1) {
    const completionWord = words.slice(i).join(' ');
    if (completionWord.startsWith(query.toLowerCase())) {
      return true;
    }
  }
  return false;
};

export function abbreviateNumber(num, fixedValue) {
  if (num === null) {
    return null;
  }
  if (num === 0) {
    return '0';
  }
  const fixed = !fixedValue || fixedValue < 0 ? 0 : fixedValue;
  const b = num.toPrecision(2).split('e');
  const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3);
  const c =
    k < 1 ? num.toFixed(0 + fixed) : num / (10 ** (k * 3)).toFixed(1 + fixed);
  const d = c < 0 ? c : Math.abs(c).toFixed(); // added to fixed to avoid decimals
  const e = d + ['', 'K', 'M', 'B', 'T'][k];
  return e;
}

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function displayRange(
  range,
  handleAddition,
  getKeywordFormat,
  fromHomepage
) {
  let display = '-';
  if (range && (!range.min && !range.max)) {
    display = '-';
  } else if (range && ((range.min && !range.max) || range.min === range.max)) {
    display = `${range.min}+`;
  } else if (range && Number.isInteger(range.min) && range.max) {
    display = `${Number.isInteger(range.min) ? range.min : 1}-${range.max}`;
  }

  if (!fromHomepage || display === '-') {
    return <span>{display}</span>;
  }

  return (
    <a
      onClick={() =>
        handleAddition(
          getKeywordFormat(
            { name: display, code: range.code },
            'employee_size',
            'code',
            'name'
          )
        )
      }
    >
      {display.toLocaleString(undefined, { maximumFractionDigits: 0 })}
    </a>
  );
}

const socialIconClass = {
  facebook: 'fa-facebook-square',
  linkedin: 'fa-linkedin-square',
  google_plus: 'fa-google-plus-square',
  pinterest: 'fa-pinterest-square',
  instagram: 'fa-instagram',
  twitter: 'fa-twitter-square',
  youtube: 'fa-youtube-play',
  google_business: 'fa-google-wallet',
  wikipedia: 'fa-wikipedia-w',
};

export const getSocialIcons = (social, unlocked, socialClass) => {
  let unlockedClass = '';
  let hrefTarget = '_blank';
  let height = '15';
  let instagramUnlockedClass = '';

  if (!unlocked) {
    unlockedClass = 'disable-icons';
    hrefTarget = '_self';
    instagramUnlockedClass = 'instagram-disabled';
  }

  if (socialClass === 'inline') {
    height = '12.5';
  }

  if (social) {
    const socialKeys = Object.keys(social);
    return (
      <div className={`social-icon-list ${socialClass}`}>
        {socialKeys.map((socialKey) => <a
          className="margin-right-5"
          target={hrefTarget}
          href={social[socialKey]}
        >
          {
            (socialIconClass[socialKey] === 'fa-instagram'
              ? <InstagramIcon height={height} className={`icon-instagram ${instagramUnlockedClass}`} /> :
              <i
                className={`fa ${socialIconClass[socialKey]} ${unlockedClass}`}
                aria-hidden="true"
              />
            )
          }
        </a>)}
      </div>
    );
  }
  return '';
};

export const toLocaleValue = (value) =>
  parseInt(value, 10).toLocaleString(undefined, { maximumFractionDigits: 0 });
export const getPageRangeStart = (page, pageSize) =>
  page === 1 ? 1 : toLocaleValue((page - 1) * pageSize + 1);
export const getPageRangeEnd = (page, pageSize, total) =>
  page * pageSize < total
    ? toLocaleValue(page * pageSize)
    : toLocaleValue(total);
export const pageRangeDisplay = (total, pageRangeStart, pageRangeEnd) =>
  total < 1
    ? 0
    : `${pageRangeStart} - ${pageRangeEnd} of ${toLocaleValue(total)}`;

export const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === '[object SafariRemoteNotification]';
  }(
    !window.safari || (typeof safari !== 'undefined' && safari.pushNotification)
  ));

export const defaultContactColumns = [
  'locations',
  'email',
  'phone_numbers',
  'organization',
  'industry'
];

export const defaultCompanyColumns = [
  'description',
  'locations',
  'emails',
  'website',
  'social',
  'total_contacts',
  'industry',
  'secondary_industry',
  'employees',
  'founded',
  'phone_numbers',
  'tags',
  'technologies',
];

export function renderActionBtn({ title, disableBtn, callback, iconType }) {
  return (
    <Tooltip placement="topLeft" title={title} key={iconType}>
      <Button disabled={disableBtn} onClick={callback}>
        <i className="material-icons">{iconType}</i>
      </Button>
    </Tooltip>
  );
}

export function determineBrowser(){
  var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
      browser;
  if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
    browser = "msie";
  }
  else {
    browser = ua[1].toLowerCase();
  }

  return browser;
}

export function renderActionBtnDatabase({ title, disableBtn, callback, iconType }) {
  return (
    <Tooltip placement="topLeft" title={title} key={iconType}>
      <Button disabled={disableBtn} onClick={callback}>
        <i className="material-icons">{iconType}</i>
        {/*<span>{title}</span>*/}
      </Button>
    </Tooltip>
  );
}
