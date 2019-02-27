package com.gongfu.Dao;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;  
import java.util.List;  
import java.util.Map;  
import java.sql.ResultSet;  
import java.sql.ResultSetMetaData;  
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.sql.Connection;  
import java.sql.PreparedStatement;
import com.gongfu.entity.*;  
import com.gongfu.*;
import com.gongfu.arima.*; 
public class GetPreSaleDao {
public List<PreSale> GetPreSale(String ShopName,String ProductName,String Day1,String Day2){  
        
	    Double lspresaledata; 
        List<PreSale> lspresale=new ArrayList<PreSale>(); 
        //List<PreSale> lspreretsale=new ArrayList<PreSale>();
        List<Shop> lsshop=new ArrayList<Shop>(); 
        List<Product> lsproduct=new ArrayList<Product>(); 
        
       
        DataBase dbconn=new DataBase();
        
        //String shopSQL="SELECT [UnitName] FROM [xdht_base].[dbo].[unit_base]";
        String productSQL="SELECT [ProductName] FROM [xdht_base].[dbo].[product]";
        /*if(ShopName=="")
        {
        	
        }
        else if()
        {
        	
        }*/
        /*查询门店*/
       // ResultSet shop_rs=dbconn.execQuery(shopSQL,new Object[]{ShopName,Day1,Day2});
        /*查询商品*/
        ResultSet product_rs=dbconn.execQuery(productSQL,new Object[]{ShopName,Day1,Day2});
        try{  
           /* while(shop_rs.next()){  
            	Shop shop=new Shop(); 
            	shop.setUnitName(shop_rs.getString("UnitName"));
            	lsshop.add(shop);  
            }
            */
            while(product_rs.next()){  
            	Product product=new Product(); 
            	product.setProductName(product_rs.getString("ProductName"));
            	lsproduct.add(product);  
            } 
            /*循环计算每个门店、每种商品的预测值*/
            //for(int i = 0; i < lsshop.size(); i++)
           // {
            	for(int j = 0; j < lsproduct.size(); j++)
            	{
            		//lsshop.get(i).getUnitName();
            		lsproduct.get(j).getProductName();
            		String predataSQL="SELECT [TotalSum] FROM [gf].[dbo].[shop_day_sale] where ShopName='"+ShopName+"' and ProductName='"+lsproduct.get(j).getProductName()+"'";
            		
            		ResultSet predata_rs=dbconn.execQuery(predataSQL,new Object[]{ShopName,Day1,Day2});
            		
            		ArrayList<Double> arraylist=new ArrayList<Double>();
            		int rowCount = 0; 
            		while(predata_rs.next()){  
            			lspresaledata=predata_rs.getDouble("TotalSum");
            			arraylist.add(lspresaledata);  
            			rowCount++;
                    }
            		if(rowCount==0) 
            			continue;
            		double[] dataArray=new double[arraylist.size()]; 
            		int ret = 0;
            		double sum = 0;
            		double dret = 0;
                    for(int k=0;k<arraylist.size();k++) 
                    {
                    	dataArray[k]=arraylist.get(k); 
                    	sum+=dataArray[k];
                    }
                     if(sum ==0) continue;   
                    //ARIMAiFlex a = new ARIMAiFlex(dataArray);
                    if(dataArray.length<15)
                    {
                    	dret = sum/(dataArray.length);
                    	dret = dret/1000;
                    	//DecimalFormat df=new DecimalFormat(".###");
                    	//String st=df.format(dret);
                    	PreSale preretsale = new PreSale();
              		   preretsale.setTotalSum(dret+"");
              		   preretsale.setProductName(lsproduct.get(j).getProductName());
              		   preretsale.setShopName(ShopName);
              		 	/*获取明天日期*/
              		 	Calendar cal = Calendar.getInstance();  
          		   		cal.add(Calendar.DATE,1); 
          		   		String tomorrow = new SimpleDateFormat( "yyyy-MM-dd ").format(cal.getTime()); 
          		   		preretsale.setSaleDate(tomorrow);
          		   		lspresale.add(preretsale);
                    }
                    else
                    {
                    	ARIMA arima=new ARIMA(dataArray); 
            			
            			int []model=arima.getARIMAmodel();
            			System.out.println("Best model is [p,q]="+"["+model[0]+" "+model[1]+"]");
            			System.out.println("Predict value="+arima.aftDeal(arima.predictValue(model[0],model[1])));
            			System.out.println("Predict error="+(arima.aftDeal(arima.predictValue(model[0],model[1]))-arraylist.get(arraylist.size()-1))/arraylist.get(arraylist.size()-1)*100+"%");
            		
                    	
                    	ret = arima.aftDeal(arima.predictValue(model[0],model[1]));
                    	PreSale preretsale = new PreSale();
                    	double dbret = (double)ret;
                    	dbret= dbret/1000;
             		   preretsale.setTotalSum(dbret+"");
             		   preretsale.setProductName(lsproduct.get(j).getProductName());
             		   preretsale.setShopName(ShopName);
             		  	/*获取明天日期*/
             		  	Calendar cal = Calendar.getInstance();  
           		   		cal.add(Calendar.DATE,1); 
           		   		String tomorrow = new SimpleDateFormat( "yyyy-MM-dd ").format(cal.getTime()); 
           		   		preretsale.setSaleDate(tomorrow);
           		   		lspresale.add(preretsale);
                    }
  
            	}
            	
            //}
            
            return lspresale;  
        } catch(Exception e){  
            e.printStackTrace();  
            return null;  
        }finally{  
            dbconn.closeConn();  
        }  
        
        //String strSQL="select ShopName,ProductName,Price,TotalSum,PayTypeName,DetailReleaseDate from [xdht].[dbo].[shop_sale_detail] WHERE ShopName= '"+Shopname+"' and ReleaseDate between '"+Day1+"' and '"+Day2+"'"; 
      /*  String strSQL="SELECT [ShopName]\r\n" + 
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
            	PreSale presale=new PreSale(); 
            	presale.setShopName(rs.getString("ShopName"));
            	presale.setProductName(rs.getString("ProductName"));
            	presale.setPrice(rs.getString("Price"));
            	presale.setTotalSum(rs.getString("TotalSum"));
            	presale.setSale(rs.getString("Sale"));
            	presale.setSaleDate(rs.getString("SaleDate"));  
                lstsale.add(presale);  
            }  
            return lstsale;  
        } catch(Exception e){  
            e.printStackTrace();  
            return null;  
        }finally{  
            dbconn.closeConn();  
        }  
          
    }  

*/
}
}
