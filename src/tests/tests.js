import 'mocha/mocha.css';
import mocha from "mocha/mocha-es2018";
import chai from 'chai';

var assert = chai.assert;

import { firebaseLogin } from '../scripts.js';
import { cups } from '../scripts.js'

mocha.setup('bdd');

it ('Funcionamiento del Login', async ()=> {
    assert.isObject(await firebaseLogin())
})

it ('Funciona lo de cups', ()=> {
    assert.isNotNumber(cups())
})

