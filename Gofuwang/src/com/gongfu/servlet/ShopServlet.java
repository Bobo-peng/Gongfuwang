package com.gongfu.servlet;
import java.io.IOException;  
import java.io.PrintWriter;  
import java.util.List;  
import javax.servlet.ServletException;  
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse; 

import com.gongfu.Dao.GetShopDao;  

public class ShopServlet {

	@WebServlet("/Shop")  
	public class PostBarServlet extends HttpServlet {  
	    private static final long serialVersionUID = 1L;  
	         
	    /** 
	     * @see HttpServlet#HttpServlet() 
	     */  
	    public PostBarServlet() {  
	        super();  
	        // TODO Auto-generated constructor stub  
	    }  
	  
	    /** 
	     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response) 
	     */  
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
	        // TODO Auto-generated method stub  
	        GetShopDao gpd=new GetShopDao();  
	          
	        List list=gpd.GetShop(null);  
	        request.setAttribute("list",list);  
	          
	        request.getRequestDispatcher("/shop.jsp").forward(request, response);  
	    }  
	  
	    /** 
	     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response) 
	     */  
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
	        // TODO Auto-generated method stub  
	    }  
	  
	}  
}
