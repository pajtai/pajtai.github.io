---
title: It's hip to be square (or rectangular) - solving equations with matrices
date: 2019-01-05 22:39:25
katex: true
tags:
- linear algebra
- equations  
---

Arranging numbers in rectangles to do math turns out to often be more efficient than iteration.

Sometimes you have to solve a bunch of equations. Let's take a simple example. Let's say 
you're converting a bunch of temperatures from Celsius to Fahrenheit. 

You've got your list of $^oC$ temperatures: `140`, `145`, `160`, `163`, `170`, `175`...

And you know that:

$$
^oF =\space ^oC \frac{9}{5} + 32 
$$

If you've got more than 5 temperatures, using the calculator gets annoying. If you're familiar with spreadsheets, this is
when you'd create a formula in one of them. Linear algebra can be used very much like a spread sheet.

We can matrix multiplication to do our work quickly and efficiently.

When you multiply a matrix by a vector, you multiply each row in the matrix by each item in the vector and sum across the row.

For example:

$$
\begin{bmatrix}
A & B \\\
C & D
\end{bmatrix} * 
\begin{bmatrix}
E \\\ F
\end{bmatrix}
= 
\begin{bmatrix}
A E + B F \\\
C E + D F
\end{bmatrix}
$$

So, to set this up with tempratures we have:

$$
\begin{bmatrix}
140 & 1 \\\
145 & 1 \\\
160 & 1 \\\
163 & 1 \\\
170 & 1 \\\
175 & 1 \\\
\end{bmatrix} *
\begin{bmatrix}
\frac{9}{5} \\\ 32
\end{bmatrix}
$$

If you're using [Octave](https://www.gnu.org/software/octave/) and import the temperatures in - or as in the example 
type them out - this is pretty easy to setup.

```octave
% vector of temparutures
T = [140; 145; 160; 163; 170; 175]
 
% add the ones
T = [T ones(length(T), 1)]
 
c = [9/5; 32]

% do the math
F = T*c

F =

   284.00
   293.00
   320.00
   325.40
   338.00
   347.00
```

If you're a programmer, you're probably saying to yourself that you can just do this with iteration and a `CtoF` function.
The interesting thing is that matrix operations like this are generally more efficient than iteration.

You can also use a similar concept to solve multiple unknowns in multiple equations.

For example if we have `4x+3y=17` and `10x - 4x = 8` we can represent those two equations like we did above.

$$
\begin{bmatrix}
4 & 3 \\\
10 & -4
\end{bmatrix}
\begin{bmatrix}
x \\\ y
\end{bmatrix}
=
\begin{bmatrix}
17 \\\ 8
\end{bmatrix}
$$

So, we've setup `AX = B`, to solve for `X` we multiply both sides by the inverse of `A`:

$$
A^{-1}AX=A^{-1}B 
$$

And $A^{-1}A$ is $I$, the identity matrix, so $IX=X$

$$
X=A^{-1}B
$$ 

So, in Octave we have:

```octave
pinv([4 3;10 -4])*[17; 8]
ans =

   2.0000
   3.0000
```

So x is 2 and y is 3. This equation set is simple enough that you can visually verify. The neat thing is that this works
for much larger numbers of unkowns too.... and those are a real pain to do by hand!