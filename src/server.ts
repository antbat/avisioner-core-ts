import { getApp } from './app';
import { config } from './utils/IConfig';

(async () => {
    const application = await getApp();
    await application.listen(config.port);
})();
