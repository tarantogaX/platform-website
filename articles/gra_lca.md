---
title: 'Najgłębszy wspólny przodek'
content: "
<b>Najgłębszy wspólny przodek</b> (ang. Lowest Common Ancestor) wierzchołków $A$ i $B$ jest to najgłębszy taki wierzchołek $C,$ że $C$ jest przodkiem zarówno $A,$ jak i $B.$ Innymi słowy $A$ i $B$ są w poddrzewie $C.$


![Wspólni przodkowie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_815e4dfb9a4bac66b4e1b1dc62e2bf32.png)


Na różowo zaznaczone są wierzchołki będące wspólnymi przodkami wierzchołków $A$ i $B,$ a $C$ jest ich najgłębszym wspólnym przodkiem (inaczej $LCA(A,B)$). Zauważmy, że różowe wierzchołki tworzą ścieżkę od korzenia do $C.$


## Najkrótsza ścieżka w drzewie

Ścieżka między dwoma wierzchołkami $A$ i $B$ zawsze zaczyna się w $A,$ idzie w górę drzewa aż do $LCA(A,B),$ a potem w dół do $B.$ Innymi słowy składa się ona z dwóch ścieżek, które biegną w górę drzewa: jedna od $A$ do $LCA(A,B),$ druga od $B$ do $LCA(A,B).$


![Najgłębszy wspólny przodek](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c24de648f2e54ede715eb57fee132a51.png)


## Przodkowie w drzewie

Niech ```ancestor[x][k]``` oznacza przodka $x,$ który jest od niego oddalony o $2^k$ krawędzi. Jeśli $2^k$ jest większe niż odległość między $x$ a korzeniem, przyjmiemy, że ```ancestor[x][k]``` jest korzeniem.


Zauważmy, że jeśli $x$ nie jest korzeniem, to ```ancestor[x][0]``` jest ojcem $x.$ W przeciwnym wypadku ```ancestor[x][0] = x```.


![Skoki](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d0d410426a13315d9df6f25a7043c738.png)


Z kolei dla $k>0$ ```ancestor[x][k] = ancestor[ancestor[x][k–1]][k–1]```, ponieważ $2^k = 2^{k–1}+ 2^{k–1}.$


![Dwa skoki o 2^k-1 to skok o 2^k](https://codimd.s3.shivering-isles.com/demo/uploads/upload_20c4594b345c2e3a68cb274110b63d9d.png)


```cpp=

void make_ancestor() {

	ojciec[korzen] = korzen;

	for (int x = 1; x <= n; x ++)

		ancestor[x][0] = ojciec[x];

	for(int k = 1; k <= 20; k ++) {

		///Dla n <= 10^ 6 log(10^ 6) = 20

		for(int x = 1; x <= n; x ++)

			ancestor[x][k] 

				= ancestor[ancestor[x][k - 1]][k - 1];

	}

}

```


## Znajdowanie LCA

Niech ```depth[x]``` oznacza głębokość $x.$ Ponieważ odległość między $A$ i $LCA(A,B)$ jest równa ```depth[A] - depth[LCA(A, B)]```, jeśli ```depth[A] = depth[B]```, to $A$ jest w tak samo daleko od $LCA(A, B)$ co $B.$


![Ścieżki od LCA do dwóch wierzchołków](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ea543d6d73431efa4c3050c64dd986be.png)


Załóżmy, że ```depth[B] >= depth[A]```. Na początku znajdujemy przodka $B,$ którego głebokość jest równa $depth[A].$ Oznaczmy go przez $B'.$ Użyjemy do tego tablicy ancestor. „Skaczemy” do wierzchołka oddalonego od $B$ o największe takie $2^k,$ że ```depth[ancestor[B][k]] >= depth[A]```. Z niego możemy wykonać następny skok do wierzchołka, z którego wykonamy kolejny skok\\dots Każdy kolejny będzie coraz krótszy. Gdyby dwa skoki miały taką samą długość, można byłoby zrobić jeden, dwa razy dłuższy - założenie nie byłoby spełnione. W ten sposób po $O(log \\ n)$ skokach znajdziemy się w $B'.$ Jeśli $B' = A,$ znaleźliśmy $LCA(A, B).$


```cpp=

if (depth[B] < depth[A])

	swap (A, B);

for (int k = 20; k >= 0; k --)

	if (depth[ancestor[B][k]] >= depth[A])

		B = ancestor[B][k];

if(A == B)

	return A;

```


![LCA oraz skoki - pośredni przodkowie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_0af5fd9de8c63af01a55946395457460.png)


W przeciwnym wypadku możemy wykonywać analogiczne „skoki” o największe takie $2^k,$ że ```ancestor[A][k] != ancestor[B'][k]```. Po $O(log \\ n)$ ruchach wierzchołki, do których doskoczymy będą synami $LCA(A,B).$


```cpp=

for (int k = 20; k >= 0; k --) {

	if (ancestor[A][k] != ancestor[B][k]) {

		a = ancestor[a][k];

		b = ancestor[b][k];

	}

}

return ojciec[A];

```


W ten sposób znaleźliśmy $LCA(A,B)$ kosztem czasowym i pamięciowym $O(n \\cdot log \\ n).$


## Zadania

- [Komiwojażer Bajtazar (IX OI, I etap)](https://szkopul.edu.pl/problemset/problem/-fb7NxSJGXxkJ2Om5FvXzbil/site/?key=statement)

- [Randka (XIX OI, I etap)](https://szkopul.edu.pl/problemset/problem/gIvRmapl7sX6di87092Rmjdw/site/?key=statement)

- [Odwiedziny (XXII OI, III etap)](https://szkopul.edu.pl/problemset/problem/Mlar--JvS1gThazr04pNorHN/site/?key=statement)

"
---
