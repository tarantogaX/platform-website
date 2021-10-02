---
title: 'Przepływy'
content: "
Przepływy w literaturze opisywane często językiem formalnej matematyki, przez co wydają się  trudne.  Przepływ  działa  mniej  więcej  tak,  jak  sieć  transportowa  lub  kanały  z  wodą. Wyobraźmy sobie, że jesteśmy szefami firmy, która ma za zadanie przewieźć jak najwięcej towaru z miasta $A$ do miasta $B.$ Możemy korzystać z istniejących już szlaków transportowych. Każdy szlak ma własną przepustowość, czyli maksymalną liczbę towarów, którą możemy nim przesłać.  Stoi  przed  nami  problem  przepływowy  –  szlaki  transportowe  to  krawędzie  grafu ważonego, a miasta to oczywiście jego wierzchołki. W tym artykule nauczymy się go w miarę dobrze rozwiązywać.


## Sformułowanie problemu. Podstawy

Podstawowym  problemem  związanym  z  przepływami  jest  znalezienie  maksymalnego  przepływu. Jak wyrazić problem przesyłania towaru w języku matematyki?


Mamy  dany  pewien  graf  skierowany,  którego  dwa  wierzchołki  są  wyróżnione: <b>źródło</b> $s$ i <b>ujście</b> $t.$ Ponadto wszystkie krawędzie mają ustaloną <b>przepustowość.</b> Wtedy <b>sieć przepływowa</b> to przypisanie krawędziom wartości takie, aby na każdej krawędzi wartość nie przekraczała przepustowości oraz dla każdego wierzchołka (poza źródłem i ujściem) sumaryczna wartość wchodząca do niego była równa sumie wartości wychodzących. Wtedy <b>przepływ sieci</b> to suma wartości wchodzących do ujścia.


W problemie maksymalnego przepływu mamy odpowiedzieć, jaki jest maksymalny przepływ w naszej sieci. W poniższym przykładzie przeływ sieci wynosi $5$ (maksymalny to $7$).


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f9881bd543d0f80b90c90dd1cd68bc4c.png)


Algorytmy przedstawione w tym artykule będą używały <b>sieci rezydualnej.</b> Są to krawędzie skierowane  w  przeciwną  stronę,  które  mają  przepustowość  równą  0,  oraz  ich  wartość  jest zawsze przeciwna oryginalnej krawędzi.


Przepływ to w pewnym sensie najwyższe stadium algorytmu zachłannego. Będziemy robić zachłanne kroki przy pomocy znanych nam z algorytmów skojarzeniowych ścieżek powiększających,  a  sieć  rezydualna  będzie  odpowiadać  za
<b>cofanie</b> jednostek  puszczonych  daną krawędzią, gdyż użycie krawędzi w przeciwnym kierunku cofnie nam jednostkę przepływu. Jeśli jest to dla Ciebie nieoczywiste, zatrzymaj się chwilę i pomyśl, dlaczego tak jest.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_9098f30a3a2b4b42ed9f7e29493693d3.png)



## Metoda Forda-Fulkersona

Okazuje się, że algorytmy zachłanne, które używają sieci rezydualnej zawsze działają. Swój schemat  działania  opiszemy  przy  pomocy  ścieżek  powiększających.  Wybieramy  dowolną ścieżkę ze źródła do ujścia, w której wszystkie krawędzie mogą pomieścić jeszcze przynajmniej jedną jednostkę przepływu. Pamiętamy, że możemy używać też krawędzi rezydualnych. Jak już mówiliśmy, przejście taką krawędzią oznacza w pewnym sensie cofanie i przekierowywanie poprzednich wyborów ścieżek, aby wszystko dalej się zgadzało. Podczas implementacji należy pamiętać, że gdy zmieniamy na jakiejś krawędzi wartość przepłynięcia o $x,$ musimy na krawędzi odpowiadającej zmienić wartość o $−x.$


I to już pozwala nam rozwiązać problem przepływowy poprawnie, niestety w nie najlepszej złożoności.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_46d308d3336ac00b94c9935c787f2320.png)


Jeżeli wybieramy ścieżki dowolnie przy użyciu dfs’a lub bfs’a to złożoność wyniesie $O(m \\cdot wynik),$ gdzie $m$ to ilość krawędzi. Tak jest w wypadku całkowitych przepustowości. Gdy mamy do czynienia z liczbami rzeczywistymi taki algorytm nie musi dążyć do poprawnego, a co gorsze – może w ogóle się nie zakończyć.

## Twierdzenie o maksymalnym przepływie i minimalnym przekroju

<b>Przekrój</b> to  podział  wierzchołków  na  dwa  zbiory $S$ i $T,$  przy  czym  źródło  znajduje  się w $S,$  a  ujście  w $T.$  Wartość  przekroju  $(S, T)$  to  suma  przepustowości  krawędzi  od $S$ do $T.$ Odpowiada to podziale grafu na dwie części, a następnie przepuszczeniu tylu jednostek przepływu, żeby nie dało się już przejść z pierwszej części do drugiej.


Powyższe twierdzenie mówi, że:


$maksymalny \\ przepływ = minimalny \\ przekrój$


Dowód tego twierdzenia będzie jednocześnie dowodem poprawności metody Forda-Fulkersona.
Udowodnimy najpierw, że:


$dowolny \\ przepływ \\leq dowolny \\ przekrój$


Rozważmy wszystkie krawędzie (również rezydualne) od zbioru $S$ do zbioru $T$ (czyli pewien graf dwudzielny). Niech one tworzą zbiór $A$


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6722ba02b130023e2bc565841deed1ec.png)


