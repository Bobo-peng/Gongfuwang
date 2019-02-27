--1.拷贝原始数据到shop_sale_detail表
insert into [gf].[dbo].[shop_sale_detail]
	select
	  [DetailId]
      ,[ShopName]
      ,[ProductName]
      ,[UnitName]
      ,[Price]
      ,[Weight]
      ,[TotalSum]
      ,[TicketNo]
      ,[DetailReleaseDate]
  from [xdht].[dbo].[shop_sale_detail_8]
  --where [DetailReleaseDate]<'2018-07-09 00:00:00' and [DetailReleaseDate]>='2018-07-06 00:00:00'
  where [DetailId] not in (select [DetailId] from [gf].[dbo].[shop_sale_detail])
  
  --2.聚合每天的数据
  DELETE FROM [gf].[dbo].[shop_day_sale]
declare @nextdate date

SELECT @nextdate = MIN(DetailReleaseDate) FROM [gf].[dbo].shop_sale_detail 
/*set @nextdate = '2018-06-01';*/

--while (@nextdate < '2018-07-09')
print GETDATE()
while (@nextdate < GETDATE())
begin

INSERT INTO [gf].[dbo].shop_day_sale(ShopName,ProductName,Price,TotalSum,Sale,SaleDate)
SELECT  ShopName,ProductName,Price,SUM(Weight) AS total ,SUM(TotalSum) AS sale,@nextdate FROM [gf].[dbo].shop_sale_detail 
where DetailReleaseDate>=@nextdate and DetailReleaseDate<=DATEADD(DD,1,@nextdate)
GROUP BY ShopName,ProductName,Price 
order by ShopName
set @nextdate = DATEADD(DD,1,@nextdate)

end