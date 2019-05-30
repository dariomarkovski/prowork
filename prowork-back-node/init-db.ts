import Sequelize from './src/models/index';
import 'sequelize'

(async () => {
    await Sequelize.sync({
        force: true
    });
    process.exit();
})();
