import {
  parser as Parser,
  parse,
  parseWithoutProcessing,
  Visitor,
} from '@handlebars/parser';

import runtime from './handlebars.runtime';

// Compiler imports
import AST from './handlebars/compiler/ast';
import { Compiler, compile, precompile } from './handlebars/compiler/compiler';
import JavaScriptCompiler from './handlebars/compiler/javascript-compiler';

import noConflict from './handlebars/no-conflict';

/**
 * @callback Compile
 * @param {string} input
 * @param {import('../types').CompileOptions} options
 * @returns {import('../types').HandlebarsTemplateDelegate}
 */

/**
 * @callback Precompile
 * @param {string} input
 * @param {import('../types').CompileOptions} options
 * @returns {string}
 */

/**
 * @typedef HandlebarsNamespace
 * @prop {Compile} compile
 * @prop {Precompile} precompile
 * @prop {typeof AST} AST
 * @prop {typeof Compiler} Compiler
 * @prop {typeof JavaScriptCompiler} JavaScriptCompiler
 * @prop {typeof Parser} Parser
 * @prop {typeof parse} parse
 * @prop {typeof parseWithoutProcessing} parseWithoutProcessing
 */

/**
 * @typedef HandlebarsToplevel
 * @prop {typeof Visitor} Visitor
 * @prop {typeof inst} default
 */

/**
 * @typedef {import('./handlebars.runtime').HandlebarsRuntime & HandlebarsNamespace} HandlebarsEnvironment
 */

let _create = runtime.create;
function create() {
  /** @type {HandlebarsEnvironment} */
  let hb = _create();

  hb.compile = function (input, options) {
    return compile(input, options, hb);
  };
  hb.precompile = function (input, options) {
    return precompile(input, options, hb);
  };

  hb.AST = AST;
  hb.Compiler = Compiler;
  hb.JavaScriptCompiler = JavaScriptCompiler;
  hb.Parser = Parser;
  hb.parse = parse;
  hb.parseWithoutProcessing = parseWithoutProcessing;

  return hb;
}

/** @type {HandlebarsEnvironment & HandlebarsToplevel} */
let inst = create();
inst.create = create;

noConflict(inst);

inst.Visitor = Visitor;

inst['default'] = inst;

export default inst;
