---
title: 'Grafy dwudzielne'
content: "
Graf <b>dwudzielny</b> to taki, w którym możemy podzielić wierzchołki na dwa zbiory w taki sposób, by pomiędzy wierzchołkami należącymi do tych samych zbiorów nie istniały krawędzie.


## Sprawdzanie dwudzielności grafu

Kiedy na wykładzie spytałem się, w jaki sposób określać, czy graf jest dwudzielny, jeden z uczniów odpowiedział: \"po treści zadania\". Zdecydowanie miał rację. Prawie zawsze od razu widać, że mamy do czynienia z grafem dwudzielnym oraz co stanowi odpowiednie zbiory wierzchołków. Niemniej istnieje bardzo prosty sposób sprawdzania dwudzielności dowolnego grafu.


Niespójny graf jest dwudzielny wtedy i tylko wtedy, gdy każda z jego spójnych jest dwudzielna. Z tego powodu będziemy zakładać, że jest spójny. Weźmy dowolny wierzchołek $x$ i przypiszmy go do pierwszego zbioru. Wówczas wszyscy jego sąsiedzi muszą być w drugim zbiorze. Z kolei sąsiedzi sąsiadów w pierwszym itd. Oznacza to, że możemy puścić DFSa, który przypisze wierzchołki na zmianę do pierwszego i drugiego zbioru. Jeśli po zakończeniu procedury w którymś zbiorze będą istniały dwa wierzchołki połączone krawędzią, graf nie jest dwudzielny. W przeciwnym wypadku w oczywisty sposób jest.


![Kolorowanie wierzchołków grafu](https://codimd.s3.shivering-isles.com/demo/uploads/upload_0a94f212d8198f5755abed31ff4b7961.png)


Przy okazji możemy zauważyć, że graf jest dwudzielny wtedy i tylko wtedy, gdy <b>każdy jego cykl jest długości parzystej.</b> Łatwo jest udowodnić tę własność, orzystając z kolorowania grafu.


## Skojarzenia

<b>Skojarzeniem</b> nazywamy zbior krawędzi, które łączą wierzchołki w rozłączne pary. Jeśli w każdy wierzchołek ma swoją parę, skojarzenie nazywamy <b>doskonałym.</b> Naszym celem jest znalezienie <b>maksymalnego skojarzenia,</b> tzn. takiego, w którym jak najwięcej wierzchołków zostało sparowanych.


![Skojarzenie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_b872bdab159c2a18e3a5f0ec70fd9f08.png)


W dalszej części będziemy się odwoływać do wierzchołków z dwóch grup w grafie dwudzielnym jako białych i czarnych - tak, jak pomalowaliśmy je na samym początku dowodząc, że graf jest dwudzielny.


### Twierdzenie Halla o kojarzeniu małżeństw


<b>Twierdzenie:</b> Skojarzenie doskonałe istnieje wtedy i tylko wtedy, gdy każda podgrupa $k$ czarnych wierzchołków ma co najmniej $k$ białych sąsiadów.


<b>Dowód indukcyjny:</b> Niech $n$ będzie równe liczbie czarnych wierzchołków. Dla $n = 1$ poprawność twierdzenia jest oczywista: jeśli chcemy sparować pojedynczy wierzchołek, musi on mieć co najmniej jednego sąsiada. Załóżmy, że $n > 1$ oraz twierdzenie zachodzi dla każdego $k < n.$ Istnieją dwa przypadki:


1) Dla każdego $k < n$ każde $k$ czarnych wierzchołków ma co najmniej $k + 1$ białych sąsiadów. Wówczas $n$-ty czarny wierzchołek może zostać sparowany z którymkolwiek ze swoich sąsiadów. Pozostałe $n - 1$ możemy skojarzyć zgodnie z założeniem indukcyjnym.


2) Istnieje zbiór $k$ czarnych wierzchołków, który ma co najmniej $k$ sąsiadów. Możemy je sparować z Tw. Halla zachodzi dla $k < n.$ Każdy z pozostałych $n - k$ czarnych wierzchołków może też dostać parę, ponieważ gdyby $w \\leqslant n - k$ z nich miało mniej niż $w$ białych sąsiadów, to łącznie z tymi $k,$ których już sparowaliśmy, miałoby mniej niż $k + w,$ co jest niezgodne z założeniami.


### Szukanie skojarzeń


Algorytm szukający skojarzenia doskonałego zawsze znajdzie maksymalne skojarzenie. Okazuje się on bardzo prosty oraz korzysta tylko z Twierdzenia Halla. Utwórzmy tablicę $para[],$ która będzie nam mówić, z jakim czarnym wierzchołkiem jest skojarzony dany biały wierzchołek. Na początku dla każdego $y$ $para[y] = 0,$ co oznacza, że $y$ nie ma pary. Będziemy próbowali znajdować pary kolejnym czarnym wierzchołkom. Pomoże nam w tym procedura $match(x),$ która próbuje znaleźć czarnemu wierzchołkowi $x$ parę i zwraca true jeśli się to udało. Musimy rozważyć dwa przypadki:


