1.USAGE

Install

npm install TypeScript

Run

npx tsc

 Run with a specific config

npx tsc --project configs/my_tsconfig.json

2.Triple Slash Directives

AMD

/// <amd-module name="Name" />
/// <amd-dependency path="app/foo" name="foo" />

 Reference built-in types

/// <reference lib="es2016.array.include" />

Reference other types

/// <reference path="../my_types" />

/// <reference types="jquery" />

3.Compiler components

Check this file (JS)

// @ts-check

 Don’t check this file

// @ts-nocheck

Expect an error on the next line

// @ts-expect-error

 Ignore the next line

// @ts-ignore

 4. operators
 
  ! (null assertion)

let value: string | undefined;



// ... Code that we're sure will initialize `value` ...

// Assert that `value` is defined
console.log(`value is ${value!.length} characters long`);


?? (nullish coalescing)
?? “fall Backs” to a Default Value When Dealing with null or undefined
function getValue(val?: number): number | 'nil' {

  // Will return 'nil' if `val` is falsey (including 0)

  // return val || 'nil';

  // Will only return 'nil' if `val` is null or undefined
  return val ?? 'nil';
}


// Value foo will be used when it’s “present”; but when it’s null or undefined, calculate bar() in its place.
let x = foo ?? bar();
// instead of
let x = foo !== null && foo !== undefined ? foo : bar();

// It can replace uses of || when trying to use a default value, and avoids bugs. When localStorage.volume is set to 0, the page will set the volume to 0.5 which is unintended. ?? avoids some unintended behaviour from 0, NaN and "" being treated as falsy values.
function initializeAudio() {
  const volume = localStorage.volume || 0.5; // Potential bug
}

 ??=

let a;

let b = 0;

 
// assign a value only if current value is null or undefined
 
a ??= 'default'; // a is now 'default'
b ??=  5; // b is still 0

 ?. (optional chaining)
?. returns undefined when hitting a null or undefined
function countCaps(value?: string) {

  // The `value` expression be undefined if `value` is null or

  // undefined, or if the `match` call doesn't find anything.
  return value?.match(/[A-Z]/g)?.length ?? 0;
}


// Album where the artist, and the artists biography might not be present in the data.
type AlbumAPIResponse = {
  title: string;
  artist?: {
    name: string;
    bio?: string;
    previousAlbums?: string[];
  };
};

// Instead of:
const maybeArtistBio = album.artist && album.artist.bio;

// ?. acts differently than && on "falsy" values: empty string, 0, NaN, false
const artistBio = album?.artist?.bio;

// optional chaining also works with the [] operators when accessing elements
const maybeArtistBioElement = album?.["artist"]?.["bio"];
const maybeFirstPreviousAlbum = album?.artist?.previousAlbums?.[0];

// Optional chaining on an optional function:

interface OptionalFunction {
  bar?: () => number;
}

const foo: OptionalFunction = {};
const bat = foo.bar?.(); // number | undefined

&&=

let a;
let b = 1;
 
// assign a value only if current value is truthy
 
a &&= 'default'; // a is still undefined
b &&=  5; // b is now 5

 ||=

let a;

let b = 1;

 
// assign a value only if current value is falsy
 
a ||= 'default'; // a is 'default' now
b ||=  5; // b is still 1

5.Types

 Basic types

any 		Untyped

string 		A string

number 		A number
boolean 	A true / false value
object 		A non-primitive value
undefined 	Uninitialized value
null 		Explicitly empty value
void 		Null or undefined (usually only used for function returns)
never 		A value that can never occur
unknown 	A value with an unknown type

Exhaustive Pattern Matching Using never

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
interface Triangle {
  kind: "triangle";
  whatever: number;
}

type Shape = Square | Rectangle | Circle | Triangle;

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      return assertNever(s); // Error
    // Argument of type 'Triangle' not assignable to param of type 'never'
  }
}

 Literal types

// String

let direction: 'left' | 'right';


// Numeric
let roll: 1 | 2 | 3 | 4 | 5 | 6;

 never

