import { capitalize, get, startCase } from 'lodash'

export default class Data {
  static set(data) {
    this.data = data
  }

  static expansion(id) {
    const expansion = get(this, 'data.expansions', []).find(
      expansion => expansion.id === id
    )

    if (expansion) {
      const { name } = expansion

      return name
    }
  }

  static class(id) {
    const klass = get(this, 'data.characterClasses', []).find(
      klass => klass.id === id
    )

    if (klass) {
      const { name } = klass

      return name
    }
  }

  static race(id) {
    const race = get(this, 'data.characterRaces', []).find(
      race => race.id === id
    )

    if (race) {
      const { name } = race

      return name
    }
  }

  static itemClass(id, subclassId) {
    const klass = get(this, 'data.itemClasses', []).find(
      klass => klass.class === id
    )

    if (klass) {
      const { name, subclasses } = klass

      if (subclassId) {
        const subclass = subclasses.find(
          ({ subclass }) => subclass === subclassId
        )

        if (subclass) {
          const { name } = subclass

          return name
        }
      }

      return name
    }
  }

  static itemBind(id) {
    switch (id) {
      case 1:
        return 'Bind on pickup'

      case 2:
        return 'Bind on equip'

      case 3:
        return 'Bind on use'

      case 4:
        return 'Quest item'

      default:
        return 'Unknown'
    }
  }

  static modes(modes) {
    return modes
      .map(mode => capitalize(mode.split('_').pop()))
      .join(', ')
      .replace('Lfr', 'LFR')
  }

  static quality(id) {
    switch (id) {
      case 0:
        return 'Poor'

      case 1:
        return 'Common'

      case 2:
        return 'Uncommon'

      case 3:
        return 'Rare'

      case 4:
        return 'Epic'

      case 5:
        return 'Legendary'

      case 6:
        return 'Artifact'

      case 7:
        return 'Heirloom'

      case 8:
        return 'WoW Token'

      default:
        return 'Unknown'
    }
  }

  static stat(id) {
    const stats = {
      undefined: 'Unknown',
      0: 'Mana',
      1: 'Health',
      3: 'Agility',
      4: 'Strength',
      5: 'Intellect',
      6: 'Spirit',
      7: 'Stamina',
      12: 'Defense Skill',
      13: 'Dodge',
      14: 'Parry',
      15: 'Block',
      16: 'Hit Melee',
      17: 'Hit Ranged',
      18: 'Hit Spell',
      19: 'Crit Melee',
      20: 'Crit Ranged',
      21: 'Crit Spell',
      22: 'Hit Taken Melee',
      23: 'Hit Taken Ranged',
      24: 'Hit Taken Spell',
      25: 'Crit Taken Melee',
      26: 'Crit Taken Ranged',
      27: 'Crit Taken Spell',
      28: 'Haste Melee',
      29: 'Haste Ranged',
      30: 'Haste Spell',
      31: 'Hit',
      32: 'Crit',
      33: 'Hit Taken',
      34: 'Crit Taken',
      35: 'Resilience',
      36: 'Haste',
      37: 'Expertise',
      38: 'Attack Power',
      39: 'Ranged Attack Power',
      40: 'Versatility',
      41: 'Spell Healing Done',
      42: 'Spell Damage Done',
      43: 'Mana Regeneration',
      44: 'Armor Penetration',
      45: 'Spell Power',
      46: 'Health Regen',
      47: 'Spell Penetration',
      48: 'Block Value',
      49: 'Mastery',
      50: 'Extra Armor',
      51: 'Fire Resistance',
      52: 'Frost Resistance',
      53: 'Holy Resistance',
      54: 'Shadow Resistance',
      55: 'Nature Resistance',
      56: 'Arcane Resistance',
      57: 'PVP Power',
      58: 'CR Amplify',
      59: 'CR Multistrike',
      60: 'CR Readiness',
      61: 'CR Speed',
      62: 'CR Lifesteal',
      63: 'CR Avoidance',
      64: 'CR Sturdiness',
      65: 'CR Unused 7',
      66: 'CR Cleave',
      67: 'CR Unused 9',
      68: 'CR Unused 10',
      69: 'CR Unused 11',
      70: 'CR Unused 12',
      71: 'Agility or Strength or Intellect',
      72: 'Agility or Strength',
      73: 'Agility or Intellect',
      74: 'Strength or Intellect'
    }

    return stats[id]
  }

  static trigger(id) {
    return capitalize(id.substr(3))
  }
}
