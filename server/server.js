// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

app.models.user.afterRemote('create', (ctx, user, next) => {
  app.models.Profile.create({
    first_name: user.username,
    created_at: new Date(),
    userId: user.id
  }, (err, result) => {
    if (!err && result) {
      console.log('new profile created succesfully', result)
    } else {
      console.log('an error has ocurred', err)
    }
    next();
  })
})

app.models.Role.find({where: {name: 'admin'}}, (err, role) => {
  if (!err && role) {
    console.log('No error, role is', role);
    if (role.length === 0) {
      app.models.Role.create({
        name: 'admin',
      }, (err2, result) => {
        if (!err2 && result) {
          app.models.user.findOne((usererr, user) => {
            if (!usererr && user) {
              result.principals.create({
                principalType: app.models.RoleMapping.USER,
                principalId: user.id,
              }, (err3, principal) => {
                console.log('Created principal', err3, principal)
              })
            }
          })
        }
      })
    }
  }
})

app.models.Role.find({where: {name: 'editor'}}, (err, role) => {
  if (!err && role) {
    console.log('No error, role editor is', role);
    if (role.length === 0) {
      app.models.Role.create({name: 'editor'}, (err2, result) => {
        if (!err2 && result) {
          console.log('editor role created succesfully', err2, result);
        }
      })
    }
  }
})