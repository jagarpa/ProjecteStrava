import 'mocha/mocha.css';
import mocha from "mocha/mocha-es2018";
import chai, { expect } from 'chai';
import { firebaseLogin } from '../components/TestPage.js';
import { decodePolyline } from '../components/TestPage.js';
import { mensajeError } from '../components/TestPage.js';

let assert = chai.assert;

mocha.setup('bdd');
mocha.cleanReferencesAfterRun(false)

it ('Funcionamiento del Login', async ()=> {
    assert.isObject(await firebaseLogin())
})

it ('Funciona el decodificador de Polyline', ()=> {
    const decoded = decodePolyline();
    assert.isArray(decoded)
})

it ('Mensaje de error retornado correctamente', ()=> {
    let mensaje = mensajeError("nombre");
    expect(mensaje).to.equal("Este campo solo admite letras")
})





