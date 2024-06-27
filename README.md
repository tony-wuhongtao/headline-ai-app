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
1. 按需修改项目启动端口，默认是3000，package.json，指定端口为“-p <端口号>”：
```
"dev": "next dev -p 3100",
"start": "next start -p 3100"
```

2. npm run build
如有报错需fix后，再build

3. npm run start
确保build后的项目可使用npm run start运行

4. Linux中安装pm2
安装pm2：
```
sudo npm i pm2 -g
pm2 -v
```
pm2基本命令
```
pm2 start index.js --name test     启动并命名服务为test
pm2 stop test                      停止test这个进程
pm2 restart test                   重启test进程
pm2 list                           显示所有pm2进程
pm2 logs                           查看pm2日志
pm2 delete test                    删除test进程
```

5. 安装nginx：
更新软件包索引
```
sudo apt update
```
安装 Nginx
```
sudo apt install nginx
```
安装完成后，可以使用以下命令来检查 Nginx 是否已成功安装并正在运行
```
systemctl status nginx
```
配置防火墙
```
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
```

6. pm2启动项目，可以加到package.json中
在package.json中添加脚本，XXX为服务名，随便起：
```
"pm2start":"pm2 start npm --name XXX -- run start"
```
在项目根目录下面执行 npm run pm2start
```
npm run pm2start 
```
项目已用pm2启动。

7. 修改nginx配置文件，添加反向代理，放到site-available下
```
server {
    server_name 103.213.161.xxx ai.cetv-headline.com;

	listen 443 ssl;
    ssl_certificate /etc/nginx/cert/ai.cetv-headline.com_nginx/xxx.pem;
    ssl_certificate_key /etc/nginx/cert/ai.cetv-headline.com_nginx/xxx.key;

	location / {
     	proxy_pass http://localhost:3100;
    }
}
```
8. 测试配置文件是否OK：
```
nginx -t
```
9. 重启nginx
```
systemctl restart nginx
```


# 样式参考
css库：
daisy：https://daisyui.com/
tailwind：https://tailwindcss.com/docs/installation

响应式：
```
/** @type {import('tailwindcss').Config} */ 默认的配置，可按需修改像素值范围
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}
```

page中样式举例：
```
<div className="px-4 sm:max-w-xl md:px-16 lg:px-8">
```



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


