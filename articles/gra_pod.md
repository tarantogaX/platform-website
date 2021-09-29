---
title: 'Aktualizacje na poddrzewach'
content: "
W rozwiązaniach niektórych problemów pojawia się potrzeba wykonywania operacji takich jak dodawanie, odejmowanie, xorowanie wartości zapisanych w wierzchołkach należących do danego poddrzewa. Okazuje się, że jeśli w sprytny sposób zbudujemy drzewo przedziałowe, będziemy mogli poradzić sobie z tym problemem w czasie $O(log\\ n).$


## Porządki preorder i postorder

Wierzchołkom drzewa można nadać numery w takiej kolejności, w jakiej wchodzimy do nich podczas przechodzenia grafu algorytmem DFS.


![Kolejność preorder](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a0cfe33aa150a34d969cb2334b48edc5.png)


Ta numeracja nazywana jest <b>preorder.</b> Gdybyśmy numerowali wierzchołki w takiej kolejności, w jakiej wychodzimy z nich podczas przechodzenia grafu algorytmem DFS, uzyskaliśmy numerację <b>postorder.</b>


![Kolejność postorder](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1254531b49dc29baddd5eaf5ef66e799.png)


```cpp=

int pre = 1, post = 1;

void dfs (int x) {

\ \ \ \ preorder[x] = pre ++;

\ \ \ \ odw[x] = true;

\ \ \ \ for (int i = 0; i < v[x].size(); i ++)

\ \ \ \ \ \ \ \ if(!odw[v[x][i]])

\ \ \ \ \ \ \ \ \ \ \ \ dfs (v[x][i]);

\ \ \ \ postorder[x] = post ++;

}

```


## Drzewo preorder a drzewo przedziałowe

Zauważmy, że numery preorder wierzchołków znajdujących się w jednym poddrzewie będą kolejnymi liczbami całkowitymi. Korzeń poddrzewa odwiedzimy jako pierwszy, następnie całe jego poddrzewo i dopiero, kiedy z niego wyjdziemy zaczniemy przeglądać inne wierzchołki. Z tego powodu numery preorder poddrzewa ukorzenionego w wierzchołku $x$ stanowią spójny przedział $<preorder[x], preorder[x] + ile[x] - 1>$ gdzie $ile[x]$ to wielkość tego poddrzewa. Umożliwia nam to zbudowanie drzewa przedziałowego na numerach preorder.


![Poddrzewo odpowiada spójnemu przedziałowi](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e5170a325b5cf695720fe80ac6f79192.png)


![Dzielenie wierzchołków grafu na przedziały](https://codimd.s3.shivering-isles.com/demo/uploads/upload_0dcc6c137441c397f858b64f05d13e0c.png)


W ten sposób możemy wykonywać na poddrzewach wszystkie operacje, które umiemy zrobić na zwykłych przedziałach drzewem przedziałowym.


## Zadania

- [Dostawca pizzy (XXIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/q_HBwDECevrQ2iQh1wT6ssx2/site/?key=statement)

- [Propagating tree (Codeforces, Div. 1 C)](https://codeforces.com/contest/383/problem/C)

"
---
