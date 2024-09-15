FROM node:alpine

WORKDIR /app

# Copy over only package.json file, then install dependencies
COPY ./package.json ./ 

RUN npm install

# Copy rest of files (so if we change any, we don't need to re-install dependencies)
COPY ./ ./

CMD ["npm", "start"]