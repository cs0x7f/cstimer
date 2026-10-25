# csTimer

Professional Speedcubing/Training Timer

# Versions and Update Policy

Main version: https://cstimer.net/

Latest version: https://cstimer.net/new/

Source version: https://cstimer.net/src/

The [Latest version](https://cstimer.net/new/) and the [Source version](https://cstimer.net/src/) are always kept in sync with the [master](https://github.com/cs0x7f/csTimer/tree/master) branch of this project, while the [Main version](https://cstimer.net/) tracks the [released](https://github.com/cs0x7f/csTimer/tree/released) branch.

New features are first implemented in the [Latest version](https://cstimer.net/new/). After a few days of testing, the [Main version](https://cstimer.net/) is updated if appropriate, depending on user feedback on the new features.

HTTPS is recommended when visiting csTimer. HTTP still works, but some features may not function correctly, e.g. the Stackmat timer or WCA login.

# Using as a Native App

csTimer can work as a native app on mobile devices thanks to [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/). When you open csTimer in Chrome or another modern browser on a mobile device, it will ask whether to add csTimer to your home screen. You can then use csTimer like a native app, including offline.

# Translation

[![Crowdin](https://badges.crowdin.net/cstimer/localized.svg)](https://crowdin.com/project/cstimer)

If you would like to help translate csTimer into your native language, go to [this page](https://crowdin.com/project/cstimer) and select your language. If your language is not listed, contact me and I will add it.

# Data Storage

Currently, all data (including settings, session data, etc.) is stored in the browser. More specifically, settings are stored in localStorage, while session data (except session metadata) is stored in IndexedDB, or in localStorage if IndexedDB is unavailable.

As a result, all data will be lost if you clear the browser cache. To avoid data loss, use the "export" function to export or import all your data to/from a file, csTimer's server or Google Storage.

# Data Imported to csTimer's Server / Google Storage

Since [8280fda](https://github.com/cs0x7f/cstimer/commit/8280fdab9628c605c9abc1bc4a127e3e84016542), you can download backups other than the most recent one from csTimer's server or Google Storage, which is useful if you uploaded data by mistake. Google Storage keeps the 10 most recent uploads. csTimer's server keeps at least 10 recent uploads; older ones may be deleted due to limited disk space.

# Third-party Deployment

Some features of csTimer may not work properly on domains other than "cstimer.net", especially online export/import, due to callback URL verification. If you want to use csTimer as part of your own website, embedding it via an `<iframe>` is recommended.

# csTimer Module

Since [cb6c4266](https://github.com/cs0x7f/cstimer/commit/cb6c42667dc5e68717b2d5ac8fb0623f87a5f1cd), you can use some csTimer features through the npm package [cstimer_module](https://www.npmjs.com/package/cstimer_module), e.g. generating large amounts of scrambles. For usage details, refer to the npm page. If you run into any problems, please open an issue in this repository.
