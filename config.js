const auth = {
  key: '****', // API Key
  transporter: {
    host: 'smtp.163.com', // smtp 服务器
    port: 465, // smtp 端口
    secure: true, // 是否使用 SSL
    auth: {
      user: '****', // 用户名
      pass: '****', // 密码
    },
  },
};

const config = [
  {
    from: '"name" ****@163.com', // 发件人
    to: '****@163.com', // 收件人
    subject: 'Hello 🐏', // 邮件标题
    location: 'CN****', // 城市代码
    name: 'name', // 邮件中称呼的名字
  },
  {
    from: '"name" ****@163.com',
    to: '****@163.com',
    subject: 'Hello 🐏',
    location: 'CN****',
    name: 'name',
  },
];

module.exports = {
  auth,
  config,
};
