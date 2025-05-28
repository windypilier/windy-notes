-- EXCEL PROJECT --


-- CLEAN DATA 

#OPEN DATA
#CREATE NEW SHEETS
- Dashboard
- Pivot Table
- Working Sheet

#COPY RAW DATA INTO WORKING SHEET

#DATA OVERVIEW 

#REMOVE DUPLICATES

#SPELL OUT (like M -> Male)
CLICK 'CONTROL H' to bring up 'Find and Replace'
-> Replace > Search by 'Columns' > Find what : M > Replace with : Male > Replace_all
-- make sure to do male before female or else it will alter the data
- M : Married
- S : Single
- M : Male
- F : Female
- 10+ Miles : More than 10

#AGE BRACKETS
CREATE an age bracket when there too many ages 
- new column
- if statement
-- =IF(L2>54; "Old"; IF(L2>=31; "Middle Age"; IF(L2<31;"Adolescent";"Invalide")))


-- CREATE PIVOT TABLE AND CHART

#PIVOT TABLE SHEET 
Create PT 1
-- Insert > Pivot Table > Working sheet > A1 > CTRL + SHITF > RIGHT THEN DOWN > OK

#AVERAGE INCOME
Incomes        : Values
Gender         : Rows
Purchased bike : Column
-> change 'Sum of income' into 'Average of income'

#REMOVE DECIMAL
'change the format to number then remove 00'

#CREATE A CHART (2D column)

#ADD CHART ELEMENTS
- Axis
- Title
- Data table (optional)

 #ANOTHER PIVOT TABLE
 Create PT 2
 
 #CUSTOMER COMMUTE
 Commute distance : Rows
 Purchased bike   : Columns
 Purchased bike   : Values
 
 #CREATE CHART (2D line)
 #ADD CHART ELEMENTS
 
 #ANOTHER PIVOT TABLE
 Create PV 3
 
 #CUSTOMER AGE BRACKETS
 Age Brackets   : Rows
 Purchased bike : Columns
 Purchased bike : Values
 
 #CREATE CHART (2D line)
 #ADD ELEMENTS
 
 
 -- CREATE DASHBOARD
 
 #DASHBOARD SHEET
 - paste all charts 
 - remove gridlines : View > select_everything > uncheck Gridlines 
 
 #CREATE A HEADER (make sure it's long enough)
 - merge to the center
 - add color
 - add text
 
#ADD SLICER
'select a chart > PivotChart Analyze >  Insert slicer > 'maritial_status' > select slicer > Slicer bar > Report connections > select all pivot tables'
 
 
 








