// let a = [];
// a.push(1);

// a = [].push(1);
// console.log(a)

// a = 'number' + 3 + 3;
// console.log(a)

// a = null + 3;
// console.log(a)

// a = 5 && "qwerty";
// console.log(a)

// a = +'40' + +'2' + "hillel";
// console.log(a)

// a = '10' - 5 === 6;
// console.log(a)

// a = true + false
// console.log(a)

// a = '4px' - 3
// console.log(a)

// a = '4' - 3
// console.log(a)

// a = '6' + 3 ** 0;
// console.log(a)

// a = 12 / '6'
// console.log(a)

// a = '10' + (5 === 6);
// console.log(a)

// a = null == ''
// console.log(a)

// a = 3 ** (9 / 3);
// console.log(a)

// a = !!'false' == !!'true'
// console.log(a)

// a = 0 || '0' && 1
// console.log(a)

// a = (+null == false) < 1;
// console.log(a)

// a = false && true || true
// console.log(a)

// a = false && (false || true);
// console.log(a)

// a = (+null == false) < 1 ** 5;
// console.log(a)


function pow(x, y) {
    let resault = 1;  // Початкове значення результату

    // Цикл для множення x на себе y разів
    for (let i = 0; i < y; i++) {
        resault = resault * x;
        // resault *= x;
    }

    return resault;  // Повертаємо результат
}

console.log("Resault =", pow(3, 4));
console.log("Resault =",pow(2, 4));
console.log("Resault =", pow(9, 2));