---
title: 'Skalowanie'
content: "
Nieraz rozwiązywać będziemy zadania, w których musimy zapisywać informacje dla elementów pewnego ciągu $a_i.$ Najwygodniej byłoby je stablicować w podobny sposób, co przy zliczaniu kubełkowym. Problem pojawia się w momencie, gdy $a_i$ mogą być duże. Bardzo często zdarza się jednak, że nie obchodzą nas wartości $a_i,$ tylko relacje (mniejszości, większości i równości) zachodzące między nimi. W takich wypadkach możemy wykorzystać technikę skalowania.

## Jak działa skalowanie?

Będziemy chcieli zamienić elementy ciągu $a$ na możliwie małe wartości tak, by zachować relacje między nimi. Przetworzymy $a_i$ w kolejności rosnącej. W tym celu posortujemy pary $(a_i, i)$ po pierwszym elemencie. 


![posortowane pary (a_i, i)](https://codimd.s3.shivering-isles.com/demo/uploads/upload_45ae7abab94f01b7e0ebaaa8b1fef981.png)


Zdefiniujmy dwie zmienne pomocnicze:


- $ost$ – wartość ostatniego elementu naszego ciągu, który już przeskalowaliśmy.  Na początku będzie on równy liczbie spoza zakresu możliwych wartości $a_i.$ W przypadku liczb całkowitych nieujemnych może to być np. $-1.$


- $K$ – liczba, na którą „przeskalowaliśmy” ostatni przetworzony element. Na początku będzie ona równa $-1$ lub $0,$ w zależności od tego czy chcemy aby wartości ciągu $a_i$ były nieujemne czy dodatnie.


Dla każdej kolejnej pary $(a_i, i)$ sprawdzamy relacje $a_i$ z $ost.$ Jako, że są one posortowane w kolejności rosnącej $a_i \\geqslant ost.$


- $a_i = ost$: na $i$-tej pozycji naszego ciągu musimy zapisać $K,$


- $a_i > ost$: na $i$-tej pozycji musimy zapisać wartość większą od $K.$ Jako że chcemy, by była ona minimalna, może być równa $K + 1.$


Po przetworzeniu elementu danej pary musimy zaktualizować wartość zmiennej ost zmieniając ją na $a_i.$ Kiedy zakończymy powyższy algorytm uzyskamy przeskalowany ciąg $a_i.$ Będziemy mogli spokojnie tablicować i zliczać kubełkowo różne potrzebne infromacje.


```cpp=

void skaluj(int n, int a[]) {

\ \ \ \ for (int i = 1; i <= n; i ++)

\ \ \ \ \ \ \ \ p[i] = make_pair(a[i], i);

\ \ \ \ int ost = -1, K = -1;

\ \ \ \ for (int i = 1; i <= n; i ++) {

\ \ \ \ \ \ \ \ if (p[i].first != ost)

\ \ \ \ \ \ \ \ \ \ \ \ K++;

\ \ \ \ \ \ \ \ a[p[i].second] = K;

\ \ \ \ \ \ \ \ ost = p[i].first;

\ \ \ \ }

}

```

Wykorzystaliśmy tutaj strukturę ```pair``` ze standardowej biblioteki C++, o której możesz przeczytać więcej w lekcji Standard Template Library.

## Zadania

- [Pillars (Codeforces, Div. 2 E)](https://codeforces.com/contest/474/problem/E)

- [Domino Principle (Codeforces, Beta Round Div. 2 E)](https://codeforces.com/contest/56/problem/E)
"
---
