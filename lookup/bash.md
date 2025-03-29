# Bash Documentation
---
</br>

## Creating Bash Script
---
> 1. All Command-line scripts start with the **shebang** (sequence of the two characters ```#!```)
> 2. After these two characters, you can name any interpreter and a list of arguments: ```#!interpreter [optional arguments]```
> 3. For Bash scripts, the **shebang** is: ```#!/bin/bash``` 
</br>

> * Note: Try ```/usr/bin/```, ```/bin```, or ```usr/local/bin``` to use this trick to create an executable python script.

</br>

## Running Bash Script
---
* Option 1. Type and execute ```bash <script>.sh``` in the terminal.
* Option 2. Make the script file executable. To do this execute the following command:
    * ```chmod +x <script>.sh```

</br>

## Bash Scripting with Args
---
> Example Script:
> ```
> #!/bin/bash
> echo "Hello $1, from $0"
> ```
> Example Script Execution:
> ```
> ./<script>.sh argument1
> ```
> Example Script Result:
> ```
> "Hello argument1, from /<script>.sh"
> ```
> </br>

</br>

## Variables
---
With Bash you access variables w/the dollar sign, but you set them without.
> ```
> // setting
> myvar = "hello world"
> 
> // using
> echo $myVar
> ```   

</br>

#### **Reserved Variables**:
> Variable | Value
> -------- | ----- 
> $0 | The name of the current script.
> $1 ... $9 | The first 9 arguments of the script.
> $# | Number of arguments passed to the script.
> $@ | All the arguments passed to the script.
> $USER | The username of the user running the script.
> $HOSTNAME | The hostname of the machine the script is being ran on.
> $SECONDS | The number of seconds since the script was started.
> $RANDOM | Returns a random number each time referenced.
> $LINENO | Returns the current line number in the script.

</br>

## Loops
---
Basic syntax of a loop:
> ```
> for VARIABLE in A LIST
>   do
>       command1
>       commandN
>   done
> ```   

## Conditions
---
Basic syntax of an If-Else:
> ```
> if test -z "$1"
> then
>   echo "Usage: $0 <your name>"
> else
>   echo "Hello $1, from $0" 
> ```   
