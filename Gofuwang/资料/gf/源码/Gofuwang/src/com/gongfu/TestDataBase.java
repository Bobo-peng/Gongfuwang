package com.gongfu;
import java.sql.*;
public class TestDataBase {
	public static void main(String[] args) {  
        try {  
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
           
            String url = "jdbc:sqlserver://127.0.0.1:1433";  
            //Connection con = DriverManager.getConnection(url,"sa","JLwi29*23(sLKE)OU32B@"); 
            Connection con = DriverManager.getConnection(url,"gfw","123456"); 
            System.out.println("连接数据库成功");  
            con.close();  
        }  
        catch(Exception e) {  
            System.out.println("���ݿ�����ʧ��\n" + e.toString());  
        }  
    }  

}
