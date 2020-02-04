FROM node:12.14.1
#Set working dir in the container to
WORKDIR /Client
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /Client

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . ./Client
EXPOSE 5000
CMD [ "npm", "start" ]

#nodemon server/app.js