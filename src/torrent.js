var fs = require('fs'),
    bencode = require('bencode'),
    crypto = require('crypto');

function Torrent() {
    this.data = null;
}

Torrent.prototype.decodeProperty = function(decoded) {
    var descend = ['info', 'files', 'path'];

    if (Array.isArray(decoded)) {
        decoded.forEach(function(item, index) {
            if (Buffer.isBuffer(item)) {
                decoded[index] = item.toString();
            } else {
                decoded[index] = this.decodeProperty(item);
            }
        }.bind(this));

        return decoded;
    }

    for (var property in decoded) {
        if (decoded.hasOwnProperty(property)) {
            if (Buffer.isBuffer(decoded[property])) {
                decoded[property] = decoded[property].toString();
            } else if (descend.indexOf(property) > -1) {
                decoded[property] = this.decodeProperty(decoded[property]);
            }
        }
    }
    return decoded;
};
/*jshint -W106 */
Torrent.prototype.generateInfoHash = function(data) {
    data.info_hash = crypto.createHash('sha1')
                           .update(bencode.encode(data.info))
                           .digest('hex');
};
/*jshint +W106 */

Torrent.prototype.parse = function(data) {
    data = bencode.decode(data);

    this.generateInfoHash(data);

    this.data = this.decodeProperty(data);

    console.log(this.data);
};

Torrent.prototype.get = function(id) {
    if (this.data !== null) {
        if (this.data.hasOwnProperty(id)) {
            return this.data[id];
        }
    }
};

module.exports = {
    loadTorrent: function(src, callback) {
        fs.readFile(src, function(err, data) {
            if (err) {
                return callback(err, null);
            } else {
                var t = new Torrent();

                t.parse(data);

                callback(null, t);
            }
        });
    },
    Torrent: Torrent
};