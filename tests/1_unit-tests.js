const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('ConverterHandler->getNum', () => {
        test('should correctly read a whole number input.', () => {
            //convertHandler.getNum('3').should.equal(3);
            assert.equal(convertHandler.getNum('3'), 3);
        });
        test('should correctly read a decimal number input.', () => {
            //convertHandler.getNum('9.7').should.equal(9.7);
            assert.equal(convertHandler.getNum('9.7'), 9.7);
        });
        test('should correctly read a fractional input.', () => {
            //convertHandler.getNum('1/2').should.equal(0.5);
            assert.equal(convertHandler.getNum('1/2'), 0.5);
        });
        test('should correctly read a fractional input with a decimal.', () => {
            //convertHandler.getNum('1/0.5').should.equal(2);
            //convertHandler.getNum('0.5/2').should.equal(0.25);
            //convertHandler.getNum('0.5/0.25').should.equal(2);
            assert.equal(convertHandler.getNum('1/0.5'), 2);
            assert.equal(convertHandler.getNum('0.5/2'), 0.25);
            assert.equal(convertHandler.getNum('0.5/0.25'), 2);
        });
        test('should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
            //(() => convertHandler.getNum('3/2/3')).should.throw('invalid number');
            assert.throws(() => convertHandler.getNum('3/2/3'), 'invalid number');
        });
        test('should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
            //(() => convertHandler.getNum('foo')).should.throw('invalid number');
            assert.throws(() => convertHandler.getNum('foo'), 'invalid number');
        });
    });

    suite('ConverterHandler->getUnit', () => {
        test('should correctly read each valid input unit.', () => {
            convertHandler.getValidUnits().forEach(unit => {
                assert.doesNotThrow(() => convertHandler.getUnit(unit.unitAbrv));
                //(() => convertHandler.getUnit(unit.unitAbrv)).should.not.throw();
            });
        });
        test('should correctly return an error for an invalid input unit.', () => {
            //(() => convertHandler.getUnit('foo')).should.throw('invalid unit');
            assert.throws(() => convertHandler.getUnit('foo'), 'invalid unit');
        });
        test('should return the correct return unit for each valid input unit.', () => {
            convertHandler.getValidUnits().forEach(unit => {
                const expectedReturnUnit = convertHandler.getUnit(unit.convertsTo);
                assert.deepEqual(convertHandler.getReturnUnit(unit.unitAbrv), expectedReturnUnit);
                //convertHandler.getReturnUnit(unit.unitAbrv).should.eql(expectedReturnUnit);
            });
        });
        test('should correctly return the spelled-out string unit for each valid input unit.', () => {
            const abrvToReturnUnitMap = convertHandler.getValidUnits().map(unit => {
                return { 
                    key: unit.unitAbrv, 
                    value: unit.unitFull
                }
            });
            convertHandler.getValidUnits().forEach(unit => {
                const expectedSpelledOuText = abrvToReturnUnitMap.filter(elem => elem.key === unit.unitAbrv)[0].value;
                // convertHandler.spellOutUnit(unit.unitAbrv).should.equal(expectedSpelledOuText);
                assert.deepEqual(convertHandler.spellOutUnit(unit.unitAbrv), expectedSpelledOuText);
            });
        });
    });

    suite('ConverterHandler->convert', () => {
        test('should correctly convert gal to L.', () => {
            const expectedResult = {
                initNum: 1,
                initUnit: 'gal',
                returnNum: 3.78541,
                returnUnit: 'L',
                string: '1 gallons converts to 3.78541 liters'
            }
            //convertHandler.convert('1', 'gal').should.eql(expectedResult);
            assert.deepEqual(convertHandler.convert('1', 'gal'), expectedResult);
        });
        test('should correctly convert L to gal.', () => {
            const expectedResult = {
                initNum: 1,
                initUnit: 'L',
                returnNum: 0.26417,
                returnUnit: 'gal',
                string: '1 liters converts to 0.26417 gallons'
            }
            //convertHandler.convert('1', 'L').should.eql(expectedResult);
            assert.deepEqual(convertHandler.convert('1', 'L'), expectedResult);
        });
        test('should correctly convert mi to km.', () => {
            const expectedResult = {
                initNum: 1,
                initUnit: 'mi',
                returnNum: 1.60934,
                returnUnit: 'km',
                string: '1 miles converts to 1.60934 kilometers'
            }
            //convertHandler.convert('1', 'mi').should.eql(expectedResult);
            assert.deepEqual(convertHandler.convert('1', 'mi'), expectedResult);
        });
        test('should correctly convert km to mi.', () => {
            const expectedResult = {
                initNum: 1,
                initUnit: 'km',
                returnNum: 0.62137,
                returnUnit: 'mi',
                string: '1 kilometers converts to 0.62137 miles'
            }
            //convertHandler.convert('1', 'km').should.eql(expectedResult);
            assert.deepEqual(convertHandler.convert('1', 'km'), expectedResult);
        });
        test('should correctly convert lbs to kg.', () => {
            const expectedResult = {
                initNum: 1,
                initUnit: 'lbs',
                returnNum: 0.45359,
                returnUnit: 'kg',
                string: '1 pounds converts to 0.45359 kilograms'
            }
            //convertHandler.convert('1', 'lbs').should.eql(expectedResult);
            assert.deepEqual(convertHandler.convert('1', 'lbs'), expectedResult);
        });
        test(' should correctly convert kg to lbs.', () => {
            const expectedResult = {
                initNum: 1,
                initUnit: 'kg',
                returnNum: 2.20462,
                returnUnit: 'lbs',
                string: '1 kilograms converts to 2.20462 pounds'
            }
            //convertHandler.convert('1', 'kg').should.eql(expectedResult);
            assert.deepEqual(convertHandler.convert('1', 'kg'), expectedResult);
        });    
    });
});
