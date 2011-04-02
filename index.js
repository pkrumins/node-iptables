var spawn = require('child_process').spawn;

exports.allow = function (rule) {
    rule.target = 'ACCEPT';
    newRule(rule);
}

exports.drop = function (rule) {
    rule.target = 'DROP';
    newRule(rule);
}

exports.reject = function (rule) {
    rule.target = 'REJECT';
    newRule(rule);
}

exports.newRule = newRule;
exports.deleteRule = deleteRule;

function iptables (rule) {
    var args = iptablesArgs(rule);

    var cmd = 'iptables';
    if (rule.sudo) {
        cmd = 'sudo';
        args = ['iptables'].concat(args);
    }

    var proc = spawn(cmd, args);
    proc.stderr.on('data', function (buf) {
        console.error(buf.toString());
    });
}

function iptablesArgs (rule) {
    var args = [];

    if (!rule.chain) rule.chain = 'INPUT';

    if (!rule.action) rule.action = '-A';
    if (rule.chain) args = args.concat([rule.action, rule.chain]);
    if (rule.protocol) args = args.concat(["-p", rule.protocol]);
    if (rule.src) args = args.concat(["--src", rule.src]);
    if (rule.dst) args = args.concat(["--dst", rule.dst]);
    if (rule.dport) args = args.concat(["--dport", rule.dport]);
    if (rule.sport) args = args.concat(["--sport", rule.sport]);

    return args;
}

function newRule (rule) {
    iptables(rule);
}

function deleteRule (rule) {
    rule.action = '-D';
    iptables(rule);
}

