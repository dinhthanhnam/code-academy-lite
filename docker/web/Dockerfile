FROM node:22
# Chạy với user node có sẵn (UID 1000)
USER node

WORKDIR /var/app

# Run dev nếu chưa build Next app, còn nếu build rồi thì run start
CMD ["npm", "run", "start"]
# CMD ["npm", "run", "dev"]