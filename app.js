/* eslint-disable global-require */
const express = require('express');
const { parse } = require('url');
const nextApp = require('next');
const path = require('path');

const { loadEnvConfig } = require('@next/env')
loadEnvConfig(__dirname)

const {
  SERVER_PROTOCOL, HTTP_SERVER_PORT, HTTPS_SERVER_PORT,
  API_URL, isDev,
} = require('./config');

const app = nextApp({ dev: isDev });
const handle = app.getRequestHandler();

const customConsoleLog = (...args) => console.log('\u001b[1m\x1b[38;5;208m[CMIT-Client]\u001b[0m', ...args, '\u001b[0m');
const customConsoleError = (...args) => console.log('\u001b[1m\x1b[38;5;208m[CMIT-Client]\u001b[0m', '\u001b[31m>>>> ', ...args, '\u001b[0m');

customConsoleLog('\u001b[38;5;208m---------------App Starting---------------\u001b[0m');
customConsoleLog(`\u001b[36m>> DEV_MODE : ${isDev}\u001b[0m`);
customConsoleLog(`\u001b[36m>> API_URL : ${API_URL}\u001b[0m`);
app.prepare().then(() => {
  const httpApp = express();
  const usingApp = SERVER_PROTOCOL === 'https' ? express() : httpApp;

  usingApp.all('/{*paths}', async (req, res) => {
    const parsedUrl = parse(req.url, true);
    // enable next app
    await handle(req, res, parsedUrl);
  });

  if (SERVER_PROTOCOL === 'https') {
    // http redirect
    httpApp.all('/{*paths}', (req, res, next) => {
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      if (protocol === 'https') {
        next();
      } else {
        const from = `${protocol}://${req.hostname}:${HTTP_SERVER_PORT}${req.url}`;
        const to = `https://${req.hostname}:${HTTPS_SERVER_PORT}${req.url}`;
        // log and redirect
        customConsoleLog(`\u001b[94m>> REDIRECT - [${req.method}]: ${from} -> ${to}\u001b[0m`);
        res.redirect(to);
      }
    });

    const { readFileSync } = require('fs');
    const httpsOptions = {};
    try {
      httpsOptions.key = readFileSync(path.join(__dirname, './private.pem'));
      httpsOptions.cert = readFileSync(path.join(__dirname, './public.pem'));
    } catch (error) {
      customConsoleError('인증키가 없습니다.');
      process.exit(-1);
    }

    require('https').createServer(httpsOptions, usingApp).listen(HTTPS_SERVER_PORT, (err) => {
      if (err) throw err;
      customConsoleLog('\x1b[38;5;208mHttps Server Running at', `\u001b[3m\u001b[4mhttps://localhost:${HTTPS_SERVER_PORT}\u001b[0m`);
    });
  }

  require('http').createServer(httpApp).listen(HTTP_SERVER_PORT, (err) => {
    if (err) throw err;
    customConsoleLog('\x1b[38;5;208mHttp Server Running at', `\u001b[3m\u001b[4mhttp://localhost:${HTTP_SERVER_PORT}\u001b[0m`);
  });
});
