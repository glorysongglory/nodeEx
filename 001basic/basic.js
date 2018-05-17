/**
 * Created by glory on 2018/5/17.
 */

/**
 * 内部函数可以访问外部函数的变量，外部不能访问内部函数的变量。上面的例子中内部函数 child 可以访问变量 age，而外部函数 parent 不可以访问 child 中的变量 childAge
 */

var parent = function () {
    var name = 'parent name';
    var age = 13;
    var child = function () {
        var name = 'child name';
        var childAge = 0.3;
        console.log(name, age, childAge);
    };
    child();
}
parent();

/**
 *闭包,每次调用 adder 时，adder 都会返回一个函数给我们。我们传给 adder 的值，会保存在一个名为 base 的变量中。由于返回的函数在其中引用了 base 的值，于是 base 的引用计数被 +1。当返回函数不被垃圾回收时，则 base 也会一直存在。
 */

var adder = function (x) {
    var base = x;
    return function (n) {
        return n + base;
    };
};

var add10 = adder(10);
console.log(add10(5));

var add20 = adder(20);
console.log(add20(5));

/**
 * 因为 setTimeout 中的 i 是对外层 i 的引用。当 setTimeout 的代码被解释的时候，运行时只是记录了 i 的引用，而不是值。而当 setTimeout 被触发时，五个 setTimeout 中的 i 同时被取值，由于它们都指向了外层的同一个 i，而那个 i 的值在迭代完成时为 5，所以打印了五次 5
 */
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 5);
}

/**
 *  i 赋值成一个局部的变量，从而摆脱外层迭代的影响
 */
for (var i = 0; i < 5; i++) {
    (function (idx) {
        setTimeout(function () {
            console.log(idx);
        }, 5);
    })(i);
}


/**
 * this 出现的场景分为四类，简单的说就是：
 有对象就指向调用对象
 没调用对象就指向全局对象
 用new构造就指向新对象
 通过 apply 或 call 或 bind 来改变 this 的所指。
 */

//1）函数有所属对象时：指向所属对象
var myObject = {value: 100};
myObject.getValue = function () {
    console.log(this.value);
    console.log(this);
    return this.value;
}
console.log(myObject.getValue());


//函数没有所属对象：指向全局对象
myObject.getValue = function () {
    var foo = function () {
        console.log(this.value) // => undefined
        // console.log(this);// 输出全局对象 global
    };
    foo();
    return this.value;
};

console.log(myObject.getValue()); // => 100


/**
 * 3）构造器中的 this：指向新对象
 */
var someClass = function () {
    this.value = 200;
};

var myObj = new someClass();
console.log(myObj.value);


/**
 *apply() 方法接受两个参数第一个是函数运行的作用域，另外一个是一个参数数组(arguments)。

 call() 方法第一个参数的意义与 apply() 方法相同，只是其他的参数需要一个个列举出来。

 简单来说，call 的方式更接近我们平时调用函数，而 apply 需要我们传递 Array 形式的数组给它。它们是可以互相转换的。
 */

var myObject = {value: 300};

var foo = function () {
    console.log(this);
}

foo();//全局global
foo.apply(myObject);//{value:300}
foo.call(myObject);//{value:300}

var newFoo = foo.bind(myObject);
newFoo();//{value:300}

