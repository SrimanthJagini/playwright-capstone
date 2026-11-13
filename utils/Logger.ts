export class Logger {
  private static write(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    const timestamp = new Date().toISOString();
    const output = `[${timestamp}] [${level}] ${message}`;

    if (level === 'ERROR') {
      console.error(output);
    } else if (level === 'WARN') {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  static info(message: string): void {
    this.write('INFO', message);
  }

  static warn(message: string): void {
    this.write('WARN', message);
  }

  static error(message: string): void {
    this.write('ERROR', message);
  }
}
