package com.gongfu;
import java.sql.*;

import com.gongfu.entity.Shop;  
public class DataBase {
	/* public static void main(String[] args) {  
	        try {  
	            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
	            String url = "jdbc:sqlserver://127.0.0.1:1433;databaseName=MyDatabase";  
	            Connection con = DriverManager.getConnection(url,"sa","123456");  
	            System.out.println("���ݿ����ӳɹ�");  
	            con.close();  
	        }  
	        catch(Exception e) {  
	            System.out.println("���ݿ�����ʧ��\n" + e.toString());  
	        }  
	    }  
	    */
	
	//�����ԣ��ķ���  
	    //������Ľӿ�  
	    private Connection conn=null;  
	    private PreparedStatement pstmt=null;  
	    private ResultSet rs=null; 
	    
	    String driver="com.microsoft.sqlserver.jdbc.SQLServerDriver";  
	    String url="jdbc:sqlserver://127.0.0.1:1433";  
	    String user="sa";  
	    String password="123456";  
	    //�ĸ�����  
	    //method1���������ݿ������  
	    private void getConntion(){  
	    	try{   
	            //������������  
	            Class.forName(driver);  
	            //����sqlserver���ݿ�  
	           conn=DriverManager.getConnection(url,user,password);  
	           System.out.println("���ݿ����ӳɹ�");
	        } catch(ClassNotFoundException e){  
	            e.printStackTrace();  
	        } catch(SQLException e){  
	            e.printStackTrace();  
            }  
	    }
	    
	    //method2:�ر����ݿ�����  
	    public void closeConn(){  
	        if(rs!=null){  
	            try{  
	                rs.close();  
	            } catch(SQLException e){  
	                e.printStackTrace();  
	            }  
	        }  
	        if(pstmt!=null){  
	            try{  
	                pstmt.close();  
	                  
	            } catch(SQLException e){  
	                e.printStackTrace();  
	            }  
	        }  
	        if(conn!=null){  
	            try{  
	                conn.close();  
	            } catch(SQLException e){  
	                e.printStackTrace();  
	            }  
	        }  
	          
	    }  
	      
	    //method3:ר�����ڷ�����ɾ�����ķ���  
	    public int execOther(final String strSQL, final Object[] params){  
	        //����  
	        getConntion();  
	        System.out.println("SQL:>"+strSQL);  
	        try{  
	            //����statement�ӿڶ���  
	            pstmt=conn.prepareStatement(strSQL);  
	            //��̬Ϊpstmt����ֵ  
	            for(int i=0;i<params.length;i++){  
	                pstmt.setObject(i+1, params[i]);  
	            }  
	            //ʹ��Statement������SQL���  
	            int affectedRows=pstmt.executeUpdate();  
	            return affectedRows;  
	              
	              
	        } catch(SQLException e){  
	            e.printStackTrace();  
	            return -1;  
	        }  
	    }  
	      
	    //method4:ר�����ڷ��Ͳ�ѯ���  
	    public ResultSet execQuery(final String strSQL,final Object[] params){  
	        getConntion();  
	        System.out.println("SQL:>"+strSQL);  
	        try{  
	            pstmt=conn.prepareStatement(strSQL);  
	            for(int i=0;i<params.length;i++){  
	                pstmt.setObject(i+1, params[i]);  
	            }  
	            rs=pstmt.executeQuery();  
	            return rs;  
	        } catch(SQLException e){  
	            e.printStackTrace();  
	            return null;  
	        }  
	    }  
	      

}
