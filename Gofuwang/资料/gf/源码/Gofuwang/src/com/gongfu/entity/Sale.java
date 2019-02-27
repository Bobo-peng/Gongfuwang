package com.gongfu.entity;

public class Sale {
	private String ShopName;//店名
    private String ProductName;//商品
    private String Price;//价格
    private String PayTypeName;//支付方式
    private String TotalSum;//总量
    private String DetailReleaseDate;//时间
    
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
    public String getPayTypeName() {  
        return PayTypeName;  
    }  
    public void setPayTypeName(String paytypename) {  
        this.PayTypeName = paytypename;  
    }
    public String getTotalSum() {  
        return TotalSum;  
    }  
    public void setTotalSum(String totalsum) {  
        this.TotalSum = totalsum;  
    }
    public String getDetailReleaseDate() {  
        return DetailReleaseDate;  
    }  
    public void setDetailReleaseDate(String detailreleasedate) {  
        this.DetailReleaseDate = detailreleasedate;  
    }

}
