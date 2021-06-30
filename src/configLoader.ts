import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yamlLoader from 'js-yaml';
import chalk from 'chalk';

interface ColorConfig {
  primaryColor?: string;
  errorColor?: string;
  secondaryColor?: string;
}

export const config = {
  primaryColor: '#2ed573',
  errorColor: '#ff4757',
  secondaryColor: '#576574'
}

function replaceConfig(conf1: ColorConfig, conf2: ColorConfig) {
  if (conf1.primaryColor) {
    conf2.primaryColor = conf1.primaryColor;
  }
  if (conf1.errorColor) {
    conf2.errorColor = conf1.errorColor;
  }
  if (conf1.secondaryColor) {
    conf2.secondaryColor = conf1.secondaryColor;
  }

}

export const loadConfig = () => {
  const homedir = os.homedir();
  const configPath = '.strestConfig.yml';
  const p = path.join(homedir, configPath);

  if(fs.existsSync(p)) {
    if(fs.statSync(p).isFile()) {
      try {
        const parsed = yamlLoader.safeLoad(fs.readFileSync(p, 'utf8'));
        if (typeof parsed == 'object' && 'config' in parsed) {
          // @ts-ignore
          replaceConfig(parsed.config, config)
        }
      } catch(e) {
        console.log(chalk.red('Config bad formatted \n'))
      }
    }
  }

}