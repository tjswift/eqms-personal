import styled from '../../utils/styled'
import theme from '../../styles/theme'
import { transparentize } from 'polished'

const LoadingOverlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: ${transparentize(0.25, theme.colors.background)};
`

export default LoadingOverlay