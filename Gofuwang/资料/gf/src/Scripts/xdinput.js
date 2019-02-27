/*
 * input 输入限制 整数，小数
 * @param obj 对象
 * @param e 事件
 * @param name 对象数组自定义名称
 * @param dot 是否小数
 * @param len 小数位数
 */
function keyEvent(obj, e, name, dot, len, negative) {
	var keyCode = e.keyCode ? e.keyCode : e.which;
	if (keyCode == 13 || keyCode == 9 || keyCode == 40) { 	//回车 方向↓ 
        var text = $(name);
        var n = text.length;
        var i = text.index($(obj));
        if (i < n - 1) {
            text.eq(i + 1)[0].focus();
        }
        return false;
	}
	else if (keyCode == 38) {								//方向↑
    	var text = $(name);
        var i = text.index($(obj));
        if (i > 0) {
            text.eq(i - 1)[0].focus();
        }
        return false;
    } else if (keyCode == 8 || keyCode == 46) {      		//退格  删除
        return true;
    } else if ((keyCode >= 48 && keyCode <= 57) || (keyCode>=96 && keyCode <=105)) {     //数字
    	if(e.shiftKey || e.ctrlKey || e.altKey){			//限制Shift Ctrl Alt
    		return false;
    	}
    	if(dot){											//小数长度限制
    		var dotIndex = obj.value.indexOf(".");
    		if (dotIndex > -1 && document.selection && document.selection.createRange ){
    			var selAll = document.selection.createRange();
    			if(obj.value == selAll.text){				//全选
    				obj.value = "";
    				return true;
    			}
    			
    			var sel = document.selection.createRange().duplicate();
        		var range = obj.createTextRange();
        		sel.setEndPoint("StartToStart", range);
        		if(sel.text.length > dotIndex && obj.value.substring(dotIndex + 1).length >= len){
        			return false;
        		}
    		}    	
    		if(dotIndex > -1 && obj.selectionStart>dotIndex && obj.value.substring(dotIndex + 1).length >= len){
    			return false;
    		}
    	}    	
        return true;
    } else if(keyCode == 37){								//方向←     	
    	if (document.selection && document.selection.createRange ){				//IE    		
    		var sel = document.selection.createRange().duplicate();
    		var range = obj.createTextRange();
    		sel.setEndPoint("StartToStart", range);              
            if(sel.text.length > 0) 						//判断光标位置来决定是否移动
            {             	 
            	range.collapse(true); 
            	range.moveEnd('character', sel.text.length-1); 
            	range.moveStart('character', sel.text.length-1);  
            	range.select();
            }    		
    		return false;    	
    	}
    	if(obj.selectionStart==0)
    		return false;
    	if(obj.setSelectionRange){							//Firefox
    		obj.setSelectionRange(obj.selectionStart-1,obj.selectionStart-1);
    	}else{
	    	var r = obj.createTextRange();
	        r.moveStart('character',obj.selectionStart-1); 
    	}
    	return false;    
    } else if(keyCode == 39){								//方向→    	
    	if (document.selection && document.selection.createRange){
    		var sel = document.selection.createRange().duplicate();
    		var range = obj.createTextRange();
    		sel.setEndPoint("StartToStart", range);              
            if(sel.text.length <= obj.value.length) 		//判断光标位置来决定是否移动
            {             	 
            	range.collapse(true); 
            	range.moveEnd('character', sel.text.length+1); 
            	range.moveStart('character', sel.text.length+1);  
            	range.select();
            }    		
    		return false;
    	}
    	if (obj.selectionStart == obj.value.length)
    		return false;
    	if(obj.setSelectionRange){							//Firefox
    		obj.setSelectionRange(obj.selectionStart+1,obj.selectionStart+1);
    	}
    	return false;    
    }else if (keyCode == 110 || keyCode == 190) {    		//小数点
        if (!dot) return false;
        //第一位不能为小数点
        if(trim(obj.value).length==0)
        	return false;
        if(document.selection && document.selection.createRange){//IE
        	var sel = document.selection.createRange();
    		if(sel.text.length > 0){						//有值
	    		if(obj.value.indexOf(sel.text) == 0)		//从0开始选择
	        		return false;
    		}
        }
        if (obj.selectionStart != undefined && obj.selectionStart==0)
        	return false;        	
        if (obj.value.indexOf(".") > -1)
            return false;       	
        return true;
    } else if (keyCode == 109 || keyCode == 189 || keyCode == 173) {    		//负数
        if (!negative) return false;
        return true;
    } else {
        return false;
    }
}

/*
回车向下跳
*/
function EnterEvent(obj, e, name) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) { 	//回车
        var text = $(name);
        var n = text.length;
        var i = text.index($(obj));
        if (i < n - 1) {
            text.eq(i + 1)[0].focus();
        }
        return false;
    }
}

/*
TAB全部
*/
function TabEvent(obj, e, name) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 9) { 	//TAB
        var text = $(name);
        var n = text.length;
        var i = text.index($(obj));
        if (i < n - 1) {
            text.eq(i + 1)[0].focus();
        }
        return false;
    }
}