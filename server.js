const wepback = require('webpack');
const webpackConfig = require('./config');

console.error('start...', process.argv);

wepback(webpackConfig, (err, info) => {
  process.stdout.write(info.toString({
    colors: true,
  }));

  if(info.hasErrors()){
    process.stdout.write(info.info);
  }
});
