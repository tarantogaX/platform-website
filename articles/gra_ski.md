---
title: 'Grafy skierowane'
content: "
Zapewne wiesz, czym są grafy skierowane. W tym artykule dowiesz się, w jaki sposób można je~przetwarzać, by znaczna część problemów okazywała się dużo prostrza, niż mogłoby się wydawać.

### DAG

<b>DAG</b> -- (ang. Directed Acyclic Graph) graf skierowany, który nie posiada cykli.

RYSUNEK

Mimo, że nie mają cykli, nie można w nich wyznaczyć pokrewieństwa ojciec - syn, tak jak w~przypadku drzew.

PRZYKŁAD ZIOM O DWOCH OJCACH XDDD

Możemy natomiast posortować je topologicznie -- ustawić w rzędzie, w taki sposób, by dla każdego $x$ wszystkie wierzchołki, do ktorych on prowadzi były po jego prawej stronie.

DAG NA PAŁKE I DAG POSORTOWANY W LINII PROSTEJ :3

### Sortowanie topologiczne

Sorotwanie topologicznie DAG-u możemy wykonać prostym dfs'em, wrzucając kolejne wierzchołki na wektor w kolejności postorder. Jeśli odwrócimy wektor, wierzchołki będą posortowane. Poprawność takiego algorytmu wynika wprost z definicji. Wszystkim wierzchołkom, do których wychodzi $x$ zostanie przypisany numer większy niż $x,$ a o to własnie nam chodziło.

CHUJ XD
%void dfs(int x)
%{
%	for(int i = 0;i < (int)v[x].size();++i)
%
%		dfs(v[x][i]);
%
%	toposort.pb(x);
%}

### Programowanie dynamiczne na DAG-ach

Sortowanie jest określeniem pewnego porządku. Jakikolwiek prefiks lub sufiks wierzchołków usuniemy, to co nam zostanie będzie DAG-iem. Na DAG-ach możemy puszczać dynamiki, zwłaszcza optymalizacyjne. Problem natomiast stanowi liczenie wszystkich kombinacji, ponieważ poddagi zaczynające się w dwóch różnych synach $x$ mogą mieć część wspólną.

PRZYKLAD Z CZESCIA WSPOLNA

### Silnie Spójne Składowe

<b>Silnie Spójna Składowa</b> -- taki zbiór wierzchołków, że z każdego wierzchołka, który się w~nim znajduje da się dojść do każdego innego. Innymi słowy każda para wierzchołków leży na cyklu.


PRZYKŁAD SILNIE SPÓJNEJ

Graf można podzielić na silnie spójne -- zrobić z niego DAG silnie spójnych. W wielu problemach zauważenie pewnych własności na silnie spójnych, a następnie scalenie wyniku dla DAG-u okazuje się robialne, a nawet przyjemne.

TUTAJ RYSUNECZEK

### Szukanie Silnie Spójnych

Silnie spójne można znależć za pomocą dwóch dfs'ów. Pierwszym wrzucimy wierzchołki na stos w~kolejności postorder. <b>Krawędzią wsteczną</b> nazwiemy krawędź odwrotnie skierowaną (jeśli krawędź prowadziła z $a$ do $b,$ to teraz będzie prowadzić z $b$ do $a$). Okazuje się, że wierzchołek z~góry stosu jest w silnie spójnej składowej ze wszystkimi tymi, do których można z niego dojść za pomocą krawędzi wstecznych. Puścimy z niego dfs'a i znajdziemy jego silnie spójną. Następnie będziemy opróżniać stos i dla każdego nieodwiedzonego wierzchołka powtarzać powyższego dfs'a. Pamiętaj o tym, by dwukrotnie nie odwiedzić tych samych wierzchołków. 

RYSUNEK CAŁOSCI TAK JAK NA WYKLADZIE KAPPA HARDO BO I STOS, I CALOSC I ZAZNACZONE SILNIE SPÓJNE NAJLEPIEJ WEZ WGL ZROB TAK JAK Z DIJSKTRA

<b>Dowód:</b> Zauważmy, że pierwszy dfs jest swojego rodzaju ułomnym sortowaniem topologicznym. Ułomnym, ponieważ takowe nie istnieje dla cyklicznych grafów. Jednakże zachowa ważną własność sortowania topologicznego. Jeśli istnieje ścieżka z $x$ do $y,$ ale nie istnieje z $y$ do $x,$ to $y$ będzie głębiej na stosie niż $x.$ Przechodzimy po wierzchołkach w kolejności pseudo-topologicznej i puszczamy drugiego dfs'a tylko do wierzchołków dalszych topologicznie. Ścieżka idąca po krawędziach wstecznych od $y$ do $x$ to ścieżka z $x$ do $y$ w rozważanym grafie. Jednakże $y$ nie jest głębiej na stosie niż $x,$ więc musi również istnieć ścieżka między $y$ a $x.$ Innymi słowy $x$ i $y$ są w jednej silnie spójnej, co kończy dowód.

## Zadania
- [Drogi rowerowe (XXV OI, II etap)](https://szkopul.edu.pl/problemset/problem/aKKSmtjWTtDOEHDqnmQ3-eAA/site/?key=statement)
- [Drogi zmiennokierunkowe (XXIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/9TaxfuNdAv2FPpQ6PeB-vlti/site/?key=statement)
- [Profesor Szu (XIII OI, I etap)](https://szkopul.edu.pl/problemset/problem/mBGR2EV0zVOpK9nHSlOL0aNr/site/?key=statement)
"
---
