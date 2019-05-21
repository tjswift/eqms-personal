import styled from '../../utils/styled'
import theme from '../../styles/theme'

const Container = styled('div')`
  margin: 0 auto;
  width: 100%;
  max-width: ${theme.widths.md};
  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: ${theme.widths.lg};
  }
  @media (min-width: ${theme.breakpoints.xl}) {
    max-width: ${theme.widths.xl};
  }
`;

export default Container