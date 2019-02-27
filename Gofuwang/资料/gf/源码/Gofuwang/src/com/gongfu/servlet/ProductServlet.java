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

import com.gongfu.Dao.GetProductDao;



	@SuppressWarnings("rawtypes")
	//@WebServlet("/shop.jsp")
	@WebServlet("/product.jsp")  
public class ProductServlet extends HttpServlet{
		private static final long serialVersionUID = 1L; 
		 public ProductServlet() {  
		        super();  
		 }
		        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
			        // TODO Auto-generated method stub 
			    	response.setHeader("content-type", "text/html;charset=UTF-8");  
			    	response.setCharacterEncoding("UTF-8");  
			    	request.setCharacterEncoding("UTF-8");  
			    	
			    	PrintWriter pw = response.getWriter();  
		            pw.println("doGet!"); 
		            System.out.println ("doGet");  
			        GetProductDao gpd=new GetProductDao();  
			       
			        List list=gpd.GetProduct(3);  
			        request.setAttribute("list",list);  
			          
			       // request.getRequestDispatcher("/shop1.jsp").forward(request, response);
			        request.getRequestDispatcher("/product1.jsp").forward(request, response);
			        return;
			    }  

	}
