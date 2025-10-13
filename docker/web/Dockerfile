FROM node:22
# Chạy với user node có sẵn (UID 1000)
USER node

WORKDIR /var/www

COPY --chown=node:node package.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
