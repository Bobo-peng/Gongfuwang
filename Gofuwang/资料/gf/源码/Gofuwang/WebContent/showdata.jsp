<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="css/easyui.css" media="screen" type="text/css"/>
<link rel="stylesheet" type="text/css" href="css/xddialog.css">
<link rel="stylesheet" type="text/css" href="css/style1.css">
<title>功夫王预测系统</title>

</head>
<body >
<divstyle="margin-top:10px;"><h2 class="stroke" align="center" style="color:#ff9900">功夫王订货预测系统</h2><!--#C67171  --></div>

<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/xddialog.js"></script>
<!--  <div class="membder-background addMemo-body" > 
	<div class="addMemo" id="iframe">
		<label>日期</label><input type="text" value=""  id="J-xl"/>
		<div class="clear-both"></div>
		<iframe src="iframe.html" width="30%" height="300" id="iframepage" name="iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>    
	</div>	
	-->
<div style="margin-top:20px;"  class="addMemo" id="iframe">

<form class="sale-info" role="form" method="post" action="SaleServlet">
&nbsp;
<a href=home.jsp><font size="3" >返回首页</font></a>
&nbsp;
&nbsp;
	<font size="3" >门店</font>
	<!--  
	<select name="ShopId" id="ShopId"  style="width: 95%">
             <option  value="0">==请选择==</option>

              <c:forEach items="${list}" var="shop" varStatus="vs">
              <option value="${shop.getUnitName()}" 
              <c:if test="${shop.getUnitName()}">selected</c:if> > 
              </option>
             </c:forEach>
        </select>
        -->
	 
	 <input type="text" id="shopName" name="shopName" value="<%=request.getParameter("shopName")%>"  class="input inputWidth_2">
		&nbsp;
		&nbsp;
	<font size="3" >日期  从</font>
	
	<input type="date"  name="day1" value="2018-06-01" onfocus="WdatePicker({skin:'default',dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})">
	<font size="3">到</font>
	<input type="date"  name="day2" value="2018-06-20"  onfocus="WdatePicker({skin:'default',dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})">
		&nbsp;
		&nbsp;
		&nbsp;
	<input type="submit"  class="search_click" value="查询"/>
	
    <p><font size="2" face="Verdana">
    &nbsp;
	&nbsp;
		提示：该查询为详细交易记录，即该门店在时间区间内所有销售的详细记录
		</font>
		</p>
	</form>
		
</div>

<script type="text/javascript">
$(document).ready(function(){
	var iframe=$("#iframepage").hide();
	$("#J-xl").click(function(){
		iframe.fadeIn();
	});
	$("#shopName").click(function () { jQuery.xdDialog.open("shop1.jsp", { width: 640, height: 420, lock: true, title: "选择门店", opacity: 0 }); });
});
</script>
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
<table class="dataintable">
<tr>
  <th>#</th>
  <th>品类</th>
  <th>单位</th>
  <th>预估出货</th>
</tr>
<!--
<tr>
  <td><i>1</i></td>
  <td>麻辣鸭架</td>
  <td>KG</td>
  <td>0.426</td>
</tr>
<tr>
  <td><i>2</i></td>
  <td>麻辣鸭脖1</td>
  <td>KG</td>
  <td>2.136</td>
</tr>
<tr>
  <td><i>3</i></td>
  <td>特辣鸭脖</td>
  <td>KG</td>
  <td>1.354</td>
</tr>
<tr>
 <td><i>4</i></td>
  <td>微辣黑凤爪</td>
  <td>KG</td>
  <td>6.778</td>
</tr>
<tr>
  <td><i>5</i></td>
  <td>黑凤爪</td>
  <td>KG</td>
  <td>3.136</td>
</tr>
<tr>
  <td><i>6</i></td>
  <td>黑二节翅</td>
  <td>KG</td>
  <td>0.888</td>