Gdy  dodajemy  przepływ  na  dowolnej  ścieżce  z $s$ do $t$ to  (dla  jakiegoś $x$) $x+1$  razy wejdziemy do $T$ i $x$ razy do $S.$ Widzimy więc, ze gdy zwiększamy przepływ sieci o $f$ to na krawędziach z $A$ wartość $f$ dodamy $x+1$ razy i odejmiemy $x$ razy. Suma zmieni się wiec o $f.$ Możemy mieć jeszcze do czynienia z cyklami. Każdy z nich wejdzie do $S$ i $T$ tyle samo razy, czyli nie zmieni on wyniku.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f44f45970a8907ff59c787b4d4266cd5.png)


Z  powyższej  analizy  wynika,  że  suma  przepływów  na  wszystkich  tych  krawędziach  jest równa przepływowi całego grafu. Z kolei każda z tych krawędzi (również rezydualna) spełnia warunek $przepływ \\ sieci \\leq przepustowość$ z czego wynika pierwsza nierówność dowodu (1).


Powiedzmy, że postępowaliśmy zgodnie z metodą Forda-ulkersona i nie istnieje ścieżka powiększająca. Podzielmy wierzchołki na dwa zbiory tak, aby S zawierał wszystkie wierzchołki do których istnieje ścieżka powiększająca, a T wszystkie pozostałe. Zgodnie z założeniem do ujścia nie istnieje ścieżka powiększająca, czyli ten podział jest przekrojem. Wiemy też, że wszystkie krawędzie z S do T są w pełni wykorzystane, bo każda musi z nich musi odzielać wierzchołek do którego można dojść z wierzchołkiem do którego nie. Skoro


$przepływ \\ krawędzi = przepustowość \\ krawędzi$


to zgodnie z powyższym rozumowaniem:


$znaleziony$ $przepływ$ $sieci$ $=$ $suma$ $przepływów$ $na$ $krawędziach$ $z$ $S$ $do$ $T$ $=$ $suma$ $przepustowości$ $na$ $krawędziach$ $z$ $S$ $do$ $T$ $=$ $znaleziony$ $przekrój$


Wtedy zgodnie z $(1)$ otrzymujemy


$dowolny$ $przepływ$ $sieci$ $\\leq$ $znaleziony$ $przekrój$ $=$ $znaleziony$ $przepływ$ $sieci$ $\\leq$ $dowolny$ $przekrój$


czyli nasz znaleziony przepływ jest maksymalny, a przekrój minimalny i są one równe - co kończy dowód.


To twierdzenie jest przydate, aby robić zadania innego typu. Panuje wojna, a nasz wróg transportuje materiały z Gdyni do Piotrkowa. Nasze siły mogą blokować drogi, ale potrzebni są żołnieże w ilościach zależnych od drogi. Ile potrzebujemy żołniery? Wystarczy utworzyć sieć przepływową i użyć algorytmu przepływowego. Zgodnie z powyższym twierdzeniem otrzymamy wynik. Warto również wspomnieć, w jaki sposób wskazać krawędzie, które należy zablokować. Podpowiedzią jest dowód twierdzenia – gdy mamy już znaleziony maksymalny przepływ, musimy wyznaczyć zbiory $S$ i $T,$ a krawędziami, które należy rozkroić, są oczywiście wszystkie łączące zbiór $S$ ze zbiorem $T.$

### Drobne uogólnienia

Dla przejrzystości opisu warto pozwolić sobie na pewne uogólnienia. Poniżej znajdziesz podpowiedzi, co robić, gdy pojawiają się obiekty inne niż te używane w opisie algorytmu.


- <b>Krawędzie nieskierowane:</b> wystarczy zastąpić taką krawędź dwoma skierowanymi. W  implementacji  nie  rozróżniamy,  które  krawędzie  są  rezydualne,  a  które  nie.  Nie przeszkadza nam też, że obie będą miały dodatnią przepustowość

- <b>Przepustowości na wierzchołkach:</b> dzielimy taki wierzchołek na dwa. Do pierwszego podłączamy wszystkie krawądzie wchodzące i tworzymy z niego krawędź wychodzącą o przepustowości oryginalego wierzchołka. Prowadzi ona do drugiego wierzchołka, z ktrego dodatkowo podłączamy wszystkie oryginalne krawędzie wychodzące


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_9235f66f889736b3389c4a5c3d27f992.png)


- <b>Wiele źródeł i wiele ujść:</b> tworzymy owe wierzchołki, tzw. superźródło i superujście. Z pierwszego prowadzimy krawędzie o nieskończonej przepustowości do źródeł, a do drugiego prowadzimy krawędzie o nieskończonej przepustowości z ujść


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c40eeb0422d68434e74900ed6a0d643c.png)


- <b>Krawędzie wielokrotne i pętle:</b> nie psują one złożoności, ani poprawności działania programu, ale wszystkie pętle można usunąć, a krawędzie wielokrotne połączyć

## Algorytm Edmondsa-Karpa

Podstawowe algorytmy używają tej samej idei: należy używać krótkich ścieżek. Przyspiesza to działanie algorytmu i pozwala na uzyskanie złożoności niezależnej od wyniku. Algorytm Edmondsa-Karpa polega na znajdowaniu najkrótszej ścieżki bfs’em. To łatwe podejście okazuje  się  dosyć  efektywne.  Algorytm  ten  działa  w  złożoności $O(nm^2),$  gdzie $n, m$ to  odpowiednio ilość wierzchołków i ilość krawędzi.


