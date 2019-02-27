<%@ page language="java" contentType="text/html; charset=utf-8"  
    pageEncoding="utf-8" import="com.gongfu.entity.*,java.util.*"%>  
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>  
 <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/jquery.table2excel.min.js"></script>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>销售信息</title>
</head>

<body >
<div>
<script   language='javascript'>   
function getshop(){
	var name = {"name":"selname"};
	$.ajax({  
		url:"ShopServlet",//servlet文件的名称
		type:"GET",
		data:name,
		success:function(e){
		//alert("servlet调用成功！");
		}
	});

      }   
  </script>
<form class="sale-info" method="get" action="PreSaleServlet" >
<a href=home.jsp>返回首页</a>
&nbsp;
&nbsp;

	<font size="3" color="">门店</font>
	 <!--  <input type="text" id="shopName" name="shopName" value=""  >-->

<a href="ShopServlet?type=selname">获取门店</a> 
 <!--  <input type="submit" name="type" value="获取门店" onClick="presale.action='ShopServlet?type=123';presale.submit()">  -->
 <!--  <input type="submit" value="获取门店" onClick="getshop()"> -->

<select name="shopName" style="width:160px;"> 
	<option value="">请选择</option>
<c:if test="${!empty sellist}">
<c:forEach items="${sellist}" var="shop">  

		<option value="${shop.getUnitName()}">${shop.getUnitName()}</option>
       
</c:forEach> 
</c:if>
</select>

 
















<!--  
<select name="shopName">
<option value="重庆江津库房">重庆江津库房</option>
<option value="观音桥旗舰店">观音桥旗舰店</option>
<option value="南坪南城大道店">南坪南城大道店</option>
<option value="重庆测试">重庆测试</option>
<option value="昌吉工厂">昌吉工厂</option>
<option value="功夫王（玛纳斯店）">功夫王（玛纳斯店）</option>
<option value="功夫王（友好店)">功夫王（友好店)</option>
<option value="功夫王（明园店)">功夫王（明园店)</option>
<option value="功夫王（蓝一品店)">功夫王（蓝一品店)</option>
<option value="功夫王（小西沟店)">功夫王（小西沟店)</option>
<option value="功夫王（青年路店)">功夫王（青年路店)</option>
<option value="功夫王（文艺店)">功夫王（文艺店)</option>
<option value="功夫王（西北二店)">功夫王（西北二店)</option>
<option value="石桥铺泰兴广场店">石桥铺泰兴广场店</option>
<option value="功南坪万达店">南坪万达店</option>
<option value="功夫王（城市店)">功夫王（城市店)</option>
<option value="功夫王（铁太百店)">功夫王（铁太百店)</option>
<option value="功夫王（南湖店)">功夫王（南湖店)</option>
<option value="功夫王（南湖二期店)">功夫王（南湖二期店)</option>
<option value="功夫王（中央郡店)">功夫王（中央郡店)</option>
<option value="功夫王（莱茵店)">功夫王（莱茵店)</option>
<option value="功夫王（中医院店)">功夫王（中医院店)</option>
<option value="功夫王（长青四队店)">功夫王（长青四队店)</option>
<option value="功夫王（国秀店)">功夫王（国秀店)</option>
<option value="功夫王（国秀店)">功功夫王（国秀店)</option>
<option value="功夫王（果岭店)">功夫王（果岭店)</option>
<option value="功夫王（百信店)">功夫王（百信店)</option>
<option value="功夫王（延安店)">功夫王（延安店)</option>
<option value="功夫王（富友店)">功夫王（富友店)</option>
<option value="功夫王（飞马店)">功功夫王（飞马店)</option>
<option value="功夫王（江南店)">功夫王（江南店)</option>
<option value="功夫王（子午路店)">功夫王（子午路店)</option>
<option value="功夫王（幸福路店)">功夫王（幸福路店)</option>
<option value="功夫王（奇台店)">功夫王（奇台店)</option>
<option value="功夫王（阜康店)">功夫王（阜康店)</option>
<option value="功夫王（植物园店)">功夫王（植物园店)</option>
<option value="功夫王（库尔勒一店)">功夫王（库尔勒一店)</option>
<option value="功夫王（建设路店)">功夫王（建设路店)</option>
<option value="功夫王（伊犁二店)">功夫王（伊犁二店)</option>
<option value="功夫王（红山市场店)">功夫王（红山市场店)</option>
<option value="功夫王（汇嘉园店)">功夫王（汇嘉园店)</option>

<option value="功夫王（丽景水岸店)">功夫王（丽景水岸店)</option>
<option value="功夫王（日月星光)">功夫王（日月星光)</option>
<option value="功夫王（友好超市店)">功夫王（友好超市店)</option>

<option value="功夫王（福润德店)">功夫王（福润德店)</option>
<option value="功夫王（西站店)">功夫王（西站店)</option>
<option value="功夫王（火柴厂店)">功夫王（火柴厂店)</option>

