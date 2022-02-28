import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
	background-color: ${props => props.background || "darkblue"} ;
	color: black;
	font-size: 20px;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid black;
	border-radius: 3px;
	width: 10%;
	height: 2em;
	font-family: Courier;
	width: fit-content;

&:hover {
    background-color: #bbb;
}
`;

export const Button = (props) => {

	const { onClick, text, backgroundColor, testTag } = props;

	return (
		<>
			<Btn onClick={onClick} background={backgroundColor} testTag={testTag} >{text}</Btn>
		</>
	);
}
