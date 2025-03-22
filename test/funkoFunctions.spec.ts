import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { Funko } from '../src/funkoElements.js';
import { FunkoFunctions } from '../src/funkoFunctions.js';

const testUser = 'testuser';
const testPath = `usuarios/${testUser}`;

const sampleFunko = new Funko(1, 'Sonic', 'Fastest', 'Pop!', 'Videojuegos', 'Sonic', 22, true, 'HeadBoing', 100);

describe('FunkoFunctions', () => {
  beforeEach(() => {
    if (fs.existsSync(testPath)) {
      fs.rmSync(testPath, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testPath)) {
      fs.rmSync(testPath, { recursive: true, force: true });
    }
  });

  test('should add a funko correctly', () => {
    const functions = new FunkoFunctions(testUser);
    expect(functions.addFunko(sampleFunko)).toBe(true);
  });

  test('should not add a duplicated funko', () => {
    const functions = new FunkoFunctions(testUser);
    functions.addFunko(sampleFunko);
    expect(functions.addFunko(sampleFunko)).toBe(false);
  });

  test('should get a funko by ID', () => {
    const functions = new FunkoFunctions(testUser);
    functions.addFunko(sampleFunko);
    const retrieved = functions.getFunko(1);
    expect(retrieved?.name).toBe('Sonic');
  });

  test('should update a funko', () => {
    const functions = new FunkoFunctions(testUser);
    functions.addFunko(sampleFunko);
    const updated = new Funko(1, 'Sonic V2', 'Ahora más rápido', 'Pop!', 'Videojuegos', 'Sonic', 22, true, 'Super Brilla', 150);
    expect(functions.updateFunko(updated)).toBe(true);
    expect(functions.getFunko(1)?.name).toBe('Sonic V2');
  });

  test('should not update a funko', () => {
    const functions = new FunkoFunctions(testUser);
    const sampleFunko2 = new Funko(2, 'SonicNOT', 'Fastest', 'Pop!', 'Videojuegos', 'Sonic', 22, true, 'HeadBoing', 100);
    expect(functions.updateFunko(sampleFunko2)).toBe(false);
  });

  test('should remove a funko', () => {
    const functions = new FunkoFunctions(testUser);
    functions.addFunko(sampleFunko);
    expect(functions.removeFunko(1)).toBe(true);
    expect(functions.getFunko(1)).toBeUndefined();
  });

  test('should not remove a funko', () => {
    const functions = new FunkoFunctions(testUser);
    const sampleFunko2 = new Funko(2, 'SonicNOT', 'Fastest', 'Pop!', 'Videojuegos', 'Sonic', 22, true, 'HeadBoing', 100);
    expect(functions.removeFunko(sampleFunko2.id)).toBe(false);
  });

  test('should return list funkos', () => {
    const functions = new FunkoFunctions(testUser);
    functions.addFunko(sampleFunko);
    const funkos = functions.listFunkos();
    expect(funkos.length).toBe(1);
    expect(funkos[0].name).toBe('Sonic');
  });

  test('should not return list funkos', () => {
    const functions = new FunkoFunctions(testUser);
    const funkos = functions.listFunkos();
    expect(funkos.length).toBe(0);
  });
});
