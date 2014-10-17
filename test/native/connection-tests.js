var helper = require(__dirname + "/../test-helper");
var Client = require(__dirname + "/../../lib/native");
var domain = require('domain');

test('connecting with wrong parameters', function() {
  return console.log('SKIP ERROR TO SEE WHAT HAPPENS')
  var con = new Client("user=asldfkj hostaddr=127.0.0.1 port=5432 dbname=asldkfj");
  assert.emits(con, 'error', function(error) {
    assert.ok(error != null, "error should not be null");
    con.end();
  });

  con.connect();
});

test('connects', function() {
  var con = new Client(helper.config);
  con.connect();
  assert.emits(con, 'connect', function() {
    test('disconnects', function() {
      setTimeout(function() {
        console.log('about to end')
        con.end();
      }, 100)
    })
  })
})

test('preserves domain', function() {
  var dom = domain.create();

  dom.run(function() {
    var con = new Client(helper.config);
    assert.ok(dom === require('domain').active, 'domain is active');
    con.connect(function() {
      assert.ok(dom === require('domain').active, 'domain is still active');
      setTimeout(function() {
        console.log('about to end from domain')
        con.end();
      }, 300)
    });
  });
})
