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
public class GetProductDao {
public List<Product> GetProduct(int ProductNumber){  
        
        List<Product> lstshop=new ArrayList<Product>();  
        DataBase dbconn=new DataBase();  
        String strSQL="select ProductName,SimpleName,PluNo,PurchasePrice,UnitName,UpdateDate from [xdht_base].[dbo].[product]";  
        ResultSet rs=dbconn.execQuery(strSQL,new Object[]{ProductNumber});  
        try{  
            while(rs.next()){  
            	Product product=new Product(); 
            
            	product.setProductName(rs.getString("ProductName"));
            	product.setSimpleName(rs.getString("SimpleName"));
            	product.setPluNo(rs.getInt("PluNo"));
            	product.setPurchasePrice(rs.getString("PurchasePrice"));
            	product.setUnitName(rs.getString("UnitName"));
            	product.setUpdateDate(rs.getString("UpdateDate"));
            	
          
                lstshop.add(product);  
            }  
            return lstshop;  
        } catch(Exception e){  
            e.printStackTrace();  
            return null;  
        }finally{  
            dbconn.closeConn();  
        }  
          
    }  

}
