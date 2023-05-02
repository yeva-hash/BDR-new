const fs = require('fs');
const { threadId } = require('worker_threads');
const ApiError = require('../error/ApiError');

function createFileIfNotExist(configFolderPath, configPath, defaultConfig) {
    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(configFolderPath);
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
        console.log(`File ${configPath} was successfully created`);
    }
}

class PreferencesController {
    constructor() {
        this.changeLimit = this.changeLimit.bind(this);
        this.getLimit = this.getLimit.bind(this);

        this._configFolderPath = '../../preferences'
        this._configPath = '../../preferences/preferences.json';
        this._defaultConfig = {
            limit: 5,
        }
    }

    async changeLimit(req, res) {
        try {
            const {newLimit} = req.body;
            
            createFileIfNotExist(this._configFolderPath, this._configPath, this._defaultConfig);
            
            const config = JSON.parse(fs.readFileSync(this._configPath));
            config.limit = Number(newLimit);
    
            fs.writeFileSync(this._configPath, JSON.stringify(config));
            console.log(`File ${this._configPath} was successfully updated`);

            return res.json(newLimit);
        } catch (error) {
            var a = null;//TODO
        }

    }

    async getLimit(req, res) {
        try {
            createFileIfNotExist(this._configFolderPath, this._configPath, this._defaultConfig);
            const config = JSON.parse(fs.readFileSync(this._configPath));
            if (config.limit) {
                return res.json(config.limit);
            }
            console.error('error');//TODO
        } catch (error) {
            var a = null;//TODO
        }
    }
}

module.exports = new PreferencesController();