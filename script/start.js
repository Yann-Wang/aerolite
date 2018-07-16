const { execSync, exec, spawn } = require('child_process');
execSync('yarn', { stdio: 'inherit' });
spawn('./node_modules/.bin/webpack', ['--config', 'webpack.prod.js'], { stdio: 'inherit' });
spawn('node', ['./examples/server1.js'], { stdio: 'inherit' })
spawn('node', ['./examples/server.js'], { stdio: 'inherit' })
spawn('node', ['./examples/fileServer.js'], { stdio: 'inherit' })
/*
const cb = (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stdout) {
    console.log(`stdout: ${stdout}`);
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
}

execSync('./node_modules/.bin/webpack --config webpack.prod.js', { stdio: 'inherit' })
exec('node ./examples/server1.js', cb)
exec('node ./examples/server.js', cb)
exec('node ./examples/fileServer.js', cb)
*/
