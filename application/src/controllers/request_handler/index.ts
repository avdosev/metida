import * as Articles from './article';
import * as Comments from './comments';
import * as Users from './user';

export default { ...Articles, ...Comments, ...Users };
