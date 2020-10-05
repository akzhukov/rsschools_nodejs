# Rolling Scopes School. NodeJs Course 2020. 
## Task1. Caesar cipher CLI tool

**The repository contains CLI tool which encode or decode a text by Caesar Cipher**

**Start Usage**

For installing necessary modules and their dependencies run the following command in the terminal (from the directory containing this README):
```bash
> npm install
```

**Start Usage**

For starting to work with CLI need to run next command in the terminal (from the root repository directory):
```bash 
$ node task1Rin -s 2 -a encode
```

**Possible Options:**
1.  **-s, --shift \<shift>**: required number, shift on how many characters will happen
2.  **-a, --action \<action>**: required string, type of an action - encode or decode
3.  **-i, --input \<input>**: optional string, an input file path
4.  **-o, --output \<output>**: optional string, an output file path

**Details:**
1. If action or shift options aren't provided, error message will be showed
2. If the input file is missed - text may be entered by terminal
3. If the output file is missed - encoded/decoded text will be provided into terminal
4. If the input and/or output file is given but doesn't exist or can't be readable, error will be provided in the terminal
5. Only English alphabet is encoding/decoding, all other characters are kept untouched

**Usage examples:**
- Encode by terminal
```bash
$ node task1Run -a encode -s 1
```
> terminal input:
> `Hello World!`

> terminal output:
> `Gdkkn Vnqkc!`

- Decode by terminal
```bash
$ node task1Run -a decode -s 1
```
> terminal input:
> `Gdkkn Vnqkc!`

> terminal output:
> `Hello World!`

- Encode by files
```bash
$ node task1Run -a encode -s 1 -i ./input.txt -o ./output.txt
```
> ./input.txt
> `Hello World!`

> ./output.txt
> `Gdkkn Vnqkc!`