// never represents the type of values that never occur. It is used in the following two places:

// - As the return type of functions that never return

// - As the type of variables under type guards that are never true

// never can be used in control flow analysis:
function controlFlowAnalysisWithNever(value: string | number) {
  if (typeof value === "string") {
    value; // Type string
  } else if (typeof value === "number") {
    value; // Type number
  } else {
    value; // Type never
  }
}

 Object types

// Object

{

    requiredStringVal: string;
    optionalNum?: number;
    readonly readOnlyBool: bool;

}


// Object with arbitrary string properties (like a hashmap or dictionary)
{ [key: string]: Type; }
{ [key: number]: Type; }

 Union and intersection types

// Union	

let myUnionVariable: number | string;


// Intersection	
let myIntersectionType: Foo & Bar;

 unknown
unknown is the type-safe counterpart of the any type: we have to do some form of checking before performing most operations on values of type unknown.
// Reading JSON from localStorage using unknown Example

type Result =

  | { success: true; value: unknown }
  | { success: false; error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);

  if (item === null) {
    // The item does not exist, thus return an error result
    return {
      success: false,
      error: new Error(`Item with key "${key}" does not exist`)
    };
  }

  let value: unknown;

  try {
    value = JSON.parse(item);
  } catch (error) {
    // The item is not valid JSON, thus return an error result
    return {
      success: false,
      error
    };
  }

  // Everything's fine, thus return a success result
  return {
    success: true,
    value
  };
}

6. arrays and tuples

 Array of functions that return strings

(() => string)[]

or


{ (): string; }[]
or

Array<() => string>


Array of strings

string[]
or

Array<string>

Basic tuples

let myTuple: [ string, number, boolean? ];

myTuple = [ 'test', 42 ];

Named tuples

type Vector2D = [x: number, y: number];
function createVector2d(...args: Vector2D) {} 
// function createVector2d(x: number, y: number): void

Variadic tuples

type Numbers = [number, number];
type Strings = [string, string];
 
type NumbersAndStrings = [...Numbers, ...Strings]; 
// [number, number, string, string]

 7. functions
 
Arrow function

(arg1: Type): ReturnType => { ...; return value; }
or
(arg1: Type): ReturnType => value;

 Constructor

new () => ConstructedType;

or

{ new (): ConstructedType; }

Default argument

function fn(arg1 = 'default'): ReturnType {}

Function type

(arg1: Type, argN: Type) => Type;
or
{ (arg1: Type, argN: Type): Type; }

Function type with optional param

(arg1: Type, optional?: Type) => ReturnType

Function type with rest param

(arg1: Type, ...allOtherArgs: Type[]) => ReturnType

Function type with static property

{ (): Type; staticProp: Type; } 

Overloads

function conv(a: string): number;

function conv(a: number): string;

function conv(a: string | number): string | number {
    ...
}

 this typing

function fn(this: Foo, arg1: string) {}

8. Named types

 Class

class Child

extends Parent


implements Child, OtherChild {
    property: Type;
    defaultProperty = 'default value';
    private _privateProperty: Type;
    private readonly _privateReadonlyProperty: Type;
    static staticProperty: Type;
    constructor(arg1: Type) {
        super(arg1);
    }

    private _privateMethod(): Type {}

    methodProperty: (arg1: Type) => ReturnType;
    overloadedMethod(arg1: Type): ReturnType;
    overloadedMethod(arg1: OtherType): ReturnType;
    overloadedMethod(arg1: CommonT): CommonReturnT {}
    static staticMethod(): ReturnType {}
    subclassedMethod(arg1: Type): ReturnType {
        super.subclassedMethod(arg1);
    }
}

 Enum

enum Options {

    FIRST,

    EXPLICIT = 1,
    BOOLEAN = Options.FIRST | Options.EXPLICIT,
    COMPUTED = getValue()
}

enum Colors {
    Red = "#FF0000",
    Green = "#00FF00",
    Blue = "#0000FF"
}

Interface

interface Child extends Parent, SomeClass {
    property: Type;
    optionalProp?: Type;
    optionalMethod?(arg1: Type): ReturnType;
}