1) $x$ ma nieskojarzonego sąsiada. W tym wypadku możemy po prostu go z nim połączyć i uzyskamy skojarzenie o $1$ większe.


![Łączenie x z wolnym sąsiadem](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ff5e2bc623260e05aa6fb695051d3b22.png)


2) wszyscy sąsiedzi $x$ są zajęci. Wówczas moglibyśmy spróbować sparować $x$ z jednym z jego (zajętych) sąsiadów, natomiast jego dawnej parze spróbować znaleźć nową parę. Możemy sprawdzić, czy jest to możliwe wywołując rekurencyjnie funkcję $match().$ Jeśli tak, znaleźliśmy parę dla $x.$ W przeciwnym wypadku skojarzenie $x$ sprawia, że inny czarny wierzchołek musiałby się pozbyć swojej pary, nie zyskując innej. Nie zwiększy nam to naszego skojarzenia. Z Twierdzenia Halla wiemy, że w takim wypadku nie ma sensu kojarzyć $x.$


![Łączenie x z zajętym sąsiadem](https://codimd.s3.shivering-isles.com/demo/uploads/upload_dd8d66a759a969e7a41012c836449592.png)


Pozostaje już tylko jeden szczegół implementacyjny. Zauważmy, że $match()$ jest DFSem, który będzie wywoływany wiele razy od różnych nieskojarzonych czarnych wierzchołków. Z tego powodu po każdym sprawdzeniu, czy dany wierzchołek da się skojarzyć musielibyśmy zerować tablicę $odw[],$ co zajmuje czas $O(n)$ i znacznie pogarsza czas działania algorytmu. Gdybyśmy jednak zmienili typ $odw[]$ z bool na int, moglibyśmy \"zerować\" ją w $O(1)$ zmieniając wartość globalnej zmiennej $nr$ o $1.$ Wówczas wierzchołek $x$ byłby odwiedzony wtedy i tylko wtedy, gdy $odw[x] = nr.$


```cpp=

bool match(int x) {

\ \ \ \ odw[x] = nr;

\ \ \ \ for (int i = 0; i < czarne[x].size(); i ++)

\ \ \ \ \ \ \ \ // sprawdzanie, czy jest wolny sąsiad

\ \ \ \ \ \ \ \ if (!para[czarne[x][i]]) {

\ \ \ \ \ \ \ \ \ \ \ \ para[czarne[x][i]] = x;

\ \ \ \ \ \ \ \ \ \ \ \ return true;

\ \ \ \ \ \ \ \ }


\ \ \ \ for (int i = 0; i < czarne[x].size(); i ++)

\ \ \ \ \ \ \ \ // sprawdzanie, czy da sie polaczyc z zajętym sąsiadem

\ \ \ \ \ \ \ \ if (odw[para[czarne[x][i]]] != nr && match(para[czarne[x][i]])) {

\ \ \ \ \ \ \ \ \ \ \ \ para[czarne[x][i]] = x;

\ \ \ \ \ \ \ \ \ \ \ \ return true;

\ \ \ \ \ \ \ \ }

\ \ \ \ return false;

}

```


### Analiza złożoności

Zauważmy, że funkcja $match()$ działa maksymalnie w czasie $O(n),$ ponieważ odwiedzi każdy czarny wierzchołek maksymalnie raz. Ponieważ puścimy ją dla $n$ czarnych wierzchołków złożonośc całego algorytmu wyniesie $O(n^2).$ Jednakże w praktyce jest bardzo szybki i działa nawet dla bardzo dużych $n.$ Chodzą słuchy, że Rosjanie na swoich contestach uwalają <b>Turbo Matching</b>, bo tak się ten algorytm nazywa. Nie potwierdzam, ale nie zaprzeczam.


Chętnych dowiedzieć się więcej o skojarzeniach i grafach dwudzielnych zapraszam do lektury [artykułu \"W grafach dwudzielnych jest łatwiej\" z Delty.](http://www.deltami.edu.pl/temat/matematyka/teoria_grafow/2013/10/31/W_grafach_dwudzielnych_jest_latwiej/)


## Zadania

- [Grotołazi (VI OI, II etap)](https://szkopul.edu.pl/problemset/problem/eZiOMPFA4Cq9YsIFAjhCZlo9/site/?key=statement)

- [Kolej (XVII OI, I etap)](https://szkopul.edu.pl/problemset/problem/TJVrS_hRC8W5Q6ZBW6mETAIm/site/?key=statement)

- [Rectangle Painting 2 (Codeforces, Div. 1 E)](https://codeforces.com/contest/1198/problem/E)

"
---
