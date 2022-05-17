const proxy = [
    {
      context: '/apipag',
      target: 'https://ws.sandbox.pagseguro.uol.com.br',
      pathRewrite: {'^/apipag' : ''},
      changeOrigin: true,
      headers: {
        "Connection": "keep-alive"
        },
    },
    {
      context: '/apieq',
      target: 'https://ma.equatorialenergia.com.br',
      pathRewrite: {'^/apieq' : ''},
      changeOrigin: true,
      headers: {
        "Connection": "keep-alive"
        },
    }
  ];
  module.exports = proxy;