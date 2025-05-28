-- PANDAS EDA --


import pandas as pd -- IMPORT
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\world_population.csv") -- DF
df

pd.set_option('display.float_format', lambda x: '%.2f' % x) -- CHANGE THE AMOUNT OF DECIMAL DISPLAYED

pd.set_option('display.float_format', lambda x: '%.2f' % x) -- SHOWS THE TOTAL OF ROWS AND NA

df.describe() -- HAVE A QUICK GLANCE OF CALCULATIONS

df.isnull().sum() -- SEE MISSING VALUES

df.nunique() -- SHOWS UNIQUE VALUES

df.sort_values(by="World Population Percentage", ascending=False).head(10) -- SHOW TOP 10

df.corr() -- SEE CORRELATION

sns.heatmap(df.corr(), annot = True) -- VIZUALLY SHOW THE CORRELATION
plt.rcParams['figure.figsize'] = (20,7)
plt.show()
 
 df.groupby('Continent').mean().sort_values(by="2022 Population",ascending=False) -- GROUP BY CONTINENT
 
 df3 = df2.transpose() -- transpose column and rows by creating a df3
df3
 
 df.columns -- show columns names
 
 df2 = df.groupby('Continent')[['1970 Population', -- remove useless columns 
       '1980 Population', '1990 Population', '2000 Population',
       '2010 Population', '2015 Population', '2020 Population',
       '2022 Population']].mean().sort_values(by="2022 Population",ascending=False)
df2
 
 df3.plot() -- show graph to know what info to remove
 or 
 df.boxplot(figsize=(20,10))
 
 df.select_dtypes(include='float') -- look for a specefic data type
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 