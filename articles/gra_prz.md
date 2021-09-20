---
title: 'Przepływy'
content: "
Jak nazwa wskazuje przepływy mają związk z wodą. Przepływ to tak naprawdę interpretaja grafowa przepływu wody ze źródła do ujścia przez zbiorniki i rury o pewnych rozmiarach.

### Sformułowanie problemu i podstawy

Podstawowym problemem jest stwierdzenie dla danego grafu jaki jest jego maksymalny przepływ. Mamy sieć zbiorników połączonych rurami o pewnych wielkościach. W zbiornikach nie może się zbierać, ani upływać woda. Ile wody płynie ze źródła do ujścia? Zamieńmy treść na bardziej formalną. Mamy dany pewien graf skierowany, którego dwa wierzchołki są wyróżnione: <b>źródło</b> $s$ i <b>ujście</b> $t.$ Ponadto wszystkie krawędzie mają ustaloną <b>przepustowość</b>. Wtedy <b>sieć przepływowa</b> to takie przypisanie krawędziom wartości, aby na każdej krawędzi wartość nie przekraczała przepustowości oraz dla każdego wierzchołka (poza źródłem i ujściem) sumaryczna wartość wchodząca do niego była równa sumie wartości wychodzących.
Wtedy <b>przepływ sieci</b> to suma wartości wchodzących do ujścia. Mamy odpowiedzieć jaki jest maksymalny przepływ sieci. W poniższym przykładzie przeływ sieci wynosi 5 (maksymalny to 7).\\
\includegraphics[scale=0.35]{p1}\\
Algorytmy przedstawione w tym artykule będą używały <b>sieci rezydualnej</b>. Są to krawędzie skierowane w przeciwną stronę, które mają przepustowość równą 0, oraz ich wartość jest zawsze przeciwna oryginalnej krawędzi.\\
\includegraphics[scale=0.35]{p2}\\
<b>Przekrój</b> to podział wierzchołków na dwa zbiory $S$ i $T,$ przy czym źródło znajduje się w $S,$ a ujście w $T.$ Jego wartość to suma przepustowości krawędzi od $S$ do $T.$

### Metoda Forda-Fulkersona
Okazuje się, że algorytmy zachłanne, które używają sieci rezydualnej zawsze działają. Wybieramy tzw. <b>ścieżkę powiększającą</b>, czyli taką że może jeszcze coś nią przepłynąć ze źródła do ujścia i aktualizujemy na niej krawędzie o największą możliwą wartość. Pamiętajmy, że możemy używać krawędzi rezydualnych. Przejście taką krawędzią oznacza w pewnym sensie cofanie i przekierowywanie poprzednich wyborów ścieżek, aby wszystko dalej się zgadzało. W implementacji należy pamiętać, że gdy zmieniamy na jakiejś krawędzi wartość o $x$ to musimy na krawędzi odpowiadającej zmianić wartość o $-x.$\\
\includegraphics[scale=0.35]{p3}\\
Jeżeli wybieramy ścieżki dowolnie przy użyciu dfs'a lub bfs'a to złożoność wyniesie $O( m*wynik ),$ gdzie $m$ to ilość krawęci. Tak jest w wypadku całkowitych przepustowości. Gdy mamy do czynienia z liczbami rzeczywistymi taki algorytm nie musi być skończony, a co gorsze wynik nawet nie musi dążyć do poprawnego.
### Twierdzenie o maksymalnym przepływie i minimalnym przekroju
Powyższe twierdzenie mówi, że $$\textit{maksymalny przepływ} = \textit{minimalny przekrój}$$ Dowód tego twierdzenia będzie jednocześnie dowodem poprawności metody Forda-Fulkersona. Udowodnimy najpierw, że 
\begin{equation}
\textit{dowolny przepływ} \leq \textit{dowolny przekrój}
\end{equation}
Rozważmy wszystkie krawędzie (również rezydualne) od zbioru $S$ do zbioru $T$ (czyli pewien graf dwudzielny).\\
\includegraphics[scale=0.5]{p4}\\
Gdy dodajemy przepływ na dowolnej ścieżce z $s$ do $t$ to $x+1$ razy wejdziemy do $T$ i $x$ razy do $S,$ czyli gdy zwięksamy przepływ sieci o $f$ to na rozważanych krawędziach $f$ dodamy $x+1$ razy i odejmiemy $x$ razy, czyli suma zmieni się o $f.$\\
\includegraphics[scale=0.5]{p5}\\
Możemy mieć jeszcze do czynienia z cyklami. Każdy z nich wejdzie do $S$ i $T$ tyle samo razy, czyli nie zmieni on wyniku. Z tego wynika, że suma przepływów na wszystkich tych krawędziach jest równa przepływowi całego grafu. Z kolei każda z tych krawędzi (również rezydualna) spełnia warunek $\textit{przepływ sieci} \leq \textit{przepustowość}$ z czego wynika $(1).$\\
Powiedzmy, że postępowaliśmy zgodnie z metodą Forda-Fulkersona i nie istnieje ścieżka powiększająca. Podzielmy wierzchołki na dwa zbiory tak, aby $S$ zawierał wszystkie wierzchołki do których istnieje ścieżka powiększająca, a $T$ wszystkie pozostałe. Zgodnie z założeniem do ujścia nie istnieje ścieżka powiększająca, czyli ten podział jest przekrojem. Wiemy też, że wszystkie krawędzie z $S$ do $T$ są w pełni wykorzystane, bo każda musi z nich musi odzielać wierzchołek do którego można dojść z wierzchołkiem do którego nie. Skoro 
$$\textit{przepływ krawędzi} = \textit{przepustowuść krawędzi}$$
to zgodnie z powyższym rozumowaniem 
$$\textit{znaleziony przepływ sieci} = \textit{suma przepływów na krawędziach z } S \textit{ do } T =$$
$$= \textit{suma przepustowości na krawędziach z } S \textit{ do } T = \textit{znaleziony przekrój}$$
Wtedy zgodnie z $(1)$ otrzymujemy 
$$\textit{dowolny przepływ sieci} \leq \textit{znaleziony przekrój} = \textit{znaleziony przepływ sieci} \leq \textit{dowolny przekrój}$$
czyli nasz znaleziony przepływ jest maksymalny, a przekrój minimalny i są one równe. $\blacksquare$
To twierdzenie jest przydate, aby robić zadania innego typu. Panuje wojna, a nasz wróg transportuje materiały z Moskwy do Warszawy. Nasze siły mogą blokować drogi, ale potrzeni są żołnieże w ilościach zależnych od drogi. Ile potrzebujemy żołnieży? Wystarczy utworzyć sieć przepływową i użyć algorytmu przepływowego. Zgodnie z powyższym twierdzeniem otrzymamy wynik.