</tr>
<tr>
  <td><i>7</i></td>
  <td>黑鸭架</td>
  <td>KG</td>
  <td>0.59</td>
</tr>
<tr>
 <td><i>8</i></td>
  <td>黑鸭头1</td>
  <td>个</td>
  <td>14</td>
</tr>
<tr>
  <td><i>9</i></td>
  <td>麻辣鸭架</td>
  <td>KG</td>
  <td>0.426</td>
</tr>
<tr>
  <td><i>10</i></td>
  <td>麻辣鸭脖1</td>
  <td>KG</td>
  <td>2.136</td>
</tr>
<tr>
  <td><i>11</i></td>
  <td>特辣鸭脖</td>
  <td>KG</td>
  <td>1.354</td>
</tr>
<tr>
 <td><i>12</i></td>
  <td>微辣黑凤爪</td>
  <td>KG</td>
  <td>6.778</td>
</tr>
<tr>
  <td><i>13</i></td>
  <td>黑凤爪</td>
  <td>KG</td>
  <td>3.136</td>
</tr>
<tr>
  <td><i>14</i></td>
  <td>黑二节翅</td>
  <td>KG</td>
  <td>0.888</td>
</tr>
<tr>
  <td><i>15</i></td>
  <td>黑鸭架</td>
  <td>KG</td>
  <td>0.59</td>
</tr>
<tr>
 <td><i>16</i></td>
  <td>黑鸭头1</td>
  <td>个</td>
  <td>14</td>
</tr>
<tr>
  <td><i>1</i></td>
  <td>麻辣鸭架</td>
  <td>KG</td>
  <td>0.426</td>
</tr>
<tr>
  <td><i>2</i></td>
  <td>麻辣鸭脖1</td>
  <td>KG</td>
  <td>2.136</td>
</tr>
<tr>
  <td><i>3</i></td>
  <td>特辣鸭脖</td>
  <td>KG</td>
  <td>1.354</td>
</tr>
<tr>
 <td><i>4</i></td>
  <td>微辣黑凤爪</td>
  <td>KG</td>
  <td>6.778</td>
</tr>
<tr>
  <td><i>5</i></td>
  <td>黑凤爪</td>
  <td>KG</td>
  <td>3.136</td>
</tr>
<tr>
  <td><i>6</i></td>
  <td>黑二节翅</td>
  <td>KG</td>
  <td>0.888</td>
</tr>
<tr>
  <td><i>7</i></td>
  <td>黑鸭架</td>
  <td>KG</td>
  <td>0.59</td>
</tr>
<tr>
 <td><i>8</i></td>
  <td>黑鸭头1</td>
  <td>个</td>
  <td>14</td>
</tr>
<tr>
  <td><i>9</i></td>
  <td>麻辣鸭架</td>
  <td>KG</td>
  <td>0.426</td>
</tr>
<tr>
  <td><i>10</i></td>
  <td>麻辣鸭脖1</td>
  <td>KG</td>
  <td>2.136</td>
</tr>
<tr>
  <td><i>11</i></td>
  <td>特辣鸭脖</td>
  <td>KG</td>
  <td>1.354</td>
</tr>
<tr>
 <td><i>12</i></td>
  <td>微辣黑凤爪</td>
  <td>KG</td>
  <td>6.778</td>
</tr>
<tr>
  <td><i>13</i></td>
  <td>黑凤爪</td>
  <td>KG</td>
  <td>3.136</td>
</tr>
<tr>
  <td><i>14</i></td>
  <td>黑二节翅</td>
  <td>KG</td>
  <td>0.888</td>
</tr>
<tr>
  <td><i>15</i></td>
  <td>黑鸭架</td>
  <td>KG</td>
  <td>0.59</td>
</tr>
<tr>
 <td><i>16</i></td>
  <td>黑鸭头1</td>
  <td>个</td>
  <td>14</td>
</tr>
  -->
</table>


</body>
</html>