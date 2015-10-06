Unit 2 shows how to use Node.js's built-in debugging while working with 
MarkLogic's Node Client API. 

In this unit, we will cover:

- Running in debug mode
- [Node Inspector](https://github.com/node-inspector/node-inspector)
- REPL
- setting breakpoints
  - statically ("debugger")
  - dynamically (sb)
- debugger commands (next, step, out, run, cont, watch)
- JSHint -- reminder to remove "debugger" statements

## Browser-based Debugging

The Node Inspector package lets you debug Node.js code using Chrome's debugger
tools. 

To work with the browser-based debugger, run these commands:

- from the project root: `npm install node-inspector`
- from the unit-02 directoy: `npm-debug 01-read-promise.js`

From there, you'll be able to set breakpoints, step into, out of, and over 
function calls, inspect and even change variables. 

## REPL

Node.js provides a REPL: read/evaluate/print loop. By simply running `node` at
the command line, you start up the Node.js REPL and can experiment with 
commands.

## Built-in Debugging

Harder to use, but always available. Built-in debugging uses the Node REPL. You
can dynamically set breakpoints using the `sb()` command, which sets a 
breakpoint on the current line, or by inserting the `debugger;` command into 
your code (a static breakpoint). See [Node's documentation about the debugger][1] for more capabilities. 

- from the unit-02 directory: `node debug 01-read-promise.js`

Notice that there is a space between "node" and "debug", rather than the hyphen
we saw with browser-based debugging. 

[1]: https://nodejs.org/api/debugger.html
