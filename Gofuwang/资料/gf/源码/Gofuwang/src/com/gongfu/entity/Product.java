package com.gongfu.entity;

public class Product {
	private String ProductName;//商品名
    private String SimpleName;//商品简称
    private int PluNo;//商品号
    private String PurchasePrice;//价格
    private String UnitName;//单位
    private String UpdateDate;//更新日期
    
    public String getProductName() {  
        return ProductName;  
    }  
    public void setProductName(String productname) {  
        this.ProductName = productname;  
    }  
    public String getSimpleName() {  
        return SimpleName;  
    }  
    public void setSimpleName(String simplename) {  
        this.SimpleName = simplename;  
    }  
    
    public int getPluNo() {  
        return PluNo;  
    }  
    public void setPluNo(int pluno) {  
    	PluNo = pluno;  
    }  
    public String getPurchasePrice() {  
        return PurchasePrice;  
    }  
    public void setPurchasePrice(String purchaseprice) {  
    	PurchasePrice = purchaseprice;  
    }  
    public String getUnitName() {  
        return UnitName;  
    }  
    public void setUnitName(String unitname) {  
    	UnitName = unitname;  
    }  
    public String getUpdateDate() {  
        return UpdateDate;  
    }  
    public void setUpdateDate(String updatedate) {  
    	UpdateDate = updatedate;  
    }  

}
