const http = require('http');
const fs = require('fs');

const PORT = 8000;

const router = {
  routes: [],
  handle: function(req, res) {
    let url = req.url;

    if(req.method === 'GET'){
      let list = router.routes.filter(v => v.regexp.test(url)),
          cb;
      for(let i = list.length - 1; i >= 0; i--){
        if(list[i].path === url){
          cb = list[i];
          break;
        }

        if(!cb || list[i].regexp.source.length > cb.regexp.source.length) cb = list[i];
      }

      if(cb) cb.list.forEach(v => v(req, res));

      console.log(req.method, req.url, req.httpVersion);
      res.end('no source');
    }
  },

  get(path, cb) {
    let routes = this.routes;

    for(let i = routes.length - 1; i >= 0; i--){
      let item = routes[i];
      if(item.path === path) return item.list.push(cb);
    }

    routes.push({ path, regexp: new RegExp(path), list: [cb], });
    console.log(`\u001b[1;40;32m ${path} \u001b[0m route register \u001b[32m success. \u001b[0m`);
  }
}

router.get('/', (req, res) => {
  let html = fs.readFileSync('./index.html');

  res.end(html);
});

router.get('/src', (req, res) => {
  let file = fs.readFileSync(`.${req.url}`);

  res.end(file);
});

router.get('/img', (req, res) => {
  let img = fs.readFileSync(`.${req.url}`);

  res.end(img);
});

let server = http.createServer(router.handle);
server.listen(PORT);

console.log(`server is running...`);