<b>Dowód:</b> Niech $dist(v)$ oznacza  minimalną  odległość  od $s$ do $v$ (nie  możemy  chodzić  zapełnionymi kawędziami). Minimalna ścieżka przechodzi przez wierzchołki o kolejnych odległościach $0, 1, 2, ..., dist(t).$ Powiedzmy że są to kolejno $u_0=s, u_1, u_2, ..., u_k=t.$ Gdy używamy krawędzi $u_0 → u_1$ to może z powrotem pojawić się krawędź $u_1 → u_0,$ ale widzimy, że może to jedynie zwiększyć odległość. Tak samo wierzchołki o odległości $dist(u_2)$ mogą się jedynie oddalić, bo wszystkie wierzchołki o odległości nie przekraczającej $dist(u_1)$ się nie zbliżyły, a doszła co  najwżej  krawędź $u_2 → u_1.$  Tak  samo  dla $dist(u_2), dist(u_3), ..., dist(u_k),$  czyli  po  takiej operacji wierzchołki jedynie się oddalają.


Kiedy aktualizujemy ścieżkę powiększjącą, to wyczerpujemy co najmniej jedną krawędź (inaczej moglibyśmy przesłać więcej przepływu tą ścieżką). Nazwijmy ją krawędzią krytyczną. Zastanówmy się, ile razy krawędź $u → v$ może być krytyczna. Powiedzmy, że $u → v$ została wyczerpana i była krytyczna. Wtedy mamy $dist(u)=dist(v)−1,$ bo zawsze bierzemy minimalne ścieżki (czyli odległości to $0,1,2, ...).$ Wtedy, aby ponownie się pojawiła $u → v$ to musiała  być  użyta  krawędź $v → u,$  ale  to  oznacza,  że $dist(u)=dist(v)+1.$ $dist(v)$ może tylko rosnąć, czyli $dist(u)$ zwiększyło się o co najmniej $2.$ Z kolei zawsze zachodzi $dist(u) \\leq n$ (ścieżka prosta nie może przekraczać liczby wierzchołków. Pokazuje to, że $u → v$ może być wyczerpana maksymalnie $\\frac{n}{2}+1=O(n)$ razy. Z tego wynika, że będziemy szukać ścieżki maksymalnie $O(nm)$ razy, a każde szukanie bfs’em zajmuje $O(m),$ czyli ostatecznie złożoność wynosi $O(nm^2).$


```cpp=

struct edge {

\ \ \ \ int a,b; /// sciezka od a do b

\ \ \ \ long long cap,flow; /// przepustowosc, przeplyw

};


const int MAXN = 100001;

const long long INF = 1LL << 62; /// nieskonczonosc

int n, m, s, t, bck[MAXN];

vector<edge> e;

vector<int> g[MAXN]; /// graf prowadzi od wierzcholka do krawedzi


void add_edge(int a,int b,long long cap) {

\ \ \ \ edge e1 = {a, b, cap, 0}; /// zwykla krawedz

\ \ \ \ edge e2 = {b, a, 0, 0}; /// krawedz rezydualna

\ \ \ \ g[a].push_back(e.size());

\ \ \ \ e.push_back(e1);

\ \ \ \ g[b].push_back(e.size());

\ \ \ \ e.push_back(e2);

\ \ \ \ /// trik implementacyjny - zawsze dodajemy

\ \ \ \ /// po zwyklej krawedzi krawedz rezydualna

\ \ \ \ /// w zapisie bitowym zwykle krawedzie maja na koncu 0,

\ \ \ \ /// a rezydualne 1.

\ \ \ \ /// dodatkowo odowiadajaca krawedzia x jest x ^ 1

}


long long bfs() {

\ \ \ \ /// bck[] - gdy -1 oznacza, ze jeszcze nie doszlismy.

\ \ \ \ /// W przeciwnym wypadku wskazuje krawedz ktora oplaca sie iść,

\ \ \ \ /// aby dojsc jak najszybciej z s

\ \ \ \ /// zwrocene 0 oznacza nie znalezienie sciezki

\ \ \ \ for(int i = 1; i <= n; i ++)

\ \ \ \ \ \ \ \ bck[i] = -1;

\ \ \ \ queue<int> q;

\ \ \ \ q.push(s);

\ \ \ \ bck[s] = 0; /// przez to nie zaktualizujemy s


\ \ \ \ while(!q.empty()) {

\ \ \ \ \ \ \ \ int v = q.front();

\ \ \ \ \ \ \ \ q.pop();

\ \ \ \ \ \ \ \ for(int i = 0; i < (int)g[v].size(); i ++) {

\ \ \ \ \ \ \ \ \ \ \ \ int id = g[v][i]; /// indeks krawedzi

\ \ \ \ \ \ \ \ \ \ \ \ int to = e[id].b; /// dokad idziemy

\ \ \ \ \ \ \ \ \ \ \ \ if(e[id].flow < e[id].cap && bck[to] == -1) {

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ /// idziemy do wierzcholka gdy cos moze

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ /// przeplynac i wierzcholek nie byl odwiedzony

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ bck[to] = id;

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ q.push(to);

\ \ \ \ \ \ \ \ \ \ \ \ }

\ \ \ \ \ \ \ \ }

\ \ \ \ }

\ \ \ \ if(bck[t] == -1)

\ \ \ \ \ \ \ \ return 0; ///nie mozemy dojsc do t


\ \ \ \ long long flow = INF;

\ \ \ \ int u = t;

\ \ \ \ while(u != s) {

\ \ \ \ \ \ \ \ /// liczymy maksymalny przeplyw ktory mozemy puscic

\ \ \ \ \ \ \ \ flow = min(flow,e[bck[u]].cap - e[bck[u]].flow);

\ \ \ \ \ \ \ \ u = e[bck[u]].a;

\ \ \ \ }


\ \ \ \ u = t;

\ \ \ \ while(u != s) { /// aktualizujemy sciezke

\ \ \ \ \ \ \ \ e[bck[u]].flow += flow;

\ \ \ \ \ \ \ \ e[bck[u]^1].flow -= flow;

\ \ \ \ \ \ \ \ u = e[bck[u]].a;

\ \ \ \ }

\ \ \ \ return flow;

}


long long edmondskarp() {

\ \ \ \ long long flow = 0;

\ \ \ \ for(;;) { /// szukamy sciezki tyle ile mozemy

\ \ \ \ \ \ \ \ long long pushed = bfs();

\ \ \ \ \ \ \ \ if(pushed == 0) break;

\ \ \ \ \ \ \ \ flow += pushed;

\ \ \ \ }

\ \ \ \ return flow; /// w e[] mamy zapisany maksymalny przeplyw

}

```


## Algorytm Dinica

Ideą  tego  algortmu  jest  szukanie  wszystkich  ścieżek  o  tej  samej  najkrótszej  długości  na raz. Zamiast szukać bfs’em najkrótszej ścieżki podzielimy wszystkie wierzchołki na warstwy $L_0, L_1, ..., L_k$ o takiej samej odległości od źródła. Zrobimy to w $O(m+m).$ Wszystkie najkrótsze ścieżki są utworzone tylko z krawędzi z $L_i$ do $L_{i+1},$ dlatego będziemy rozważać tylko je.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_bf3b1c51e81bdaa73be7ac6731904060.png)


