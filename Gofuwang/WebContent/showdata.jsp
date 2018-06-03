<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="css/easyui.css" media="screen" type="text/css" />
<title>功夫王预测系统</title>

</head>
<!-- <body bgcolor="#4A4A4A"> -->
<body bgcolor="color:#B2DFEE">
<h2 class="stroke" align="center" style="color:#C67171">功夫王订货预测系统</h2>
<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>

<div class="membder-background addMemo-body" > <!-- style="float:right" -->
	<div class="addMemo" id="iframe">
		<label>日期</label><input type="text" value=""  id="J-xl"/>
		<div class="clear-both"></div>
		<iframe src="iframe.html" width="30%" height="300" id="iframepage" name="iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>    
	</div>		
</div>

<script type="text/javascript">
$(document).ready(function(){
	var iframe=$("#iframepage").hide();
	$("#J-xl").click(function(){
		iframe.fadeIn();
	});
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
</table>


</body>
</html>