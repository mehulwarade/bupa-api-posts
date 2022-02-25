import React from 'react';

import styled from 'styled-components';

/* CSS in JS Style */
const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #763626;
  font-family:Monospace
`;

const Wrapper = styled.section`
  padding: 2em;
  background: #90AFc5;
`;


export const Header = (props) => {
	const { text, testTag } = props;

	return (
		<>
			<Wrapper>
				<Title testTag={testTag}>
					{text}
				</Title>
			</Wrapper>
		</>
	)
}
