import styled from 'styled-components';

export const MapWrapper = styled.div`
	padding: 30px;

	.right {
		width: 85px;
    height: 30px;
    background-color: rgba(213,219,219,0.25);
    border: 1px solid #D5DBDB;
    border-radius: 2px;
    text-align: center;
    padding: 5px;
    cursor: pointer;

    i {
    	font-size: 18px;
    	vertical-align: bottom;
    }
	}

	.map {
		margin-top: 10px;
		width: fit-content;
		margin: auto;
	}
`;