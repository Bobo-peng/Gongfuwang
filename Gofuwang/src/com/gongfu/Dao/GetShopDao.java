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
public class GetShopDao {

	public List<Shop> GetShop(int ShopNumber){  
        
        List<Shop> lstshop=new ArrayList<Shop>();  
        DataBase dbconn=new DataBase();  
        String strSQL="select * from unit_base where UnitNo=?";  
        ResultSet rs=dbconn.execQuery(strSQL,new Object[]{ShopNumber});  
        try{  
            while(rs.next()){  
            	Shop shop=new Shop();  
            	shop.setShopName(rs.getString("SimpleName"));
            	shop.setShopNumber(rs.getInt("ShopNumber"));
            	shop.setCreateDate(rs.getString("CreationDate"));
          
                lstshop.add(shop);  
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
