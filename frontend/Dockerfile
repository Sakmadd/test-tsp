FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 4173

CMD ["npx", "serve", "-s", "dist", "-l", "4173"]
