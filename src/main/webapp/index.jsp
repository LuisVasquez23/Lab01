<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Lab01</title>
    
   <jsp:include page="./layout/css.jsp" />
    
  </head>
  <body>
      
    <jsp:include page="./layout/navbar.jsp" />
    
    <div class="container pt-4">
        <h1>Welcome </h1>
    </div>
    
    
    <jsp:include page="./layout/js.jsp" />
   
    <script>
        setTimeout(()=>{
            hiddeLoader();
        },1000);
    </script>
    
  </body>
</html>
