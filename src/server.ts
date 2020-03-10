import { getApp } from './app';
import { config } from './utils/Config';

(async () => {
    const application = await getApp();
    await application.listen(config.port);
})();