Naszym celem jest znalezienie w $O(nm)$ tzw. przepływu blokującego, czyli takiego, który powstał tylko z aktualizacji rozważanych krawędzi i powoduje, że przestaje istnieć w nich ścieżka z $s$ do $t.$ Tak jak wyżej, odległości będą tylko rosnąć i za każdym razem wyczerpujemy co najmniej jedną krawędź. Będziemy usuwać krawędzie w dwóch przypadkach:


- Krawędź zostaje wyczerpana

- Gdy przejdziemy daną krawędzią to nie będziemy mogli dojść do $t$


W tym wypadku będziemy używać DFSa. Czas działania dfs’a to niestety $O(n+m).$ Dla gęstych grafów to istotnie gorzej niż $O(n),$ jednak taką złożoność udaje nam się uzyskać w dość prosty sposób. Dodatkowego $O(m)$ pozbędziemy się w taki sposób, że nie będzie ono dotyczyło jednego dfs’a, ale wszystkich razem. Wykorzystamy to, że każdy wierzchołek ma ułożone krawędzie w pewnej kolejności. Będziemy pamiętać dla każdego wierzchołka, na której krawędzi skończyliśmy. To znacznie ułatwia implementację, bo można w ten sposób tworzyć graf z krawędzi od $L_i$ do $L_{i+1}$ na bieżąco. Wtedy, gdy nie będziemy liczyć zmian kolejnych krawędzi w wierzchołkach to dfs będzie działał w czasie $O(n).$ Wliczamy w to również aktualizację na ścieżce, bo można to zrobić cofając się dfs’em. Z kolei sumarycznie zmian krawędzi będzie $O(m),$ bo tyle ich jest. Wywołamy się dfs’em maksymalnie $O(m)$ razy, bo każde wywołanie usuwa przynajmniej jedną krawędź. Z tego wynika, że złożoność znalezienia przepływu blokującego razem z podziałem na warstwy to $O(m) + O(m) \\cdot O(n) + O(m) = O(mn).$ Należy pamiętać w implementacji, że w każdej aktualizacji trzeba również aktualizować krawędzie rezydualne.


Wysłanie przepływu blokującego nie kończy nam jeszcze algorytmu. Podobnie jak poprzednio, tym razem będziemy wysyłać tak długo, jak będzie to możliwe.


Ile razy będziemy od nowa tworzyć warstwy i szukać przepływu blokującego? Każde takie wywołanie powoduje, że usuwamy wszystkie ścieżki o najmniejszej długości przestają istnieć (zgodnie z obserwacjami w poprzednim paragrafie), a zatem odległość $t$ od $s$ zwiększa się o co najmniej $1.$ Oznacza to, że warstw i przepływu blokującego będziemy szukać maksymalnie $n$ razy. Ostatecznie złożoność algorytmu Dinica wyniesie $O(n^2m).$ Kod nie jest znacznie trudniejszy niż poprzednio.


