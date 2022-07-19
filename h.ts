setup:
  addons:
    plan: cleardb:ignite
    as: DATABASE
build:
  docker:
    web: Dockerfile
release:
  dockerfile: Dockerfile
  target: builder
run:
  web: node server.js
