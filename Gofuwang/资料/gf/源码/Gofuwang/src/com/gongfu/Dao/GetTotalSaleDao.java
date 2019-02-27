package com.gongfu.Dao;
import java.util.ArrayList;  
import java.util.HashMap;  
import java.util.List;  
import java.util.Map;  
import java.sql.ResultSet;  
import java.sql.ResultSetMetaData;  
import java.sql.SQLException;  
import java.sql.Connection;  
import java.sql.PreparedStatement;
import com.gongfu.entity.*;  
import com.gongfu.*; 
public class GetTotalSaleDao {
public List<TotalSale> GetTotalSale(String ShopName,String ProductName,String Day1,String Day2){  
        
        List<TotalSale> lstsale=new ArrayList<TotalSale>();  
        DataBase dbconn=new DataBase();  
        //String strSQL="select ShopName,ProductName,Price,TotalSum,PayTypeName,DetailReleaseDate from [xdht].[dbo].[shop_sale_detail] WHERE ShopName= '"+Shopname+"' and ReleaseDate between '"+Day1+"' and '"+Day2+"'"; 
        String strSQL="SELECT [ShopName]\r\n" + 
        		"      ,[ProductName]\r\n" + 
        		"      ,[Price]\r\n" + 
        		"      ,[TotalSum]\r\n" + 
        		"      ,[Sale]\r\n" + 
        		"      ,[SaleDate]\r\n" + 
        		"  FROM [gf].[dbo].[shop_day_sale]\r\n" + 
        		"  where ShopName='"+ShopName+"' and ProductName='"+ProductName+"' and SaleDate>='"+Day1+"' and SaleDate<='"+Day2+"'\r\n" + 
        		"  order by [SaleDate] desc";
        ResultSet rs=dbconn.execQuery(strSQL,new Object[]{ShopName,Day1,Day2});  
        try{  
            while(rs.next()){  
            	TotalSale totalsale=new TotalSale(); 
            	totalsale.setShopName(rs.getString("ShopName"));
            	totalsale.setProductName(rs.getString("ProductName"));
            	totalsale.setPrice(rs.getString("Price"));
            	totalsale.setTotalSum(rs.getString("TotalSum"));
            	totalsale.setSale(rs.getString("Sale"));
            	totalsale.setSaleDate(rs.getString("SaleDate"));  
                lstsale.add(totalsale);  
            }  
            return lstsale;  
        } catch(Exception e){  
            e.printStackTrace();  
            return null;  
        }finally{  
            dbconn.closeConn();  
        }  
          
    }  

	

}
