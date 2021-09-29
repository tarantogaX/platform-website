---
title: 'Dwuspójne składowe'
content: "
W odróżnieniu od drzew, grafy posiadają masę cykli, przechodzenia między parami wierzchołków można dokonywać na wiele sposobów, a ich struktura jest jedną, wielką plątaniną. Kluczową okazuje się odpowiednia perspektywa, z której się je obserwuje. Czasem warto rozbić graf na dwuspójne składowe i obserwować relacje między nimi. Istnieje kilka definicji dwuspójnych. W tym artykule znajdzie się taka, która w możliwie najjaśniejszy sposób przekaże ich fenomen.


<b>Dwuspójna składowa:</b> maksymalny taki podgraf, że istnieją dwie rozłączne ścieżki między każdą parą wierzchołków, które do niego należą. Innymi słowy każda para wierzchołków w dwuspójnej leży na cyklu prostym.


## Drzewo DFS


Kiedy nie wiemy, jak patrzeć na graf nieskierowany, może opłacać się zbudować drzewo rozpinające DFS. Krawędzie, które wejdą w jego skład nazwiemy <b>drzewowymi,</b> a pozostałe <b>wstecznymi.</b>


![Krawędzie wsteczne](https://codimd.s3.shivering-isles.com/demo/uploads/upload_14f1c076347e7128a01eca51faaa4ee0.png)


<b>Twierdzenie:</b> Krawędzie wsteczne w drzewie DFS biegną między wierzchołkiem a jego przodkiem.


<b>Dowód:</b> Przeanalizujmy proces budowania drzewa -- przejście grafu w głąb. Gdyby krawędź wsteczna nie biegła między wierzchołkiem a jego przodkiem, rozciągałaby się między dwoma różnymi poddrzewami.


![Krawędź wsteczna między różnymi poddrzewami](https://codimd.s3.shivering-isles.com/demo/uploads/upload_bfa517b01a1dabfd0cbcee905bf26715.png)


Załóżmy bez straty ogólności, że $x$ zostanie odwiedzone przed $y.$ Kiedy dfs dojdzie do $x,$ wejdzie do $y$ i sprawi, że będzie on w jego poddrzewie. Czerwona krawędź będzie drzewowa, a nie wsteczna.


## Mosty i punkty artykulacji


Most jest to krawędzią, której usunięcie spowodowałoby rozspójnienie grafu. 


![Most](https://codimd.s3.shivering-isles.com/demo/uploads/upload_17b921b85e0010b7858c286c8334e98b.png)


Analogicznie punkt artykulacji to wierzchołek, którego usunięcie spowodowałoby rozspójnienie grafu.


![Punkt artkulacji](https://codimd.s3.shivering-isles.com/demo/uploads/upload_885f6d3c94951356d133dcc5124f8d3e.png)


Zauważmy, że liście drzewa DFS nie są punktami artykulacji, ponieważ po ich usunięciu graf pozostaje spójny.


![Liście drzewa DFS](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3b8ac81c4f8e18b6e8cdb3247143642c.png)


### Głębokość: definiujemy pomocnicze funkcje

Niech $low[x]$ oznacza najmniejszą głębokość, na jaką jesteśmy w stanie dojść z wierchołka $x$ przechodząc przez maksymalnie jedną krawędź wsteczną i dowolnie wiele drzewowych idących w głąb drzewa. Zauważmy, że możemy obliczyć jej wartości dla każdego $x$ programowaniem dynamicznym na poddrzewach. Niech $depth[x]$ oznacza głębokość $x,$ a $F[x]$ najmniejszą głębokością, na jaką jesteśmy się w stanie dostać krawędziami wstecznymi, które wychodzą z $x.$ Jeśli $x$ jest liściem $low[x] = min(depth[x], F[x]).$ W przeciwnym wypadku z $x$ możemy dostać się do jego synów lub od razu pójść krawędzią wsteczną w górę.  Z tego powodu $low[x] = min(depth[x], F[x], low[u])$ dla każdego $u$ będącego synem $x.$


```cpp=

void calculate_low (int x) {

\ \ \ \ visited[x] = true;

\ \ \ \ low[x] = depth[x];

\ \ \ \ // na wektorze drzewo trzymamy liste sasiedztwa

\ \ \ \ // drzewa rozpinajacego DFS

\ \ \ \ for (int i = 0; i < drzewo[x].size(); i ++)

\ \ \ \ \ \ \ \ if(!visited[drzewo[v[x][i]]]) {

\ \ \ \ \ \ \ \ \ \ \ \ depth[drzewo[x][i]] = depth[x] + 1;

\ \ \ \ \ \ \ \ \ \ \ \ calculate_low(drzewo[x][i]);

\ \ \ \ \ \ \ \ \ \ \ \ low[x] = min(low[x], low[drzewo[x][i]]);

\ \ \ \ \ \ \ \ }


\ \ \ \ // na wektorze kraw_wsteczne[x] trzymamy

\ \ \ \ // krawedzie wsteczne wychace z x

\ \ \ \ for(int i = 0; i < kraw_wsteczne[x].size(); i ++)

\ \ \ \ \ \ \ \ low[x] = min(low[x], depth[kraw_wsteczne[x][i]]);

}

```


## Znajdowanie mostów i punktów artykulacji

Zauważmy, że krawędź wsteczna nigdy nie będzie mostem, ponieważ po jej usunięciu drzewo rozpinające pozostanie niewzruszone. Rozspójni je tylko usunięcie krawędzi, nad którą nie przechodzi żadna krawędź wsteczna. Most będzie \"stał\" między $x$ a jego ojcem wtedy i tylko wtedy, gdy $low[x] = depth[x].$


![Mosty a wartości low i depth](https://codimd.s3.shivering-isles.com/demo/uploads/upload_8c09af0c95d9dc18437feacf8cbde904.png)


Wierzchołek, nie będący korzeniem, jest punktem artykulacji wtedy i tylko wtedy, gdy posiada syna $u$ takiego, że nie istnieje krawędź zwrotna wychodząca z poddrzewa $u$ i mająca koniec nad $x.$ Innymi słowy istnieje syn $u$ taki, że $low[u] \\geqslant depth[x].$


Punktem artykulacji jest również korzeń wtedy i tylko wtedy gdy ma więcej niż jednego syna.


![Korzeń jako punkt artykulacji](https://codimd.s3.shivering-isles.com/demo/uploads/upload_87144789919fd1a434c1341a8bbbf4d3.png)


### Co to ma wspólnego z dwuspójnymi składowymi?


Krawędź należy do jakiejś dwuspójnej wtedy i tylko wtedy, gdy nie jest mostem, ponieważ wówczas leży na cyklu prostym. Cały graf możemy podzielić na dwuspójne przy czym każda z nich stanowi spójną część drzewa DFS.


Zauważmy, że dwie dwuspójne mogą mieć maksymalnie jeden wspólny wierchołek, ponieważ w przeciwnym wypadku byłyby jedną dwuspójną.


![Wspólne wierzchołki różnych dwuspójnych?](https://codimd.s3.shivering-isles.com/demo/uploads/upload_80ed09def476d4e93545537b39342829.png)


Taki wierzchołek musi być punktem artykulacji.


![Wspólny wierzchołek dwóch dwuspójnych jako punkt artykulacji](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4903a3ed6a9e1065c7c4863b2b04e8a7.png)


Powyższe fakty wystarczą nam do zaprojektowania algorytmu rozbijającego graf na dwuspójne. Pomoże nam w tym lekko przerobiona struktura $Find\\  \\& \\ Union.$ Po pierwsze, jak jej polska nazwa wskazuje, działa ona tylko dla rozłączych zbiorów. Przyjmijmy zatem, że punkty artykulacji należące do kilku dwuspójnych, należą tylko do tej położonej najwyżej w drzewie. Podczas rozwiązywania różnych problemów będziemy musieli o tym pamiętać i rozważać ten przypadek osobno.


Po drugie, niech reprezentantem danego zbioru będzie zawsze wierzchołek, który leży najpłycej. W tym celu podczas operacji $Union$ nie będziemy łączyć mniejszego zbioru do większego, tylko podłącząć głębszego reprezentanta do płytszego. Teoretycznie złożonosć powinna się znacznie pogorszyć, jednak w praktyce czas działania struktury nie zmieni się. Kompresja ścieżek jest <b>mocarna</b>.


### Rozbijanie grafu na dwuspójne składowe


Wykonamy dfs'a i będziemy przetwarzać wierzchołki w kolejności postorder. Rozważmy trzy przypadki:


1. $low[x] < depth[ojciec[x]]$ -- istnieje krawędź wsteczna, która przechodzi nad $x$ oraz jego ojcem. Oznacza to, że są oni w jednej dwuspójnej. Łączymy ich wykonując wyżej opisany $Union.$


![Krawędź wsteczna z wierzchołka](https://codimd.s3.shivering-isles.com/demo/uploads/upload_43bcaeb1cdf5c2fbc7db985f0854c9ec.png)


2. $low[x] > depth[ojciec[x]]$  -- krawędź między $x$ a jego ojcem jest mostem. W tym wypadku należą do dwóch różnych dwuspójnych. Nie robimy nic.
 

![Mosty a wartości low i depth](https://codimd.s3.shivering-isles.com/demo/uploads/upload_8c09af0c95d9dc18437feacf8cbde904.png)


3. $low[x] = depth[ojciec[x]]$ -- ojciec $x$-a jest punktem artykulacji należącym do kilku dwuspójnych. Mimo, że należą  do jednej dwuspójnej nie łączymy ich, ponieważ połączymy ojca $x$ z innymi wierzchołkami.


![Ojciec z punktem artykulacji](https://codimd.s3.shivering-isles.com/demo/uploads/upload_fb186b8805135b07c66d997a44bedbfb.png)


```cpp=

void dfs_dwuspojne (int x) {

\ \ \ \ visited[x] = true;

\ \ \ \ for (int i = 0; i < drzewo[x].size(); i ++) {

\ \ \ \ \ \ \ \ int u = drzewo[x][i];

\ \ \ \ \ \ \ \ if (!visited[u]) {

\ \ \ \ \ \ \ \ \ \ \ \ dfs_dwuspojne(u);

\ \ \ \ \ \ \ \ \ \ \ \ if(low[u] < depth[x])

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ rep[u] = x;

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ // możemy w ten sposób zrobić union,

\ \ \ \ \ \ \ \ // ponieważ x na tę chwile na pewno jest

\ \ \ \ \ \ \ \ // najpłytszym wierzchołkiem w jego zbiorze

\ \ \ \ \ \ \ \ }

\ \ \ \ }

}

```


Zastanówmy się teraz, w jaki sposób sprawdzać, czy dwa wierzchołki należą do jednej dwuspójnej. Oczywiście $a$ i $b$ należą do jednej dwuspójnej jeśli $Find(a) = Find(b).$ Pozostaje jedynie rozważyć przypadek wierzchołka, który należy do kilku dwuspójnych. Załóżmy, że $depth[a] \\geqslant depth[b].$  Dzięki temu, że $Find(a)$ jest najpłytszym wierzchołkiem przypisanym do dwuspójnej $a$ wiemy, że $b$ należy do tej samej dwuspójnej jeśli $b = ojciec[Find(a)]$ oraz zachodzi warunek trzeci, czyli $low[Find(a)] = depth[b].$


```cpp=

bool czy_w_jednej(int a, int b) {

\ \ \ \ if (Find(a) == Find(b))

\ \ \ \ \ \ \ \ return true;

\ \ \ \ a = Find(a);

\ \ \ \ return b == ojciec[a] && low[a] == depth[b];

}

```


## Drzewo dwuspójnych składowych


<b>Drzewo dwuspójnych:</b> drzewo, którego wierzchołkami są dwuspójne naszego grafu, a krawędzie prowadzą między dwuspójnymi, które leżą obok siebie na drzewie DFS.


![Łączenie dwuspójnych w wierzchołki](https://codimd.s3.shivering-isles.com/demo/uploads/upload_136746abbaf31f2a8e91857b2722719e.png)


Czasem podczas rozwiązywania problemów warto obserwować zależności zachodzące między wierzchołkami w poszczególnych dwuspójnych oraz na powyższym drzewie. Jednakże zdecydowanie częściej nie musimy go fizycznie budować; wystarczy trzymać wyżej opisane Find and Union. 


## Zadania

- [Blokada (XV OI, II etap)](https://szkopul.edu.pl/problemset/problem/JkT6CwdepjCQnJ9c6CwxHolZ/site/?key=statement)

- [Magazynier (VI OI, III etap)](https://szkopul.edu.pl/problemset/problem/i7RSA7WlQYQzXFjBLHIW5J3_/site/?key=statement)

- [Hydrorozgrywka (XXIII OI, I etap)](https://szkopul.edu.pl/problemset/problem/y9HM1ctDU8V8xLMRUYACDIRs/site/?key=statement)

"
---
