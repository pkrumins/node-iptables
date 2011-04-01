This is a node.js module for controlling iptables. It's very basic just for
what we need at http://browserling.com.

It was written by Peteris Krumins (peter@catonmat.net).
His blog is at http://www.catonmat.net  --  good coders code, great reuse.

------------------------------------------------------------------------------

Here is an example usage:

    var iptables = require('iptables');

    iptables.allow({
        protocol : tcp,
        src : '10.1.1.5',
        dport : 34567,
        sudo : true
    });

    iptables.deny({
        protocol : 'tcp',
        dport : 34567,
        sudo : true
    });

This allows connections to port 34567 from 10.1.1.5 and denies connections to
the same port from everyone else.

------------------------------------------------------------------------------

Ps. I once wrote an article on iptables on my blog, check it out:

http://www.catonmat.net/blog/traffic-accounting-with-iptables


Sincerely,
Peteris Krumins
http://www.catonmat.net

