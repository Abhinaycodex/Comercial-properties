 FROM node 

 WORKDIR /myapp

 COPY . . 


 RUN npm install 


 RUN npm run dev

 