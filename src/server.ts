import { getApp } from './app';
import { config } from './utils/Config';

(async () => {
    const application = await getApp();
    const port = (process.env.PORT && parseInt(process.env.PORT, 10)) || config.port
    await application.listen(port)
})();
