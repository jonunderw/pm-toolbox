# Command Line Tooling 

> Documenation on various command line tools.

---
</br>
</br>

## File System
---
</br>

### List files of a specific file extension
> ```
> dir /s /b *.txt | findstr /v .txt
> ```

### List files
> ```
> find . -type f
> ```

### List directories
> ```
> find . -type d
> ```

### List files modified 5 minutes ago 
> ```
> find . -type f -mtime +5min
> ```

### Make a file executable 
> ```
> chmod +x <file-to-make-executable>.sh
> ```

</br>
</br>

## Grep Commands
---
</br>

### Search file for a given string
> ```
> grep -i GivenString fileToSearchIn.log
> ```

</br>
</br>

## Pipe Commands
---
</br>

### Search file for a given string
> ```
> cat <filename> | wc
> ```
* 'cat' prints the content of a file
* 'wc' counts all the lines, words, and bytes it is fed. Often used like. ``` wc -l ``` which counts the number of line numbers in a file. 

</br>
</br>

## XARGS Commands 
---
</br>

> Xargs reads items from standard input (meaning, you can pipe data to it) and executes the specified command on the input. 
> * Basic syntax: ``` xargs [options] [command [initial-args]] ```

</br>

### Find & convert all .mpeg files to .mp4
> ```
> find . -name "*.mpeg" | xargs -P 4 -I {} ffmpeg -i {} -o {}.mp4
> ```
1. Find all files with .mpeg file extension.
2. Feed the found files to xargs
3. xarg then is told to replace the file name in all places where it encounters {} with the ```-l``` option. 

* 'wc' counts all the lines, words, and bytes it is fed. Often used like. ``` wc -l ``` which counts the number of line numbers in a file. 
