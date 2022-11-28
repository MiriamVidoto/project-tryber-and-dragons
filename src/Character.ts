import Archetype from './Archetypes/Archetype';
import Energy from './Energy';
import Elf from './Races/Elf';
import Mage from './Archetypes/Mage';
import Race from './Races/Race';
import Fighter from './Fighter';
import getRandomInt from './utils';

export default class Character {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get name() {
    return this._name;
  }

  get race() {
    return this._race;
  }

  get archetype() {
    return this._archetype;
  }

  get lifePoints() {
    return this._lifePoints;
  }

  get strength() {
    return this._strength;
  }

  get defense() {
    return this._defense;
  }

  get dexterity() {
    return this._dexterity;
  }

  get energy(): Energy {
    return {
      amount: this._energy.amount,
      type_: this._energy.type_,
    };
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this.strength);
  }

  special(enemy: Fighter): void {
    if (this._energy.amount > 3) {
      this._energy.amount -= 3;
      enemy.receiveDamage(this.strength * 2);
    }
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;

    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const attackDamage = attackPoints - this.defense;
    if (attackDamage > 0) {
      this._lifePoints -= attackDamage;
    } else {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }
}