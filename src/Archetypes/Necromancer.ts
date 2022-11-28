import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Necromancer extends Archetype {
  private _type: EnergyType;
  private static archetypeInstances = 0;
  
  constructor(name:string) {
    super(name);
    this._type = 'mana';
    Necromancer.archetypeInstances += 1;
  }

  get type(): EnergyType {
    return this._type;
  }

  get energyType(): EnergyType {
    return this._type;
  }

  static createdArchetypeInstances():number {
    return Necromancer.archetypeInstances;
  }
}