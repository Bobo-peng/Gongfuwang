package com.gongfu.servlet;
import java.io.IOException;  
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;  
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse; 

import com.gongfu.Dao.GetShopDao;  


	@SuppressWarnings("rawtypes")
	@WebServlet("/shop.jsp")  
	public class ShopServlet extends HttpServlet {  
	    private static final long serialVersionUID = 1L;  
	         
	    /** 
	     * @see HttpServlet#HttpServlet() 
	     */  
	    public ShopServlet() {  
	        super();  
	        // TODO Auto-generated constructor stub  
	    }  
	  
	    /** 
	     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response) 
	     */  
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
	        // TODO Auto-generated method stub 
	    	PrintWriter pw = response.getWriter();  
            pw.println("doGet!"); 
            System.out.println ("doGet");  
	        GetShopDao gpd=new GetShopDao();  
	       
	        List list=gpd.GetShop(652001);  
	        request.setAttribute("list",list);  
	          
	        request.getRequestDispatcher("/shop.jsp").forward(request, response);  
	    }  
	  
	    /** 
	     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response) 
	     */  
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
	        // TODO Auto-generated method stub  
	    }  
	    
	  /*  
	    public void service(ServletRequest req,ServletResponse res ) throws ServletException{  
	        
	        System.out.println ("service it");    
	          
	        try {  
	              
	            //从res中得到PrintWriter  
	            PrintWriter pw = res.getWriter();  
	            pw.println("Hello World!");  
	              
	        }catch (Exception ex) {  
	            ex.printStackTrace();  
	        }  
	          
	        }  
	 */ 
	}  

