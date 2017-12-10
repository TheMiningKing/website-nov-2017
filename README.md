mining-king-promo-nov-2017
==========================

This is based on the `email-form-promo` email-signup template. It's also a `hexo` blog.

# Setup

Clone to your local machine and install

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

# hexo

## Build static static

```
cd blog
../node_modules/hexo/bin/hexo generate
```

## Create new post

```
cd blog
../node_modules/hexo/bin/hexo new post "Post title"
```

