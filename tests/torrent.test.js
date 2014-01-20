/*global describe, it */

var /* sinon = require('sinon'), */
    expect = require('chai').expect;

var Torrent = require('../src/torrent');

describe('Torrent', function() {
    var fixtures = {
        first: 'tests/fixtures/animated-overlay.torrent',
        second: 'tests/fixtures/test.torrent'
    };

    it('should be able to read a torrent file', function() {
        Torrent.loadTorrent(fixtures.first, function(err, torrent) {
            expect(torrent.data).to.not.equal(null);
        });
    });

    it('should generate the info hash correctly', function() {
        Torrent.loadTorrent(fixtures.first, function(err, torrent) {
            expect(torrent.get('info_hash')).to.equal('9504b016cc41ccc685349ded214d96adf95627e8');
        });
    });

//    it('should generate the second info hash correctly', function() {
//        Torrent.loadTorrent(fixtures.second, function(err, torrent) {
//            expect(torrent.get('info_hash')).to.equal('ae5625ab3d4ffee94ac3f363fe10342353c26f12');
//        });
//    });


});