```cpp=

int n, m, s, t, d[MAXN], ptr[MAXN], q[MAXN];

vector<edge> e;

vector<int> g[MAXN];



bool bfs() { /// zwraca czy istnieje sciezka do t

\ \ \ \ /// d[] mowi w ktorej warstwie sa wierzcholki,

\ \ \ \ /// -1 oznacza nieodwiedzony

\ \ \ \ for(int i = 1; i <= n; i++)

\ \ \ \ \ \ \ \ d[i] = -1;

\ \ \ \ d[s] = 0;

\ \ \ \ int qh = 0, qt = 0;

\ \ \ \ q[qt++] = s;

\ \ \ \ while(qh < qt && d[t] == -1) { ///zatrzymujemy sie rowniez

\ \ \ \ \ \ \ \ /// gdy odwiedzimy ujscie

\ \ \ \ \ \ \ \ int v = q[qh ++];

\ \ \ \ \ \ \ \ for(int i = 0; i < (int)g[v].size(); i++) {

\ \ \ \ \ \ \ \ \ \ \ \ int id = g[v][i];

\ \ \ \ \ \ \ \ \ \ \ \ int to = e[id].b;

\ \ \ \ \ \ \ \ \ \ \ \ if(e[id].flow < e[id].cap && d[to] == -1) {

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ d[to] = d[v] + 1;

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ q[qt ++] = to;

\ \ \ \ \ \ \ \ \ \ \ \ }

\ \ \ \ \ \ \ \ }

\ \ \ \ }

\ \ \ \ return d[t] != -1; ///czy mozemy dojsc do t

}



long long dfs(int v,long long flow) { /// zwraca i aktualizuje

\ \ \ \ /// czesc przeplywu blokujacego

\ \ \ \ /// ptr[] mowi do ktora krawedzia dalej isc,

\ \ \ \ /// nie resetuje sie miedzy DFSami

\ \ \ \ /// flow to przeplyw, ktory jeszcze mozemy puscic na wybranej sciezce

\ \ \ \ if(flow == 0)

\ \ \ \ \ \ \ \ return 0; /// warunek koncowy - nie mozemy

\ \ \ \ \ \ \ \ /// puscic przeplywu ta sciezka

\ \ \ \ if(flow == t)

\ \ \ \ \ \ \ \ return flow; /// warunek koncowy - doszlismy do t


\ \ \ \ for(; ptr[v] < (int)g[v].size(); ptr[v] ++) {

\ \ \ \ \ \ \ \ int id = g[v][ptr[v]];

\ \ \ \ \ \ \ \ int to = e[id].b;

\ \ \ \ \ \ \ \ if(d[to] != d[v] + 1)

\ \ \ \ \ \ \ \ \ \ \ \ continue; /// pomijamy krawedzie ktore nie sa

\ \ \ \ \ \ \ \ \ \ \ \ /// z warstwy x do x+1


\ \ \ \ \ \ \ \ int pushed = dfs(to,min(flow,e[id].cap - e[id].flow));

\ \ \ \ \ \ \ \ if(pushed > 0) { /// gdy zalezlismy sciezke powiekszjaca

\ \ \ \ \ \ \ \ \ \ \ \ /// to aktualizujemy ja cala od razu

\ \ \ \ \ \ \ \ \ \ \ \ e[id].flow += pushed;

\ \ \ \ \ \ \ \ \ \ \ \ e[id^1].flow -= pushed;

\ \ \ \ \ \ \ \ \ \ \ \ return pushed; /// koniec tego wywolania DFSa jest

\ \ \ \ \ \ \ \ \ \ \ \ /// przy pierwszym znalezieniu sciezki powiekszjacej

\ \ \ \ \ \ \ \ \ \ \ \ /// nalezy zauwazyc, ze jeszcze nie usuwamy tej krawedzi,

\ \ \ \ \ \ \ \ \ \ \ \ /// bo ptr[v] nie rosnie.

\ \ \ \ \ \ \ \ \ \ \ \ /// Mozliwe, ze jeszcze ja wykorzystamy

\ \ \ \ \ \ \ \ }

\ \ \ \ }

\ \ \ \ return 0; /// koniec - nie znalezlismy sciezki

}



long long dinic() {

\ \ \ \ long long flow = 0;

\ \ \ \ for(;;) { /// dzielimy na warstwy tyle ile mozemy

\ \ \ \ \ \ \ \ if(!bfs())

\ \ \ \ \ \ \ \ \ \ \ \ break; /// gdy nie istnieje sciezka do t zatrzymujemy

\ \ \ \ \ \ \ \ for(int i = 1; i <= n; i ++)

\ \ \ \ \ \ \ \ \ \ \ \ ptr[i] = 0;

\ \ \ \ \ \ \ \ while(int pushed = dfs(s, INF))

\ \ \ \ \ \ \ \ \ \ \ \ flow += pushed; /// gdy dfs niczego nie znajdzie to konczymy

\ \ \ \ \ \ \ \ /// a = b zwraca b i do a przypisuje b

\ \ \ \ }

\ \ \ \ return flow; ///w e[] mamy zapisany maksymalny przeplyw

}

```


## Sieci jednostkowe

Poza  lepszą  złożonością  algorytm  Dinica  ma  jeszcze  inną  bardzo  ważną  zaletę.  Działa  on znacznie szybciej dla grafów jednostkowych (czyli takich, które mają wszystkie krawędzie o przepustowościach 1).


<b>Twierdzenie:</b> Dla grafów jednostkowych złożoność algorytmu Dinica to $O(m \\cdot min(n^{\\frac{2}{3}}, \\sqrt{m}))$


<b>Dowód:</b> Wpierw zauważmy, że znalezienie przepływu blokującego zajmuje $O(m),$ bo każda aktualizacja przepływu blokuje wszystkie krawędzie na ścieżce. W ten sposób nie rozważymy żadnej krawędzi dwukrotne.


Podział na warstwy i szukanie przepływu blokującego będziemy nazywać krokiem. Pokażemy, że zrobimy krok maksymalnie $O(min(n^{\\frac{2}{3}},\\sqrt{m}))$ razy, co zakończy dowód.


1. Dlaczego $O(\\sqrt{m})?$


Niech $f′$ to  maksymalny  przepływ,  a $f$ to  przepływ  po $\\sqrt{m}$ krokach.  Zauważmy,  że $f′−f,$ czyli sieć, która na każdej krawędzi ma przypisaną różnicę wartości $f′$ i $f,$ jest siecią przepływową (tak naprawdę odpowiada temu, co nam jeszcze pozostało w grafie). Możemy ją podzielić na ścieżki z $s$ do $t$ i cykle. Ponadto, każda krawędź jest w maksymalnie jednym cyklu albo jednej ścieżce, bo jest jednostkowa. Z tego wynika, że suma długości ścieżek to maksymalnie $m.$ Dodatkowo, zgodnie z algorytmem Dinica wszystkie ścieżki $f′−f$ mają długość co najmniej $\\sqrt{m}.$ Z kolei ilość ścieżek sieci jednostkowej jest równa jej przepływowi. Oznaczmy $|f′−f|$ jako tą wartość. Zgodnie z tym wszyskim


$|f' - f| \\cdot \\sqrt{m} \\leq m$


z czego wynika


$|f' - f| \\leq \\sqrt{m}$


