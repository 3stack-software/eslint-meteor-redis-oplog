/**
 * @fileoverview Ensures MongoDB queries are namespaced when using meteor/cultofcoders:redis-oplog
 * @author Nathan Muir
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



