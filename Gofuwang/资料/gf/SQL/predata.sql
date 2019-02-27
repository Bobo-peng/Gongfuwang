DELETE FROM [gf].[dbo].[shop_day_sale]
declare @nextdate date

SELECT @nextdate = MIN(DetailReleaseDate) FROM [gf].[dbo].shop_sale_detail 
/*set @nextdate = '2018-06-01';*/

while (@nextdate < '2018-07-09')
begin

INSERT INTO [gf].[dbo].shop_day_sale(ShopName,ProductName,Price,TotalSum,Sale,SaleDate)
SELECT  ShopName,ProductName,Price,SUM(Weight) AS total ,SUM(TotalSum) AS sale,@nextdate FROM [gf].[dbo].shop_sale_detail 
where DetailReleaseDate>=@nextdate and DetailReleaseDate<=DATEADD(DD,1,@nextdate)
GROUP BY ShopName,ProductName,Price 
order by ShopName
set @nextdate = DATEADD(DD,1,@nextdate)

end