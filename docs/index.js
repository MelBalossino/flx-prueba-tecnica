/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {
  // Tu solución acá 
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/
function isPalindrome(str) {
  // Tu solución acá
  let formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let reversed = "";
  for (let i = formattedStr.length - 1; i >= 0; i--) {
    reversed += formattedStr[i];
  }
  return formattedStr === reversed;
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]
*/

function closestPair(arr) {
  // Tu solución acá
  if (arr.length < 2) {
    return [];
  }

  let sorted = arr.sort((a, b) => a - b);        //[1,2,4,7,9,10]
  let minDiff = sorted[1] - sorted[0];           //2-1=1
  let pair = [sorted[0], sorted[1]];             //[1,2]

  for (let i = 1; i < sorted.length - 1; i++) {
    let diff = sorted[i + 1] - sorted[i];        //2-1=1, 4-2=2, 7-4=3, 9-7=2, 10-9=1
    if (diff < minDiff) {                        //1<1, 2<1, 3<1, 2<1, 1<1
      minDiff = diff;
      pair = [sorted[i], sorted[i + 1]];
    }
  }
  return pair;                                   //[1,2]
}

/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  // Tu solución acá
  constructor() {
    this.lastResult = 0;
  }

  validateInput(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Invalid input, please enter a numbers only');
    }
  }

  add(a, b) {
    this.validateInput(a, b);
    this.lastResult = a + b;
    return this.lastResult;
  }

  subtract(a, b) {
    this.validateInput(a, b);
    this.lastResult = a - b;
    return this.lastResult;
  }

  multiply(a, b) {
    this.validateInput(a, b);
    this.lastResult = a * b;
    return this.lastResult;
  }

  divide(a, b) {
    this.validateInput(a, b);
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    this.lastResult = a / b;
    return this.lastResult;
  }

  getLastResult() {
    return this.lastResult;
  }
}

Calculator.prototype.exponentiate = function (base, exponent) {
  this.validateInput(base, exponent);
  if (exponent === 0) {
    this.lastResult = 1;
  } else if (exponent < 0) {
    throw new Error('Exponentiation with negative exponent is not allowed');
  } else {
    this.lastResult = base ** exponent;            //ES7 operador de exponente (**)
  }
  return this.lastResult;
};


module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
}