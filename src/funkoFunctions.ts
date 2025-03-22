import fs from 'fs';
import { Funko } from './funkoElements.js';

export class FunkoFunctions {
  /**
   * 
   * @param user - usuario del funko
   */
  constructor(private user: string){}
  private getUserPath(): string {
    return process.cwd() + '/usuarios/' + this.user;
  }

  /**
   * 
   * @param id - id del funko
   * @returns - la ruta del funko
   */
  private getFunkoPath(id: number): string {
    return this.getUserPath() + '/' + id + '.json';
  } 

  /**
   * Verifica si existe la ruta de un usuario, si no existe crea la carpeta
   * El modo recursivo nos permite crear las carpetas intermedias
   */
  private checkUserDir(): void {
    if (!fs.existsSync(this.getUserPath())) {
      fs.mkdirSync(this.getUserPath(), { recursive: true });
    }
  }

  /**
   * 
   * @param funko - funko a ser agregado
   * @returns - si el funko fue agregado correctamente o no
   */
  addFunko(funko: Funko): boolean {
    this.checkUserDir();
    const funkoPath = this.getFunkoPath(funko.id);
    if (fs.existsSync(funkoPath)) {
      return false;
    }
    fs.writeFileSync(funkoPath, JSON.stringify(funko, null, 2));
    return true;
  }

  /**
   * 
   * @param funko - funko a modificar
   * @returns - si ha sido modificado correctamente o no
   */
  updateFunko(funko: Funko): boolean {
    const funkoPath = this.getFunkoPath(funko.id);
    if (!fs.existsSync(funkoPath)) {
      return false;
    }
    fs.writeFileSync(funkoPath, JSON.stringify(funko, null, 2));
    return true;
  }
  
  /**
   * 
   * @param id - id del funco a eliminar
   * @returns - si fue eliminado correctamente o no
   */
  removeFunko(id: number): boolean {
    const funkoPath = this.getFunkoPath(id);
    if (!fs.existsSync(funkoPath)) {
      return false;
    }
    fs.unlinkSync(funkoPath);
    return true;
  }

  /**
   * 
   * @returns - lista de los funkos del usuario
   */
  listFunkos(): Funko[] {
    const userPath = this.getUserPath();
    if (!fs.existsSync(userPath)) {
      return [];
    }
    return fs.readdirSync(userPath).map(file => {
      const content = fs.readFileSync(userPath + '/' + file, 'utf-8');
      const obj = JSON.parse(content);
      return new Funko(
        obj.id, obj.name, obj.description, obj.type,
        obj.genre, obj.franchise, obj.number,
        obj.exclusive, obj.specialFeatures, obj.marketValue
      );
    });
  }

  /**
   * 
   * @param id - id del funko a obtener la informacion
   * @returns - el funko en cuestion o si no existe(undefined)
   */
  getFunko(id: number) : Funko | undefined {
    const funkoPath = this.getFunkoPath(id);
    if (!fs.existsSync(funkoPath)) return undefined;
    const content = fs.readFileSync(funkoPath, 'utf-8');
    const obj = JSON.parse(content);
    return new Funko(
      obj.id, obj.name, obj.description, obj.type,
      obj.genre, obj.franchise, obj.number,
      obj.exclusive, obj.specialFeatures, obj.marketValue
    );
  }
}