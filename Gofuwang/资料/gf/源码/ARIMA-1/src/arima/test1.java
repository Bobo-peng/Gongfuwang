package arima;
import java.io.*;  
import java.util.ArrayList;  
import java.util.Scanner;  
public class test1 {  
	  
    public static void main(String args[])  
    {  
        Scanner ino=null;  
              
        try {  
            /*********************************************************/  
            ArrayList<Double> arraylist=new ArrayList<Double>();  
            ino=new Scanner(new File("D:\\soft\\GoEavluateSys\\ARIMA-1\\data\\data.txt"));  
            //ino=new Scanner(new File("D:\\soft\\GoEavluateSys\\ARIMA-1\\src\\arima\\data.txt"));
            //ino=new Scanner(new File("D:\\soft\\GoEavluateSys\\ARIMA-1\\data\\ceshidata.txt"));  
            while(ino.hasNext())  
            {  
                arraylist.add(Double.parseDouble(ino.next()));  
            }  
              
            double[] dataArray=new double[arraylist.size()];   
              
            for(int i=0;i<dataArray.length;i++)  
                dataArray[i]=arraylist.get(i);  
      
              
            ARIMAiFlex myarima=new ARIMAiFlex(dataArray);  
            // currentAlgorithm cc=new currentAlgorithm(dataArray);  
              
            /*********************************************************/  
                  
        } catch (FileNotFoundException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }finally{  
            ino.close();  
        }  
    }  
      
}  
