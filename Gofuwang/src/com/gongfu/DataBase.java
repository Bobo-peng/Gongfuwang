package com.gongfu;
import java.sql.*;  
public class DataBase {
	 public static void main(String[] args) {  
	        try {  
	            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
	            String url = "jdbc:sqlserver://127.0.0.1:1433;databaseName=MyDatabase";  
	            Connection con = DriverManager.getConnection(url,"sa","123456");  
	            System.out.println("���ݿ����ӳɹ�");  
	            con.close();  
	        }  
	        catch(Exception e) {  
	            System.out.println("���ݿ�����ʧ��\n" + e.toString());  
	        }  
	    }  

}
