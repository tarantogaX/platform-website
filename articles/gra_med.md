---
title: 'Meduzy'
content: "
Zgodnie z Wikipedią, meduza to jedna z dwóch form morfologicznych parzydełkowców (Cnidaria), pierwotnie swobodnie pływająca, pelagiczna, z galaretowatym ciałem, zwykle w kształcie dzwonu lub parasola, zasadniczo rozmnażająca się płciowo.


W teorii grafów nazywamy tak spójny graf o $n$ wierzchołkach i $n$ krawędziach. Dlaczego? Popatrz na jego wygląd:


![Meduza](https://codimd.s3.shivering-isles.com/demo/uploads/upload_dd5aa9f99a56ef3bdac795b0c1dd74cf.png)


## Kluczowa własność meduz

Gdy do spójnego grafu o $n$ wierzchołkach i $n - 1$ krawędziach -- drzewa dołożymy jeszcze jedną krawędź, uzyskamy meduzę. Razem z niektórymi krawędziami drzewowymi stworzy cykl.


![Drzewo z dołożoną krawędzią](https://codimd.s3.shivering-isles.com/demo/uploads/upload_69730673cf4707b2926653cf6ea9eedd.png)


Ponieważ drzewo jest acykliczne, meduza ma tylko jeden cykl. Innymi słowy jest to graf zbudowany z cyklu, do którego wierzchołków doczepione są drzewa. Umiemy je bardzo sprawnie przetwarzać. Z tego powodu obsługiwanie meduz będzie składać się z obliczeń na jej lesie oraz łączenia wyniku na cyklu.


## Implementacja programów z meduzami

Rozwiązywanie problemów dotyczących meduz może być bardzo przyjemnym zajęciem sprowadzającym się do implementacji kilku prostych funkcji lub mega syfem. Właśnie dlatego znaczną część artykułu poświęcę na opisanie ogólnej implementacji. Po pierwsze, musimy zastanowić się, czy w problemie mamy do czynienia z jedną meduzą, czy z całą ławicą.


![Ławica](https://codimd.s3.shivering-isles.com/demo/uploads/upload_53bafd7eac53dff17cf3199c511e0379.png)


W wektorze $Cykl[i]$ będziemy trzymali listę wierzchołków znajdujących się na cyklu $i$-tej meduzy. Bitset lub tablica bool'i $na\\_cyklu[x]$ określi, czy $x$ znajduje się na którymś z nich.


### Las meduzy

Drzewa ukorzenimy w wierzchołach znajdujących się na cyklu. Zauważmy, że tylko korzenie graniczą z wierzchołkami znajdującymi się poza drzewem -- tymi, których wartość $na\\_cyklu[]$ jest jedynką logiczną. Pozostałe wierzchołki drzewa są połączone tylko między sobą. Pozwala nam to przetwarzać je nie przejmując się tym, że należą do meduzy jeśli tylko \"wyifujemy\" nie wchodzenie do wierzchołków znajdujących się na cyklu.


Przykładowa implementacja $DFS'a$:


```cpp=

void dfs (int x) {

\ \ \ \ odw[x] = true;

\ \ \ \ // dowolne operacje

\ \ \ \ for (int i = 0; i < v[x].size(); i ++)

\ \ \ \ \ \ \ \ if (!odw[v[x][i]] && !na_cyklu[v[x][i]])

\ \ \ \ \ \ \ \ \ \ \ \ dfs(v[x][i]);\ \ \ \ 

\ \ \ \ // dowolne operacje

}

```


### Znajdowanie cyklu w meduzie

Cykl można znaleźć na wiele sposobów. Jest to prosty, jednakże bardzo heurogenny problem. Jeżeli w grafie mogą występować krawędzie wielokrotne lub pętle, prawie dobre sposoby okazują się błędnymi.


![Meduzy z krawędziami wielokrotnymi lub pętalmi](https://codimd.s3.shivering-isles.com/demo/uploads/upload_7622ceb5d623edded821dd3ea5b3d180.png)


Napiszemy $DFS'a.$ Podczas przechodzenia z wierzchołka $x$ do jego syna w $wychodzaca[x]$ zapiszemy numer krawędzi, którą przechodzimy. Kiedy w pewnym momencie z $b$ będzie wychodzić krawędź do $a$ o numerze innym niż $wychodzaca[a],$\\\\ ciąg $a,$ $wychodzaca[a],$ $wychodzaca[wychodzaca[a]],$ ... , $b$ będzie tworzyć cykl.


Zauważmy, że taka implementacja radzi sobie z krawędziami wielokrotnymi, jednakże przypadek z pętlą należy rozpatrzeć osobno. Nie powinno to jednak stanowić żadnego problemu -- wystarczy sprawdzić, czy istnieje krawedź z $x$ do $x.$


### Przykład: znajdywanie najdłuższej ścieżki w meduzie


Najdłuższa ścieżka może całkowicie zawierać się w jednym lub przechodzić przez cykl i dwa różne drzewa.


![Ścieżki w meduzach](https://codimd.s3.shivering-isles.com/demo/uploads/upload_b15225af5ed2189d25ff005c2671bc87.png)


Metody radzenia sobie z pierwszym przypadkiem są szczegółowo omówione w artykułe Drzewa -- Podstawy, dlatego skupimy się tutaj nad przypadkiem drugim. Najdłuższa ścieżka będzie składała się z trzech podścieżek -- dwóch drzewowych i jednej biegnącej po cyklu między nimi. 


Zauważmy, że jeśli chcemy poprowadzić scieżkę przez drzewo ukorzenione w $x,$ zawsze będzie nam się opłacało wziąć jak najdłuższą ścieżkę biegnącą przez to drzewo. Owa długość jest równa jego głębokości.


Niech $F[i]$ oznacza głebokość drzewa ukorzenionego w $i$-tym wierzchołku naszego cyklu. Sprowadziliśmy nasz problem do znalezienia maksymalnej wartości $F[i]$ $+$ $F[j]$ + $max(j - i, n - (j - i))$ dla $i < j,$ ponieważ ścieżka między drzewem $i$-tym i $j$-tym może biec po cyklu na dwa sposoby. Rozbijemy problem na dwa przypadki. Znajdziemy maksymalną wartość $F[i] + F[j] + (j - i)$ przechodząc po wierzchołkach w kolejności rosnących indeksów, a następnie znajdziemy maksymalną wartość $F[i] + F[j] + n - (j - i)$ przechodząc w kolejności malejących indeksów. Ponieważ oba przypadki oblicza się w dokładnie taki sam sposób, omówię go raz na przykładzie pierwszego.


![Dwa rodzaje ścieżek w meduzie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_17ff42beb71fbede4e99324e1ce7d73e.png)


Niech $OPT[i]$ oznacza długość najlepszej ścieżki, z którą możemy połączyć $i$-te drzewo. Zauważmy, że pierwszego wierzchołka nie połączymy z żadnym wcześniejszym, więc $OPT[1] = 0.$ Dla $i > 1$ zachodzi $OPT[i] = max(OPT[i - 1], F[i - 1]) + 1,$ ponieważ optymalnym może okazać się to samo drzewo, co dla $i - 1$ lub $i - 1$ jest lepsze, a ścieżka w obu przypadkach zwiększy się o krawędź między $i - 1$ a $i.$


![Dwie części ścieżek](https://codimd.s3.shivering-isles.com/demo/uploads/upload_cf0f9cb4a2b81d63110874140757824d.png)


Rozwiązanie działa w czasie $O(n).$ Gorąco polecam je zaimplementować.


## Zadania

- [Zawody sportowe (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/fYzoFHo_2JRG4FQSt5UPRpn5/site/?key=statement)

- [Dookoła świata (XXI OI, III etap)](https://szkopul.edu.pl/problemset/problem/hogW-qBD1uDPGDS4jTohYMwc/site/?key=statement)

"
---
