'use strict';

var Instagram = require('instagram-node-lib');

Instagram.set('client_id', '6527838fef5e4f0790a2aa7c9ddbc158');
Instagram.set('client_secret', '80d7a8a4247e498ab6df545f9c5806d2');

Instagram.tags.info({
  name: '15sfest',
  complete: function(data){
    console.log(data);
  }
});

var tagName = '15sfest';
Instagram.tags.subscribe({ 
  object_id: tagName,
  callback_url: "http://15sfest.com/instagram/callback?tag=" + tagName 
});