<option value="功夫王（华润万家店)">功夫王（华润万家店)</option>
<option value="功夫王（天山店)">功夫王（天山店)</option>
<option value="功夫王（米泉店)">功夫王（米泉店)</option>


<option value="功夫王（伊犁一店)">功夫王（伊犁一店)</option>
<option value="功夫王（坤怡园店)">功夫王（坤怡园店)</option>
<option value="功夫王（皇城店)">功夫王（皇城店)</option>

<option value="功夫王（粮城店)">功夫王（粮城店)</option>
<option value="功夫王（新大本校店)">功夫王（新大本校店)</option>
<option value="功夫王（星日月光二店店)">功夫王（星日月光二店店)</option>

<option value="功夫王（红十月店)">功夫王（红十月店)</option>
<option value="功夫王（中央名筑)">功夫王（中央名筑)</option>
<option value="功夫王（机场店)">功夫王（机场店)</option>

<option value="乌鲁木齐测试">乌鲁木齐测试</option>
<option value="功夫王（平川路店）">功夫王（平川路店）</option>
<option value="功夫王（人民广场店）">功夫王（人民广场店）</option>

<option value="功夫王（五一店）">功夫王（五一店）</option>
<option value="功夫王（西河坝店)">功夫王（西河坝店)</option>
<option value="功夫王（鄯善店）">功夫王（鄯善店）</option>

<option value="功夫王（西北路店)">功夫王（西北路店)</option>
<option value="功夫王（昊美店）">功夫王（昊美店）</option>
<option value="功夫王（曙光店）">功夫王（曙光店）</option>

<option value="建新东路店">建新东路店</option>
<option value="功夫王（汇轩店)">功夫王（汇轩店)</option>
<option value="功夫王（家乐福店)">功夫王（家乐福店)</option>

<option value="沙坪坝炫地店">沙坪坝炫地店</option>
<option value="功夫王（七一友好店）">功夫王（七一友好店）</option>
<option value="功夫王（沙湾店）">功夫王（沙湾店）</option>

<option value="功夫王（玛纳斯华阳店）">功夫王（玛纳斯华阳店）</option>
<option value="办公室测试">办公室测试</option>
<option value="功夫王（同心店）">功夫王（同心店）</option>


<option value="功夫王（德汇万达店）">功夫王（德汇万达店）</option>
<option value="功夫王（华美店）">功夫王（华美店）</option>
<option value="功夫王（十四街店）">功夫王（十四街店）</option>


<option value="功夫王（吉北庭店）">功夫王（吉北庭店）</option>
<option value="功夫王（美美时尚店）">功夫王（美美时尚店）</option>
<option value="功夫王（阿金山店）">功夫王（阿金山店）</option>
</select>
-->
		&nbsp;
		&nbsp;
<!-- 		<font size="3" color="">商品</font>
		
<select name="productName">
<option value=""></option>
<option value="未知商品(计重)">未知商品(计重)</option>
<option value="未知商品(计数)">未知商品(计数)</option>
<option value="中辣黑凤爪">中辣黑凤爪</option>
<option value="微辣黑凤爪">微辣黑凤爪</option>
<option value="五香凤爪">五香凤爪</option>
<option value="香辣凤爪">香辣凤爪</option>

<option value="Q弹胗子">Q弹胗子</option>
<option value="豆棒">豆棒</option>
<option value="香辣翅根">香辣翅根</option>
<option value="仔鸡巴骨肉">仔鸡巴骨肉</option>
<option value="Q弹凤爪">Q弹凤爪</option>
<option value="黑鸭头">黑鸭头</option>

<option value="黑藕片">黑藕片</option>
<option value="毛豆">毛豆</option>
<option value="麻辣藕片">麻辣藕片</option>
<option value="海带">海带</option>
<option value="五香鸡腿">五香鸡腿</option>
<option value="10元3个鸡腿">10元3个鸡腿</option>

<option value="包装袋">包装袋</option>
<option value="泡凤爪">泡凤爪</option>
<option value="小章鱼">小章鱼</option>
<option value="麻辣二节翅">麻辣二节翅</option>
<option value="麻辣鸭架">麻辣鸭架</option>
<option value="麻辣鸭头1">麻辣鸭头1</option>

<option value="麻辣鸭掌">麻辣鸭掌</option>
<option value="麻辣鸭脖1">麻辣鸭脖1</option>
<option value="特辣鸭脖">特辣鸭脖</option>

<option value="微辣黑鸭脖">微辣黑鸭脖</option>
<option value="微辣黑凤爪">微辣黑凤爪</option>
<option value="黑凤爪">黑凤爪</option>

<option value="黑二节翅">黑二节翅</option>
<option value="黑鸭架">黑鸭架</option>
<option value="黑鸭头1">黑鸭头1</option>

<option value="黑鸭掌">黑鸭掌</option>
<option value="黑鸭脖">黑鸭脖</option>
<option value="香辣鸭肚">香辣鸭肚</option>

