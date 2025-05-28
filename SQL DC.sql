-- DATA CLEANING --
-- 1. Remove Duplicates (table with id colunm = easier)
-- 2. Standardize the Data 
-- 3. NULL Values or blank values
-- 4. Remove Any Columns or Rows

  
CREATE TABLE layoffs_staging
LIKE layoffs;


INSERT layoffs_staging
SELECT *
FROM layoffs;


-- to check duplicates. can't delete it imediately.
WITH duplicate_cte AS
(
SELECT *,
ROW_NUMBER() OVER (
PARTITION BY company, location, industry, total_laid_off, percentage_laid_off, `date`, stage, country, funds_raised_millions) AS row_num
FROM layoffs_staging
)
SELECT *
FROM duplicate_cte
WHERE row_num > 1;


-- create another table by: two fingers click > Copy Clipboard > create statement (make sure to put the #2 at the table name and use batics!)
CREATE TABLE `layoffs_staging2` (
  `company` text,
  `location` text,
  `industry` text,
  `total_laid_off` text,
  `percentage_laid_off` text,
  `date` text,
  `stage` text,
  `country` text,
  `funds_raised_millions` text,
  `row_num`int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO layoffs_staging2
SELECT *,
ROW_NUMBER() OVER (
PARTITION BY company, location, industry, total_laid_off, percentage_laid_off, `date`, stage, country, funds_raised_millions) AS row_num
FROM layoffs_staging;


-- now that we created a new table with a row of numbers, we can easily filter and delete duplicates
DELETE 
FROM layoffs_staging2
WHERE row_num > 1;


-- to remove any space before
UPDATE layoffs_staging2
SET company = TRIM(company);


-- remove typos or replace word by another one
UPDATE layoffs_staging2
SET industry = 'Crypto'
WHERE industry LIKE 'Crypto%';

-- remove something at the end of a word
UPDATE layoffs_staging2
SET country = TRIM(TRAILING '.' FROM country)
WHERE country LIKE 'United States%';


-- change date from string to slash
UPDATE layoffs_staging2
SET `date` = STR_TO_DATE(`date`, '%m/%d/%Y')
WHERE `date`!= 'NULL'; -- this one is optional, if the column contain nulls


-- change NULL into 'NULL', to be able to change data type
UPDATE layoffs_staging2
SET `date` = NULL
WHERE `date` = 'NULL';


-- change the data type date(definition) of the column 'date'
ALTER TABLE layoffs_staging2
MODIFY COLUMN `date` DATE;


-- find missing information that are null or blank by analyzing
-- a - first turn the blanks into NULL
   UPDATE layoffs_staging2
   SET industry = NULL 
   WHERE industry = '';
   
-- b - then do a JOIN to turn nulls into 
UPDATE layoffs_staging2 t1
JOIN layoffs_staging2 t2
    ON t1.company = t2.company 
SET t1.industry = t2.industry
WHERE t1.industry IS NULL
AND t2.industry IS NOT NULL;
-- PS - if there one that is still null, it's because there wasn't another row to join it 


-- drop the row_num column that was created earlier
ALTER TABLE layoffs_staging2
DROP COLUMN row_num;


-- turn 'NULL' into NULL
UPDATE layoffs_staging2
SET total_laid_off = NULL
WHERE total_laid_off = 'NULL';

UPDATE layoffs_staging2
SET percentage_laid_off = NULL
WHERE percentage_laid_off = 'NULL';


-- delele data when there's to many nulls in a row, the rows become useless
DELETE           
FROM layoffs_staging2
WHERE total_laid_off IS NULL
AND percentage_laid_off IS NULL;





