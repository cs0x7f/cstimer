<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <iframe width="1000" height="500" src="http://localhost:8000/src/"></iframe> 
    <script>
      const iframe = document.querySelector('iframe');
      iframe.addEventListener("load", function() {
        iframe.contentWindow.api.setInputModeToVirtual()
        iframe.contentWindow.api.importScrambles('1. R L \n 2. U D')
        iframe.contentWindow.api.regSolvesListener(console.log)
      });
    </script>
  </body>
</html>
