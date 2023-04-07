# How to configure .env

## Put it in .env file:
DJANGO_CONFIG_FILE=configs/env.json

## Create configs/env.json and inside the json data below:

```json
{
    "secret_key": "django-insecure-fvi9g5%_x048l@#4-hzcd@j%hj*%6ij8!io77f4**-$g551@8r",
    "allowed_hosts": ["*"],
    "debug": true,
    "database": {
        "local_db": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": "spadb",
            "USER": "root",
            "PASSWORD": "root",
            "HOST": "db",
            "PORT": 3306
        },
        "production_db": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": "smartp85_spa_db",
            "USER": "smartp85_daniel",
            "PASSWORD": "@5d76o=XG8(&",
            "HOST": "103.6.244.18",
            "PORT": 3306
        }
    },
    "static": {
        "static_root": "./staticfiles/"
    },
    "media": {
        "media_url": "/media/",
        "media_root": "./media/"
    },
    "cors_origin_allow_all": true,
    "cors_allow_credentials": true,
    "cors_origin_whitelist": [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
}
```