<option value="香辣鸭肠">香辣鸭肠</option>
<option value="香辣鸭舌">香辣鸭舌</option>
<option value="香辣鱿鱼">香辣鱿鱼</option>

<option value="香辣凤爪">香辣凤爪</option>
<option value="香辣翅尖">香辣翅尖</option>
<option value="鱼豆腐">鱼豆腐</option>

<option value="海带">海带</option>
<option value="牛皮干">牛皮干</option>
<option value="茶干">茶干</option>

<option value="小鸡腿">小鸡腿</option>
<option value="香辣藕片">香辣藕片</option>
<option value="黑藕片">黑藕片</option>

<option value="五香鸭胗">五香鸭胗</option>
<option value="五香凤爪">五香凤爪</option>
<option value="五香鸭脖">五香鸭脖</option>

<option value="辣油">辣油</option>
<option value="中号袋">中号袋</option>
<option value="麻辣鸭头">麻辣鸭头</option>

<option value="黑鸭脖">黑鸭脖</option>
<option value="黑鸭架">黑鸭架</option>
<option value="黑鸭翅">黑鸭翅</option>

<option value="盐焗凤爪">盐焗凤爪</option>
<option value="料渣">料渣</option>
<option value="药渣">药渣</option>


<option value="可乐">可乐</option>
<option value="香辣翅中">香辣翅中</option>
<option value="鱼豆腐">鱼豆腐</option>

<option value="油卤鸭脖">油卤鸭脖</option>
<option value="香辣翅尖">香辣翅尖</option>
<option value="手套">手套</option>

<option value="毛豆">毛豆</option>
<option value="腐竹">腐竹</option>
<option value="爆力鸡架">爆力鸡架</option>
<option value="可乐">可乐</option>

</select>
 -->
		
	<th><font size="3" color="">日期  从</font></th>
	
	<input type="date"  name="day1" value="2018-06-01" onfocus="WdatePicker({skin:'default',dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})">
	<font size="3" color="">到</font>
	<input type="date"  name="day2" value="2018-06-20"  onfocus="WdatePicker({skin:'default',dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})">
		&nbsp;
		&nbsp;
		&nbsp;
	<input type="submit"  class="search_click" value="预估查询">
	 
        &nbsp;
		&nbsp;
		&nbsp;

        <input type="button" onclick="window.print()" value="打印">  
        <input id="btn" type="button"  value="导出到Excel">
        
      
		<p><font size="2" face="Verdana">
		提示：选择预估的时间间隔；例如：选择2018-01-01到2018-06-30是指预估所需原始数据为6个月
		</font>
		</p>
	</form>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#button1").click(function(){
				document.forms.presale.action="/ShopServlet";
			    document.forms.presale.submit();
				//$("#draw").attr("action","ShopServlet"); 
				//$("form").submit();
			});
			$("#button2").click(function(){
				document.forms.presale.action="/PreSaleServlet";
			    document.forms.presale.submit();
				//$("#draw").attr("action","PreSaleServlet"); 
				//$("form").submit();
			});
</script>
	</div>
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
<div>
  <table id="table2excel" class="dataintable">
<!--  <table id="example"> -->
<tr>
  <th>店名</th>
  <th>商品</th>
  
  <th>预估销量（kg或个）</th>
  
  <th>预估日期</th>
</tr>
  
<c:forEach items="${list}" var="presale">  
    <tr>  
         <td id="shop_id">${presale.getShopName()}</td>  
		 <td>${presale.getProductName()}</td>  
       
     
    	<td style="color:#FF0000"><b>${presale.getTotalSum()}</b></td>
    	
     
    	<td id="date_id">${presale.getSaleDate()}</td>  
    </tr>  
</c:forEach> 

 </table>
</div>
 <!-- <script type="text/javascript">
            $(function() {
                $("#btn").click(function(){
                    $("#table2excel").table2excel({
                        // 不被导出的表格行的CSS class类
                        exclude: ".noExl",
                        // 导出的Excel文档的名称
                        name: "Excel Document Name",
                        // Excel文件的名称
                        filename: "test",
                        //文件后缀名
                        fileext: ".xls",
                        //是否排除导出图片
                        exclude_img: false,
                        //是否排除导出超链接
                        exclude_links: false,
                        //是否排除导出输入框中的内容
                        exclude_inputs: false
                    });
                }); 
            });
        </script> --> 


        <script>
     
    	var shopname = document.getElementById("shop_id").innerHTML;
    	var date = document.getElementById("date_id").innerHTML;
    	var filename = shopname + date;
	$(function(){
        $("#btn").click(function(){
            $("#table2excel").table2excel({
                // 不被导出的表格行的CSS class类
                exclude: ".noExl",
                // 导出的Excel文档的名称，（没看到作用）
                name: "Excel Document Name",
                // Excel文件的名称
               // filename: "myExcelTable"
               
                filename: filename
            });
        });
    });
		</script>
</body>
</html>