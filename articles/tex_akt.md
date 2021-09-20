---
title: 'Porównywanie tekstów z aktualizacjami'
content: "
Umiesz już porównywać podsłowa różnych słów za pomocą haszowania. Zastanówmy się, co zrobić w przypadku, gdy nasze słowo ulega zmianom w trakcie działania programu. Po każdej zmianie należałoby liczyć wszystkie hasze od nowa. Gdyby każda zmiana dotyczyła pierwszej literki słowa o długości $n,$ uaktualnienie zajęłoby $O(n \\cdot q)$ czasu, gdzie $q$ to liczba zmian. Nie możemy sobie pozwolić na pisanie tak wolnych algorytmów. W celu przyspieszenia obliczeń użyjemy drzewa przedziałowego punkt – przedział. Jeśli nie umiesz go jeszcze implementować, przeczytaj nasz artykuł na ten temat, a potem tutaj wróć.

## Porównywanie podsłów w aktualizowanym słowie

Zbuduj strukturę, która umożliwia dwa rodzaje operacji na słowie $S:$

- zmiana literki na pozycji $x$ w słowie $S,$
- sprawdzenie, czy podsłowa $[a, \\ b]$ i $[c, \\ d]$ są równe

### Rozwiązanie - drzewo przedziałowe haszy

W rozwiązaniu tego problemu pomoże nam drzewo przedziałowe punkt - przedział. Na początku do $i$-tej pozycji za pomocą funkcji insert wrzucimy wartość $p^i \\cdot S[i].$ W każdym wierzchołku drzewa będziemy trzymać sumę tych wartości na przedziale, który on obejmuje. Zauważmy, że po zmianie literki na danej pozycji będziemy mogli w każdej chwili zaktualizować całą strukturę w $O(log \\ n).$

![Drzewo przedziałowe haszy](https://codimd.s3.shivering-isles.com/demo/uploads/upload_b2fe9fce1cb96b7c1f6e69a4daff73cd.png)

Chcielibyśmy umieć porównywać pewne dwa podsłowa $[a, \\ b]$ i $[c, \\ d].$ Umiemy policzyć sumę na dowolnym przedziale w $O (log \\ n),$ używając funkcji querry drzewa przedziałowego. Żeby otrzymać hasz podsłowa $[a, \\ b]$ musimy jeszcze tylko przemnożyć sumę na tym przedziale przez $p^{-a}.$

![Obliczanie haszu podsłowa](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1b70b95b0a1f4477c5dd050416a0f0ab.png)

Oznacza to, że Umiemy wykonywać obie operacje wymagane w naszym problemie w czasie $O(log \\ n).$ W takim razie wykonanie $q$ takich operacji zajmie nam jedynie $O(q \\cdot log \\ n)$ czasu i $O(n \\cdot log \\ n)$ pamięci. To rozwiązanie jest świetnym przykładem na to, jak łącząc zupełnie różne techniki, takie jak haszowanie i drzewo przedziałowe, można uzyskiwać śliczne rozwiązania trudniejszych problemów.

## Zadania
- [Pociągi (XV OI, II etap)](https://szkopul.edu.pl/problemset/problem/_aNlLfqZBTY6FRf2_IGScTLn/site/?key=statement)
- [Dwa Słowa (VI OIJ, I etap)](https://szkopul.edu.pl/problemset/problem/2fqB1cn-a3xJdgxAuOJPE3Lj/site/?key=statement)
"
---
