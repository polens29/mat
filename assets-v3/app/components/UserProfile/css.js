import styled from 'styled-components';
import { Button } from "antd";


export const Wrapper = styled.div`
display: inline-block;

.keep-your-data-safe {
  color: #444444;
  font-family: "PingFang SC";
  font-size: 16px;
  font-weight: 500;	
  line-height: 24px;
  text-align: center;
}
`;

export const Title = styled.div`
  color: rgba(74,74,74,0.76);
  font-family: "PingFang SC";
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
`;

export const BusinessTitle = styled.div`
  color: rgba(74,74,74,0.76);
  font-family: "PingFang SC";
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
`;

export const Content = styled.div`
  font-family: "PingFang SC";
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledButton = styled(Button)`
  border-radius: 2px !important;
  height: 35px;
`;

export const BusinessFieldInfo = styled.div`
  text-align: left;
  font-size: 11px;
  margin-bottom: 5px;
`;

export const FieldInfo = styled.div`
  color: red;
  text-align: left;
  font-size: 11px;
`;
