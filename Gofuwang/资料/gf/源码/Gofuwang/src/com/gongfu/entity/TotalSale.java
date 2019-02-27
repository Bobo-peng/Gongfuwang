package com.gongfu.entity;

public class TotalSale {
	private String ShopName;//店名
    private String ProductName;//商品
    private String Price;//价格
    private String TotalSum;//销量
    private String Sale;//销售额
    private String SaleDate;//时间
    
    public String getShopName() {  
        return ShopName;  
    }  
    public void setShopName(String shopname) {  
        this.ShopName = shopname;  
    } 
    public String getProductName() {  
        return ProductName;  
    }  
    public void setProductName(String productname) {  
        this.ProductName = productname;  
    } 
    public String getPrice() {  
        return Price;  
    }  
    public void setPrice(String price) {  
        this.Price = price;  
    } 
    public String getTotalSum() {  
        return TotalSum;  
    }  
    public void setTotalSum(String totalsum) {  
        this.TotalSum = totalsum;
    }
    public String getSale() {  
        return Sale;  
    }  
    public void setSale(String sale) {  
        this.Sale = sale;
    }
    public String getSaleDate() {  
        return SaleDate;  
    }  
    public void setSaleDate(String saledate) {  
        this.SaleDate = saledate;
    }

}
