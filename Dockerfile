FROM node:12.14.1
#Set working dir in the container to
WORKDIR /API
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /API

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . ./API
EXPOSE 8080
CMD [ "node", "server/app.js" ]

#nodemon server/app.js