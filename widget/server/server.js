const serve = require('koa-static');
const mount = require('koa-mount');
const webpack = require('webpack');
const path = require('path');
const cors = require('koa-cors');
const Koa = require('koa');
const root = path.join(__dirname, '../');
const render = require('koa-ejs');

const app = new Koa();

app.use(cors());
app.use(mount('/dist', serve(path.join(root, '/dist'))));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'index',
    viewExt: 'ejs',
    cache: false,
    debug: true
});

app.use(async function (ctx) {
    await ctx.render('index', { assetsPath: './dist/' });
});


app.use(async function errorHandler(next) {
    try {
        await next;
    } catch (err) {
        console.error(err);
        this.status = err.status || 500;
        this.body = 'Internal Server Error';
        this.app.emit('error', err, this);
    }
});


app.listen(3339, function () {
    console.log('listening on 3339')
});

module.exports = app;
