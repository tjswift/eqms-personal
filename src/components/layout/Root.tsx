import * as React from 'react'
import styled from '../../utils/styled'
import theme from '../../styles/theme'

interface RootProps {
  className?: string
}

const Root: React.SFC<RootProps> = ({ children }) => <Wrapper>{children}</Wrapper>

export default Root

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.body};
  font-family: ${theme.fonts.body};
`