Co  to  znaczy?  To  mówi  nam  że  wykonamy  jeszcze  maksymalnie $\\sqrt{m}$ pojedyńczych aktualizacji, a zatem zrobimy jeszcze maksymalnie $\\sqrt{m}$ kroków. Ostatecznie zrobimy ich co najwyżej $2\\sqrt{m} = O(\\sqrt{m}).$


2. Dlaczego $O(n^{\\frac{2}{3}})?$


Dowód będzie przebiegał podobnie do podpunktu 1. Niech $f′$ to przepływ maksymalny, a $f$ to przepływ po $2n^{\\frac{2}{3}}$ krokach. Rozważmy sieć $f′−f,$ a w szczególności podział na warstwy $L_0, L_1, ..., L_k$ zgodnie z algorytmem Dinitza. Wtedy $k \\geq 2n^{\\frac{2}{3}}.$ W działaniach przyjmujemy, że $L_i$ oznacza wielkość danego zbioru. Mniej niż $n^{\\frac{2}{3}}$ warstw ma więcej niż $n^{\\frac{1}{3}},$  przez  co  istnieją  takie  dwie  kolejne  warstwy $L_i, L_{i+1},$  że  każda  z  nich  ma  co
najwyżej $n^{\\frac{1}{3}}$ wierzchołków.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6f0dd50a686ec8c3985be0b4babf5c28.png)


Rozważmy  teraz  przekrój  taki,  że  zbiór $S$ składa  się  z  warstw $L_0, L_1, . . . , L_i,$  a $T$ z $L_{i+1}, . . . , L_k.$  Zgodnie  z  definicją  warstwy $L_x$ nie  może  mieć  żadnej  krawędzi  do $L_{x+2}, L_{x+3}, . . . , L_k,$  czyli  jedyne  krawędzie  z $S$ do $T$ to  krawędzie  z $L_i$ do $L_{i+1}.$  Ich z kolei jest maksymalnie $L_i \\cdot L_{i+1} \\leq n^{\\frac{2}{3}}$ (bo tyle będzie jeśli każda para wierzchołków będzie  połączona  krawędzią).  Sieć  jest  jednostkowa,  czyli  wartość  tego  przekroju  to maksymalnie $n^{\\frac{2}{3}}.$ Zgodnie z twierdzeniem o maksymalnym przepływie i minimalnym przekroju  przepływ  sieci $f′−f$ to  maksymalnie $n^{\\frac{2}{3}}.$  To  oznacza,  że  zrobimy  jeszcze maksymalnie $n^{\\frac{2}{3}}$ kroków, czyli ostatecznie ich ilość to $2n^{\\frac{2}{3}}+n^{\\frac{2}{3}}=O(n^{\\frac{2}{3}}).$

## Algorytm Hopcrofta-Karpa

Dlaczego sieci jednostkowe są takie ważne? Jeden powód to możliwość sprowadzenia problemu maksymalnego skojarzenia w grafie dwudzielnym do problemu maksymalnego przepływu w  sieci  jednostkowej.  Dokładne  sformułowanie  problemu  i  jeden  z  prostszych  algorytmów znajdziesz w artykule ”Grafy dwudzielne”. Powiedzmy, że dany graf dwudzielny ma krawędzie tylko między zbiorami $A$ i $B.$ Wszystkie krawędzie sieci którą tworzymy na podstawie grafu  mają  przepustowość  1.  Tworzymy  superźródło $s$ z  którego  prowdzimy  krawędzie  do każdego z wierzchołków w $A,$ krawędzie między $A$ i $B$ skierowujemy od $A$ do $B$ oraz z każdego wierzchołka z $B$ prowadzimy krawędź do superujścia $t.$ Wystarczy teraz użyć algorytmu Dinica. Dlaczego to jest poprawne? Wszystkie ścieżki z $s$ do $t$ przechodzą kolejno przez $s,$ wierzchołek z $A,$ wierzchołek z $B,$ $t$ oraz dwie różne mają i różny wierzchołek z $A$ i różny wierzchołek z $B.$ Oznacza to, że problem przepływowy można interpretować jako szukanie maksymalnej liczby rozłącznych ścieżek od $s$ do $t,$ czyli inaczej maksymalne skojarzenie $A$ i $B.$


Algorytm ten nazywa się algorytmem Hopcrofta-Karpa. Mogoby się wydawać, że to tyle o skojarzeniach, a złożoność wynosi $O(m \\cdot min(n^{\\frac{2}{3}}, \\sqrt{m})).$ Nic bardziej mylnego. Tym razem algorytm  Dinica  szuka  przepływu  blokującego $O(\\sqrt{n})$ razy,  czyli  ostatecznie  złożoność  to $O(\\sqrt{n} \\cdot m)$


<b>Dowód:</b> Czym  wyróżnia  się  ten  graf?  Otóż  każdy  wierzchołek  nie  licząc $s$ i $t$ ma  jedną  krawędź wchodzącą lub jedną wychodzącą. To oznacza, że przez każdy wierzchołek może przechodzić maksymalnie jedna ścieżka. Przez to sumaryczna długość ścieżek nie przekracza $O(n).$ Teraz postępując  analogicznie  do  pudpunktu  1.  w  dowodzie  złożoności  dla  sieci  jednostkowych otrzymujemy,  że  ilość  kroków  to $O(\\sqrt{n}).$  Wystarczy,  że  zamienimy  tam  wszędzie $m$ na $n$ oraz $\\sqrt{m}$ na $\\sqrt{n}.$


## Algorytm Dinica ze skalowaniem

