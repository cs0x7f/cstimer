# Translation Guide

Firstly, thank you for the willingness of the translation.

The language files of cstimer is located in [src/lang](https://github.com/cs0x7f/cstimer/tree/master/src/lang), and are named by [browser language code](http://www.metamodpro.com/browser-language-codes).
For example, English translation files are [en.js](https://github.com/cs0x7f/cstimer/tree/master/src/lang/en.js) and [en.php](https://github.com/cs0x7f/cstimer/tree/master/src/lang/en.php), 
Chinese translation files are [cn.js](https://github.com/cs0x7f/cstimer/tree/master/src/lang/cn.js) and [cn.php](https://github.com/cs0x7f/cstimer/tree/master/src/lang/cn.php),
Korean translation files are [ko.js](https://github.com/cs0x7f/cstimer/tree/master/src/lang/ko.js) and [ko.php](https://github.com/cs0x7f/cstimer/tree/master/src/lang/ko.php), etc.

Most of sentences or words in main UI are defined in *.js files, including all options, scramble types, tools, etc. 
Only the about and related documents (opened by click the cstimer logo) are defined in *.php files.
Generally speaking, *.js file is more important than *.php file, and should be translated with higher priority.

To translate the timer, you should create a new .js file and a new .php file whose file name is determined by your language code.

For the *.js file, there are many quoted sentences or words to be translated. You should translate sentences or words quoted by single quotation marks but DO NOT modify anything quoted by double marks. For the *.php file, just keep the values in angle brackets.

Once you finish your translation, there are two ways to make your translation works. 
 - If you are familiar with github, you can add the two translated files to your fork and pull a request. I will check and merge it as soon as possible.
 - Otherwise, you can send the translated files (*.js and *.php) to me by email (cs0x7f@gmail.com) and I will manually add them.
