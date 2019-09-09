const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const { auth, config } = require('./config');

console.log(config);

const main = function () {
  for (let cfg of config) {
    fetch('https://free-api.heweather.net/s6/weather/forecast?location=' + cfg.location + '&key=' + auth.key)
      .then(res => res.json())
      .then(async json => await send(json2html(json, cfg), cfg).catch(console.error));
  }
}

const json2html = function (json, cfg) {
  const obj = json['HeWeather6'][0]['daily_forecast'];
  let html = cfg.name + '，早上好' + '<br>';
  html += '<img src="http://dl.weshineapp.com/gif/20190524/ce5fb80cb90597a5a670d42dd5c66caf.gif"><br>';
  const it = 0;
  html += '今天是 ' + obj[it]['date'] + '<br>' +
    '日间天气：' + obj[it]['cond_txt_d'] + '<br>' +
    '夜间天气：' + obj[it]['cond_txt_n'] + '<br>' +
    '最高气温：' + obj[it]['tmp_max'] + '℃' + '<br>' +
    '最低气温：' + obj[it]['tmp_min'] + '℃' + '<br>' +
    '日出时间：' + obj[it]['sr'] + '<br>' +
    '日落时间：' + obj[it]['ss'] + '<br>';
  html += '出门请记得带把伞<br>';
  html += json['HeWeather6'][0]['basic']['parent_city'] + ' ' + json['HeWeather6'][0]['basic']['location'];
  return html;
}

async function send(html, cfg) {
    let transporter = nodemailer.createTransport(auth.transporter);
    let info = await transporter.sendMail({
        from: cfg.from,
        to: cfg.to,
        subject: cfg.subject,
        html: html
    });
    console.log('Message sent: %s', info.messageId);
}

main();
