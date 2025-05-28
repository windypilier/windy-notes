-- PANDAS --
-- SHITF + TAB -- show possible info to add


1. Reading in files

import pandas as pd -- csv
df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\countries of the world.csv")
df


-- with word/ text
df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\countries of the world.txt", sep = '\t')
df
or
df = pd.read_table(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\countries of the world.csv", sep = ',')
df


-- with json
df = pd.read_json(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\json_sample.json")
df


-- with excel (read second sheet)
df2 = pd.read_excel(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\world_population_excel_workbook.xlsx", sheet_name = 'Sheet1')
df2


-- display all rows hidden and columns
pd.set_option('display.max.rows', 235)
pd.set_option('display.max.columns', 40)


-- info
df2.info()

-- total rows and columns
df2.shape

-- display first 10
df2.head(10)

-- display last 10
df2.tail(10)

-- find specefic info
df2.loc['Uzbekistan']
or
df2.iloc[224]



2. Filtering and Ordering
import pandas as pd -- import
df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\world_population.csv")
df

df[df['Rank'] <= 10] -- see rank

specific_countries = ['Bangladesh','Brazil'] -- search a specefic country
df[df['Country'].isin(specific_countries)]

df[df['Country'].str.contains('United')] -- contains 'specefic'

df2 = df.set_index('Country') -- change/set index
df2

df2.filter(items = ['Continent','CCA3'], axis = 1) -- choose columns
or
df2.filter(like = 'United', axis = 0)

df[df['Rank'] < 10].sort_values(by=['Continent','Country'],ascending=[False,True]) -- order/ organise by



3. Indexing
import pandas as pd -- import
df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\world_population.csv")

df


df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\world_population.csv", index_col = "Country") -- set index

df


df.reset_index(inplace=True) -- reset index
df
or
df.set_index('Country', inplace = True) -- set back

df


df.loc['Albania']
or
df.iloc[1]


df.set_index(['Continent','Country'], inplace=True) -- set two index

pd.set_option('display.max.rows', 235)

df.sort_index()


df.loc['Africa','Angola'] -- to search when there's two index
or
df.iloc[1]



4. Group by and Aggregating
import pandas as pd -- import
df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\Flavors.csv")
df

group_by_frame = df.groupby('Base Flavor') -- mean
group_by_frame.mean()
or
df.groupby('Base Flavor').mean()

df.groupby('Base Flavor').count() -- count

df.groupby('Base Flavor').sum() -- sum, can do same with 'min' 'max'


df.groupby('Base Flavor').agg({'Flavor Rating': ['mean','max','count','sum'], 'Texture Rating':['mean','max','count','sum'] }) -- aggregations
or 
df.groupby(['Base Flavor','Liked']).agg({'Flavor Rating': ['mean','max','count','sum']})
or 
df.groupby('Base Flavor').describe() -- generalized shortcut


5. Merge, Join, and Concatenate
import pandas as pd -- import df1
df1 = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\LOTR.csv")
df1

df2 = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\LOTR 2.csv") -- df2
df2

MERGE -- first df is automatically going to be the left one

df1.merge(df2, how = 'inner', on = ['FellowshipID', 'FirstName']) -- inner

df1.merge(df2, how = 'outer') -- outer

df1.merge(df2, how = 'left') -- left

df1.merge(df2, how = 'right') -- right

df1.merge(df2, how = 'cross') -- cross (compares every single values to the other df

JOIN -- joining works better when you set an index

df4 = df1.set_index('FellowshipID').join(df2.set_index('FellowshipID'), lsuffix = '_Left',rsuffix = '_Right', how = 'outer') -- 'how' can be changed by any type of join
df4

CONCATENATE -- append is not recommended, it will be removed soon
pd.concat([df1,df2], join = 'outer') -- one df on top of the other

pd.concat([df1,df2], join = 'outer', axis = 1) -- same as a merge



6. Pandas Visualization
import pandas as pd -- import
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\Ice Cream Ratings.csv") -- dfs
df = df.set_index('Date') -- set index
df

df.plot(kind = 'line', title = 'Ice Cream Ratings', xlabel = 'Daily Ratings', ylabel = 'Scores') -- line viz

df.plot.barh(stacked = True) -- bar horizontal viz

df.plot.scatter(x = 'Texture Rating', y = 'Overall Rating', s = 500, c = 'Yellow') -- scatter viz

df.plot.hist(bins = 10) -- histogram viz -- bins is the distribution

df.boxplot() -- boxplot viz

df.plot.area(figsize = (10,5)) -- area plot

df.plot.pie(y='Flavor Rating',figsize=(10,10)) -- pie chart 

print(plt.style.available) -- choose style, color
plt.style.use('classic') 






















