website-nov-2017
================

Preserved here for archival purposes. You can view the current deployment at [theminingking.com](https://theminingking.com).

This is based on the [email-form-promo](https://github.com/RaphaelDeLaGhetto/email-form-promo) email-signup template. It's also a `hexo` blog.

# Setup

Clone to your local machine and install:

```
npm install
```

# Development server

```
npm start
```

# Test

```
npm test
```

# Production                   

Clone and install:             

```
npm install --production       
```

## Set up environment          
  
Paste the following into a `.env` file:
  
```
TITLE="Email Form Promo"
# Email
CONTACT=you@example.com
FROM=noreply@example.com
PASSWORD=
```

## sitemap.xml

The blog and the promo page have their own `sitemap.xml` files. If the promo page is updated, be sure to update the file in `public/`. The blog file is generated automatically and is located in `public/blog`.

# hexo

`hexo` has its own package dependencies, which need to be installed:

```
cd blog
npm install
```

All `hexo` operations need to be performed within the `blog/` directory.

## Build static static

```
./node_modules/hexo/bin/hexo generate
```

## Create new post

```
./node_modules/hexo/bin/hexo new post "Post title"
```