Type alias

type Name = string;



type Direction = 'left' | 'right';

type ElementCreator = (type: string) => Element;

type Point = { x: number, y: number };

type Point3D = Point & { z: number };

type PointProp = keyof Point; // 'x' | 'y'

const point: Point = { x: 1, y: 2 };

type PtValProp = keyof typeof point; // 'x' | 'y'

 9. Generics
 
  Advanced Factory using ConstructorParameters<T> and InstanceType<T>

class Hero {

  constructor(public point: [number, number]) {}

}

const entities = [];

const entityFactory = <
  T extends {
    new (...args: any[]): any;
  }
>(
  classToCreate: T,
  numberOf: number,
  ...args: ConstructorParameters<T>
): InstanceType<T>[] =>
  [...Array(numberOf)].map(() => new classToCreate(...args));

entities.push(...entityFactory(Hero, 10, [12, 10]));

 Constrained and default type parameter

<T extends ConstrainedType = DefaultType>(): T

Constrained type parameter

<T extends ConstrainedType>(): T

Default type parameter

<T = DefaultType>(): T

 Function using type parameters

<T>(items: T[], callback: (item: T) => T): T[]

 Generic tuples

type Arr = readonly any[];

 

function concat<U extends Arr, V extends Arr>(a: U, b: V): 
[...U, ...V] { return [...a, ...b] }
 
const strictResult = concat([1, 2] as const, ['3', '4'] as const);
const relaxedResult = concat([1, 2], ['3', '4']);
 
// strictResult is of type [1, 2, '3', '4']
// relaxedResult is of type (string | number)[]

Higher Order Function with Parameters<T> and ReturnType<T>

function logDuration<T extends (...args: any[]) => any>(func: T) {
  const funcName = func.name;

  // Return a new function that tracks how long the original took
  return (...args: Parameters<T>): ReturnType<T> => {
    console.time(funcName);
    const results = func(...args);
    console.timeEnd(funcName);
    return results;
  };
}

function addNumbers(a: number, b: number): number {
  return a + b;
}
// Hover over is `addNumbersWithLogging: (a: number, b: number) => number`
const addNumbersWithLogging = logDuration(addNumbers);

addNumbersWithLogging(5, 3);

Interface with multiple types

interface Pair<T1, T2> {
    first: T1;
    second: T2;
}

Using More Than One Type Argument

function makePair<F, S>() {

  let pair: { first: F; second: S };


  function getPair() {
    return pair;
  }

  function setPair(x: F, y: S) {
    pair = {
      first: x,
      second: y
    };
  }
  return { getPair, setPair };
}
const { getPair, setPair } = makePair<number, string>(); // Creates a pair
setPair(1, "y"); // Must pass (number, string)

With and Without Type Argument Inference

function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString"); // Type of output is 'string'
let output = identity("myString"); // The compiler sets the value of `T`

 10. index and conditional types
Conditional mapped types

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

type StringProps<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
};

type PersonStrings = StringProps<Person>;

// PersonStrings is "firstName" | "lastName"

Conditional types

type Swapper = <T extends number | string>
    (value: T) => T extends number ? string : number;
// is equivalent to

(value: number) => string
// if T is number, or

(value: string) => number
// if T is string

 Index type query (keyof)

type Point = { x: number, y: number };

let pointProp: keyof Point = 'x';


function getProp<T, K extends keyof T>(
    val: T,
    propName: K

): T[K] { ... }

Index type query (keyof)

type Point = { x: number, y: number };
let pointProp: keyof Point = 'x';

function getProp<T, K extends keyof T>(
    val: T,
    propName: K

): T[K] { ... }

11. utility types

Exclude

type Excluded = Exclude<string | number, string>;

// is equivalent to


number

Extract

type Extracted = Extract<string | number, string>;

// is equivalent to


string

InstanceType

class Renderer() {}

type Instance = InstanceType<typeof Renderer>;

// is equivalent to

Renderer

NonNullable

type NonNull = NonNullable<string | number | void>;
// is equivalent to

