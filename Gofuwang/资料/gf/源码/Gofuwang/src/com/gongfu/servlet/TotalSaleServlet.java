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
import com.gongfu.Dao.GetTotalSaleDao; 

@WebServlet("/TotalSaleServlet")
public class TotalSaleServlet extends HttpServlet {  
    private static final long serialVersionUID = 1L;  
    
    /** 
     * @see HttpServlet#HttpServlet() 
     */  
    public TotalSaleServlet() {  
        super();  
        // TODO Auto-generated constructor stub  
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
        String ProductName=request.getParameter("productName");
        String day1=request.getParameter("day1");
        String day2=request.getParameter("day2");
        GetTotalSaleDao gpd=new GetTotalSaleDao();  
       
        List list=gpd.GetTotalSale(ShopName,ProductName,day1,day2);  
        request.setAttribute("list",list);  
          
       // request.getRequestDispatcher("/shop1.jsp").forward(request, response);
        request.getRequestDispatcher("/sale.jsp").forward(request, response);
        return;
    }  
}
