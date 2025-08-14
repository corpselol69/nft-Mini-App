# ---------- stage 1: build ---------------------------------------------------
FROM node:22 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn run build

FROM node:22-alpine

RUN yarn global add serve

COPY --from=builder /app/dist /app

EXPOSE 3002
CMD ["serve", "-s", "/app", "-l", "3002"]