const chalk = require('chalk');

class Logger {
  constructor() {
    this.levels = {
      ERROR: 0,
      WARN: 1, 
      INFO: 2,
      DEBUG: 3
    };
    this.currentLevel = this.levels.INFO;
  }
  
  setLevel(level) {
    if (typeof level === 'string') {
      this.currentLevel = this.levels[level.toUpperCase()] || this.levels.INFO;
    } else {
      this.currentLevel = level;
    }
  }
  
  error(message, ...args) {
    if (this.currentLevel >= this.levels.ERROR) {
      console.error(chalk.red('❌ ERROR:'), message, ...args);
    }
  }
  
  warn(message, ...args) {
    if (this.currentLevel >= this.levels.WARN) {
      console.warn(chalk.yellow('⚠️  WARN:'), message, ...args);
    }
  }
  
  info(message, ...args) {
    if (this.currentLevel >= this.levels.INFO) {
      console.log(chalk.blue('ℹ️  INFO:'), message, ...args);
    }
  }
  
  success(message, ...args) {
    if (this.currentLevel >= this.levels.INFO) {
      console.log(chalk.green('✅ SUCCESS:'), message, ...args);
    }
  }
  
  debug(message, ...args) {
    if (this.currentLevel >= this.levels.DEBUG) {
      console.log(chalk.gray('🔍 DEBUG:'), message, ...args);
    }
  }
  
  table(data, title) {
    if (this.currentLevel >= this.levels.INFO) {
      if (title) {
        console.log(chalk.bold.underline(title));
      }
      console.table(data);
    }
  }
  
  separator(char = '─', length = 50) {
    if (this.currentLevel >= this.levels.INFO) {
      console.log(chalk.gray(char.repeat(length)));
    }
  }
  
  json(data, label = 'JSON Output') {
    if (this.currentLevel >= this.levels.INFO) {
      console.log(chalk.bold(label + ':'));
      console.log(JSON.stringify(data, null, 2));
    }
  }
  
  progress(current, total, message = '') {
    if (this.currentLevel >= this.levels.INFO) {
      const percentage = Math.round((current / total) * 100);
      const progressBar = this.createProgressBar(percentage);
      process.stdout.write(`\r${progressBar} ${percentage}% ${message}`);
      
      if (current === total) {
        console.log(); // New line when complete
      }
    }
  }
  
  createProgressBar(percentage, width = 20) {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;
    return chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
  }
  
  banner(text, style = 'info') {
    const colors = {
      info: chalk.blue,
      success: chalk.green,
      warn: chalk.yellow,
      error: chalk.red
    };
    
    const color = colors[style] || chalk.blue;
    const border = '═'.repeat(text.length + 4);
    
    console.log(color(border));
    console.log(color(`║ ${text} ║`));
    console.log(color(border));
  }
  
  step(stepNumber, totalSteps, message) {
    if (this.currentLevel >= this.levels.INFO) {
      const prefix = chalk.cyan(`[${stepNumber}/${totalSteps}]`);
      console.log(`${prefix} ${message}`);
    }
  }
  
  timing(label, fn) {
    const start = Date.now();
    this.debug(`Starting: ${label}`);
    
    const result = fn();
    
    if (result && typeof result.then === 'function') {
      // Handle async functions
      return result.then(res => {
        const duration = Date.now() - start;
        this.debug(`Completed: ${label} (${duration}ms)`);
        return res;
      }).catch(err => {
        const duration = Date.now() - start;
        this.debug(`Failed: ${label} (${duration}ms)`);
        throw err;
      });
    } else {
      // Handle sync functions
      const duration = Date.now() - start;
      this.debug(`Completed: ${label} (${duration}ms)`);
      return result;
    }
  }
}

// Create a singleton instance
const logger = new Logger();

module.exports = logger;
