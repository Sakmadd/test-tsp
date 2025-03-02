FROM node:20

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV DATABASE_URL="postgresql://postgres:1234@localhost:5432/tsp?schema=public"
RUN npx prisma generate
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000
