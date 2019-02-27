<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>功夫王预测系统</title>
<link rel="stylesheet" href="css/style.css" media="screen" type="text/css" />

    <script src="js/modernizr.js"></script>
</head>
<body>
<div id="pig">
  <!--  <div class="ear right"></div>
  <div class="ear left"></div>-->
  <div class="eye right"></div>
  <div class="eye left"></div>
 <!-- <div class="nose"></div>    --> 
</div>
<!-- <form method="post" action="" id="login" style=" margin:150px 380px">  
    <h3>Login<h3>
      
    <fieldset id="inputs" align="center" >  
        <br/>  
    用户名：<input id="un" type="text"  placeholder="UserName"  /> 
        <br/> 
        <br/>  
       密码：<input id="pw" type="password" placeholder="PassWord" />   
		<br/> 
        <br/>
        <input type="submit" class="login-button" value="登陆"/>  
      </fieldset>  
  </form>   -->
  
  <form action="home.jsp" method="post" position="absolute" left="80%" top="50%">
    <div class="input_control">
        <input type="text" class="form_input" placeholder="UserName"/>
    </div>
    <div class="input_control">
        <input type="password" class="form_input" placeholder="PassWord"/>
    </div>
    <div class="input_control">
        <!-- <a id="btn1"><b></b>Join</a> -->
        <input type="submit" class="submit" value="登陆"/>
    </div>
    
</form>
<script src='js/jquery.js'></script>
<div style="text-align:center;clear:both;margin-top:30px">
<script src="/gg_bd_ad_720x90.js" type="text/javascript"></script>
<script src="/follow.js" type="text/javascript"></script>
</div>
</body>
</html>