import chalk, { Chalk } from 'chalk';

export enum Level {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const levelToChalkColorMap: {
  [key in Level]: Chalk;
} = {
  [Level.SUCCESS]: chalk.green,
  [Level.INFO]: chalk.blue,
  [Level.WARN]: chalk.yellow,
  [Level.ERROR]: chalk.red,
};
export const log = (message: string, level: Level) => {
  console.log(levelToChalkColorMap[level](message));
};
