FROM node:14-alpine3.13

# 项目地址（国内加速）
ARG gitUrl="https://ghproxy.com/https://github.com/nn200433/node-metaweblog-api-adaptor.git"

# 定义环境变量
ENV TZ=Asia/Shanghai

# 安装一些常用组件
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \ 
	apk add -U --no-cache \
	sudo \
	g++ \
	gcc \
	libev-dev \
	libevent-dev \
	libuv-dev \
	make \
	ca-certificates \
	bash \
	curl \
	git \
	openssh \
	openssl-dev \
	alpine-sdk \
	python3 py3-pip \
	tzdata && \
	cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
	echo ${TZ} > /etc/timezone && \
	apk del tzdata && \
	mkdir -p /home

# 下载项目
RUN cd /home && \
    git clone --depth=1 "${gitUrl}"  metaweblog-api && \
    cd metaweblog-api && chmod +x entrypoint.sh

# 编译项目
RUN cd /home/metaweblog-api && \
    npm config set unsafe-perm true && \
    npm config set registry https://registry.npm.taobao.org && \
    yarn config set registry http://registry.npm.taobao.org && \
    npm install -g pnpm && \
    yarn install

# 指定默认工作目录
WORKDIR /home/metaweblog-api

# 默认3000端口
EXPOSE 3000/tcp

ENTRYPOINT ["/home/metaweblog-api/entrypoint.sh"]