### Drobne uogólnienia


- <b>Krawędzie nieskierowane</b> - Wystarczy zastąpić taką krawędź dwoma skierowanymi. W implementacji nie rozróżniamy które krawędzie są rezydualne, a które nie oraz nie przeszkada nam, że obie będą miały dodatnią przepustowość.
- <b>Przepustowość na wierzchołkach</b> - Dzieimy taki wierzchołek na dwa. Do pierwszego podłączamy wszystkie krawądzie wchodzące i tworzymy z niego krawędź wychodzącą o przepustowości oryginalego wierzchołka. Prowadzi ona do drugiego wierzchołka, z ktrego dodatkowo podłączamy wszystkie oryginalne krawędzie wychodzące.\\
\includegraphics[scale=0.4]{p6}\\
- <b>Wiele źródeł i wiele ujść</b> - Tworzymy owe wierzchołki, tzw. superźródło i superujście. Z pierwszego prowadzimy kraędzie o nieskończonej przepustowości do źródeł, a do drugiego prowadzimy krawędzie o nieskończonej przepustowości z ujść.\\
\includegraphics[scale = 0.8]{p7}\\
- <b>Krawędzie wielokrotne i pętle</b> - nie psują one złożoności, ani poprawności działania programu, aczkolwiek wszystkie pętle można usunąć, a krawędzie wielokrotne połączyć.


