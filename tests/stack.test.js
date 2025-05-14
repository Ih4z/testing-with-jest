const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

//Mitt test
test('lägger in tre saker och tar ut dem i omvänd ordning', () => {
  stack.push('chips');
  stack.push('läsk');
  stack.push('godis');


  expect(stack.pop()).toBe('godis');

//Här finns det förväntade felet för att det egentligen ska vara läsk 
/*   expect(stack.peek()).toBe('chips'); */
//Detta är det som ska vara rätt
expect(stack.peek()).toBe('läsk');

//Poppar läsk och chips
  expect(stack.pop()).toBe('läsk');
  expect(stack.pop()).toBe('chips');
});

