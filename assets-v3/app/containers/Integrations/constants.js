/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import { Spin } from 'antd';

export const INTEGRATIONS_MODAL_TOGGLE =
  'app/Integrations/INTEGRATIONS_MODAL_TOGGLE';
export const GET_INTEGRATION_STATUS = 'app/Integrations/GET_INTEGRATION_STATUS';
export const UPDATE_INTEGRATION_STATUS =
  'app/Integrations/UPDATE_INTEGRATION_STATUS';
  export const GET_ALL_INTEGRATION_STATUS = 'app/Integrations/GET_ALL_INTEGRATION_STATUS';
export const UPDATE_ALL_INTEGRATION_STATUS =
  'app/Integrations/UPDATE_ALL_INTEGRATION_STATUS';
export const SET_INTEGRATION_OBJECT = 'app/Integrations/SET_INTEGRATION_OBJECT';
export const SET_INTEGRATION_FORMAT = 'app/Integrations/SET_INTEGRATION_FORMAT';
export const UPDATE_INTEGRATIONS_OBJECT =
  'app/Integrations/UPDATE_INTEGRATIONS_OBJECT';
export const SAVE_INTEGRATIONS_MAPPING =
  'app/Integrations/SAVE_INTEGRATIONS_MAPPING';
export const AUTH_INTEGRATION = 'app/Integrations/AUTH_INTEGRATION';

export const IntegrationHeader = styled.div`
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 10px;
`;

export const IntegrationHeaderInfo = styled.div`
  color: #838383;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 15px;
`;

export const Loader = styled.div`
  text-align: center;
  border-radius: 4px;
  padding: 40px 0px;
  margin: 40px 0;
`;

export const IntegrationLoader = () => (
  <Loader>
    <Spin size="large" />
  </Loader>
);

export const tabPanes = [
  {
    tab: 'Contact',
    key: 'contact',
  },
  {
    tab: 'Organization',
    key: 'company',
  },
];
