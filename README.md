This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Endpoint

[/api/middleware](https://api.terwer.space/api/middleware)

  - [/api/middleware/xmlrpc](https://api.terwer.space/api/middleware/xmlrpc)

  - [/api/middleware/fetch](https://api.terwer.space/api/middleware/fetch)

```bash
curl --location 'http://localhost:3000/api/middleware/fetch' \
--header 'Content-Type: application/json' \
--data '{
    "fetchParams": {
        "apiUrl": "http://127.0.0.1:6806/api/system/version",
        "fetchOptions": {
            "method": "POST"
        }
    }
}'
```

```json
{
    "headers": {
        "status": 200,
        "statusText": "OK"
    },
    "body": {
        "code": 0,
        "msg": "",
        "data": "2.10.14"
    }
}
```

  - [/api/middleware/image](https://api.terwer.space/api/middleware/image)

[/api/translate?q=测试](https://api.terwer.space/api/translate?q=测试)

[/api/jieba?q=这是测试文字](https://api.terwer.space/api/jieba?q=这是测试文字)

## 最近更新

### 2024-03-01

1、返回结果支持 cookie，后续所有 cors 对应的 header 同意、、统一放在 body 的 "cors-received-headers" 字段

### 2023-11-12

1、jieba 更换为 node-rs

2、docker 更换为国内镜像。

3、新增调用 `curl` 调用实例

### 2023-08-14

1、新增image代理

### 2023-01-11

1、新增xmlrpc代理

2、新增fetch代理

### 2022-07-27

1、新增中文分词服务

### 2022-07-24

1、新增Google翻译服务

## Getting Started

environment:

```
node = 16.20.2
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Docker

### docker

```bash
docker run -itd --name=metaweblog-api -p 6333:3000 -e TZ=Asia/Shanghai --restart=unless-stopped nn200433/metaweblog-api:latest
```

### docker-compose

```yaml
version: '3'
services:
  metaweblog-api:
    image: nn200433/metaweblog-api:latest
    container_name: metaweblog-api
    restart: unless-stopped
    ports:
      - 6333:3000
    environment: 
      - TZ=Asia/Shanghai
```

## Nginx

### Installation

The nginx docker installation can be done using:

1. [nginxWebUI](https://www.nginxwebui.cn/product.html)
2. [Nginx Proxy Manager](https://nginxproxymanager.com/guide/#quick-setup)

### Configuration

```nginx
server {
    # modify
    server_name <your domain>;
    
    listen 443 ssl http2;
    
    # modify
    ssl_certificate <your ssl pem file path>;
    ssl_certificate_key <your ssl key file path>;
    
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    listen 80;
    if ($scheme = http) {
      return 301 https://$host:443$request_uri;
    }

    underscores_in_headers on;

    # blog
    location / {
      proxy_pass http://127.0.0.1:8080;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Host $http_host;
      proxy_set_header X-Forwarded-Port $server_port;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_redirect http:// https://;
    }

    # metaweblog-api
    location /api {
      proxy_pass http://127.0.0.1:6333;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Host $http_host;
      proxy_set_header X-Forwarded-Port $server_port;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_redirect http:// https://;
    }
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
