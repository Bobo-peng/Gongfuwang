<%@ page language="java" contentType="text/html; charset=utf-8"  
    pageEncoding="utf-8" import="com.gongfu.entity.*,java.util.*"%> 
    <%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>  
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body >
<form action="ShopServlet" method="get">

  <button type="submit" name="type" value="selname" >Submit</button>
</form>

<select style="width:160px;">
	<option value="">请选择</option>
<c:if test="${!empty sellist}">
<c:forEach items="${sellist}" var="shop">  

		<option value="${shop.getShopName()}">${shop.getShopName()}</option>
       
</c:forEach> 
</c:if>
</select>
</body>
</html>

<!-- 
<script   language='javascript'>   
function getshop(){
	var name = {"name":"selname"};
	$.ajax({  
		url:"ShopServlet",//servlet文件的名称
		type:"GET",
		data:name,
		success:function(e){
		alert("servlet调用成功！");
		}
	});

      }   
  </script>
  
 <p>aaaaaaaaaaaa</p>
 <%--
     ArrayList<Shop> list = (ArrayList<Shop>)request.getAttribute("sellist");
  String name = null;
  String name1 = null;
  String name2 = null;
  String name3 = null;
     if(list!=null){
    for(int i =0;i<list.size();i++){
     name = list.get(i).getUnitName();
     name1 = list.get(1).getUnitName();
     name2 = list.get(2).getUnitName();
     name3 = list.get(3).getUnitName();
    out.print(name);
    out.print("abc");
    System.out.println (name); 
    System.out.println ("name"); 
    %>
   
    <td align="center">&nbsp;<%=name%></td>
    <td  align="center">&nbsp;<%=((Shop)list.get(i)).getShopName()%></td>

  </tr>
<%}}%>
 <script>
    var name1 = "<%=name %>";
    var name2 = "<%=name %>";
    var name3 = "<%=name %>";
        alert(name1);
        alert(name2);
        alert(name3);
        alert("servlet！");
    </script>
<c:if test="${!empty sellist}">
<c:forEach items="${sellist}" var="shop">  
    <tr>  
        
		
		<td>${shop.getShopName()}</td>  
        <td>${shop.getShopNumber()}</td>   
     
    	<td>${shop.getCreateDate()}</td>  
    </tr>  
</c:forEach> 
</c:if>


  --%>
