FROM node:24-alpine


WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN apk add --no-cache openssh-server

RUN echo 'root:password123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

USER root
EXPOSE 2222 3000

RUN chmod +x /app/start.sh
CMD ["/bin/sh", "/app/start.sh"]
