#!/usr/bin/env node
var child = require("child_process");

var process;

var boot = function() {
    "use strict";

    console.log("*** Starting up child ***");
    process = child.exec("node scripts/bootstrap.js");

    process.stdout.on("data", function(msg) {
        console.log("> " + msg.slice(0, msg.length - 1));
    });

    process.stderr.on("data", function(msg) {
        console.log("! " + msg.slice(0, msg.length - 1));
    });

    process.on("exit", function(id) {
        if (id === 8) {
            console.log("*** Restarting child ***");
            boot();
        }
    });
};

boot();