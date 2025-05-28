-- PYTHON --
-- ALT + SHIFT + ( = [ 
-- ALT + SHIFT + L = | pipe bar
-- ALT + ( = {

1. displaying Python
- download anaconda
- launch jupyter (terminal and safari will pop up)
- click on 'New Python'


2. Write
- markdowns : title, side notes...
- code : print('Hello World!')
- press enter at the end
- '+' sign to insert cell below
- cisors to remove a cell..


3. Variables
- you can set x to be = to 22
- int : integer
- str : string 
- type() -> the nature
- Y ≠ y
- this is helpful to not copy paste
- you can set multiple value once : x, y, z = 'choco', 'lil', 'up'
- also x = y = z = coco

exemple :
ice_cream = ('Chocolate', 'Vanilla', 'Pistachio')
ice_cream = x, y, z
print(x)
print(y)
print(z)
result :
Chocolate
Vanilla 
Pistachio


4. Cases
- camel : testVariableCase
- pascal : TestVariableCase
- snake : test_variable_case


5. Operations
- x = 'I love ice cream' + '.'
  print(x)
  I love ice cream.
- int can not be operated with str
- x = 'Ice cream'
  y = ' is'
  z = ' my favorite.'
  print(x+y+z)
  Ice cream is my favorite.
-- don't forget the space
- you can only combine an int with a str if separated by a comma
  x = 'Ice cream'
  y = 2 
  print(x, y)
  Ice cream 2
  
  
  
6. Data types (classification of data)
- 'interger' : number (negative or positive)
- if you add a decimal .00 it will be a 'float'


7. Strings
- 'complex' : adding 'j' behind a number is like an imaginary number 
- 'boolean' : true or false
- '' : single quote
- "" : double quote
- """ """ : multiline ( you can use to quote print a paragraph)
- a = 'Hello World!'
  print(a(:5)) #print the first 5 positions starting from 0
  Hello
- print(a(6)) #print position 6
  W
- print(a(-2)) #print position 2 starting from th end
  d
- print(a(2:5)) 
  llo
- a + a or a*2 -> Hello World!Hello World!


8. Lists
ice_cream = ['a', 'b', 'c']
ice_cream.append('d')
ice_cream
['a', 'b', 'c', 'd']
-- '[]' is a must

ice_cream[0] = 'w' -- [0] means the first one
ice_cream 
['w', 'b', 'c', 'd']

nest_list = ['a', 1, ['b', 'c'], True]
nest_list[2][1]
'c'


9. Tuple
- cannot append on tuples


10. Sets
- daily_prints = {1, 2, 3}
  print(daily_prints)
  {1, 2, 3}

- daily_prints_log = {1, 2, 2, 2, 3}
  print(daily_prints_log)
  {1, 2, 3} -- it only shows unique values, no duplicates

- wife_daily_prints_log = {1, 3, 8, 8}

- print(daily_prints_log | wife_daily_prints_log)
  {1, 2, 3, 8} -- it only shows unique values between the 2 sets

- print(daily_prints_log & wife_daily_prints_log)
  {1, 3} -- it only shows values that appears in both sets
  
 - print(daily_prints_log - wife_daily_prints_log)
  {2} -- we're substracting all the wife values that are the same, it will show values that only appears on the hubby set
  
- print(daily_prints_log ^ wife_daily_prints_log)
  {2, 8} -- it only shows unique values that are in 1 of the 2 sets


11. Dictionaries
- key/value pair -> 'name': 'Anna'
- dict : dictionary

- dict_cream = {'name': 'Anna', 'weekly intake': 5, 'favorite ice cream': ['Strawberry', 'Vanilla']}
  print(dict_cream) 
  {'name': 'Anna', 'weekly intake': 5, 'favorite ice cream': ['Strawberry', 'Vanilla']}
  
- dict_cream.values() -- if we enter this it will give us the values without keys
  dict_values(['Anna', 5, ['Strawberry', 'Vanilla'])
  
- dict_cream.keys()
  dict_keys(['name', 'weekly intake', 'favorite ice cream'])
  
- dict_cream.items()
  dict_items([('name', 'Anna'), ('weekly intake', 5), ('favorite ice cream', ['Strawberry', 'Vanilla'])])

- change a value -> dict_cream['name'] = 'Windy' or dict_cream.update({'name': 'Windy'}) -- the last one is also to add a new value

- del dict_cream['weight'] -- to delete a key/value pair

-- to call a dictionary you can't do dict_cream[0] but instead dict_cream['name']


12. Comparison Operators
== equal
!= not equal
> greater than
< less than
>= greater than or equal to
<= less than or equal to


13; Logical Operators
and : returns True if both statements are true
or : returns True if one of the statements is true
not : reverse the result, returns False if the result is true


14. Membership Operators
in : returns True if a sequence with the specified value is present in the object
not in : returns True if a sequence with the specified value is not present in the object


15. If, Elif, Else statement
if 2 > 5:
    print('it worked')
elif 2 > 6:
    print('elif 1 it worked')
elif 2 > 7:
    print('elif 2 it worked')
else:
    print('it did not worked')

- you can do a line print(...) if ... else print(...)
- 'nested' statements

16. For Loops
integers = [1, 2, 3]
for numbers in integers:
    print(number) -- raw values
1
2
3

for numbers in integers:
    print('yep!') -- modify values
yep!
yep!
yep!

for numbers in integers:
    print(number + number) -- operation, addition
2
4
6


17. Dictionary loops
ice_cream_dict = {'name': 'Alex Freberg', 'weekly intake': 5, 'favorite ice creams': ['MCC', 'Chocolate']}
for cream in ice_cream_dict.values():
    print(cream)
Alex Freberg
5
['MCC', 'Chocolate']
for key, value in ice_cream_dict.items():
    print(key, '->',value)
name -> Alex Freberg
weekly intake -> 5
favorite ice creams -> ['MCC', 'Chocolate']


18. 'Nested' For Loops
flavors = ['Vanilla', 'Chocolate', 'Cookie Dough']
toppings = ['Hot Fudge', 'Oreos', 'Marshmallows']
for one in flavors:
    for two in toppings:
        print(one, 'topped with', two)
Vanilla topped with Hot Fudge
Vanilla topped with Oreos
Vanilla topped with Marshmallows
Chocolate topped with Hot Fudge
Chocolate topped with Oreos
Chocolate topped with Marshmallows
Cookie Dough topped with Hot Fudge
Cookie Dough topped with Oreos
Cookie Dough topped with Marshmallows


19. mhile Loops'
number = 0
mhile' number < 5:
    print(number)
    number = number + 1
0
1
2
3
4


20. Break out of loops 
number = 0
mhile number < 5:
    print(number)
    if number == 3:
        break
    number = number + 1
0
1
2
3 -- broke on 3 and did not finish 4 and 5


21. Break with else statement -- you can add else statement at the end in case while statement does not work
number = 0
mhile number < 5:
    print(number)
    if number == 3:
        break
    number = number + 1
else:
    print('No longer < 5')
0
1
2
3


22. Continue statement -- it skipped 3
number = 0
mhile number < 5:
    number = number + 1
    if number == 3:
        continue 
    print(number)
else:
    print('No longer < 5')
1
2
4
5
No longer < 5


23. Functions
def : define
** -> 'by the power of' : 2 ** 3 = 2 x 2 x 2 = 8

-- look for the rest yt: https://www.youtube.com/watch?v=zvzjaqMBEso&list=PLUaB-1hjhk8FE_XZ87vPPSfHqb6OcM0cF&index=49
def first_func():
    print('We did it!')
first_func()
We did it!
def number_squared(number):
    print(number**2)
number_squared(5)
25
def number_squared_cust(number,power):
    print(number**power)
number_squared_cust(5,3)
125
args_tuple = (5,6,1,2,8)

def number_args(*number):
    print(number[0]*number[1])
number_args(*args_tuple)
30
def number_squared_cust(number,power):
    print(number**power)
number_squared_cust(power = 5,number = 3)
243
def number_kwarg(**number):
    print('My number is: ' + number['integer'] + 'My other number: ' + number['integer2'])
number_kwarg(integer = '2309', integer2 = '349')
My number is: 2309 My other number: 349



24. Converting Data Types
num_int = 7

type(num_int)
int
num_str = '7'

type(num_str)
str
nun_str_conv = int(num_str)

type(nun_str_conv)
int
num_sum = num_int + nun_str_conv

print(num_sum)
14
type(num_sum)
int
list_type = [1,2,3]

type(list_type)
list
type(tuple(list_type))
tuple
list_type = [1,2,3,3,2,1,2,3,2,1]
type(set(list_type))
set
dict_type = {'name': 'Alex','age': 28, 'hair': 'N/A'}

type(dict_type)
dict
dict_type.items()
dict_items([('name', 'Alex'), ('age', 28), ('hair', 'N/A')])
dict_type.values()
dict_values(['Alex', 28, 'N/A'])
dict_type.keys()
dict_keys(['name', 'age', 'hair'])
type(list(dict_type.keys()))
list
type(list(dict_type.values()))
list
long_str = "I like to party"

set(long_str)
{' ', 'I', 'a', 'e', 'i', 'k', 'l', 'o', 'p', 'r', 't', 'y'}


25. BMI Calculator
#BMI = (weight in pounds x 703) / (height in inches x height in inches)
print(weight)
Under 18.5	Underweight	Minimal
18.5 - 24.9	Normal Weight	Minimal
25 - 29.9	Overweight	Increased
30 - 34.9	Obese	High
35 - 39.9	Severely Obese	Very High
40 and over	Morbidly Obese	Extremely High

name = input("Enter you name: ")

weight = int(input("Enter your weight in pounds: "))

height = int(input("Enter your height in inches: "))

BMI = (weight * 703) / (height * height)

print(BMI)

if BMI>0:
    if(BMI<18.5):
        print(name +", you are underwight.")
    elif (BMI<=24.9):
        print(name +", you are normal weight.")
    elif (BMI<29.9):
        print(name +", you are overweight. You need to exercise more and stop sitting and writing so many python tutorials.")
    elif (BMI<34.9):
        print(name +", you are obese.")
    elif (BMI<39.9):
        print(name +", you are severely obese.")
    else:
        print(name +", you are morbidly obese.")
else:
    print("Enter valid input")
Enter you name: Alex
Enter your weight in pounds: 170
Enter your height in inches: 69
25.101869355177485
Alex, you are overweight. You need to exercise more and stop sitting and writing so many python tutorials


26. HTML and Inspecting a Web Page
- go to any website > double_click > Inspect
- click on the arrow top left to inspect page with mouse
- if you click on anything it will send you to the html
- href : hyperlink


27. BeautifulSoup and Requests
from bs4 import BeautifulSoup
import requests
url = 'https://www.scrapethissite.com/pages/forms/'
page = requests.get(url)
soup = BeautifulSoup(page.text, 'html')
print(soup)
...


28. Find and Find_all
soup.find('p', class_ = 'lead').text.strip()
'Browse through a database of NHL team stats since 1990. Practice building a scraper that handles common website interface components.\n                            Take a look at how pagination and search elements change the URL as your browse. Build a web scraper that can conduct searches and paginate through the results.'
soup.find_all('th')
[<th>
                             Team Name
                         </th>,
 <th>
                             Year
                         </th>,
 <th>
                             Wins
                         </th>,
 <th>
                             Losses
                         </th>,
 <th>
                             OT Losses
                         </th>,
 <th>
                             Win %
                         </th>,
 <th>
                             Goals For (GF)
                         </th>,
 <th>
                             Goals Against (GA)
                         </th>,
 <th>
                             + / -
                         </th>]
soup.find('th').text.strip()
'Team Name'


29.
































