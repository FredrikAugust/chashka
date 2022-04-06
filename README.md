# Chashka - a non-functioning coffee brewing tracker

## Overview

`frontend/` frontend

everything else; backend

------

A dummy project to get familiar with new technology

## Backend
- Kotlin
- Spring Boot (created w/ Initializr)
- Spring Boot Data w/ JPA and H2 DB for "persistence" (even though it's only in-mem ;)
- Spring Boot Security for `@PreAuthorize` RBAC
- Auth0 with RBAC for authentication _and_ authorization (OAuth2 + OIDC)
  - Use flows and actions to attach RBAC roles to identity token to render UI based on roles
  - Uses JWKs under the hood to implement proper OAuth2
  - All authenticated users may _see_ coffee types, but only administrators may create new ones
    - This is handled _not_ using the actual roles, but all access tokens will have `permissions` as part of their claims, and we parse these to `Authorizations` in Spring boot and use these to restrict access. This makes expanding this functionality very simple, as you just specify what permissions are requried on each endpoint. Really cool!

## Frontend
- React 18
- `react-query` for data management, local state invalidation, queries+mutations (REST)
- Auth0 React SDK for retrieving Acess+ID tokens from Auth0 to send to backend, and retrieve roles
- Render UI based on roles provided from backend