-- TABLEAU Project --


1. Open data and review it
- check the missing infos
- identify the ids or clolums for a possible join

2. Upload data

3. drag 'Listings' > open it > update automatically

4. drag 'calendar' and 'reviews'
- join everything Inner id

5. Go to sheet
- it migth take some time to 'create extract' 
- sheet migth not work so delete and open a new one

6. Ask the right questions 
- Where are the best locations to open up an airbnb or book?
- When are people are spending the most money in airbnb?
- What is the price per bedrooms?

7. bars viz
- Zipcode to columns
- AVG(Price) to rows
- set from highest to low
- set color by dragging Zipcode to marks 
- set title : 'Price by Zipcode' (set it on bold)

8. map viz
- create a new sheet
- Zipcode to columns
- click on second map
- set the zipcode in marks to label
- add another zipcode field to marks and set it to color
- exclude null data 
- add avg_price to marks and set to label
- if a label does not show on the viz : ajust size or click to mark label as 'always show'
- add title

9. graph viz (calendar)
- create a new sheet
- date to columns (set to by week)
- price to rows
- if theres a drop at the end of the graph : filter week(date) to 31rst of the previous month
- add title

10. bars viz
- convert bedrooms to dimension to be able to use as column
- bedrooms to columns
- avg_price to rows
- remove nulls and zeros
- add label avg_price to marks
- add title

11. table viz
- create a new sheet
- bedrooms to rows
- id(listings) to marks label, mesure COUNTdistinct
- add title

12. Create dashboard
- set size to automatically
- add every sheets
- add caption to the table viz
- add dashboard title






