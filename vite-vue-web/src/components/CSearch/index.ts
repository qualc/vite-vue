export type { ISearchConfig } from './type';
export { ISearchType } from './type';

import { withInstall } from '@/utils/business';
import CSearch from './src/index';

export default withInstall(CSearch);
