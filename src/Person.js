'use strict';
class Person {
    constructor(firstName)
    {
        this.firstName = firstName;
    }

    sayName() {
        console.log("YO:", this.firstName);
    }
}