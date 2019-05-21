import { injectGlobal } from 'react-emotion';
import normalize from './normalize';
import globals from './globals';
import details from './details'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${normalize}
  ${globals}
  ${details}
`;