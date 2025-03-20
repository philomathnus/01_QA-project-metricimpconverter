function ConvertHandler() {

  this.getValidUnits = () => {
    return [
      {
        unitAbrv: 'gal',
        unitFull: 'gallons',
        convertsTo: 'L',
        convertion: 3.78541
      },
      {
        unitAbrv: 'L',
        unitFull: 'liters',
        convertsTo: 'gal',
        convertion: (1 / 3.78541)
      },
      {
        unitAbrv: 'mi',
        unitFull: 'miles',
        convertsTo: 'km',
        convertion: 1.60934
      },
      {
        unitAbrv: 'km',
        unitFull: 'kilometers',
        convertsTo: 'mi',
        convertion: (1 / 1.60934)
      },
      {
        unitAbrv: 'lbs',
        unitFull: 'pounds',
        convertsTo: 'kg',
        convertion: 0.453592
      },
      {
        unitAbrv: 'kg',
        unitFull: 'kilograms',
        convertsTo: 'lbs',
        convertion: (1 / 0.453592)
      }
    ];
  };

  this.getNum = function (input) {
    const invalidNumbererrorMessage = 'invalid number';
    const repeatSlashPattern = /(\/).*\1/;
    try {
      eval(input);
    } catch (e) {
      throw new Error(invalidNumbererrorMessage);
    }
    if (repeatSlashPattern.test(input)) throw new Error(invalidNumbererrorMessage);
    return eval(input);
  };

  this.getUnit = function (input) {
    const foundUnit = this.getValidUnits().filter(unit => unit.unitAbrv === input);
    if (foundUnit.length === 0) throw new Error('invalid unit');
    return foundUnit[0];
  };

  this.getReturnUnit = function (initUnit) {
    const returnUnits = this.getValidUnits().filter(unit => unit.unitAbrv === initUnit);
    if (returnUnits.length === 0) throw new Error('invalid unit');
    return this.getUnit(returnUnits[0].convertsTo);
  };

  this.spellOutUnit = function (unit) {
    const returnUnits = this.getValidUnits().filter(currUnit => currUnit.unitAbrv === unit);
    if (returnUnits.length === 0) throw new Error('invalid unit');
    return returnUnits[0].unitFull;
  };

  this.convert = function (initNum, initUnit) {
    let orgNum = (initNum === '') ? 1 : initNum
    let errorMessage = '';
    let workingUnit = initUnit;
    let orgUnit = initUnit;
    let numToConvert = 0;
    switch (workingUnit) {
      case 'l':
      case 'L':
        workingUnit = 'L';
        break;
      default:
        workingUnit = workingUnit.toLowerCase();
    }
    // get number or error
    try {
      numToConvert = this.getNum(orgNum);
    } catch (e) {
      errorMessage = e.message;
    }

    // get unit or error
    try {
      orgUnit = this.getUnit(workingUnit);
    } catch (e) {
      if (errorMessage !== '') {
        errorMessage = 'invalid number and unit';
      } else {
        errorMessage = e.message;
      }
    }

    if (errorMessage !== '') {
      return errorMessage;
    } else {
      const returnUnit = this.getReturnUnit(workingUnit);
      const returnNum = orgUnit.convertion * numToConvert;
      return this.getString(numToConvert, orgUnit, returnNum, returnUnit);
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const returnNumPrecision = Number(returnNum.toFixed(5));
    return {
      initNum: initNum,
      initUnit: initUnit.unitAbrv,
      returnNum: returnNumPrecision,
      returnUnit: returnUnit.unitAbrv,
      string: `${initNum} ${initUnit.unitFull} converts to ${returnNumPrecision} ${returnUnit.unitFull}`
    };
  };

}

module.exports = ConvertHandler;
