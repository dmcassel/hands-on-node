# Hands-on Node.js: Working with MarkLogic's Node.js Client API

This project is used for hands-on sessions, guided by someone who is familiar
with the MarkLogic Node.js Client API. The goal is that, after going through 
the exercises, a developer will be comfortable using the API to interact with
MarkLogic. 

Knowledge of JavaScript is assumed. 

## Introduction

MarkLogic is a document- and triple-store database. One of the features in
MarkLogic 8 is a client API for Node.js developers. The exercises presented
here will give you a taste of how the Node Client API works. Note that it is
intended to get you started and show the power of the API, but it is not a full
replacement for MarkLogic University's class on the subject.

## Setup

1. [Download](http://developer.marklogic.com/products) and 
[Install](http://docs.marklogic.com/guide/installation/procedures#id_28962) 
MarkLogic 8.
2. Clone the [Geophoto repository][geophoto]. 

  1. cd to a directory where you want to project to be
  2. `git clone https://github.com/marklogic/Geophoto`

3. Follow [Geophoto's setup instructions](https://github.com/marklogic/Geophoto#get-started), including data import.
4. In the hands-on-node directory, run `npm install`. 

## Geophoto

This session is based on the [Geophoto application][geophoto]. Once you've
cloned and set up the application and imported the data, start the application
(see Geophoto's README for instructions).

See MarkLogic University's [Using Node.js: The Geophoto App][mlu-geophoto] On 
Demand video for an overview of the Geophoto application. 

### Features

Things to note in the Geophoto application:

- map view
  - click a marker
  - edit the image metadata
  - see the semantic info
- geo search
  - circle search
  - MarkLogic also supports arbitrary polygons

### Data Model

The database holds three types of data: binary images, metadata to describe
them, and triples to provide context.

### Execution

Trace the steps of editing the title of an image.

- views/partials/edit.jade
- public/js/editor/photoeditor.controller.js (updateTitle)
- public/js/data/photofactory.js (update)
- POST /api/image/update/:id/:update
- routes.js: update -> apiupdate -> updateDocument (read, edit, write)

## Debugging

### Browser-based Debugging

The Node Inspector package lets you debug Node.js code using Chrome's debugger
tools. 

To work with the browser-based debugger, run these commands:

- `npm-debug unit-01/01-read-promise.js`

From there, you'll be able to set breakpoints, step into, out of, and over 
function calls, inspect and even change variables. 

### REPL

Node.js provides a REPL: read/evaluate/print loop. By simply running `node` at
the command line, you start up the Node.js REPL and can experiment with 
commands.

### Built-in Debugging

Harder to use, but always available. Built-in debugging uses the Node REPL. You
can dynamically set breakpoints using the `sb()` command, which sets a 
breakpoint on the current line, or by inserting the `debugger;` command into 
your code (a static breakpoint). See 
[Node's documentation about the debugger][node-debug] for more capabilities. 

- `node debug unit-01/01-read-promise.js`

Notice that there is a space between "node" and "debug", rather than the hyphen
we saw with browser-based debugging. 

## Additional Resources

- MarkLogic University has an instructor-led course on [using MarkLogic with the
Node.js Client API][mlu-ilt-node]

[geophoto]: https://github.com/marklogic/Geophoto
[mlu-geophoto]: http://mlu.marklogic.com/ondemand/aa767d01
[mlu-ilt-node]: http://www.marklogic.com/training-courses/developing-marklogic-applications-i-node-js/
[node-debug]: https://nodejs.org/api/debugger.html
