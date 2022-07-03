'use strict';
const sharp = require('sharp');
const fs = require('fs');

module.exports = function(PostImage) {
    PostImage.upload = function(ctx, options, acces_token, post_id, cb) {
        if (!options) {options = {}};

        ctx.req.params.container = 'postImages';
        if (!fs.existsSync('./server/storage/' + ctx.req.params.container)) {
            fs.mkdirSync('./server/storage' + ctx.req.params.container);
        }
        PostImage.app.models.ImageFile
    }

    PostImage.remoteMethod(
        'upload',
    {
        description: 'Uploads a file',
        accepts: [
            {arg: 'ctx', type: 'object', http: {source: 'context'}},
            {arg: 'options', type: 'object', http: {source: 'query'}},
            {arg: 'acces_token', type: 'string'},
            {arg: 'post_id', type: 'string'}
        ],
        returns: {
            arg: 'fileObject', type: 'objects', root: true
        },
        http: {verb: 'post'}
    }
    )
};
