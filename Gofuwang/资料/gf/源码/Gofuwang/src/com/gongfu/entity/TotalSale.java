package com.gongfu.entity;

public class TotalSale {
	private String ShopName;//����
    private String ProductName;//��Ʒ
    private String Price;//�۸�
    private String TotalSum;//����
    private String Sale;//���۶�
    private String SaleDate;//ʱ��
    
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
