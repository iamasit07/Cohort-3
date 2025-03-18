import chalk from 'chalk';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Command } = require('commander');
const program = new Command();
const fs = require('fs');

// Read the JSON file
const todoList = fs.readFileSync("./todos.json", 'utf8');
const todoListParsed = JSON.parse(todoList);

program
    .name("CLI - TODO List")
    .version('1.0.0')
    .description('A CLI to manage your TODO list');

program.command('add <task>')
    .description("Add a new task")
    .action((task) => {
        todoListParsed.user.push({ task: task, done: false });
        fs.writeFileSync('todos.json', JSON.stringify(todoListParsed, null, 2)); // Write to todos.json
        console.log(chalk.green('Task added successfully!'));
    });

program.command('list')
    .description("List all tasks")
    .action(() => {
        console.log(chalk.yellow('Tasks:'));
        todoListParsed.user.forEach((task, index) => {
            console.log(`${index + 1}. ${task.task} - ${task.done ? chalk.green('done') : chalk.red('Not done')}`);
        });
    });

program.command('done <task>')
    .description("Mark task as done")
    .action((task) => {
        const index = parseInt(task) - 1;
        if (index >= 0 && index < todoListParsed.user.length) {
            todoListParsed.user[index].done = true;
            fs.writeFileSync('todos.json', JSON.stringify(todoListParsed, null, 2)); // Write to todos.json
            console.log(chalk.green('Task marked as done!'));
        } else {
            console.log(chalk.red('Invalid task index!'));
        }
    });

program.command('remove <task>')
    .description("Remove task")
    .action((task) => {
        const index = parseInt(task) - 1;
        if (index >= 0 && index < todoListParsed.user.length) {
            todoListParsed.user.splice(index, 1);
            fs.writeFileSync('todos.json', JSON.stringify(todoListParsed, null, 2)); // Write to todos.json
            console.log(chalk.green('Task removed successfully!'));
        } else {
            console.log(chalk.red('Invalid task index!'));
        }
    });

program.command('clear')
    .description("Clear all tasks")
    .action(() => {
        todoListParsed.user = [];
        fs.writeFileSync('todos.json', JSON.stringify(todoListParsed, null, 2)); // Write to todos.json
        console.log(chalk.green('All tasks cleared!'));
    });

program.command('edit <oldTask> <newTask>')
    .description("Edit task")
    .action((oldTask, newTask) => {
        const index = parseInt(oldTask) - 1;
        if (index >= 0 && index < todoListParsed.user.length) {
            todoListParsed.user[index].task = newTask;
            fs.writeFileSync('todos.json', JSON.stringify(todoListParsed, null, 2)); // Write to todos.json
            console.log(chalk.green('Task edited successfully!'));
        } else {
            console.log(chalk.red('Invalid task index!'));
        }
    });

program.parse(process.argv);



program.command('add <task>')
    .description("Add a new task")
    .action((task) => {
        todoListParsed.user.push({ task: task, done: false });
        fs.writeFileSync('todos.json', JSON.stringify(todoListParsed, null, 2)); // Write to todos.json
        console.log(chalk.green('Task added successfully!'));
    });


program.command('add')
    .description("Add a new task")
    .argument('<task>', 'Task to add')
    .action((task) => {
        todoListParsed.user.push({ task: task, done: false });
        fs.writeFileSync('todos.json', JSON.stringify(todoListParsed, null, 2)); // Write to todos.json
        console.log(chalk.green('Task added successfully!'));
    });