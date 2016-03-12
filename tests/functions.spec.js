'use strict';

const Test = require('tape');
const Util = require('util');
const Fs = require('fs');
const Vm = require('vm');
const Path = require('path');

let filePath = Path.resolve(__dirname, './../functions.js');
const IndexFileRaw = Fs.readFileSync( filePath, { encoding : 'utf8' });

let sandbox = {};
const Script = new Vm.Script(IndexFileRaw);
Script.runInNewContext(sandbox);

Test('js-functions', suite => {
  Test('Declare Two Variables', t => {
    t.ok(sandbox.a, 'a variable exists.');
    t.equals(typeof (sandbox.a), 'number', 'a variable is assigned to a random number.');
    t.ok(sandbox.b, 'b variable exists.');
    t.equals(typeof (sandbox.b), 'number', 'b variable is assigned to a random number.');
    t.end();
  });

  Test('Functions: add', t => {
    if (!sandbox.add) {
      t.fail('add function is not defined.');
      return t.end();
    }
    t.notEquals(sandbox.add, void 0, 'add function exists.');
    t.equals(sandbox.add(), sandbox.a + sandbox.b, 'add function successful.');
    t.equals(typeof (sandbox.add()), 'number', 'add function returns a number.');
    t.ok(sandbox.sum, 'sum variable exists.');
    t.equals(sandbox.sum, sandbox.a + sandbox.b, 'Stored the result of add()  in a variable named `sum`');
    t.end();
  });

  Test('Functions: subtract', t => {
    if (!sandbox.subtract) {
      t.fail('subtract function is not defined.');
      return t.end();
    }
    t.notEquals(sandbox.subtract, void 0, 'subtract function exists.');
    t.equals(sandbox.subtract(), sandbox.a - sandbox.b, 'subtract function successful.');
    t.equals(typeof (sandbox.subtract()), 'number', 'subtract function returns a number.');
    t.ok(sandbox.difference, 'difference variable exists.');
    t.equals(sandbox.difference, sandbox.a - sandbox.b, 'Stored the result of subtract()  in a variable named `difference`');
    t.end();
  });

  Test('Functions: multiply', t => {
    if (!sandbox.multiply) {
      t.fail('multiply function is not defined.');
      return t.end();
    }
    t.notEquals(sandbox.multiply, void 0, 'multiply function exists.');
    t.equals(sandbox.multiply(), sandbox.a * sandbox.b, 'multiply function successful.');
    t.equals(typeof (sandbox.multiply()), 'number', 'multiply function returns a number.');
    t.ok(sandbox.product, 'product variable exists.');
    t.equals(sandbox.product, sandbox.a * sandbox.b, 'Stored the result of multiply()  in a variable named `product`');
    t.end();
  });

  Test('Functions: checkDifference', t => {
    if (!sandbox.checkDifference) {
      t.fail('checkDifference function is not defined.');
      return t.end();
    }
    t.notEquals(sandbox.checkDifference, void 0, 'checkDifference function exists.');
    t.equals(sandbox.checkDifference(), 'My football team lost ' + sandbox.difference +  ' times this week', 'checkDifference function successful.');
    t.equals(typeof (sandbox.checkDifference()), 'string', 'checkDifference function returns a string.');
    t.end();
  });

  Test('Functions: checkSum', t => {
    if (!sandbox.checkSum) {
      t.fail('checkSum function is not defined.');
      return t.end();
    }
    t.notEquals(sandbox.checkSum, void 0, 'checkSum function exists.');
    t.equals(sandbox.checkSum(), 'I CAN ADDZ ' + sandbox.sum + ' NUMBERS', 'checkSum function successful.');
    t.equals(typeof (sandbox.checkSum()), 'string', 'checkSum function returns a string.');
    t.end();
  });

  Test('Functions: checkProduct', t => {
    if (!sandbox.checkProduct) {
      t.fail('checkProduct function is not defined.');
      return t.end();
    }
    t.notEquals(sandbox.checkProduct, void 0, 'checkProduct function exists.');
    t.equals(sandbox.checkProduct(), sandbox.product * sandbox.difference, 'checkProduct function successful.');
    t.equals(typeof (sandbox.checkProduct()), 'number', 'checkProduct function returns a string.');
    t.end();
  });

  Test('Functions: addThenSubtract', t => {
    if (!sandbox.addThenSubtract) {
      t.fail('addThenSubtract function is not defined.');
      return t.end();
    }
    t.equals(typeof (sandbox.addThenSubtract(4, 5, 7)), 'number', 'addThenSubtract function returns a number.');
    t.notEquals(sandbox.addThenSubtract, void 0, 'addThenSubtract function exists.');
    t.equals(sandbox.addThenSubtract(4, 5, 7), 2, 'addThenSubtract( 4, 5, 7 ) function successful.');
    t.equals(sandbox.addThenSubtract(30, 12, 7), 35, 'addThenSubtract( 30, 12, 7 ) function successful.');
    t.equals(sandbox.addThenSubtract(712, 145, 365), 492, 'addThenSubtract( 712, 145, 365 ) function successful.');
    t.end();
  });

  Test('Functions: addThenMultiply', t => {
    if (!sandbox.addThenMultiply) {
      t.fail('addThenMultiply function is not defined.');
      return t.end();
    }
    t.equals(typeof (sandbox.addThenMultiply(4, 5, 7)), 'number', 'addThenMultiply function returns a number.');
    t.notEquals(sandbox.addThenMultiply, void 0, 'addThenMultiply function exists.');
    t.equals(sandbox.addThenMultiply(4, 5, 7), 63, 'addThenMultiply( 4, 5, 7 ) function successful.');
    t.equals(sandbox.addThenMultiply(30, 12, 7), 294, 'addThenMultiply( 30, 12, 7 ) function successful.');
    t.equals(sandbox.addThenMultiply(712, 145, 365), 312805, 'addThenMultiply( 712, 145, 365 ) function successful.');
    t.end();
  });

  Test('Functions: createFullName', t => {
    if (!sandbox.createFullName) {
      t.fail('createFullName function is not defined.');
      return t.end();
    }
    t.equals(typeof (sandbox.createFullName('Joe', 'Carlson')), 'string', 'createFullName function returns a string.');
    t.notEquals(sandbox.createFullName, void 0, 'createFullName function exists.');
    t.equals(sandbox.createFullName('Joe', 'Carlson'), 'Joe Carlson', 'createFullName( Joe, Carlson ) function successful.');
    t.equals(sandbox.createFullName('Victor', 'Lee'), 'Victor Lee', 'createFullName( Victor, Lee ) function successful.');
    t.equals(sandbox.createFullName('JSON', 'Sewell'), 'JSON Sewell', 'createFullName( JSON, Sewell ) function successful.');
    t.ok(sandbox.myFullName, 'myFullName variable exists.');
    t.equals(sandbox.myFullName === sandbox.createFullName('Joe', 'Carlson'), true, 'Stored the result of createFullName()  in a variable named `myFullName`');
    t.end();
  });

  Test('Functions: verifyDrinkingAge', t => {
    if (!sandbox.verifyDrinkingAge) {
      t.fail('verifyDrinkingAge function is not defined.');
      return t.end();
    }
    t.equals(typeof (sandbox.verifyDrinkingAge(22)), 'boolean', 'verifyDrinkingAge function returns a boolean.');
    t.notEquals(sandbox.verifyDrinkingAge, void 0, 'verifyDrinkingAge function exists.');
    t.equals(sandbox.verifyDrinkingAge(12), false, 'verifyDrinkingAge( 12 ) function successful.');
    t.equals(sandbox.verifyDrinkingAge(20), false, 'verifyDrinkingAge( 20 ) function successful.');
    t.equals(sandbox.verifyDrinkingAge(21), true, 'verifyDrinkingAge( 21 ) function successful.');
    t.equals(sandbox.verifyDrinkingAge(93), true, 'verifyDrinkingAge( 93 ) function successful.');
    t.ok(sandbox.canDrinkBeer, 'canDrinkBeer variable exists.');
    t.equals(sandbox.canDrinkBeer === sandbox.verifyDrinkingAge(21), true, 'Stored the result of verifyDrinkingAge() in a variable named `canDrinkBeer`');
    t.end();
  });

  Test('Functions: throwParty', t => {
    if (!sandbox.throwParty) {
      t.fail('throwParty function is not defined.');
      return t.end();
    }
    t.equals(typeof (sandbox.throwParty()), 'string', 'throwParty function returns a string.');
    t.notEquals(sandbox.throwParty, void 0, 'throwParty function exists.');
    if (sandbox.canDrinkBeer === true) {
      t.equals('This Party will have an open bar', sandbox.throwParty(), 'throwParty() function successful.');
    } else if (sandbox.canDrinkBeer === false) {
      t.equals('The Party will have tons of Cake!', sandbox.throwParty(), 'throwParty() function successful.');
    }
    t.equals(typeof (sandbox.throwParty()), 'string', 'throwParty function returns a string.');
    t.end();
  });

  Test('Functions: eatFood', t => {
    if (!sandbox.eatFood) {
      t.fail('eatFood function is not defined.');
      return t.end();
    }
    t.equals(typeof (sandbox.eatFood( 'John', 'Papa', 'Pizza' )), 'string', 'eatFood function returns a string.');
    t.notEquals(sandbox.eatFood, void 0, 'eatFood function exists.');
    t.equals(sandbox.eatFood( 'John', 'Papa', 'Pizza' ), 'John Papa loves to eat Pizza', 'eatFood( John, Papa, Pizza ) function successful.');
    t.equals(sandbox.eatFood( 'Peter', 'Bojangles', 'California Burritos' ), 'Peter Bojangles loves to eat California Burritos', 'eatFood( John, Papa, Pizza ) function successful.');
    t.equals(sandbox.eatFood( 'Nigel', 'Earle', 'Pad Thai' ), 'Nigel Earle loves to eat Pad Thai', 'eatFood( Nigel, Earle, Pad Thai ) function successful.');
    t.end();
  });

  Test('Functions: repeater', t => {
    if (!sandbox.repeater) {
      t.fail('repeater function is not defined.');
      return t.end();
    }
    t.equals(typeof (sandbox.repeater(2)), 'string', 'repeater function returns a string.');
    t.notEquals(sandbox.repeater, void 0, 'repeater function exists.');
    t.equals('', sandbox.repeater(0), 'repeater(0) function successful.');
    if (sandbox.canDrinkBeer === true) {
      t.equals('Bacon Pancakes, makin\' Bacon Pancakes...', sandbox.repeater(1), 'repeater(1) function successful.');
      t.equals('Bacon Pancakes, makin\' Bacon Pancakes...Bacon Pancakes, makin\' Bacon Pancakes...Bacon Pancakes, makin\' Bacon Pancakes...', sandbox.repeater(3), 'repeater(3) function successful.');
    } else if (sandbox.canDrinkBeer === false) {
      t.equals('Let it go.... LET IT GOOOOOOoOoOoOo...', sandbox.repeater(1), 'repeater(1) function successful.');
      t.equals('Let it go.... LET IT GOOOOOOoOoOoOo...Let it go.... LET IT GOOOOOOoOoOoOo...Let it go.... LET IT GOOOOOOoOoOoOo...', sandbox.repeater(3), 'repeater(3) function successful.');
    }
    t.end();
  });

  suite.end()
})