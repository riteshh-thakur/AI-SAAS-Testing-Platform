# Use Node.js for build
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Use Nginx for serving static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