### Algorytm Edmondsa-Karpa
Podstawowe algorytmy używają tej samej idei: należy używać krótkich ścieżek. Przyspiesza to działanie algorytmu i pozwala na uzyskanie złożoności niezależnej od wyniku. Algorytm Edmondsa-Karpa polega na znajdowaniu najkrótszej ścieżki bfs'em i zaktualizowniu jej. To łatwe podejście okazuje się dosyć efektywne. Algorytm ten działa w złożoności $O(nm^2),$ gdzie $n,m$ to odpowiednio ilość wierzchołków i ilość krawędzi.\\
<b>Dowód</b>\\
Niech $dist(v)$ oznacza minimalną odległość od $s$ do $v$ (nie możemy chodzić zapełnionymi kawędziami). Minimalna ścieżka przechodzi przez wierzchołki o kolejnych odległościach $0, 1, 2, ... , dist(t).$ Powiedzmu że są to kolejno $u_0=s,u_1,u_2, ... , u_k=t.$ Gdy używamy krawędzi $u_0 \rightarrow u_1$ to może z powrotem pojawić się krawędź $u_1 \rightarrow u_0,$ ale widzimy, że może to jedynie zwiększyć odległość. Tak samo wierzchołki o odległości $dist(u_2)$ mogą się jedynie oddalić, bo wszystkie wieszchołki o odległości nie przekraczającej  $dist(u_1)$ się nie zbliżyły, a doszła co najwżej krawędź $u_2 \rightarrow u_1.$ Tak samo dla $dist(u_2), dist(u_3), ... , dist(u_k),$ czyli po takiej operacji wierzchołki jedynie się oddalają.\\
Kiedy aktualizujemy ścieżkę powiększjącą, to wyczerpujemy co najmniej jedną krawędź. Nazwijmy ją krawędzią <b>krytyczną</b>. Zastanówmy się ile razy krawędź $u \rightarrow v$ może być krytyczna. Powiedzmy, że $u \rightarrow v$ została wyczerpana, bo była krytyczna. Wtedy mamy $dist(u) = dist(v) -1,$ bo zawsze bierzemy minimalne ścieżki (czyli odległości to $0, 1, 2, ...$). Wtedy, aby ponownie się pojawiła $u \rightarrow v$ to musiała być użyta krawędź $v \rightarrow u,$ ale to oznacza, że $dist(u) = dist(v)+1.$ $dist(v)$ może tylko rosnąć, czyli $dist(u)$ zwiększyło się o co najmniej 2. Z kolei zawsze zachodzi $dist(u) \leq n$ (ścieżka nie może przekraczać liczby wierzchołków. Pokazuje to, że $u \rightarrow v$ może być wyczerpana maksymalnie $\frac{n}{2}+1=O(n)$ razy. Z tego wynika, że będziemy szukać ścieżki maksymalnie $O(nm)$ razy, a każde szukanie bfs'em zajmuje $O(m),$ czyli ostatecznie złożoność wynosi $O(nm^2).$ $\blacksquare$\\
<b>Implementacja</b>\\
\colorbox{xdd}{\makebox[\textwidth][l]{\parbox[t]{\linewidth}{
\texttt{\B struct \B edge\\
\B \{\I ~~~~int \B a\B ,\B b\B ; \C /// sciezka od a do b\\
\I ~~~~long \I long \B cap\B ,\B flow\B ; \C /// przepustowosc, przeplyw\\
\B \}\B ;\\
\\
\B const \I int \B MAXN \B = \N 100001\B ;\\
\B const \I long \I long \B INF \B = \N 1LL \B <\B < \N 62\B ; \C /// nieskonczonosc\\
\\
\I int \B n\B ,\B m\B ,\B s\B ,\B t\B ,\B bck\B [\B MAXN\B ]\B ;\\
\B vector\B <\B edge\B > \B e\B ;\\
\B vector\B <\I int\B > \B g\B [\B MAXN\B ]\B ; \C /// graf prowadzi od wierzcholka do krawedzi\\
\\
\B void \B add\B \_\B edge\B (\I int \B a\B ,\I int \B b\B ,\I long \I long \B cap\B )\\
\B \{\\
\B ~~~~edge \B e1 \B = \B \{\B a\B ,\B b\B ,\B cap\B ,\N 0\B \}\B ; \C /// zwykla krawedz\\
\B ~~~~edge \B e2 \B = \B \{\B b\B ,\B a\B ,\N 0\B ,\N 0\B \}\B ; \C /// krawedz rezydualna\\
\B ~~~~g\B [\B a\B ]\B .\B push\B \_\B back\B (\B e\B .\B size\B (\B )\B )\B ;\\
\B ~~~~e\B .\B push\B \_\B back\B (\B e1\B )\B ;\\
\B ~~~~g\B [\B b\B ]\B .\B push\B \_\B back\B (\B e\B .\B size\B (\B )\B )\B ;\\
\B ~~~~e\B .\B push\B \_\B back\B (\B e2\B )\B ;\\
\C ~~~~/// trik implementacyjny - zawsze dodajemy po zwyklej krawedzi krawedz rezydualna\\
\C ~~~~/// w zapisie bitowym zwykle krawedzie maja na koncu 0, a rezydualne 1.\\
\C ~~~~/// dodatkowo odowiadajaca krawedzia x jest x\^1\\
\B \}\\
\\
\I long \I long \B bfs\B (\B )\\
\B \{\\
\C ~~~~/// bck[] - gdy -1 oznacza, ze jeszcze nie doszlismy.\\
\C ~~~~/// W przeciwnym wypadku wskazuje krawedz ktora oplaca sie isc, aby dojsc jak najszybciej z s\\
\C ~~~~/// zwrocene 0 oznacza nie znalezienie sciezki\\
\I ~~~~for\B (\I int \B i \B = \N 1\B ;\B i \B <\B = \B n\B ;\B i\B +\B +\B ) \B bck\B [\B i\B ] \B = \B -\N 1\B ;\\
\B ~~~~queue\B <\I int\B > \B q\B ;\\
\B ~~~~q\B .\B push\B (\B s\B )\B ;\\
\B ~~~~bck\B [\B s\B ] \B = \N 0\B ; \C /// przez to nie zaktualizujemy s\\
\I ~~~~while\B (\B !\B q\B .\B empty\B (\B )\B )\\
\B ~~~~\{\\
\I ~~~~~~~~int \B v \B = \B q\B .\B front\B (\B )\B ;\\
\B ~~~~~~~~q\B .\B pop\B (\B )\B ;\\
\I ~~~~~~~~for\B (\I int \B i \B = \N 0\B ;\B i \B < \B (\I int\B )\B g\B [\B v\B ]\B .\B size\B (\B )\B ;\B i\B +\B +\B )\\
\B ~~~~~~~~\{\\
\I ~~~~~~~~~~~~int \B id \B = \B g\B [\B v\B ]\B [\B i\B ]\B ; \C /// indeks krawedzi\\
\I ~~~~~~~~~~~~int \B to \B = \B e\B [\B id\B ]\B .\B b\B ; \C /// dokad idziemy\\
\I ~~~~~~~~~~~~if\B (\B e\B [\B id\B ]\B .\B flow \B < \B e\B [\B id\B ]\B .\B cap \B \&\B \& \B bck\B [\B to\B ] \B =\B = \B -\N 1\B ) \C ///idziemy do wierzcholka gdy cos moze przeplynac i wierzcholek nie byl odwiedzony\\
\B ~~~~~~~~~~~~\{\\
\B ~~~~~~~~~~~~~~~~bck\B [\B to\B ] \B = \B id\B ;\\
\B ~~~~~~~~~~~~~~~~q\B .\B push\B (\B to\B )\B ;\\
\B ~~~~~~~~~~~~\}\\
\B ~~~~~~~~\}\\
\B ~~~~\}\\
\I ~~~~if\B (\B bck\B [\B t\B ] \B =\B = \B -\N 1\B ) \I return \N 0\B ; \C ///nie mozemy dojsc do t\\
\I ~~~~long \I long \B flow \B = \B INF\B ;\\
\I ~~~~int \B u \B = \B t\B ;\\
\I ~~~~while\B (\B u \B !\B = \B s\B ) \C /// liczymy maksymalny przeplyw ktory mozemy puscic\\
\B ~~~~\{\\
\B ~~~~~~~~flow \B = \B min\B (\B flow\B ,\B e\B [\B bck\B [\B u\B ]\B ]\B .\B cap \B - \B e\B [\B bck\B [\B u\B ]\B ]\B .\B flow\B )\B ;\\
\B ~~~~~~~~u \B = \B e\B [\B bck\B [\B u\B ]\B ]\B .\B a\B ;\\
\B ~~~~\}\\
\B ~~~~u \B = \B t\B ;\\
\I ~~~~while\B (\B u \B !\B = \B s\B ) \C /// aktualizujemy sciezke\\
\B ~~~~\{\\
\B ~~~~~~~~e\B [\B bck\B [\B u\B ]\B ]\B .\B flow \B +\B = \B flow\B ;\\
\B ~~~~~~~~e\B [\B bck\B [\B u\B ]\B \^\N 1\B ]\B .\B flow \B -\B = \B flow\B ;\\
\B ~~~~~~~~u \B = \B e\B [\B bck\B [\B u\B ]\B ]\B .\B a\B ;\\
\B ~~~~\}\\
\I ~~~~return \B flow\B ;\\
\B \}\\
\\
\I long \I long \B edmondskarp\B (\B )\\
\B \{\\
\I ~~~~long \I long \B flow \B = \N 0\B ;\\
\I ~~~~for\B (\B ;\B ;\B ) \C /// szukamy sciezki tyle ile mozemy\\
\B ~~~~\{\\
\I ~~~~~~~~long \I long \B pushed \B = \B bfs\B (\B )\B ;\\
\I ~~~~~~~~if\B (\B pushed \B =\B = \N 0\B ) \I break\B ;\\
\B ~~~~~~~~flow \B +\B = \B pushed\B ;\\
\B ~~~~\}\\
\I ~~~~return \B flow\B ; \C ///w e[] mamy zapisany maksymalny przeplyw\\
\B \}
}}}}

### Algorytm Dinitza
Ideą tego algortmu jest szukanie wszystkich ścieżek o tej samej najkrótszej długości na raz. Zamiast szukać bfs'em najkrótszej ścieżki podzielimy wszystkie wierzchołki na warstwy $L_0, L_1, ... , L_k$ o takiej samej odległości od źródła w $O(m).$ Wszystkie najkrótsze ścieżki są utworzone tylko z krawędzi z $L_i$ do $L_{i+1},$ dletego będziemy rozważać tylko je. \\
\includegraphics[scale = 0.3]{p8}\\
Naszym celem jest w $O(nm)$ znalezienie tzw. <b>przepływu blokującego</b>, czyli takiego, który powstał tylko z aktualizacji rozważanych krawędzi i powoduje, że przestaje istnieć w nich ścieżka z $s$ do $t.$  Tak jak wyżej odległości będą tylko rosnąć i za każdym razem wyczerpujemy co najmniej jedną krawędź. Będziemy usuwać krawędzie w dwóch przypadkach: 


- Krawędź zostaje wyczerpana.
- Gdy przejdziemy daną krawędzią to nie będziemy mogli dojść do $t.$


W tym wypadku będziemy używać dfs'a. Czas działania dfs'a to $O(n+m),$ a my chcemy $O(n).$ Dodatkowego $O(m)$ pozbędziemy się w taki sposób, że nie będzie ono dotyczyło jednego dfs'a, ale wszystkich razem. Wykorzystamy to, że każdy wierzchołek ma ułożone krawędzie w pewnej kolejności. Będziemy pamiętać dla każdego wierzchołka którą krawędzią dalej iść. To znacznie ułatwia implementacją, bo można w ten sposób tworzyć graf z krawędzi od $L_i$ do $L{i+1}$ na bierząco. Wtedy gdy nie będziemy liczyć zmian kolejnych krawędzi w wierzchołkach to dfs będzie działał w czasie $O(n).$ Wliczamy w to również aktualizację na ścieżce, bo można to zrobić cofając się dfs'em. Z kolei <b>sumarycznie</b> zmian krawędzi będzie $O(m),$ bo tyle ich jest. Wywołamy się dfs'em maksymalnie $O(m)$ razy, bo każde wywołanie usuwa krawędź. Z tego wynika, że złożoność znalezienia przepływu blokującego razem z podziałem na warstwy to $O(m)+O(m)*O(n)+O(m)=O(nm).$ Należy pamiętać w implementacji, że w każdej aktualizacji trzeba również aktualizować krawędzie rezydualne.\\
Ile razy będziemy tworzyć warstwy i szukać przepływu blokującego? Każde takie wywołaie powoduje, że usuwamy wszystkie ścieżki o najmniejszej długości przestają istnieć (zgodnie z obserwacjami w poprzednim paragrafie), a zatem odległość $t$ od $s$ zwiększa się o co najmniej 1, co oznacza, że warstw i przepływu blokującego będziemy szukać maksymalnie $n$ razy, czyli ostatecznie złożoność wyniesie $O(n^2m).$\\
<b>Implementacja</b>\\
\colorbox{xdd}{\makebox[\textwidth][l]{\parbox[t]{\linewidth}{
\texttt{\B struct \B edge\\
\B \{\\
\I ~~~~int \B a\B ,\B b\B ;\\
\I ~~~~long \I long \B cap\B ,\B flow\B ;\\
\B \}\B ;\\
\\
\B const \I int \B MAXN \B = \N 100001\B ;\\
\B const \I long \I long \B INF \B = \N 1LL \B <\B < \N 62\B ;\\
\\
\I int \B n\B ,\B m\B ,\B s\B ,\B t\B ,\B d\B [\B MAXN\B ]\B ,\B ptr\B [\B MAXN\B ]\B ,\B q\B [\B MAXN\B ]\B ;\\
\B vector\B <\B edge\B > \B e\B ;\\
\B vector\B <\I int\B > \B g\B [\B MAXN\B ]\B ;\\
\\
\B void \B add\B \_\B edge\B (\I int \B a\B ,\I int \B b\B ,\I long \I long \B cap\B )\\
\B \{\\
\B ~~~~edge \B e1 \B = \B \{\B a\B ,\B b\B ,\B cap\B ,\N 0\B \}\B ;\\
\B ~~~~edge \B e2 \B = \B \{\B b\B ,\B a\B ,\N 0\B ,\N 0\B \}\B ;\\
\B ~~~~g\B [\B a\B ]\B .\B push\B \_\B back\B (\B e\B .\B size\B (\B )\B )\B ;\\
\B ~~~~e\B .\B push\B \_\B back\B (\B e1\B )\B ;\\
\B ~~~~g\B [\B b\B ]\B .\B push\B \_\B back\B (\B e\B .\B size\B (\B )\B )\B ;\\
\B ~~~~e\B .\B push\B \_\B back\B (\B e2\B )\B ;\\
\B \}\\
\\
\I bool \B bfs\B (\B ) \C /// zwraca czy istnieje sciezka do t\\
\B \{\\
\C ~~~~/// d[] mowi w ktorej warstwie sa wierzcholki, -1 oznacza nieodwiedzony\\
\I ~~~~for\B (\I int \B i \B = \N 1\B ;\B i \B <\B = \B n\B ;\B i\B +\B +\B )\B d\B [\B i\B ] \B = \B -\N 1\B ;\\
\B ~~~~d\B [\B s\B ] \B = \N 0\B ;\\
\I ~~~~int \B qh \B = \N 0\B ,\B qt \B = \N 0\B ;\\
\B ~~~~q\B [\B qt\B +\B +\B ] \B = \B s\B ;\\
\I ~~~~while\B (\B qh \B < \B qt \B \&\B \& \B d\B [\B t\B ] \B =\B = \B -\N 1\B ) \C /// zatrzymujemy sie rownierz gdy odwiedzimy t\\
\B ~~~~\{\\
\I ~~~~~~~~int \B v \B = \B q\B [\B qh\B +\B +\B ]\B ;\\
\I ~~~~~~~~for\B (\I int \B i \B = \N 0\B ;\B i \B < \B (\I int\B )\B g\B [\B v\B ]\B .\B size\B (\B )\B ;\B i\B +\B +\B )\\
\B ~~~~~~~~\{\\
\I ~~~~~~~~~~~~int \B id \B = \B g\B [\B v\B ]\B [\B i\B ]\B ;\\
\I ~~~~~~~~~~~~int \B to \B = \B e\B [\B id\B ]\B .\B b\B ;\\
\I ~~~~~~~~~~~~if\B (\B e\B [\B id\B ]\B .\B flow \B < \B e\B [\B id\B ]\B .\B cap \B \&\B \& \B d\B [\B to\B ] \B =\B = \B -\N 1\B )\\
\B ~~~~~~~~~~~~\{\\
\B ~~~~~~~~~~~~~~~~d\B [\B to\B ] \B = \B d\B [\B v\B ] \B + \N 1\B ;\\
\B ~~~~~~~~~~~~~~~~q\B [\B qt\B +\B +\B ] \B = \B to\B ;\\
\B ~~~~~~~~~~~~\}\\
\B ~~~~~~~~\}\\
\B ~~~~\}\\
\I ~~~~return \B d\B [\B t\B ] \B !\B = \B -\N 1\B ; \C ///czy mozemy dojsc do t\\
\B \}\\
\\
\I long \I long \B dfs\B (\I int \B v\B ,\I long \I long \B flow\B ) \C /// zwraca i aktualizuje czesc przeplywu blokujacego\\
\B \{\\
\C ~~~~/// ptr[] mowi do ktora krawedzia dalej isc, nie resetuje sie miedzy dfs'ami\\
\C ~~~~/// flow to przeplyw, ktory jeszcze mozemy puscic na wybranej sciezce\\
\I ~~~~if\B (\B flow \B =\B = \N 0\B )\I return \N 0\B ; \C /// warunek koncowy - nie mozemy puscic przeplywu ta sciezka\\
\I ~~~~if\B (\B flow \B =\B = \B t\B )\I return \B flow\B ; \C /// warunek koncowy - doszlismy do t\\
\I ~~~~for\B (\B ;\B ptr\B [\B v\B ] \B < \B (\I int\B )\B g\B [\B v\B ]\B .\B size\B (\B )\B ;\B ptr\B [\B v\B ]\B +\B +\B )\\
\B ~~~~\{\\
\I ~~~~~~~~int \B id \B = \B g\B [\B v\B ]\B [\B ptr\B [\B v\B ]\B ]\B ;\\
\I ~~~~~~~~int \B to \B = \B e\B [\B id\B ]\B .\B b\B ;\\
\I ~~~~~~~~if\B (\B d\B [\B to\B ] \B !\B = \B d\B [\B v\B ] \B + \N 1\B )\I continue\B ; \C /// pomijamy krawedzie ktore nie sa z warstwy x do x+1\\
\I ~~~~~~~~int \B pushed \B = \B dfs\B (\B to\B ,\B min\B (\B flow\B ,\B e\B [\B id\B ]\B .\B cap \B - \B e\B [\B id\B ]\B .\B flow\B )\B )\B ;\\
\I ~~~~~~~~if\B (\B pushed \B > \N 0\B ) \C /// gdy zalezlismy sciezke powiekszjaca to aktualizujemy ja calom od razu\\
\B ~~~~~~~~\{\\
\B ~~~~~~~~~~~~e\B [\B id\B ]\B .\B flow \B +\B = \B pushed\B ;\\
\B ~~~~~~~~~~~~e\B [\B id\B \^\N 1\B ]\B .\B flow \B -\B = \B pushed\B ;\\
\I ~~~~~~~~~~~~return \B pushed\B ; \C /// koniec tego wywolania dfs'a jest przy pierwszym znalezieniu sciezki powiekszjacej\\
\C ~~~~~~~~~~~~/// nalezy zauwazyc, ze jeszcze nie usuwamy tej krawedzi, bo ptr[v] nie rosnie.\\
\C ~~~~~~~~~~~~/// Mozliwe, ze jeszcze ja wykorzystamy\\
\B ~~~~~~~~\}\\
\B ~~~~\}\\
\I ~~~~return \N 0\B ; \C /// koniec - nie znalezlismy sciezki\\
\B \}\\
\\
\I long \I long \B dinitz\B (\B )\\
\B \{\\
\I ~~~~long \I long \B flow \B = \N 0\B ;\\
\I ~~~~for\B (\B ;\B ;\B ) \C /// dzielimy na warstwy tyle ile mozemy\\
\B ~~~~\{\\
\I ~~~~~~~~if\B (\B !\B bfs\B (\B )\B )\I break\B ; \C /// gdy nie istnieje sciezka do t zatrzymujemy\\
\I ~~~~~~~~for\B (\I int \B i \B = \N 1\B ;\B i \B <\B = \B n\B ;\B i\B +\B +\B )\B ptr\B [\B i\B ] \B = \N 0\B ;\\
\I ~~~~~~~~while\B (\I int \B pushed \B = \B dfs\B (\B s\B ,\B INF\B )\B )\B flow \B +\B = \B pushed\B ; \C /// gdy dfs niczego nie znajdzie to konczymy\\
\C ~~~~~~~~/// a = b zwraca b i do a przypisuje b\\
\B ~~~~\}\\
\I ~~~~return \B flow\B ; \C ///w e[] mamy zapisany maksymalny przeplyw\\
\B \}
}}}}

### Sieci jednostkowe
Poza lepszą złożonością algorytm Dinitza ma jeszcze inną bardzo ważną zaletę. Działa on znacznie szybciej dla grafów jednostkowych (czyli takich, które mają wszystkie krawędzie o przepustowościach 0 lub 1).\\
<b>Twierdzenie</b>: Dla grafów jednostkowych złożoność algorytmu Dinitza to $O(m \cdot min(n^{\frac{2}{3}},\sqrt{m})).$\\
<b>Dowód</b>\\
Wpierw zauważmy, że znalezienie przepływu blokującego zajmuje $O(m),$ bo każda aktualizacja przepływu blokouje wszystkie krawędzie na ścieżce, czyli innymi słowy nie rozważymy krawędzi dwukrotne. Podział na warstwy i szukanie przepływu blokującego będziemy nazywać <b>krokiem</b>. Pokażemy, że zrobimy krok maksymalnie $O(min(n^{\frac{2}{3}},\sqrt{m}))$ razy, co zakończy dowód.
\begin{enumerate}
- Dlaczego $O(\sqrt{m})$?\\
Niech $f'$ to maksymalny przepływ, a $f$ to przepływ po $\sqrt{m}$ krokach.  Zauważmy, że $f'-f,$ ćzyli sieć, która na każdej krawędzi ma przypisaną różnicę wartości $f'$ i $f,$ jest siecią przepływową. Możemy ją podzielić na ścieżki z $s$ do $t$ i cykle. Ponadto każda krawędź jest w maksymalnie jednym cyklu albo jednej ścieżce, bo jest jednostkowa. Z tego wynika, że suma długości ścieżek to maksymalnie $m.$ Dodatkowo, zgodnie z algorytmem Dinitza wszystkie ścieżki $f'-f$ mają długość co najmniej $\sqrt{m}.$ Z kolei ilość ścieżek sieci jednostkowej jest równa jej przepływowi. Oznaczmy $|f'-f|$ jako tą wartość. Zgodnie z tym wszyskim
$$ |f'-f| \cdot \sqrt{m} \leq m$$
z czego wynika
$$ |f'-f| \leq \sqrt{m} $$
Co to znaczy? To mówi nam że wykonamy jeszcze maksymalnie $\sqrt{m}$ pojedyńczych aktualizacji, a zatem zrobimy jeszcze maksymalnie $\sqrt{m}$ kroków. Ostatecznie zrobimy ich co najwyżej $2\sqrt{m} = O(\sqrt{m}).$ $\blacksquare$
- Dlaczego $O(n^{\frac{2}{3}})$?\\
Dowód będzie przebiegał podobnie do podpunktu 1. Niech $f'$ to przepływ maksymalny, a $f$ to przepływ po $2n^{\frac{2}{3}}$ krokach. Rozważmy sieć $f'-f,$ a w szczególności podział na warstwy $L_0, L_1, ... , L_k$ zgodnie z algorytmem Dinitza. Wtedy $k \geq 2n^{\frac{2}{3}}.$ W działaniach przyjmujemy, że $L_i$ oznacza wielkość danego zbioru. Miej niż $n^{\frac{2}{3}}$ warstw ma więcej niż $n^{\frac{1}{3}},$ przez co istnieją takie dwie kolejne warstwy $L_i,L_{i+1},$ że każda z nich ma co najwyżej $n^{\frac{1}{3}}$ wierzchołków.\\ 
\includegraphics[scale = 0.5]{p9}\\
Rozważmy teraz przekrój taki, że zbiór $S$ składa się z warstw $L_0, L_1, \dots , L_i,$ a $T$ z $L_{i+1}, \dots , L_k.$ Zgodnie z definicją warstwy $L_x$ nie może mieć żadnej krawędzi do $L_{x+2}, L_{x+3}, \dots , L_k$ , czyli jedyne krawędzie z $S$ do $T$ to krawędzie z $L_i$ do $L_{i+1}.$ Ich z kolei jest maksymalnie $L_i \cdot L_{i+1} \leq n^{\frac{2}{3}}.$ Sieć jest jednostkowa, czyli wartość tego przekroju to maksymalnie $n^{\frac{2}{3}}.$ Zgodnie z twierdzeniem o maksymalnym przepływie i minimalnym przekroju przepływ sieci $f'-f$ to maksymalnie $n^{\frac{2}{3}}.$ To oznacza, że zrobimy jeszcze maksymalnie $n^{\frac{2}{3}}$ kroków, czyli ostatecznie ich ilość to $ 2n^{\frac{2}{3}} + n^{\frac{2}{3}} = O(n^{\frac{2}{3}}).$ $\blacksquare$
\end{enumerate}

### Algorytm Hopcrofta-Karpa
Dlaczego sieci jednostkowe są takie ważne? Jeden powód to możliwość sprowadzenia problemu maksymalnego skojarzenia w grafie dwudzielnym do problemu maksymalnego przepływu w sieci jednoskowej. Dokładne sformułowanie problemu i jeden z algorytmów znajdziesz w artykule "Grafy dwudzielne". Powiedzmy, że dany graf dwudzielny ma krawędzie tylko między zbiorami $A$ i $B.$ Wszystkie krawędzie sieci którą tworzymy na podstawie grafu mają przepustowość 1. Tworzymy superźródło $s$ z którego prowdzimy krawędzie do każdego z wierzchołków w $A,$ krawędzie między $A$ i $B$ skierowujemy od $A$ do $B$ oraz z każdego wierzchołka z $B$ prowadzimy krawędź do superujścia $t.$ Wystarczy teraz użyć algorytmu Dinitza. Dlaczego to jest poprawne? Wszystkie ścieżki z $s$ do $t$ przechodzą kolejno przez $s,$ wierzchołek z $A,$ wierzchołek z $B,$ $t$ oraz dwie różne mają i różny wierzchołek z $A$ i różny wierzchołek z $B.$ Oznacza to, że problem przepływowy można interpretować jako szukanie maksymalnej liczby rozłącznych ścieżek od $s$ do $t$ , czyli inaczej maksymalne skojarzenie $A$ i $B.$ \\
Algorytm ten nazywa się algorytmem Hopcrofta-Karpa. Mogoby się wydawać, że to tyle o skojarzeniach, a złożoność wynosi $O(m \cdot min(n^{\frac{2}{3}},\sqrt{m})).$ Nic bardziej mylnego. Tym razem algorytm Dinitza szuka przepływu blokującego $O(\sqrt{n})$ razy, czyli ostatecznie złożoność to $O(\sqrt{n} \cdot m).$\\
<b>Dowód</b>\\
Czym takim wyróżnia się ten graf? Otóż każdy wierzchołek nie licząc $s$ i $t$ ma jedną krawędź wchodzącą lub jedną wychodzącą. To oznacza, że przez każdy wierzchołek może przechodzić maksymalnie jedna ścieżka. Przez to sumatyczna długość ścieżek nie przekracza $O(n).$ Teraz postępując analogicznie do pudpunktu 1. w dowodzie złożoności dla sieci jednostkowych otrzymujemy, że ilość kroków to $O(\sqrt{n}).$ Wystarczy, że zamienimy tam wszędzie $m$ na $n$ oraz $\sqrt{m}$ na $\sqrt{n}.$ $\blacksquare$

### Algorytm Dinitza ze skalowaniem
Można dosyć łatwo ulepszyć algorytm Dinitza do złożoności $O(nm\log{z}),$ gdzie $z$ to maksymalna przepustowość. Pokażemy sposób, aby przepływ blokujący szukać w czasie $O(m \log{z})$ zamiast $O(nm).$ Niech $2^p$ to nawiększy bit wszystkich przepustowości. Wtedy $p=O(\log{z}).$ Będziemy $p$ razy wykonywać algorytm na sieci jednostkowej. Bardzo istotny jest fakt, że w podsieci w której szukamy przepływu blokującego przepływ na krawędziach może tylko rosnąć. Najpierw wykonujemy algorytm używając tylko ścieżek, którymi
może przepłynąć $\geq 2^p.$ Widzimy, że wtedy dwie takie ścieżki nie mogą się pokrywać krawędziowo, czyli działa to tak samo jak na sieci jednostkowej. Z tego powodu ta część algorytmu działa w czasie $O(m).$ A co zrobiliśmy? Pozbyliśmy się wszystkich ścieżek, którymi mogło popłynąć $\geq 2^p$ oraz zaktualizowaliśmy odpowiednio wynik. Teraz robimy tak dla $2^{p-1}, 2^{p-2}, \dots , 2^0$ i otrzymujemy przepływ blokujący w czasie $O(mp)=O(m \log{z}).$ Okazuje się, że w implementacji ta poprawka zajmuje mało kodu.\\
<b>Implementacja</b>\\
\colorbox{xdd}{\makebox[\textwidth][l]{\parbox[t]{\linewidth}{
\texttt{\B struct \B edge\\
\B \{\\
\I ~~~~int \B a\B ,\B b\B ;\\
\I ~~~~long \I long \B cap\B ,\B flow\B ;\\
\B \}\B ;\\
\\
\B const \I int \B MAXN \B = \N 100001\B ;\\
\B const \I long \I long \B INF \B = \N 1LL \B <\B < \N 62\B ;\\
\B const \I long \I long \B MAXCAP \B = \N 1LL \B <\B < \N 29\B ; \C /// maksymalna potega 2, ktora moze byc przepustowosca\\
\\
\I int \B n\B ,\B m\B ,\B s\B ,\B t\B ,\B d\B [\B MAXN\B ]\B ,\B ptr\B [\B MAXN\B ]\B ,\B q\B [\B MAXN\B ]\B ;\\
\I long \I long \B minflow\B ; \C /// minimalny przeplyw blokujacy dla dfs'ow wykonywanych w tym momencie\\
\B vector\B <\B edge\B > \B e\B ;\\
\B vector\B <\I int\B > \B g\B [\B MAXN\B ]\B ;\\
\\
\B void \B add\B \_\B edge\B (\I int \B a\B ,\I int \B b\B ,\I long \I long \B cap\B )\\
\B \{\\
\B ~~~~edge \B e1 \B = \B \{\B a\B ,\B b\B ,\B cap\B ,\N 0\B \}\B ;\\
\B ~~~~edge \B e2 \B = \B \{\B b\B ,\B a\B ,\N 0\B ,\N 0\B \}\B ;\\
\B ~~~~g\B [\B a\B ]\B .\B push\B \_\B back\B (\B e\B .\B size\B (\B )\B )\B ;\\
\B ~~~~e\B .\B push\B \_\B back\B (\B e1\B )\B ;\\
\B ~~~~g\B [\B b\B ]\B .\B push\B \_\B back\B (\B e\B .\B size\B (\B )\B )\B ;\\
\B ~~~~e\B .\B push\B \_\B back\B (\B e2\B )\B ;\\
\B \}\\
\\
\I bool \B bfs\B (\B )\\
\B \{\\
\I ~~~~for\B (\I int \B i \B = \N 1\B ;\B i \B <\B = \B n\B ;\B i\B +\B +\B )\B d\B [\B i\B ] \B = \B -\N 1\B ;\\
\B ~~~~d\B [\B s\B ] \B = \N 0\B ;\\
\I ~~~~int \B qh \B = \N 0\B ,\B qt \B = \N 0\B ;\\
\B ~~~~q\B [\B qt\B +\B +\B ] \B = \B s\B ;\\
\I ~~~~while\B (\B qh \B < \B qt \B \&\B \& \B d\B [\B t\B ] \B =\B = \B -\N 1\B )\\
\B ~~~~\{\\
\I ~~~~~~~~int \B v \B = \B q\B [\B qh\B +\B +\B ]\B ;\\
\I ~~~~~~~~for\B (\I int \B i \B = \N 0\B ;\B i \B < \B (\I int\B )\B g\B [\B v\B ]\B .\B size\B (\B )\B ;\B i\B +\B +\B )\\
\B ~~~~~~~~\{\\
\I ~~~~~~~~~~~~int \B id \B = \B g\B [\B v\B ]\B [\B i\B ]\B ;\\
\I ~~~~~~~~~~~~int \B to \B = \B e\B [\B id\B ]\B .\B b\B ;\\
\I ~~~~~~~~~~~~if\B (\B e\B [\B id\B ]\B .\B flow \B < \B e\B [\B id\B ]\B .\B cap \B \&\B \& \B d\B [\B to\B ] \B =\B = \B -\N 1\B )\\
\B ~~~~~~~~~~~~\{\\
\B ~~~~~~~~~~~~~~~~d\B [\B to\B ] \B = \B d\B [\B v\B ] \B + \N 1\B ;\\
\B ~~~~~~~~~~~~~~~~q\B [\B qt\B +\B +\B ] \B = \B to\B ;\\
\B ~~~~~~~~~~~~\}\\
\B ~~~~~~~~\}\\
\B ~~~~\}\\
\I ~~~~return \B d\B [\B t\B ] \B !\B = \B -\N 1\B ;\\
\B \}\\
\\
\I long \I long \B dfs\B (\I int \B v\B ,\I long \I long \B flow\B )\\
\B \{\\
\I ~~~~if\B (\B flow \B < \B minflow\B )\I return \N 0\B ; \C /// nie puszczamy przeplywow mniejszych niz minflow\\
\I ~~~~if\B (\B flow \B =\B = \B t\B )\I return \B flow\B ;\\
\I ~~~~for\B (\B ;\B ptr\B [\B v\B ] \B < \B (\I int\B )\B g\B [\B v\B ]\B .\B size\B (\B )\B ;\B ptr\B [\B v\B ]\B +\B +\B )\\
\B ~~~~\{\\
\I ~~~~~~~~int \B id \B = \B g\B [\B v\B ]\B [\B ptr\B [\B v\B ]\B ]\B ;\\
\I ~~~~~~~~int \B to \B = \B e\B [\B id\B ]\B .\B b\B ;\\
\I ~~~~~~~~if\B (\B d\B [\B to\B ] \B !\B = \B d\B [\B v\B ] \B + \N 1\B )\I continue\B ;\\
\I ~~~~~~~~int \B pushed \B = \B dfs\B (\B to\B ,\B min\B (\B flow\B ,\B e\B [\B id\B ]\B .\B cap \B - \B e\B [\B id\B ]\B .\B flow\B )\B )\B ;\\
\I ~~~~~~~~if\B (\B pushed \B > \N 0\B )\\
\B ~~~~~~~~\{\\
\B ~~~~~~~~~~~~e\B [\B id\B ]\B .\B flow \B +\B = \B pushed\B ;\\
\B ~~~~~~~~~~~~e\B [\B id\B \^\N 1\B ]\B .\B flow \B -\B = \B pushed\B ;\\
\I ~~~~~~~~~~~~return \B pushed\B ;\\
\B ~~~~~~~~\}\\
\B ~~~~\}\\
\I ~~~~return \N 0\B ;\\
\B \}\\
\\
\I long \I long \B scaled\B \_\B dinitz\B (\B )\\
\B \{\\
\I ~~~~long \I long \B flow \B = \N 0\B ;\\
\I ~~~~for\B (\B ;\B ;\B )\\
\B ~~~~\{\\
\I ~~~~~~~~if\B (\B !\B bfs\B (\B )\B )\I break\B ;\\
\I ~~~~~~~~for\B (\B minflow \B = \B MAXCAP\B ; \B minflow \B > \N 0\B ;\B minflow \B >\B >\B = \N 1\B ) \C /// wywolujemy sie dla kazdej potegi\\
\B ~~~~~~~~\{\\
\I ~~~~~~~~~~~~for\B (\I int \B i \B = \N 1\B ;\B i \B <\B = \B n\B ;\B i\B +\B +\B )\B ptr\B [\B i\B ] \B = \N 0\B ;\\
\I ~~~~~~~~~~~~while\B (\I int \B pushed \B = \B dfs\B (\B s\B ,\B INF\B )\B )\B flow \B +\B = \B pushed\B ;\\
\B ~~~~~~~~\}\\
\B ~~~~\}\\
\I ~~~~return \B flow\B ;\\
\B \}
}}}}

### Rzeczywista szybkość
Złożoności $O(n^2m)$ nie wyglądają na szybkie, ale w praktyce wszystie powyższe algorytmy działają <b>znacznie szybciej</b> niż mogłoby się to wydawć. Przawdziwy czas działania to $O(szybko),$ a nawet algorytm Endomondsa-Karpa działa, gdy $n=10^5, m=10^5.$ Dlatego przeważnie gdy coś można zrobić przepływem to czasowo zadzaiała taki program na 100. Należy jednak mieć na uwadze, że lepiej kodzić porządnie i używać szybszych algorytmów. Ma to duże znaczenie, szególnie gdy chcemy coś przepchnąć.


## Zadania
- [Kości (XII OI, II etap)](https://szkopul.edu.pl/problemset/problem/8OrJo8TOlY9pynt7Tr9jMzzW/site/?key=statement)
- [Szkoły (XIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/yBeLudj_9WZ06ZvEQOL7cgoi/site/?key=statement)
- [Łyżwy (XVI OI, II etap)](https://szkopul.edu.pl/problemset/problem/kadKFW3YScAMW8o20u0BctQh/site/?key=statement)
"
---
