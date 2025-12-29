FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY sshd_config /etc/ssh/
COPY start.sh ./

RUN apk add openssh \
    && echo "root:Docker!" | chpasswd \
    && chmod +x ./start.sh \
    && cd /etc/ssh/ \
    && ssh-keygen -A

EXPOSE 8000 2222

USER root

ENTRYPOINT [ "./start.sh" ]
