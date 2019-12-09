import styled from 'styled-components';
import {
    Button
  } from 'antd';

export const Wrapper = styled.div`
display: inline-block;

`;

export const WrapperAddUser = styled.div`
padding: 20px;
text-align: right;
margin-bottom: 15px;
`;

export const WrapperContent = styled.div`
padding: 20px 5px 20px 5px;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px !important;
  width: 140px !important;
`;

export const ActivatedButton = styled(Button)`
  border-radius: 4px !important;
  border: 0.25px solid #979797;
  width: 140px !important;
  background-color: #E3E3E3;
`;

export const DeactivatedButton = styled(Button)`
border-radius: 4px !important;
border: 0.25px solid #979797;
width: 140px !important;
background-color: #F5F5F5;
`;

export const Title = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

export const FieldInfo = styled.div`
  color: red;
  text-align: left;
  font-size: 11px;
`;