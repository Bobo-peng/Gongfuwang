package com.gongfu;
import java.sql.*;

import com.gongfu.entity.Shop;  
public class DataBase {
	/* public static void main(String[] args) {  
	        try {  
	            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
	            String url = "jdbc:sqlserver://127.0.0.1:1433;databaseName=MyDatabase";  
	            Connection con = DriverManager.getConnection(url,"sa","123456");  
	            System.out.println("数据库连接成功");  
	            con.close();  
	        }  
	        catch(Exception e) {  
	            System.out.println("数据库连接失败\n" + e.toString());  
	        }  
	    }  
	    */
	
	//三属性，四方法  
	    //三大核心接口  
	    private Connection conn=null;  
	    private PreparedStatement pstmt=null;  
	    private ResultSet rs=null; 
	    
	    String driver="com.microsoft.sqlserver.jdbc.SQLServerDriver";  
	    String url="jdbc:sqlserver://127.0.0.1:1433";  
	    String user="sa";  
	    String password="123456";  
	    //四个方法  
	    //method1：创建数据库的连接  
	    private void getConntion(){  
	    	try{   
	            //加载连接驱动  
	            Class.forName(driver);  
	            //连接sqlserver数据库  
	           conn=DriverManager.getConnection(url,user,password);  
	           System.out.println("数据库连接成功");
	        } catch(ClassNotFoundException e){  
	            e.printStackTrace();  
	        } catch(SQLException e){  
	            e.printStackTrace();  
            }  
	    }
	    
	    //method2:关闭数据库连接  
	    public void closeConn(){  
	        if(rs!=null){  
	            try{  
	                rs.close();  
	            } catch(SQLException e){  
	                e.printStackTrace();  
	            }  
	        }  
	        if(pstmt!=null){  
	            try{  
	                pstmt.close();  
	                  
	            } catch(SQLException e){  
	                e.printStackTrace();  
	            }  
	        }  
	        if(conn!=null){  
	            try{  
	                conn.close();  
	            } catch(SQLException e){  
	                e.printStackTrace();  
	            }  
	        }  
	          
	    }  
	      
	    //method3:专门用于发送增删改语句的方法  
	    public int execOther(final String strSQL, final Object[] params){  
	        //连接  
	        getConntion();  
	        System.out.println("SQL:>"+strSQL);  
	        try{  
	            //创建statement接口对象  
	            pstmt=conn.prepareStatement(strSQL);  
	            //动态为pstmt对象赋值  
	            for(int i=0;i<params.length;i++){  
	                pstmt.setObject(i+1, params[i]);  
	            }  
	            //使用Statement对象发送SQL语句  
	            int affectedRows=pstmt.executeUpdate();  
	            return affectedRows;  
	              
	              
	        } catch(SQLException e){  
	            e.printStackTrace();  
	            return -1;  
	        }  
	    }  
	      
	    //method4:专门用于发送查询语句  
	    public ResultSet execQuery(final String strSQL,final Object[] params){  
	        getConntion();  
	        System.out.println("SQL:>"+strSQL);  
	        try{  
	            pstmt=conn.prepareStatement(strSQL);  
	            for(int i=0;i<params.length;i++){  
	                pstmt.setObject(i+1, params[i]);  
	            }  
	            rs=pstmt.executeQuery();  
	            return rs;  
	        } catch(SQLException e){  
	            e.printStackTrace();  
	            return null;  
	        }  
	    }  
	      

}
