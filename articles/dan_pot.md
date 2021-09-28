---
title: 'Drzewo potęgowe'
content: "

Zapewne umiesz już podawać sumę na przedziale przy pomocy sum prefiksowych. Dzisiaj nauczysz się, jak obliczyć te wartości w przypadku, kiedy w międzyczasie elementy ciągu mogą się zmieniać. 

## Zadanie

Mając dany ciąg $C$ o dlugości $n$ napisz strukturę, która umożliwia:

- dodanie wartości do danego elementu ciągu,

-  obliczanie sumy na przedziale.



## Drzewo potęgowe

Strukturą, której szukamy jest drzewo potęgowe. Będziemy implementować je na zwykłej tablicy. Nazwijmy ją $D.$ Niech $S [a; b]$ oznacza sumę na przedziale $[a; b]$ ciągu $C.$ Wówczas w $D[x]$ będziemy trzymali $S [x - p_x + 1; x],$ gdzie $p_x$ to największa potęga dwójki, która dzieli $x.$ Na przykład w pierwszej komórce będziemy trzymać $S [1],$ dwunastej $S[9;12],$ a ósmej - $S[1;8].$


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_0ca707a3cc297414c93be5f01a1484aa.png)


Załóżmy, że zbudowalismy już $D.$ Teraz nauczymy się je obsługiwać. 


### Update(x, w)


<b>Update(x, w)</b> jest funkcją dodającą $w$ do $x$-tego elementu ciągu $C.$ W tym celu musi zaktualizować wszystkie komórki $D,$ w których trzymamy sumy na przedziałach obejmujących $x$-tą pozycję. Oczywiście każda z nich ma numer większy lub równy $x.$ $D[x]$ trzeba zaktualizować. Liczbą będącą indeksem kolejnej komórki do uaktualnienia będzie najmniejsza liczba większa od $x$ i podzielną przez $p_x, czyli x+p_x.$ Zauważmy, że $x+p_x$ jest podzielne przez $2\\cdot p_x.$ Dzieje się tak, ponieważ $p_x$ jest potęgą dwójki dzielącą $x.$ Kolejną będzie $x+p_x +p_{x+p_x}$ i tak dalej. Zauważmy, że każda kolejna komórka będzie co najmniej 2 razy dalej od poprzedniej niż poprzednia od jeszcze wcześniejszej. Z tego powodu zmienionych komórek może być maksymalnie $O(log(n)).$ Komórek pomiędzy $x$ a $x+p_x,$ nie będzie trzeba aktualizować. Dlaczego? Niech $y$ będzie liczbą z przedziału $(x + 1; x + p_x).$ Ponieważ $p_y$ = $p_y \\pmod{p_x},$ $y \\bmod p_x \\geqslant p_y,$ więc $y - p_y + 1 \\geqslant x + 1.$


```cpp=

void Update(int x,int w)

{

\ \ \ \ if(x > zak)

\ \ \ \ \ \ \ \ return; //kolejna pozycja do zmiany jest poza zakresem

\ \ \ \ D[x] = D[x] + w;

\ \ \ \ Update(x + (x & (-x)), w);

}

```


### Sum(x)


<b>Sum(x)</b> jest funkcją, która zwraca sumę na prefiksie $[1,x].$ Na początku doda do wyniku $D[x]  - S[x - p_x + 1; x].$ Musi jeszcze dodać $S[1; x - p_x].$ W tym celu weźmie wartości $D[x - p_x],$ $D[x - p_x - p_{x-p_x}]$ i tak dalej... Wykona $O(log(x))$ operacji, ponieważ $x - p_x$ jest podzielne przez $2\\cdot p_x.$


```cpp=

int Sum(int x)

{

\ \ \ \ if (x == 0)

\ \ \ \ \ \ \ \ return 0; //zsumowalismy cały przediał

\ \ \ \ return D[x] + Sum(x - (x & (-x)));

}

```

### Inne funkcje


Drzewo potęgowe może przetwarzać wartości z prefiksów,  więc można nim obliczać wartości tych same funkcji, co w przypadku sum prefiksowych.


### Budowanie $D$ i obliczanie $p_x$


Początkowe budowanie $D$ można wykonać w $O (n log n)$ wywołując funkcje update dla każdej pozycji ciągu. Natomiast dzięki specyfice zapisu liczb przez C++ możemy obliczyć $p_x$ w $O(1)$: ```p_x = x & -x```


## Zadania

- [Rozliczenia (XXVI OI, II etap)](https://szkopul.edu.pl/problemset/problem/7feyJYY7uz_g6iGLS_QPwJVG/site/?key=statement)

- [Pracowity Jaś (XXIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/_cVmDXXn2TjF0dF1rW6eazA0/site/?key=statement)

- [Goodbye Souvenir (Codeforces, Div. 2 E)](https://codeforces.com/contest/849/problem/E)

"
---
