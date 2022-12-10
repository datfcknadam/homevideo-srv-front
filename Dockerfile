FROM node:16.14.2-alpine as builder
WORKDIR /usr/app/frontend

COPY package.json .
RUN npm install --quiet --production

COPY . .
RUN npm run build

FROM builder

COPY --from=builder /usr/app/frontend/build  .

CMD ["ping"]