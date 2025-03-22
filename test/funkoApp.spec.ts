import { describe, test, expect } from 'vitest';
import chalk from 'chalk';
import { Funko } from '../src/funkoElements.js';
import { printFunko } from '../src/funkoApp.js';

describe('getFormattedFunko', () => {
  test('should return a formatted string with green value (>100€)', () => {
    const funko = new Funko(1, 'Goku', 'Super Saiyan', 'Pop!', 'Ánime', 'Dragon Ball', 9, true, 'Aura dorada', 150);
    const output = printFunko(funko);
    expect(output).toContain(chalk.green('150€'));
    expect(output).toContain('Goku');
    expect(output).toContain('Dragon Ball');
  });

  test('should return a formatted string with yellow value (51€-100€)', () => {
    const funko = new Funko(2, 'Iron Man', 'Armadura clásica', 'Pop!', 'Películas y TV', 'Marvel', 45, false, 'Brilla', 75);
    const output = printFunko(funko);
    expect(output).toContain(chalk.yellow('75€'));
    expect(output).toContain('Iron Man');
  });

  test('should return a formatted string with blue value (21€-50€)', () => {
    const funko = new Funko(3, 'Luigi', 'El hermano de Mario', 'Pop!', 'Videojuegos', 'Nintendo', 12, false, 'Sombrero verde', 40);
    const output = printFunko(funko);
    expect(output).toContain(chalk.blue('40€'));
    expect(output).toContain('Luigi');
  });

  test('should return a formatted string with red value (<=20€)', () => {
    const funko = new Funko(4, 'Minion', '¡Banana!', 'Pop!', 'Animación', 'Gru', 7, false, 'Gafas', 10);
    const output = printFunko(funko);
    expect(output).toContain(chalk.red('10€'));
    expect(output).toContain('Minion');
  });
});
