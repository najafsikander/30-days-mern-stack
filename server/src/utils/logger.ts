import chalk from "chalk";

export const log = (message: string) => console.log(chalk.green(message));
export const info = (message: string) => console.info(chalk.blue(message));
export const warn = (message: string) => console.warn(chalk.yellow(message));
export const error = (message: string) => console.error(chalk.red(message));