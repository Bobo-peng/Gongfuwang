<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>门店信息</title>
</head>
<body>
<!--  <a href=shopinfo.jsp>点击查询</a>-->
<form action="ShopServlet" method="get" name="postform">
<p>shop</p>  
<table border=1 cellpadding="10" cellspacing="0">  
<c:forEach items="${list}" var="shop" begin="2" end ="12">  
    <tr>  
        <td>店名</td>  
        <td>${shop.ShopName}</td>  
    </tr>  
    <tr>  
        <td>日期</td>  
        <td>${shop.CreateDate}</td>  
    </tr>  
    <tr>  
     <td>门店ID</td>  
     <td>${shop.ShopNumber }</td>  
    </tr>  
</c:forEach> 

</table>  
</form>  
</body>
</html>