string | number

Partial

Partial<{ x: number; y: number; z: number; }>
// is equivalent to

{ x?: number; y?: number; z?: number; }

Pick

Pick<{ x: number; y: number; z: number; }, 'x' | 'y'>

// is equivalent to


{ x: number; y: number; }

Readonly

Readonly<{ x: number; y: number; z: number; }>

// is equivalent to


{
    readonly x: number;

    readonly y: number;

    readonly z: number;
}

Record

Record<'x' | 'y' | 'z', number>
// is equivalent to

{ x: number; y: number; z: number; }

ReturnType

type ReturnValue = ReturnType<() => string>;
// is equivalent to

string

 12. Assertion functions
 
A Standard JavaScript Assert() Doesn’t Work for Type Checking

function yell(str) {
  assert(typeof str === "string");

  return str.toUppercase(); // Oops! We misspelled 'toUpperCase'
}

Assertion Function Style 1 - Check for a Condition

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}

function yell(str) {
  assert(typeof str === "string");

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}

 Assertion Function Style 2 - Tell Typescript That a Specific Variable or Property Has a Different Type
Very similar to writing type predicate signatures.
function assertIsString(val: any): asserts val is string {

  if (typeof val !== "string") {

    throw new AssertionError("Not a string!");
  }
}

function yell(str: any) {
  assertIsString(str);

  // Now TypeScript knows that 'str' is a 'string'.

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}

 Using if and typeof Everywhere is Bloat

function yell(str) {

  if (typeof str !== "string") {

    throw new TypeError("str should have been a string.");
  }
  // Error caught!
  return str.toUppercase();
}

13. Strict mode

Non-Nullable Types --strictNullChecks

// In strict null checking mode, null and undefined are no longer assignable to every type.

let name: string;
name = "Marius"; // OK
name = null; // Error
name = undefined; // Error

let name: string | null;
name = "Marius"; // OK
name = null; // OK
name = undefined; // Error

// Optional parameter ? automatically adds | undefined
type User = {
  firstName: string;
  lastName?: string; // same as `string | undefined`
};

// In JavaScript, every function parameter is optional, when left off their value is undefined.
// We can get this functionality in TypeScript by adding a ? to the end of parameters we want to be optional. This is different from adding | undefined which requires the parameter to be explicitly passed as undefined
function fn1(x: number | undefined): void {
  x;
}

function fn2(x?: number): void {
  x;
}

fn1(); // Error
fn2(); // OK
fn1(undefined); // OK
fn2(undefined); // OK

// Type guard needed to check if Object is possibly null:
function getLength(s: string | null) {
  // Error: Object is possibly 'null'.
  return s.length;
}

function getLength(s: string | null) {
  if (s === null) {
    return 0;
  }
  return s.length;
}

// JS's truthiness semantics support type guards in conditional expressions
function getLength(s: string | null) {
  return s ? s.length : 0;
}

function doSomething(callback?: () => void) {
  // Error: Object is possibly 'undefined'.
  callback();
}

function doSomething(callback?: () => void) {
  if (typeof callback === "function") {
    callback();
  }
}

Strict

strict: true /* Enable all strict type-checking options. */

// is equivalent to enabling all of the strict mode family options:


noImplicitAny: true /* Raise error on expressions and declarations with an implied 'any' type */,
strictNullChecks: true /* Enable strict null checks */,
strictFunctionTypes: true /* Enable strict checking of function types */,
strictBindCallApply: true /* Enable strict 'bind', 'call', and 'apply' methods on functions */,
strictPropertyInitialization: true /* Enable strict checking of property initialization in classes */,
noImplicitThis: true /* Raise error on 'this' expressions with an implied 'any' type */,
alwaysStrict: true /* Parse in strict mode and emit "use strict" for each source file */
// You can then turn off individual strict mode family checks as needed.

Strict Bind Call Apply --strictBindCallApply

// The call() method calls a function with a given this value and arguments provided individually, while apply() accepts a single array of arguments. The bind() method creates a new function.