Można dosyć łatwo ulepszyć algorytm Dinitza do złożoności $O(nm \\ log \\ z),$ gdzie $z$ to maksymalna przepustowość. Pokażemy sposób, aby przepływ blokujący szukać w czasie $O(m \\ log \\ z)$ zamiast $O(nm).$ Niech $2^p$ to nawiększy bit wszystkich przepustowości. Wtedy $p = O(log \\ z).$ Będziemy $p$ razy  wykonywać  algorytm  na  sieci  jednostkowej.  Bardzo  istotny  jest  fakt,  że w  podsieci,  w  której  szukamy  przepływu  blokującego  przepływ  na  krawędziach  może  tylko rosnąć. Najpierw wykonujemy algorytm używając tylko ścieżek, którymi może przepłynąć przynajmniej $\\geq 2^p.$ Widzimy, że wtedy dwie takie ścieżki nie mogą się pokrywać krawędziowo, czyli działa to tak samo jak na sieci jednostkowej. Z tego powodu ta część algorytmu działa w czasie $O(m).$ A co zrobiliśmy? Pozbyliśmy się wszystkich ścieżek, którymi mogło popłynąć $\\geq 2^p$ oraz zaktualizowaliśmy odpowiednio wynik. Teraz robimy tak dla $2^{p − 1}, 2^{p−2}, . . . , 2^0$ i otrzymujemy przepływ blokujący w czasie $O(mp)=O(m \\ log \\ z).$ Okazuje się, że w implementacji ta poprawka zajmuje mało kodu.


```cpp=

const long long MAXCAP = 1LL << 29; /// maksymalna potega 2,

/// ktora moze byc przepustowosca

int n, m, s, t, d[MAXN], ptr[MAXN], q[MAXN];

long long minflow; /// minimalny przeplyw blokujacy dla DFSow

/// wykonywanych w tym momencie

vector<edge> e;

vector<int> g[MAXN];



bool bfs() {

\ \ \ \ for(int i = 1; i <= n; i ++)

\ \ \ \ \ \ \ \ d[i] = -1;

\ \ \ \ d[s] = 0;

\ \ \ \ int qh = 0, qt = 0;

\ \ \ \ q[qt ++] = s;

\ \ \ \ while(qh < qt && d[t] == -1) {

\ \ \ \ \ \ \ \ int v = q[qh ++];

\ \ \ \ \ \ \ \ for(int i = 0; i < (int)g[v].size(); i ++) {

\ \ \ \ \ \ \ \ \ \ \ \ int id = g[v][i];

\ \ \ \ \ \ \ \ \ \ \ \ int to = e[id].b;

\ \ \ \ \ \ \ \ \ \ \ \ if(e[id].flow < e[id].cap && d[to] == -1) {

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ d[to] = d[v] + 1;

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ q[qt ++] = to;

\ \ \ \ \ \ \ \ \ \ \ \ }

\ \ \ \ \ \ \ \ }

\ \ \ \ }

\ \ \ \ return d[t] != -1;

}



long long dfs(int v,long long flow) {

\ \ \ \ if(flow < minflow)

\ \ \ \ \ \ \ \ return 0; /// nie puszczamy przeplywow mniejszych niz minflow

\ \ \ \ if(flow == t)

\ \ \ \ \ \ \ \ return flow;

\ \ \ \ for(; ptr[v] < (int)g[v].size(); ptr[v] ++) {

\ \ \ \ \ \ \ \ int id = g[v][ptr[v]];

\ \ \ \ \ \ \ \ int to = e[id].b;

\ \ \ \ \ \ \ \ if(d[to] != d[v] + 1)

\ \ \ \ \ \ \ \ \ \ \ \ continue;

\ \ \ \ \ \ \ \ int pushed = dfs(to, min(flow, e[id].cap - e[id].flow));

\ \ \ \ \ \ \ \ if(pushed > 0) {

\ \ \ \ \ \ \ \ \ \ \ \ e[id].flow += pushed;

\ \ \ \ \ \ \ \ \ \ \ \ e[id^1].flow -= pushed;

\ \ \ \ \ \ \ \ \ \ \ \ return pushed;

\ \ \ \ \ \ \ \ }

\ \ \ \ }

\ \ \ \ return 0;

}



long long scaled_dinitz() {

\ \ \ \ long long flow = 0;

\ \ \ \ for(;;) {

\ \ \ \ \ \ \ \ if(!bfs())

\ \ \ \ \ \ \ \ \ \ \ \ break;

\ \ \ \ \ \ \ \ for(minflow = MAXCAP; minflow > 0; minflow >>= 1) {

\ \ \ \ \ \ \ \ \ \ \ \ /// wywolujemy sie dla kazdej potegi

\ \ \ \ \ \ \ \ \ \ \ \ for(int i = 1; i <= n; i ++)

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ ptr[i] = 0;

\ \ \ \ \ \ \ \ \ \ \ \ while(int pushed = dfs(s,INF))

\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ flow += pushed;

\ \ \ \ \ \ \ \ }

\ \ \ \ }

\ \ \ \ return flow;

}

```


## Maksymalny przepływ minimalnym kosztem

Często mamy do czynienia z inną wariacją problemu maksymalnego przepływu. W problemie Max flow min cost każda krawędź ma dodatkowo dany koszt przepuszczenia przez nią jednej jednostki przepływu. Dla krawędzi $u −> v$ oznaczymy ją jako $Cost(u, v).$ W sieci rezydualnej musi zachodzić oczywiście $Cost(u, v)=−Cost(v, u),$ gdyż cofnięcie przepływu o koszcie $x$ powoduje wzrost stanu naszego konta o $x.$


Mając już poprawioną sieć rezydualną, możemy przejść do algorytmu znajdowania maksymalnego przepływu minimalnym kosztem. A ten okazuje się zadziwiająco prosty.


Dopóki istnieje jakakolwiek ścieżka powiększająca, wybierz tę o najmniejszym koszcie.


