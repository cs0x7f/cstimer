# csTimer

A Professional Speedcubing/Training Timer


# Versions and Update Policy

Main version: [cstimer.net](https://cstimer.net/)

Latest version: [cstimer.net/new](https://cstimer.net/new/)

Source version: [cstimer.net/src](https://cstimer.net/src/)

The [latest version](https://cstimer.net/new/) and the [source version](https://cstimer.net/src/) will always be the same as the [master](https://github.com/cs0x7f/csTimer/tree/master) branch of this project. While the [main version](https://cstimer.net/) will always be the same as the [released](https://github.com/cs0x7f/csTimer/tree/released) branch of this project.

New features will first be implemented into the [latest version](https://cstimer.net/new/). After testing for several days, the [main version](https://cstimer.net/) will be updated if appropriate, with dependencies on user feedback for the new function or update, among other factors.

It is preferred to use the HTTPS protocol to visit csTimer. Although an HTTP protocol is available, some functions might not work correctly, for example - Stackmat Timer connection, WCA Login, etc.


# Using as a Native App

Also, csTimer can work as a native app on mobile devices using [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/). Thus, when you open csTimer by Chrome or some other modern browser on mobile devices (and some computers), it will ask you whether to add csTimer to the home screen. Then, you can use csTimer as a native app that also works without network access.


# Translation

If you are willing to help translate csTimer into your native language, please go to the [csTimer Crowdin Project](https://crowdin.com/project/cstimer) page and select your language. If your native language is not on the list, please contact me and I'll add it!


# Data Storage

Currently, all data (including settings, session data, etc) is stored in the user's browser's storage. More specifically, all settings are stored in your browser's local storage, while session data (except session metadata) are stored in the indexed database or the local storage if the indexed database is not available.

Therefore, all data will be lost if you clear your browser cache or cookies. For avoiding data loss, you might use the export function to export/import all your data to/from a file, csTimer's server or Google storage.

# Data Imported to csTimer's Server / Google Storage

After [commit/8280fdab9628c605c9abc1bc4a127e3e84016542](https://github.com/cs0x7f/cstimer/commit/8280fdab9628c605c9abc1bc4a127e3e84016542), you can download data that is uploaded before the latest one from csTimer's server / Google storage, which might be useful for mistakenly making an upload. For Google storage, csTimer will keep the 10 latest uploaded data. For csTimer's server, 10 or more latest uploaded data will be kept. More specifically, it'll keep the last 10 uploads, while others might be deleted due to our limited disk resources.

# Third-party Deployment

Some functions of csTimer might not work properly for domains except `cstimer.net` and it's development version URLs, especially online-based export/import functions due to callback address verification. If you want to make csTimer work as a part of your website, it is recommended to use an `<iframe>` element.