// When set, TypeScript will check that the built-in methods of functions call, bind, and apply are invoked with correct argument for the underlying function:

function fn(x: string) {
  return parseInt(x);
}

const n1 = fn.call(undefined, "10"); // OK
const n2 = fn.call(undefined, false); // `false` is not assignable to parameter of type `string`

Strict Class Property Initialization --strictPropertyInitialization

// Verify that each instance property declared in a class either:



// Has an explicit initializer, or
// Is definitely assigned to in the constructor
// Error
class User {
  // 'username' has no initializer & not definitely assigned in constructor
  username: string;
}

// OK
class User {
  username = "n/a";
}

const user = new User();
const username = user.username.toLowerCase();

// OK
class User {
  constructor(public username: string) {}
}

const user = new User("mariusschulz");
const username = user.username.toLowerCase();

// Has a type that includes undefined
class User {
  username: string | undefined;
}

const user = new User();

// Whenever we want to use the username property as a string, we first have
// to make sure that it actually holds a string, not the value undefined
const username =
  typeof user.username === "string" ? user.username.toLowerCase() : "n/a";
 
 
   14.immutability
   const Assertions

// number becomes number literal

// Type '10'

let x = 10 as const;

// array literals become readonly tuples
// Type 'readonly [10, 20]'
let y = [10, 20] as const;
// object literals get readonly properties

// no literal types in that expression should be widened (e.g. no going from "hello" to string)
// Type '{ readonly text: "hello" }'
let z = { text: "hello" } as const;

// const contexts don’t immediately convert an expression to be fully immutable.
let arr = [1, 2, 3, 4];

let foo = {
  name: "foo",
  contents: arr
} as const;

foo.name = "bar"; // Error
foo.contents = []; // Error

foo.contents.push(5); // OK

readonly Array / Tuple

const array: readonly string[];

const tuple: readonly [string, string];

readonly Class Properties
Gettable area property is implicitly read-only because there’s no setter
class Circle {

  readonly radius: number;


  constructor(radius: number) {
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }
}

readonly Class Properties
Gettable area property is implicitly read-only because there’s no setter
class Circle {

  readonly radius: number;


  constructor(radius: number) {
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }
}

readonly Properties
Properties marked with readonly can only be assigned to during initialization or from within a constructor of the same class.
type Point = {
  readonly x: number;
  readonly y: number;
};

const origin: Point = { x: 0, y: 0 }; // OK
origin.x = 100; // Error

function moveX(p: Point, offset: number): Point {
  p.x += offset; // Error
  return p;
}

function moveX(p: Point, offset: number): Point {
  // OK
  return {
    x: p.x + offset,
    y: p.y
  };
}

15. mapped types- getting types from data

keyof with Generics and Interfaces Example

interface HasPhoneNumber {

  name: string;

  phone: number;
}

interface HasEmail {
  name: string;
  email: string;
}

interface CommunicationMethods {
  email: HasEmail;
  phone: HasPhoneNumber;
  fax: { fax: number };
}

function contact<K extends keyof CommunicationMethods>(
  method: K,
  contact: CommunicationMethods[K] // turning key into value - a mapped type
) {
  //...
}
contact("email", { name: "foo", email: "mike@example.com" });
contact("phone", { name: "foo", phone: 3213332222 });
contact("fax", { fax: 1231 });

// // we can get all values by mapping through all keys
type AllCommKeys = keyof CommunicationMethods;
type AllCommValues = CommunicationMethods[keyof CommunicationMethods];

typeof / keyof Examples

const data = {

  value: 123,

  text: "text",
  subData: {
    value: false
  }
};
type Data = typeof data;
// type Data = {
// value: number;
// text: string;
// subData: {
//   value: boolean;
// }
const data = ["text 1", "text 2"] as const;
type Data = typeof data[number]; // "text 1" | "text 2"
const locales = [
  {
    locale: "se",
    language: "Swedish"
  },
  {
    locale: "en",
    language: "English"
  }
] as const;
type Locale = typeof locales[number]["locale"]; // "se" | "en"
const currencySymbols = {
  GBP: "£",
  USD: "$",
  EUR: "€"
};
type CurrencySymbol = keyof typeof currencySymbols; // "GBP" | "USD" | "EUR"