I tyle. Jest to prosty i poprawny algorytm znajdujący maksymalny przepływ minimalnym kosztem.


<b>Dowód:</b> Ten  algorytm  to  jedna  z  implementacji  metody  Forda-Fulkersona  znajdowania  przepływu przy pomocy ścieżki powiększającej. Znaleziony przepływ $f$ na pewno jest maksymalny, udowodnijmy zatem fakt, że ma również najmniejszy koszt. Indukcyjnie udowodnimy fakt, że przepływ $f$ ma minimalny koszt sposród przepływów o tej samej wartości.


Dla pustego przepływu twierdzenie jest oczywiście poprawne. Rozważmy przepływ $f$ który jest optymalnym przepływem o wartości $|f|$ i przepływ $g$ będący tylko jedną najtańszą ścieżką powiększającą. Wykażemy, że $f+g$ jest najtańszym przepływem o wartości $|f+g|.$ Niech $f′$ będzie dowolnym przepływem o wartości $|f+g|.$ Chcemy udowodnić zależność $Cost(f+g) \\leq Cost(f′).$


Spójrzmy na różnicę przepływów $f′−f'.$ To z pewnością też jest jakiś przepływ. Musi on mieć wartość $|g|$ bo inaczej $f+g$ i $f′$ nie byłyby przepływami o tej samej wartości. Podobnie jak w dowodzie metody Forda - Fulkersona $f′−f$ możemy rozbić na cykle $C_1, C_2, ..., C_k$ oraz  ścieżki $P_1, P_2, ..., P_m$ ze  źródła  do  ujścia.  Ponadto,  koszty  ścieżek $P_1, P_2, ..., P_m$ są nie mniejsze niż koszt ścieżki powiększającej tworzącej $g,$ bo ta była najtańszą ścieżką. $f$ ma minimalny koszt, więc wśród cykli nie może być cyklu o ujemnym koszcie. Skoro  cykle  mają  nieujemny  koszt  (lub  ich  nie  ma),  a  ścieżki  nie  mniejszy,  to  koszt przepływu $f′−f$ jest na pewno nie mniejszy niż koszt przepływu $g.$


Koszt  przepływu $f′−f$ to  także  różnica  kosztów  przepływów $f′$ i $f.$  W  takim  razie $Cost(f+g)=Cost(f)+Cost(g) \\leq Cost(f′).$ To kończy dowód.


Trzeba tylko pamiętać o kwestiach implementacyjnych – szukaniu najkrótszej ścieżki powiększającej.  Pomocny  mógłby  się  okazać  algorytm  Dijkstry,  gdyby  nie  to,  że  w  naszym grafie mogą pojawiać się ujemne krawędzie. W takim wypadku musimy skorzystać z innego algorytmu. To może być algorytm Bellmana-Forda, ale potrafimy to zrobić lepiej. Możemy w to miejsce wstawić SPFA.

### Algorytm SPFA

Shortest Path Faster Algorithm, bo o nim mowa, to sposób znajdowania najkrótszych ścieżek z jednego źródła. Polega on na poprawianiu odległości do skutku. Trochę jak w algorytmie Dijkstry, ale nie do końca. Różnica jest taka, że zamiast kolejki priorytetowej używamy najzwyklejszej kolejki oraz, co bardzo ważne nigdy nie wsadzamy do niej wierzchołka, który w niej aktualnie jest. Taki algorytm  jest  oczywiście  poprawny,  bo  po  prostu  będzie  poprawiał  w  nieskończoność.  No właśnie – skoro może poprawiać w nieskończoność, to jak szybko będzie on działał w tym przypadku? To dość trudne pytanie. Jeśli istnieje cykl o ujemnej wadze, to wówczas faktycznie poprawiałby w nieskończoność. W przeciwnym wypadku algorytm musi się kiedyś zakończyć. Okazuje się, że na losowym grafie ten algorytm działa dość szybko w $O(m).$ Nie jest to jednak udowodniona złożoność, a jedynie praktyczne obserwacje. Z pewnością ten algorytm nie może działać gorzej niż Bellmana-Forda, ponieważ maksymalnie wykona $O(mn)$ operacji. Jego zaletą  przemawiającą  za  użyciem  w  algorytmie  Max  Flow  Min  Cost  jest  właśnie  to,  że  w kolejnych fazach puszczania przepływu sieć rezydualna się zmienia. To powoduje, że złośliwy przypadek pojawia się naprawdę rzadko.


### Rzeczywista szybkość

Złożoności $O(n^2m)$ nie  wyglądają  na  szybkie,  ale  w  praktyce  wszystie  powyższe  algorytmy działają znacznie szybciej niż mogłoby się to wydawć. Prawdziwy czas działania to $O(szybko),$ a nawet algorytm Endomondosa-Karpa działa, gdy $n=10^5,$ $m=10^5.$ Na Olimpiadzie  nie  są  wymagane  szybkie  algorytmy  przepływowe,  choć  nigdy  nie  wiadomo  czy  w przyszłości  się  to  nie  zmieni.  Należy  mieć  na  uwadze,  że  lepiej  kodzić  porządnie  i  używać szybkich algorytmów. Ma to duże znaczenie w praktyce lub gdy chcemy ”przepchnąć” rozwiązanie gorsze niż wzorcowe.


## Zadania

- [Kości (XII OI, II etap)](https://szkopul.edu.pl/problemset/problem/8OrJo8TOlY9pynt7Tr9jMzzW/site/?key=statement)

- [Szkoły (XIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/yBeLudj_9WZ06ZvEQOL7cgoi/site/?key=statement)

- [Łyżwy (XVI OI, II etap)](https://szkopul.edu.pl/problemset/problem/kadKFW3YScAMW8o20u0BctQh/site/?key=statement)

"
---
