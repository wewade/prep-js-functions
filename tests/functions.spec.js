'use strict';

const Test = require('tape');
const Util = require('util');
const Fs = require('fs');
const Vm = require('vm');
const Path = require('path');

let filePath = Path.resolve(__dirname, './../functions.js');
const IndexFileRaw = Fs.readFileSync( filePath, { encoding: 'utf8' });

let sandbox = {};
const Script = new Vm.Script(IndexFileRaw);
Script.runInNewContext(sandbox);

Test('js-functions', suite => {
  Test('Variables with String values', t => {
    t.ok(sandbox.firstName, 'firstName variable exists.');
    t.ok(sandbox.lastName, 'lastName variable exists.');
    t.ok(sandbox.birthPlace, 'birthPlace variable exists.');
    t.end();
  });


  suite.end()
})