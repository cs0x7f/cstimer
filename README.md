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


# Data Storage

Currently, all data (including settings, session data, etc) are stored in user browser's storage. More specificently, all settings are stored in localStorage, while session data (except session meta data) are stored in indexedDB or localStorage if indexedDB is not available.

Therefore, all data will be lost if you clear browser cache. For avoiding data loss, you might use the "export" function to export/import all your data to/from a file, csTimer's server or google storage.


# Third-party Deployment

Some functions of csTimer might not work properly for domains except "cstimer.net", especially online-based export/import functions due to callback address verification. If you want to make csTimer work as a part of your own website, it is recommended to use <iframe>.
