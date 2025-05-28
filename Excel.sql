-- Excel --


-- 'CONTROL & SHIFT' at the same time + 'RIGHT' then 'LEFT' -- to select all data
-- CONTROL + Z -- to undo
-- TEXT TO COLUMN (when seperated by comma in a single column) = SELECT column > Data > Text to column > Select delimeter...
-- CTRL + H = replace all . by , (for numbers)


-- PIVOT TABLE --
#You can...
-- create multiple pivot tables in one sheet
-- remove décimal zeros
-- change currency


-- FORMULAS -- 
#Maximum and Minimum
=MAX(select_range) enter
=MIN(select_range) enter

#IF and IFS
=IF(select_range < ...; "value_if_true"; "value_if_false")
=IFS(select_range = ...; "value1"; select_range = ...; "value2") -- as much as you want)

#LEN (total of character in a string)
=LEN(select_range) -- this can be used for socila security numbers or phone numbers...

#LEFT and RIGHT (number of character in a string starting from L or R)
=LEFT/RIGHT(select_range; number of character you want)

#Date to Text (change the format)
=TEXT(select_range; "dd/mm/yyyy")
-- date format = right ≠ text format = left
-- make sure it's set to 'date' and not 'general' before transfering 'date to text'
-- but the column where you want the result should be set to 'general'

#TRIM (removes any spaces but those between words)
=TRIM(select_range)

#CONCATENATE (join two or more text string into one string)
=CONCATENATE(select_range; " "; select_range) -- space
-- can be used to generate email
=CONCATENATE(select_range; "."; select_range; "@gmail.com") -- dot

#Substitute (replaces old text by new text -- dash to slash)
=SUBSTITUTE(select_range; "-"; "/"; 1) -- you can add the instance, which dash you want to replace, the 1rst or second...

#SUM, SUMIF and SUMIFS
=SUM(select_range)
=SUMIF(select_range; criteria) -- one condition
=SUMIFS(select_range; criteria_range1; criteria1; criteria_range2; criteria2) -- multiple conditions

#COUNT, COUNTIF and COUNTIFS
=COUNT(select_range) -- counts sells ≠ sum
=COUNTIF(select_range; criteria)
=COUNTIFS(criteria_range1; criteria1; criteria_range2; criteria2) -- don't need to select_range like in SUM

#DAYS and NETWORKDAYS (select the number of days in bettween dates)
=DAYS(end_date; start_date) -- end date first !!
=NETWORKDAYS(start_date; end_date) -- removes holidays and weekends -- start date first !!

 
 -- XLOOKUP -- 
#FORMULA - select a value, array is where to search and return is where you want the result to come from
-- the formula =XLOOKUP(value, array, return, (if_not_found), (match_mode), (search_mode)

#MULTIPLE ROWS - 
- you can select 2 'return' column and it will give you the result in 2 different column as well
- the output will be in the same order of its selection

#EXACT MATCH - 
match_mode :
 0 = exact match
-1 = exact match or next smaller item
 1 = exact match or next larger item
 2 = wildcard character match

- if_not_found could be written in the formula as "NOT FOUND"
- ,, (to skip this filter on the formula)
- "*"&PAM = anything that comes before PAM         
  PAM&"*" = anything that comes after PAM -- for the value -- 

#SEARCH ORDER
search_mode :
 1 = search first-to-last
-1 = search last-to-first
 2 = binary search (sorted ascending order)
-2 = binary search (sorted descending order)

#WITH SUM (sum 2 xlookup)
Formula : 
=SUM(XLOOKUP(value, array, return):XLOOKUP(value, array, return))

#HORIZONTAL (selecting by rows)
#VLOOKUP (is too manual thats why they created xlookup because of people complains) 
if new column inserted it would change all the information


-- CONDITIONAL FORMATING -- Home bar

#ICON SETS
- use icons to show us if its averge, below average or up
- formate each row individually to get accurate results

#COLOR SCALES
radiant colors from high to low

#TOP/BOTTOM RULES
highlights rows according to specific rules

#HIGHLIGHT CELLS RULES
highlight duplicates :
- it can be inversed, like searching for 'duplicates' or 'uniques' rows
- you can remove duplicates by filtering by color

text that contains :
same

#NEW FORMATTING RULE
= + select_column + remove_$_sign + select_format + select_rule
- you can delete, duplicate and edit created rule in 'manage rules' > 'worksheet'


-- CHARTS --
1. selecting the data that will be used
-> select_data > insert > chart_bar_icon > 2-D Column

2. make sure to filter out total_rows from the chart

3. chart aesthetic
- you can change the chart_design
- you can switch rows ans columns of the chart
- you can change chart_type
- you can change the chart_color
- you can change chart_element


-- DATA CLEANING --

#MAKE A COPY TO PERSERVE RAW DATA

#FORMATTING STANDARDIZATION
Standardize all caps and all lowercase

#2 INFO IN 1 CASE

#ADDITIONAL SPACES (to automatically remove all additional spaces)
-> =TRIM(select_case)

#DATES
Change the format in the configuration and in the sheet
- you can change the format to 'short date' if you want to easily set the format of th entire column to the same one

#CURRENCIES
Change format from currency to number
-> It is more usefull to have it that way if we were to transfert that data in other systems

#DUPLICATES
-> Data bar > Data tools > Remove duplicates icon

#CHANGING NAMES (to set a full_name in the proper case)
-> =PROPER(select_case)

#SPELLING ERRORS
By filtering and grouping by we can check the errors

#DELETE USELESS DATA
NOT on the raw data






















