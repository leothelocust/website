# Let's Encrypt

## Working with NGINX configs locally

Sync your local file to the server (run after every update)
```bash
rsync -rtvpl path/to/local/leviolson.com.conf base-droplet:/etc/nginx/sites-available/
```
Create a symlink in nginx `sites-enabled`
```bash
ssh base-droplet ln -s /etc/nginx/sites-available/leviolson.com.conf /etc/nginx/sites-enabled/
```
Restart Nginx after each `rsync` command
```bash
ssh base-droplet sudo service nginx restart
```

## Setup NGINX for cert creation
Nginx must be minimally configured at this point to allow port 80 to work and not fail trying to access port 443 or redirecting you.  Our main nginx config (below) tries to redirct to HTTPS which would cause Let's Encrypt to fail.

```nginx
server {
    listen 80;
    server_name leviolson.com www.leviolson.com;

    location / {
        proxy_pass http://localhost:3000; # port must match the same as the node app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Sync this file:
```bash
rsync -rtvpl ./leviolson.com.conf base-droplet:/etc/nginx/sites-available/
```
Restart Nginx:
```bash
ssh base-droplet sudo service nginx restart
```

## Create the cert

```bash
sudo certbot certonly --nginx --manual -d leviolson.com -d www.leviolson.com
```

This will start the process of generating a cert for the two domain names provided.

As part of that process it will look for `.well-known/acme-challenge/{file}` where `{file}` is provided by the command output.  The contents of that file are provided as well.

Something like the following will create this file for you:

```bash
echo "long string provided" > {file}
```

After creating the file(s), you can complete the cert process and at that point you need to change the nginx conf file.

## NGINX final state

```nginx
server {
    if ($host = www.leviolson.com) {
        return 301 https://leviolson.com$request_uri;
    }
    server_name leviolson.com www.leviolson.com;

    location / {
        proxy_pass http://localhost:3000; # port must match the same as the node app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/leviolson.com-0001/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/leviolson.com-0001/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = leviolson.com) {
        return 301 https://$host$request_uri;
    }
    if ($host = www.leviolson.com) {
        return 301 https://leviolson.com$request_uri;
    }

    server_name leviolson.com www.leviolson.com;
    listen 80;
    return 404;
}
```

You'll want to verify the location of the `*.pem` files linked in the nginx config above.
```bash
ssh base-droplet ls -al /etc/letsencrypt/live/leviolson.com-0001/
```
This should return something like the following:
```
total 12
drwxr-xr-x 2 root root 4096 Jul 20 18:14 .
drwxr-xr-x 7 root root 4096 Jul 20 19:21 ..
lrwxrwxrwx 1 root root   42 Jul 20 18:14 cert.pem -> ../../archive/leviolson.com-0001/cert1.pem
lrwxrwxrwx 1 root root   43 Jul 20 18:14 chain.pem -> ../../archive/leviolson.com-0001/chain1.pem
lrwxrwxrwx 1 root root   47 Jul 20 18:14 fullchain.pem -> ../../archive/leviolson.com-0001/fullchain1.pem
lrwxrwxrwx 1 root root   45 Jul 20 18:14 privkey.pem -> ../../archive/leviolson.com-0001/privkey1.pem
-rw-r--r-- 1 root root  692 Jul 20 18:14 README
```


Sync this file:
```bash
rsync -rtvpl ./leviolson.com.conf base-droplet:/etc/nginx/sites-available/
```
Restart Nginx:
```bash
ssh base-droplet sudo service nginx restart
```

## Some helpful debugging commands

```bash
pm2 status
```

```bash 
journalctl -xe
```

```bash
sudo ufw status
```

This should include the port you are serving if you wish to have that port accessible to the public as well.