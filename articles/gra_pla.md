---
title: 'Grafy planarne'
content: "
Graf planarny to taki, który możemy narysować na płaszczyźnie tak, aby jego krawędzie nie przecinały się w miejscach innych niż wierzchołki. Na pierwszy rzut oka moglibyśmy przypuszczać, że każdy graf można narysować w ten sposób. To jednak mylne spostrzeżenie. Powiem więcej – większość grafów planarna <b>nie jest</b>. Ale te, które już są planarne, mają całkiem ciekawe własności. Założymy podczas dzisiejszych rozważań, że interesują nas tylko spójne grafy planarne.

## Wzór Eulera

<b>Twierdzenie:</b> Dla grafu planarnego zachodzi własność $f-m+n=2.$ W tym wzorze $n$ jest liczbą wierzchołków, $m$ jest liczbą krawędzi, a $f$ liczbą regionów. Region to kawałek płaszczyzny nieoddzielony krawędziami, przy czym może on być nieskończony. Przykładowo, poniższy graf planarny ma 5 regionów.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_64974e32a16de4c27c7877e368f1fcd7.png)


<b>Dowód:</b> Łatwo go wykonać przez indukcję ze względu na liczbę krawędzi. Dla $m = n - 1$ mamy drzewo, więc jest tylko jeden region (nieskończona płaszczyzna), a własność zachodzi. Dokładając jedną krawędź zawsze dzielimy jeden region na dwie części.


<b>Wnioski:</b>

- Niezależnie od tego, w jaki sposób narysujemy nasz graf na płaszczyźnie, zawsze otrzymamy tyle samo regionów

- W każdym grafie planarnym zachodzi nierówność $f \\leqslant \\frac{2}{3}k$

- W każdym grafie planarnym zachodzi nierówność $m \\leqslant 3 \\cdot n - 6$


Druga i trzecia własność mogą już nie być oczywiste.


<b>Dowód (2):</b> Niech $r_i$ oznacza liczbę krawędzi stanowiących granicę $i$–tego regionu. Granica każdego regionu jest cyklem, więc ma długość przynajmniej 3. Stąd $3 \\cdot f \\leqslant r_1 +r_2 +...+r_f.$ Z drugiej strony każda krawędź występuje w co najwyżej dwóch regionach, stad $r_1+r_2+...+r_f \\leqslant 2 \\cdot k.$ Otrzymujemy postulowaną nierówność.


<b>Dowód (3):</b> $f = m + n - 2.$ Wystarczy wstawić to do nierówności $f \\leqslant \\frac{2}{3}k.$

## Istnienie pewnego wierzchołka

Własność (3) jest o tyle ciekawa, że umożliwia nam projektowanie efektywnych algorytmów. Rozważymy zadanie <b>Irracjonalne koleje</b> z Mistrzostw Wielkopolski w Programowaniu Zespołowym 2016.


Mamy dany graf planarny. Chcemy pokolorować każdy wierzchołek na jeden z trzech dostępnych kolorów tak, aby nie powstał jednokolorowy cykl lub stwierdzić, że nie da się tego zrobić. Aby upewnić się, że rozumiemy czym jest cykl jednokolorowy – krawędź jest czerwona, jeśli obydwa sąsiadujące wierzchołki są czerwone, itd.


Okazuje się, że zawsze się da, a dowodem będzie nasz algorytm. W rozwiązaniu pomoże nam kolejny wniosek ze wzoru Eulera. W grafie planarnym zawsze istnieje wierzchołek, który ma stopień nie większy niż $5.$ Dlaczego tak jest? Gdyby z każdego wierzchołka wychodziło przynajmniej $6$ krawędzi, to nie mogłaby zajść nierówność $m \\leqslant 3 \\cdot n - 6.$


Pomysł jest prosty: wybierzmy ten wierzchołek ($u$). Następnie usuńmy go z grafu (zaznaczmy jako odwiedzony) i pokolorujmy resztę grafu. Teraz wystarczy tylko pokolorować pozostały graf. Zrobimy to rekurencyjnie. Załóżmy, że się udało (dla grafu pustego na pewno się udało, a dla większych indukcja jest dowodem). Pozostaje nam tylko pokolorować krawędzie wychodzące z u. Skoro jest ich co najwyżej $5,$ a kolorów co najwyżej $3,$ to najrzadszy kolor występuje nie więcej niż raz. Jeśli więc pomalujemy u na ten kolor, to dołożymy do grafu co najwyżej jedną krawędź w tym kolorze. Nietrudno zauważyć, że krawędzie jednego koloru nie mogą stworzyć w ten sposób cyklu (tak naprawdę doczepiając wierzchołki po kolei tworzymy piękne kolorowe drzewa).


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_05442094e583a8694a724c370beb5a38.png)

## Kiedy graf jest planarny?

W $1930$–tym roku polski matematyk, W. Kuratowski, sformułował twierdzenie, które pomaga nam określić, czy graf jest planarny. Aby to stwierdzić, musimy w pierwszej kolejności zbić wierzchołki o stopniu 2 – takie wierzchołki nic nam nie zmieniają w strukturze grafu, możemy je utożsamić z jedną krawędzią.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6587f263a0029b54a60ace547cf770d6.png)


Graf jest planarny wtedy i tylko wtedy, gdy nie zawiera podgrafu będącego $K(3,3)$ lub $K(5).$ $K(3,3)$ wygląda tak:


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_8686008ff9eec89ac64870b9aaf10808.png)


A $K(5)$ wygląda tak:


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a6d12d71203abe575e1ad7ff30b5f949.png)


