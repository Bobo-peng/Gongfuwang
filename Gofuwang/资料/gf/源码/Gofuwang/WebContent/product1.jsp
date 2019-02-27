<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>商品</title>
</head>
<body>
<style type="text/css">

table.dataintable {
	margin-top:15px;
	border-collapse:collapse;
	border:1px solid #aaa;
	width:100%;
	}

table.dataintable th {
	vertical-align:baseline;
	padding:5px 15px 5px 6px;
	background-color:#3F3F3F;
	border:1px solid #3F3F3F;
	text-align:left;
	color:#fff;
	}

table.dataintable td {
	vertical-align:text-top;
	padding:6px 15px 6px 6px;
	border:1px solid #aaa;
	}

table.dataintable tr:nth-child(odd) {
	background-color:#F5F5F5;
}

table.dataintable tr:nth-child(even) {
	background-color:#fff;
}


</style>
<div><a href=home.jsp>返回首页</a>
&nbsp;
&nbsp;</div>
<table class="dataintable">
<tr>
  <th>商品</th>
  <th>商品简称</th>
  <th>商品号</th>
  <th>价格</th>
  <th>单位</th>
  <th>更新日期</th>
</tr>

<c:forEach items="${list}" var="product">  
    <tr>  
        <td><b>${product.getProductName()}</b></td>  	
		<td>${product.getSimpleName()}</td>  
        <td>${product.getPluNo()}</td>   
    	<td>${product.getPurchasePrice()}</td> 
    	<td>${product.getUnitName()}</td> 
    	<td>${product.getUpdateDate()}</td> 
    </tr>  
</c:forEach> 
 
</body>
</html>