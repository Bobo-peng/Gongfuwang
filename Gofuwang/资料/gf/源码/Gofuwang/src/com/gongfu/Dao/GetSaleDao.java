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

public class GetSaleDao {
	public List<Sale> GetSale(String Shopname,String Day1,String Day2){  
        
        List<Sale> lstsale=new ArrayList<Sale>();  
        DataBase dbconn=new DataBase();  
        String strSQL="select ShopName,ProductName,Price,TotalSum,PayTypeName,DetailReleaseDate from [xdht].[dbo].[shop_sale_detail] WHERE ShopName= '"+Shopname+"' and ReleaseDate between '"+Day1+"' and '"+Day2+"'";  
        ResultSet rs=dbconn.execQuery(strSQL,new Object[]{Shopname,Day1,Day2});  
        try{  
            while(rs.next()){  
            	Sale sale=new Sale(); 
            	sale.setShopName(rs.getString("ShopName"));
            	sale.setProductName(rs.getString("ProductName"));
            	sale.setPrice(rs.getString("Price"));
            	sale.setTotalSum(rs.getString("TotalSum"));
            	sale.setPayTypeName(rs.getString("PayTypeName"));
            	sale.setDetailReleaseDate(rs.getString("DetailReleaseDate"));  
                lstsale.add(sale);  
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
