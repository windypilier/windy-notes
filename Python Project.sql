-- PYTHON PROJECT--


1. Automated File Sorter in File Explorer
-- https://www.youtube.com/watch?v=gs0FNQR0njI&list=PLUaB-1hjhk8FE_XZ87vPPSfHqb6OcM0cF&index=53


2. Webscraping + Pandas

from bs4 import BeautifulSoup -- download data
import requests

url = 'https://en.wikipedia.org/wiki/List_of_largest_companies_in_the_United_States_by_revenue'

page = requests.get(url)

soup = BeautifulSoup(page.text, 'html')

print(soup)

table = soup.find_all('table')[1] -- select entire table

print(table)

world_titles = table.find_all('th') -- select titles

world_titles

world_table_titles = [title.text.strip() for title in world_titles]

print(world_table_titles)

import pandas as pd -- df

df = pd.DataFrame(columns = world_table_titles)

df

column_data = table.find_all('tr') -- select data inside table

for row in column_data[1:]:
    row_data = row.find_all('td')
    individual_row_data = [data.text.strip() for data in row_data]
    
    length = len(df)
    df.loc[length] = individual_row_data
    
df

df.to_csv(r'/Users/windy/Library/Mobile Documents/com~apple~CloudDocs/Data Analyst/Bootcamp/Webcraping.csv', index = False) -- downloaad on cvs format

# to find the right path, double click on the folder that I want to use > get info > copy 'Where' path





