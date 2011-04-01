var spawn = require('process').spawn;

exports.allow = function (rule) {
    rule.target = 'ACCEPT';
    iptables(rule);
}

exports.deny = function (rule) {
    rule.target = 'DROP';
    iptables(rule);
}

function iptables (rule) {
    var cmd = 'iptables';
    var args = [];

    if (!rule.chain) rule.chain = 'INPUT';

    if (rule.chain) args = args.concat(["-I", rule.chain]);
    if (rule.protocol) args = args.concat(["-p", rule.protocol]);
    if (rule.src) args = args.concat(["--src", rule.src]);
    if (rule.dst) args = args.concat(["--dst", rule.dst]);
    if (rule.dport) args = args.concat(["--dport", rule.dport]);
    if (rule.sport) args = args.concat(["--sport", rule.sport]);

    if (rule.sudo) {
        cmd = 'sudo';
        args = ['iptables'].concat(args);
    }

    var proc = spawn(cmd, args);
    proc.stderr.on('data', function (buf) {
        console.error(buf.toString());
    });
}

