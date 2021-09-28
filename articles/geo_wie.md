---
title: 'Wielokąty'
content: "
Na poprzedniej lekcji nauczyliśmy się już kilku przydatnych rzeczy związanych z geometrią - między innymi tego, w jaki sposób liczyć odległości między punktami i pola trójkątów. Teraz czas wcielić tą wiedzę w życie i spróbować rozwiązać nasze pierwsze problemy geometryczne. W tym artykule skupimy się na podstawowych zagadnieniach związanych z wielokątami.

## Pole wielokąta




## Punkty w wielokątach





## Punkty w wielokątach wypukłych



## Zadanie

Teraz w ramach ćwiczeń przedstawimy przyjemne zadanie geometryczne:


Dany jest wielokąt wypukły o $n$ wierzchołkach $A_1, A_2, ... A_n$ i $q$ zapytań postaci: dla danych $a$ i $b$ podaj  pola  dwóch  wielokątów,  które  powstaną  przez rozdzielenie  wejściowego  wielokąta  wzdłuż przekątnej $A_a A_b$. Oczekiwana złożoność: $O(n+q)$. Zachęcamy do samodzielnego pomyślenia nad rozwiązaniem zanim sięgniesz do rozwiązania przedstawionego poniżej:


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f49b9b54d1a1da5ef244c2c0a7f7aa82.png)


Możemy  podzielić  nasz  wielokąt  na  trójkąty $A_1 A_2 A_3, \ A_1 A_3 A_4, \ A_1 A_4 A_5$ itd.  Niech $S(i)=P_{A_1 A_2 A_3} + P_{A_1 A_3 A_4} + P_{A_1 A_{i-1} A_1}$. Innymi słowy $S(i)$ będzie oznaczać sumę prefiksową pól trójkątów, na które podzieliliśmy nasz wielokąt. Chcemy umieć w czasie $O(1)$ podać pole wielokąta $A_a A_{a+1} ... A_{b-1} A_b$ dla dowolnych $a$ i $b$. Zauważmy, że $P_{A_a ... A_b}=S(b)-S(a)-P_{A_1 A_a A_b}$. Wzór na pole $A_b A_{b+1} ... A_n A_1 ... A_{a-1} A_a$ możemy wyprowadzić w analogiczny sposób. Zatem gdy stablicujemy na początku wartości $S(i)$ to możemy odpowiadać na takie zapytania w czasie stałym.


Innym bardzo ciekawym (choć nieco trudniejszym) i nie wymagającym dużej wiedzy geometrycznej zadaniem jest Najazd z XIII Olimpiady Informatycznej, którego treść i opracowanie można znaleźć na stronie oi.edu.pl w dziale Książeczki.


## Zadania

- [Najazd (XIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/ifGPlMtR2muaLl-03rmGj6T8/site/?key=statement)

- [Okno (V OI, II etap)](https://szkopul.edu.pl/problemset/problem/6vQz3xrV-X1aXufZwBP2Uljp/site/?key=statement)

- [Alyona and Triangles (Codeforces, Div. 2 E)](https://codeforces.com/problemset/problem/682/E)

"
---
