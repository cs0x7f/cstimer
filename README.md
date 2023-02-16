# csTimer

Professional Speedcubing/Training Timer


# Versions and Update Policy

Main version: https://cstimer.net/

Latest version: https://cstimer.net/new/

Source version: https://cstimer.net/src/

[Latest version](https://cstimer.net/new/) and [Source version](https://cstimer.net/src/) will always be the same as the [master](https://github.com/cs0x7f/csTimer/tree/master) branch of this project. While [Main version](https://cstimer.net/) will always be the same as [released](https://github.com/cs0x7f/csTimer/tree/released) branch of this project.

New features will firstly be implemented in [Latest version](https://cstimer.net/new/). After testing for several days, [Main version](https://cstimer.net/) will be updated if appropriate, depends on user feedback for the new function or update.

It is preferred to use HTTPS protocol to visit csTimer. Although HTTP is available, some functions might not work correctly, e.g. stackmatTimer, WCA login, etc.


# Using as Native APP

Currently, csTimer is able to work as a native app on mobile devices owing to [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/). Thus, when you open csTimer by chrome or some other modern browser on mobile devices, it will ask you whether to add csTimer to home screen. Then, you can use csTimer as a native app that also works without network access.


# Translation

If you are willing to help translating cstimer into your native language, please go to [this](https://crowdin.com/project/cstimer) page and select your language. If your native language is not on the list, just contact me and I'll add it.


# Data Storage

Currently, all data (including settings, session data, etc) are stored in user browser's storage. More specificently, all settings are stored in localStorage, while session data (except session meta data) are stored in indexedDB or localStorage if indexedDB is not available.

Therefore, all data will be lost if you clear browser cache. For avoiding data loss, you might use the "export" function to export/import all your data to/from a file, csTimer's server or google storage.

# Data Imported to csTimer's Server / Google Storage

After https://github.com/cs0x7f/cstimer/commit/8280fdab9628c605c9abc1bc4a127e3e84016542, you are able to download data that is uploaded before the latest one from csTimer's Server / Google Storage, which might be useful for a mis-uploading. For Google Storage, csTimer will keep 10 latest uploaded data. For csTimer's server, 10 or more latest uploaded data will be kept. More specificently, I'll keep 10 latest uploaded data while others might be deleted due to our limited disk resource.


# Third-party Deployment

Some functions of csTimer might not work properly for domains except "cstimer.net", especially online-based export/import functions due to callback address verification. If you want to make csTimer work as a part of your own website, it is recommended to use `<iframe>`.

# Building and running csTimer locally

Building csTimer from source code and running it locally may be useful for development or other purposes.
To accomplish this you should have Docker environment available on your development host.
The easest way is to use [Docker Desktop](https://www.docker.com/products/docker-desktop/)
No other is needed because all stuff you need to compile and run this project can be obtained as
publicity avaliable official Docker images for `Java JDK` and `PHP`.

Source distribution includes `./docker/` folder where you can find following scripts:

 - `./docker/build.sh` \
    Use it to build project. It invokes `make` inside `eclipse-temurin:8-jdk-centos7` container
    which have Java JDK required to run Closure complier.

    ```
    $ ./docker/build.sh clean
    $ ./docker/build.sh
    ```

- `./docker/serve.sh` \
    Use it to start local HTTP server serving compiled `dist` directory. It uses `php:apache` image
    that include Apache HTTP server with PHP support. Server also configured to HTTPS protocol.
    If you generated your own SSL certificate and key files, you can place them in
    `./docker/localhost-crt.pem` and `./docker/localhost-key.pem` files accordingly.
    If you don't have such certificates, self-signed certificates will be generated automatically.

    ```
    $ ./docker/serve.sh
    ```

    Localy running instance of csTimer can be accessed by these URLs:

     - HTTP URL: http://localhost:8080/
     - HTTPS URL: https://localhost:8443/

