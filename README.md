# 新建项目
```
npx create-next-app@latest headline-ai-app
```

# 基础修改
1. 清空默认homepage
2. 清空public下文件
3. 删除globals.css里面除头部tailwind设置之外的样式
4. 安装Tailwind和DaisyUI
 
```
npm i -D daisyui@latest
npm i @tailwindcss/typography
```
5. tailwind.config.js配置修改
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
```

# 开发起步
1. 修改Layouts，参考Tailwind 的媒体查询和布局等，编写一个main div层的classname，把childeren放里面
2. 创建app下的pages页面，里面放独自的目录和page.jsx文件
3. 必要的compoentents文件夹，下新建组件
4. app下新建api目录，下面建目录和router.js文件
5. 修改next.config.js文件，添加api路由的access

# 部署
1. npm run build
2. Linux中安装pm2 Nginx
3. pm2启动项目，可以加到package.json中
4. 修改nginx配置文件，添加反向代理,放到site-available下
```
server {
        server_name 117.114.153.xxx ai.cetv-headline.com;

        listen 443 ssl;
        ssl_certificate /etc/nginx/cert/ai.cetv-headline.com_nginx/xxx.pem;
        ssl_certificate_key /etc/nginx/cert/ai.cetv-headline.com_nginx/xxx.key;


        location / {
         proxy_pass http://localhost:3100;
        }

}

```
5. 测试配置文件是否OK
```
nginx -t
```
6. 重启nginx
```
systemctl restart nginx
```


# 样式参考




# API参考
## coze API
https://api.coze.cn/open_api/v2/chat

需要token，在coze.cn里申请
```
const body = {
        "conversation_id": converstaion_id,
        "bot_id": bot_id,
        "user": user,
        "query": query,
        "stream":false
    }

    const res = await fetch(cozeApiUrl, {
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Host': 'api.coze.cn',
            'Connection': 'keep-alive',
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
```


