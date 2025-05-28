-- PANDAS DATA CLEANING --


import pandas as pd
df = pd.read_excel(r"C:\Users\alexf\OneDrive\Documents\Pandas Tutorial\Customer Call List.xlsx")
df

df = df.drop_duplicates() -- REMOVE DUPLICATES
df

df = df.drop(columns = "Not_Useful_Column") -- REMOVE COLUMN
df

STRIP
df["Last_Name"] = df["Last_Name"].str.lstrip("...") -- STRIP -- REMOVE L OR R VALUE -- NEEDS TO BE DONE ONE BY ONE
df["Last_Name"] = df["Last_Name"].str.lstrip("/")
df["Last_Name"] = df["Last_Name"].str.rstrip("_")
OR
df["Last_Name"] = df["Last_Name"].str.strip("123._/") -- STRIP -- ALL AT THE SAME TIME
df

PHONE NUMBER
df["Phone_Number"] = df["Phone_Number"].str.replace('[^a-zA-Z0-9]','') -- REMOVE EVERYTHING AND REPLACE BY NOTHING

df["Phone_Number"] = df["Phone_Number"].apply(lambda x: str(x)) -- SET EVERY VALUE TO STRING, EVEN THE NaN

df["Phone_Number"] = df["Phone_Number"].apply(lambda x: x[0:3] + '-' + x[3:6] + '-' + x[6:10]) -- FORMATTING '-'

df["Phone_Number"] = df["Phone_Number"].str.replace('nan--','') -- REMOVE NaN

df["Phone_Number"] = df["Phone_Number"].str.replace('Na--','') -- REMOVE NaN
df

SLIPT
df[["Street_Address", "State", "Zip_Code"]] = df["Address"].str.split(',',2, expand=True) -- SPLIT VALUE ON COMMA INTO COLUMNS
df

REPLACE BY
df["Do_Not_Contact"] = df["Do_Not_Contact"].str.replace('Yes','Y') -- REPLACE TYPOS

df["Do_Not_Contact"] = df["Do_Not_Contact"].str.replace('No','N')
df

REMOVE NAN
df = df.replace('N/a','') -- NA WRITTEN VALUES
df = df.replace('NaN','')

df=df.fillna('') -- REPLACE REAL NA VALUE BY BLANK
df

REMOVE ENTIRE ROWS
for x in df.index: -- DROP NA VALUES 
    if df.loc[x, "Phone_Number"] == '':
        df.drop(x, inplace=True)
df

OR
df = df.dropna(subset="Phone_Number"), inplace=True) -- THIS ONLY WORKS WITH NA NOT LETTERS

df = df.reset_index(drop=True) -- RESET INDEX
df










