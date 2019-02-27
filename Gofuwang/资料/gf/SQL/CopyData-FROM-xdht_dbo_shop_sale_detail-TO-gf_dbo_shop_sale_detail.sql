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
  from [xdht].[dbo].[shop_sale_detail_7]
  where [DetailReleaseDate]<'2018-07-09 00:00:00' and [DetailReleaseDate]>='2018-07-06 00:00:00'
GO


