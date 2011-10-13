var ensure = require('ensure')
  , async  = require('async')
  , cfg    = require('../../cfg/tests.js')
  , nano   = require('../../nano')(cfg)
  , tests    = exports;

tests.auth_user = function (callback) {
  nano.use('_users').insert(
    { "_id"          : "org.couchdb.user:pat"
    , "type"         : "user"
    , "name"         : "pat"
    , "roles"        : []
    , "password_sha" : "fdb2b8f8ae582440fbd11786fd9afd90920b42a1"
    , "salt"         : "659b9645544dfc82124b7fb07a0bd5f9"
    }, function(err,user) {
      nano.auth('pat', '123', function(e,b,h){ callback(e,user.rev,b,h); });
    });
};

tests.auth_user_ok = function (err,rev,response,headers) {
  nano.use('_users').destroy('org.couchdb.user:pat',rev);
  this.t.notOk(err);
  this.t.equal(response,""); // tests go here
  this.t.equal(headers,"");  // header tests go here
};

ensure(__filename,tests,module,process.argv[2]);