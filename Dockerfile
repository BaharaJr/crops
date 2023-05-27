FROM node:18-alpine as development
WORKDIR /app
COPY . ./
RUN npm i  --legacy-peer-deps

FROM development as api
WORKDIR /app
RUN npm run package

FROM node:lts-alpine3.16 as release
ENV NODE_ENV production
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /app
COPY --from=api /app/dist/ ./
CMD node main
