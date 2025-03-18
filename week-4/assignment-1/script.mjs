import chalk from 'chalk';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Command } = require('commander');
const program = new Command();
const fs = require('fs');

const userPath = program.opts()

program
    .name('word-count')
    .description('CLI based word count tool')
    .version('1.0.0');

program.command('count')
    .description('Count the number of words in a file')
    .argument('<file>', 'file to count the number of words')
    .action((file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(chalk.red(err));
                return;
            }
            const words = data.split(' ');
            console.log(chalk.blue(`There are ${words.length} words in the file`));
        });
    });

program.parse(process.argv);