package com.gongfu.entity;

public class Product {
	private String ProductName;//��Ʒ��
    private String SimpleName;//��Ʒ���
    private int PluNo;//��Ʒ��
    private String PurchasePrice;//�۸�
    private String UnitName;//��λ
    private String UpdateDate;//��������
    
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