To pozwala nam w dość skomplikowany sposób stwierdzić czy graf jest planarny w nietrywialnej złożoności czasowej $O(n^6).$ Istnieje algorytm, który rozstrzyga ten problem liniowo. Jak już się pewnie domyślasz, jest dość trudny, więc go tutaj nie przedstawimy.

## Ścieżki w grafach planarnych

W niektórych grafach planarnych, podobnie jak w drzewach, możemy w $O(1)$ odpowiadać na pytanie: Czy istnieje ścieżka z $a$ do $b.$ Muszą być jednak spełnione pewne założenia. Jeżeli graf jest umieszczony na płaszczyźnie (lub możemy niejako używać pojęć prawo i lewo), a ponadto występuje tylko jedno źródło i jedno ujście, to możemy to zrobić. Wbrew pozorom te założenia nie są nadto wygórowane.


Jeśli graf nie jest acykliczny, możemy zbić silnie spójne składowe do jednego wierzchołka, żeby pozbyć się tego problemu. Teraz mamy już DAG.


Zastanówmy się, w jaki sposób skorzystać z planarności grafu i pojęcia prawo – lewo. Dla każdego wierzchołka policzymy ścieżkę idącą najbardziej w prawo, a także tę idącą najbardziej w lewo. Wówczas, aby istniała ścieżka z $x$ do $y,$ $y$ musi leżeć między tymi ścieżkami(!)


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_12fac9dd12f25607b96051b5beaf6af8.png)


Dlaczego tak jest? Musimy udowodnić, że jeśli $y$ faktycznie leży między tymi ścieżkami, to istnieje ścieżka z $x$ do $y.$ Zauważmy, że te dwie ścieżki odcinają nam pewien obszar grafu. Jedynym sposobem, aby się do niego dostać, jest przejście w którymś momencie przez wierzchołek z otaczających obszar ścieżek. Skoro do $y$ wpadały jakieś krawędzie (ponieważ było tylko jedno ujście), to moglibyśmy kierować się w nimi w górę. Taki spacer musiałby jednak przeciąć obwódkę w pewnym momencie. Skoro tak, to moglibyśmy najpierw pójść z $x$ po obwódce, a następnie przejść ścieżką i znaleźć krawędź do $y.$


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_01c84c7680aff2684261c32e2b414829.png)


To jeszcze nie daje nam explicite algorytmu, chociaż dowodzi że wszystkie wierzchołki po drodze są osiągalne. Do algorytmu potrzebujemy jeszcze wiedzieć, w jaki sposób sprawdzać czy wierzchołek leży na lewo od tej ścieżki. Łatwo – wystarczy wcześniej puścić dfsa, który policzy nam pewną kolejność wierzchołków.


```cpp=

int koniec, L[MAXN];

void DFSLeft(int x)

{

\ \ \ \ odw[x] = 1;

\ \ \ \ //zakladamy, ze wektory krawedzi sa posortowane od lewej do prawej

\ \ \ \ for (int i=0; i<(int)v[x].size(); ++i)

\ \ \ \ \ \ \ \ if (!odw[v[x][i]]) dfs(v[x][i]);

\ \ \ \ \ \ \ \ //zapisujemy w kolejnosci postorder

\ \ \ \ \ \ \ \ \ \ \ \ ++koniec;

\ \ \ \ L[koniec] = x;

}

```


Analogicznie liczymy kolejność prawą, tylko że tym razem udajemy się do krawędzi najbardziej w prawo. Tak policzyliśmy tablice $L[]$ i $R[].$ Ścieżka z $x$ do $y$ istnieje wtedy i tylko wtedy, gdy $L[x] > L[y]$ oraz $R[x] > R[y].$
Widzimy, że kod nie będzie trudny, ale w pełni formalny dowód poprawności trywialny nie jest. Zainteresowanych odsyłam do rozwiązania zadania <b>Bajtocki Bieg Uliczny</b> z AMPPZ 2011.

## Rozbijanie grafu planarnego na ściany

Jeśli mamy dany graf planarny okraszony pozycjami wierzchołków, to być może będziemy zmuszeni obliczyć jego podział na ściany.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_8855a2ec927ec911be8195107c03b0e1.png)


Wspominaliśmy już, że każda krawędź należy do co najwyżej dwóch regionów (ścian). Dla każdej krawędzi stworzymy dwa pomocniczne wierzchołki – odpowiedzialny za jej lewą stronę i za jej prawą stronę.


Krawędzie wychodzące z wierzchołków grafu posortujemy kątowo. Można zauważyć, że każde dwie sąsiednie krawędzie wyznaczają nam pewien fragment jednej spójnej. Wobec tego, możemy po pro- stu przejrzeć te krawędzie i złączyć przy pomocy struktury <b>Find \\& Union</b> wierzchołki pomocniczne, które im odpowiadają. W ten sposób każda spójna będzie oznaczała jeden region. Zauważmy, że niektóre wierzchołki pomocnicze nie zostaną połączone z niczym – to te, które odpowiadają za płaszczyznę nieskończoną.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_29d8e6ff7223338adf04df57323a3338.png)


Dlaczego <b>Find \\& Union</b>? Ponieważ jest tylko nieznacznie gorsze teoretycznie niż liniowy <b>DFS</b>, a w praktyce jest znacznie znacznie szybsze (i prostsze do napisania). Prędzej przekroczymy limit pamięci pchając krawędzie na wektory, niż osiągniemy jakikolwiek zysk z liniowego podejścia.


## Zadania

- [Narciarze (VII OI, I etap)](https://szkopul.edu.pl/problemset/problem/Yb04CMWb5dkJbro4Hhmexx_E/site/?key=statement)

- [Narciarze (IX OI, III etap)](https://szkopul.edu.pl/problemset/problem/PUVCH73E4h3hU8UPiJqvvLmQ/site/?key=statement)

"
---