16. typing objects

 Call Signature
Enables interfaces to describe functions, this is the optional calling context of the function in this example:
interface ClickListener {

  (this: Window, e: MouseEvent): void;

}

const myListener: ClickListener = e => {
  console.log("mouse clicked!", e);
};

addEventListener("click", myListener);

Construct Signature

// Enables describing classes and constructor functions. A class has two types:
// - The type of the static side
// - The type of the instance side

// The constructor sits in the static side, when a class implements an interface, only the instance side of the class is checked.
interface ClockInterface {
  tick(): void;
}
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

// Using Class Expression
const ClockA: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {}
};

const clockClassExpression = new ClockA(18, 11);

// Using Class Declaration with a Constructor Function
class ClockB implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {}
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

const clockClassDeclaration = createClock(ClockB, 12, 17);

 Excess Properties (Inconsistency)

// Engineers can’t just think of interfaces as “objects that have exactly a set of properties” or “objects that have at least a set of properties”. In-line object arguments receive an additional level of validation that doesn’t apply when they’re passed as variables.



// TypeScript is a structurally typed language. To create a Dog you don’t need to explicitly extend the Dog interface, any object with a breed property that is of type string can be used as a Dog:

interface Dog {
  breed: string;
}

function printDog(dog: Dog) {
  console.log("Dog: " + dog.breed);
}

const ginger = {
  breed: "Airedale",
  age: 3
};

printDog(ginger); // excess properties are OK!

printDog({
  breed: "Airedale",
  age: 3
});
// Excess properties are NOT OK!!
// Argument of type '{ breed: string; age: number; }' is not assignable...

 Index Signature

// Helps to describe Arrays or objects that are used as dictionaries.



// If there are both an index signature and property and/or method signatures in an interface, then the type of the index property value must also be a supertype of the type of the property value and/or method
interface I1 {
  [key: string]: boolean;

  // 'number' is not assignable to string index type 'boolean'
  myProp: number;

  // '() => string' is not assignable to string index type 'boolean'
  myMethod(): string;
}

interface I2 {
  [key: string]: number;
  myProp: number; // OK
}

 Interface Signatures Overview

interface ExampleInterface {

  myProperty: boolean; // Property signature

  myMethod(x: string): void; // Method signature, 'x' for documentation only
  [prop: string]: any; // Index signature
  (x: number): string; // Call signature
  new (x: string): ExampleInstance; // Construct signature

  readonly modifierOne: string; // readonly modifier
  modifierTwo?: string; // optional modifier
}

Object Versus object

// Object is the type of all instances of class Object.



// It describes functionality that is common to all JavaScript objects
// It includes primitive values
const obj1 = {};
obj1 instanceof Object; // true
obj1.toString === Object.prototype.toString; // true

function fn(x: Object) {}
fn("foo"); // OK

// object is the type of all non-primitive values.
function fn(x: object) {}
fn("foo"); // Error: "foo" is a primitive

Type Literal Syntax
Typically used in the signature of a higher-order function.
type MyFunctionType = (name: string) => number;

 17. ambient declarations
 
 Global

declare const $: JQueryStatic;

Module

declare module "foo" {
    export class Bar { ... }
}

 Wildcard module

declare module "text!*" {

    const value: string;

    export default value;
}

18. type guards 

in

interface Dog { woof(): void; }

interface Cat { meow(): void; }


function speak(pet: Dog | Cat) {
    if ('woof' in pet) {
        pet.woof()
    } else {
        pet.meow()
    }
}

(instanceof)

declare value: Date | Error;

if (value instanceof Date) {
    // value is a Date
} else {
    // value is an Error
}

Type predicates

function isThing(val: unknown): val is Thing {
    // return true if val is a Thing
}

if (isThing(value)) {
    // value is of type Thing
}


typeof

declare value: string | number;

if (typeof value === "number") {

    // value is of type Number
} else {
    // value is a string
}
