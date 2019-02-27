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

import com.gongfu.Dao.GetSaleDao;  


	@SuppressWarnings("rawtypes")
	//
	//@WebServlet("/showdata.jsp")  
	
	@WebServlet("/SaleServlet")
public class SaleServlet extends HttpServlet {  
    private static final long serialVersionUID = 1L;  
    
    /** 
     * @see HttpServlet#HttpServlet() 
     */  
    public SaleServlet() {  
        super();  
        // TODO Auto-generated constructor stub  
    }  


	 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
	        // TODO Auto-generated method stub 
	    	response.setHeader("content-type", "text/html;charset=UTF-8");  
	    	response.setCharacterEncoding("UTF-8");  
	    	request.setCharacterEncoding("UTF-8");  
	    	
	    /*	PrintWriter pw = response.getWriter();  
         pw.println("doGet!"); 
         System.out.println ("doGet");  
	        GetSaleDao gpd=new GetSaleDao();  
	        String ShopName=request.getParameter("shopName");
            String day1=request.getParameter("day1");
            String day2=request.getParameter("day2");
	        List list=gpd.GetSale(3);  
	        request.setAttribute("list",list);  
	         */ 
	       // request.getRequestDispatcher("/shop1.jsp").forward(request, response);
	        //request.getRequestDispatcher("/shopinfo1.jsp").forward(request, response);
	        return;
	    }  
	 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
	        // TODO Auto-generated method stub  
		    response.setHeader("content-type", "text/html;charset=UTF-8");  
	    	response.setCharacterEncoding("UTF-8");  
	    	request.setCharacterEncoding("UTF-8");  
	    	PrintWriter pw = response.getWriter();  
            pw.println("doPost!"); 
            System.out.println ("do{ost"); 
            String ShopName=request.getParameter("shopName");
            String day1=request.getParameter("day1");
            String day2=request.getParameter("day2");
	        GetSaleDao gpd=new GetSaleDao();  
	       
	        List list=gpd.GetSale(ShopName,day1,day2);  
	        request.setAttribute("list",list);  
	          
	       // request.getRequestDispatcher("/shop1.jsp").forward(request, response);
	        request.getRequestDispatcher("/shopsale.jsp").forward(request, response);
	        return;
	    }  
	}