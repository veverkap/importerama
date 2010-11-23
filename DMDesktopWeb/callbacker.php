<html>
  <head>
    <script type="text/javascript">
      function doLoad() {
        parentSandboxBridge.setLocalVar('<?php echo $_GET["code"]; ?>')
      }
    </script>
  </head>
  <body onload="doLoad()">
</body>
</html>