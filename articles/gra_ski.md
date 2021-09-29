---
title: 'Grafy skierowane'
content: "
Zapewne wiesz, czym są grafy skierowane. W tym artykule dowiesz się, w jaki sposób można je~przetwarzać, by znaczna część problemów okazywała się dużo prostrza, niż mogłoby się wydawać.


## DAG


<b>DAG</b> -- (ang. Directed Acyclic Graph) graf skierowany, który nie posiada cykli.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1725303754bf793c98873a11b6e9b996.png)


Mimo, że nie mają cykli, nie można w nich wyznaczyć pokrewieństwa ojciec - syn, tak jak w~przypadku drzew.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_acf2277d13d7ad44501fae0b5f68bdd4.png)


Możemy natomiast posortować je topologicznie -- ustawić w rzędzie, w taki sposób, by dla każdego $x$ wszystkie wierzchołki, do ktorych on prowadzi były po jego prawej stronie.


## Sortowanie topologiczne


Sorotwanie topologicznie DAG-u możemy wykonać prostym dfs'em, wrzucając kolejne wierzchołki na wektor w kolejności postorder. Jeśli odwrócimy wektor, wierzchołki będą posortowane. Poprawność takiego algorytmu wynika wprost z definicji. Wszystkim wierzchołkom, do których wychodzi $x$ zostanie przypisany numer większy niż $x,$ a o to własnie nam chodziło.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_54cf2dfb14e272aaae7c75508eb8710a.png)


```cpp=

void dfs(int x)

{

\ \ \ \ odw[x] = true;

\ \ \ \ for (int i=0; i<(int)v[x].size(); i++)

\ \ \ \ \ \ \ \ if (!odw[v[x][i]]) dfs(v[x][i]);

\ \ \ \ \ \ \ \ \ \ \ \ toposort.push_back(x);

}

```


### Programowanie dynamiczne na DAGach


Sortowanie jest określeniem pewnego porządku. Jakikolwiek prefiks lub sufiks wierzchołków usuniemy, to co nam zostanie będzie DAG-iem. Na DAG-ach możemy puszczać dynamiki, zwłaszcza optymalizacyjne. Problem natomiast stanowi liczenie wszystkich kombinacji, ponieważ poddagi zaczynające się w dwóch różnych synach $x$ mogą mieć część wspólną.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_273ee8a7ef4713b6cfa820926ec750d7.png)


## Silnie Spójne Składowe


<b>Silnie Spójna Składowa</b> -- taki zbiór wierzchołków, że z każdego wierzchołka, który się w~nim znajduje da się dojść do każdego innego. Innymi słowy każda para wierzchołków leży na cyklu.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_5e137763f9dbbac216c7ba1892e4b774.png)


Graf można podzielić na silnie spójne -- zrobić z niego DAG silnie spójnych. W wielu problemach zauważenie pewnych własności na silnie spójnych, a następnie scalenie wyniku dla DAG-u okazuje się robialne, a nawet przyjemne.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a14ed713f5dab6a5128dccfdc08768cf.png)


### Szukanie Silnie Spójnych


Silnie spójne można znależć za pomocą dwóch dfs'ów. Pierwszym wrzucimy wierzchołki na stos w~kolejności postorder. <b>Krawędzią wsteczną</b> nazwiemy krawędź odwrotnie skierowaną (jeśli krawędź prowadziła z $a$ do $b,$ to teraz będzie prowadzić z $b$ do $a$). Okazuje się, że wierzchołek z~góry stosu jest w silnie spójnej składowej ze wszystkimi tymi, do których można z niego dojść za pomocą krawędzi wstecznych. Puścimy z niego dfs'a i znajdziemy jego silnie spójną. Następnie będziemy opróżniać stos i dla każdego nieodwiedzonego wierzchołka powtarzać powyższego dfs'a. Pamiętaj o tym, by dwukrotnie nie odwiedzić tych samych wierzchołków. 


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_5d8bcd464b7b08a4ce63e2596bd6be00.png)


2 razy użyjemy algorytmu DFS: z wierzchołków o numerach $1$ i $7$.


Nasz stos wygląda następująco: $6, 5, 4, 3, 2, 1, 9, 8, 7.$


Aby znaleźć silnie spójne składowe będziemy używać innego niż początkowy algorytmu DFS na odwróconych krawędziach w grafie z wierzchołków znajdujących się na stosie zaczynając od tego, który znalazł się tam najpóźniej.


Z wierzchołka o numerze $7$ możemy dojść do wierzchołków o numerach $8$ i $9$, a zatem te $3$ utworzą nam silnie spójną składową.


Wierzchołki o numerach $8$ i $9$ znajdują się w tej samej silnie spójnej składowej.


Z wierzchołka o numerze $1$ możemy dojść do wierzchołków o numerach $2$ i $3$, zatem te wierzchołki utworzą nam drugą silnie spójną składową.


Wierzchołki o numerach $2$ i $3$ znajdują się już w jednej silnie spójnej składowej.


Z wierzchołków o numerach $4, 5$ i $6$ nie możemy dojść do żadnych wierzchołków, które nie zostały jeszcze odwiedzone, zatem każdy  tych wierzchołków utworzy inną silnie spójną.


<b>Dowód:</b> Zauważmy, że pierwszy dfs jest swojego rodzaju ułomnym sortowaniem topologicznym. Ułomnym, ponieważ takowe nie istnieje dla cyklicznych grafów. Jednakże zachowa ważną własność sortowania topologicznego. Jeśli istnieje ścieżka z $x$ do $y,$ ale nie istnieje z $y$ do $x,$ to $y$ będzie głębiej na stosie niż $x.$ Przechodzimy po wierzchołkach w kolejności pseudo-topologicznej i puszczamy drugiego dfs'a tylko do wierzchołków dalszych topologicznie. Ścieżka idąca po krawędziach wstecznych od $y$ do $x$ to ścieżka z $x$ do $y$ w rozważanym grafie. Jednakże $y$ nie jest głębiej na stosie niż $x,$ więc musi również istnieć ścieżka między $y$ a $x.$ Innymi słowy $x$ i $y$ są w jednej silnie spójnej, co kończy dowód.


## Zadania

- [Drogi rowerowe (XXV OI, II etap)](https://szkopul.edu.pl/problemset/problem/aKKSmtjWTtDOEHDqnmQ3-eAA/site/?key=statement)

- [Drogi zmiennokierunkowe (XXIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/9TaxfuNdAv2FPpQ6PeB-vlti/site/?key=statement)

- [Profesor Szu (XIII OI, I etap)](https://szkopul.edu.pl/problemset/problem/mBGR2EV0zVOpK9nHSlOL0aNr/site/?key=statement)

"
---
