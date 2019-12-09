import styled from 'styled-components';

const blueButtonColor = '#1890FF';
const greenButtonColor = '#04BE24';

export const Wrapper = styled.div`
  .ant-row,
  .integration-picker {
    margin-right: 0px !important;
    padding-right: 0px !important;
  }
`;

export const StyledList1 = styled.div`
  background-color: ${(props) =>
    props.name === props.chosenIntegration && '#2876BF;'};
  color: ${(props) => props.name === props.chosenIntegration && '#FFFFFF;'};
  border-bottom: 1px solid #ececec;
  cursor: pointer;
  padding: 10px 5px 10px 15px;

  &:hover {
    background-color: #40a9ff;
  }
`;

export const StyledList = styled.div`
	display: inline !important;
	width: 100%;

	.ant-col-8 {
		display: grid;
		cursor: pointer;

    .disconnect {
      text-align: center;
      width: 120px;
      margin: auto;
      position: absolute;
      bottom: -28px;
      padding: 3px;
      left: 0;
      right: 0;
      box-shadow: 1px 0px 15px #808080a6;  
      z-index: 1;
    }
    
	}

	.image-box {
		height: 100px;
		width: 100%;
    margin-bottom: 45px;

		img {
			width: 112px;
			position: absolute;
	    right: 0;
	    left: 0;
	    top: 0;
	    bottom: 0;
	    margin: auto;
		}
	}
`;

export const IntegrationButton = styled.button`
  width: 120px;
  background-color: ${props => props.green ? greenButtonColor : blueButtonColor};
  color: white;
  padding: 3px;
  margin: auto;
  font-weight: 500;
  border-radius: 5px !important;

  i {
    font-size: 8px;
    margin-left: 5px;
    vertical-align: middle;
  }
`;

export const IntegrationWrapper = styled.div`
  padding: 0px 15px;

  i {
  	font-size: 20px;
  	cursor: pointer;
  }

  .box-div {
    margin: auto;
  	margin-top: 60px;
  	display: grid;
  	width: 52%;
    text-align: center;
  }

  .login-span {
  	margin-top: 10px;
  }

  .divider {
  	border-top: 1px solid #F2F2F2;
    text-align: center;
    margin: auto;
    margin-bottom: 20px;

    label {
    	position: absolute;
    	margin: auto;
	    margin-top: -10px;
	    background-color: white;
	    left: 0;
	    right: 0;
	    width: fit-content;
	    color: #C4C4C4;
    }
  }

  img {
  	width: 150px;
  	margin: auto;
  }

  a {
		width: 120px;
    background-color: #1890FF;
    color: white;
    border: 1px solid #1890FF;
    margin: auto;
    font-weight: 600;
    height: 40px;
    text-align: center;
    padding: 7px;
    margin-top: 40px;
	}

  button {
    width: 120px;
    height: 40px !important;
    background-color: #1890FF;
    color: white;
    border: 1px solid #1890FF;
    margin: auto;
    font-weight: 600;
    border-radius: 5px;
    text-align: center;
    padding: 7px;
    margin-left: 10px;
  }
`;