---
title: 'Podstawy geometrii'
content: "
## Przykładowe problemy geometryczne

Geometria obliczeniowa jest bardzo szerokim działem algorytmiki, który zajmuje się problemami i strukturami danych związanymi z geometrycznymi obiektami (czyli np. punktami w przestrzeni albo wielokątami). Znajduje ona bardzo wiele zastosowań zarówno w zadaniach olimpijskich jak i innych, bardziej życiowych sytuacjach. Do przykładowych problemów geometrycznych możemy zaliczyć:

- Znalezienie najkrótszej ścieżki między dwoma punktami na mapie

- Stwierdzenie, czy w zbiorze punktów istnieją trzy punkty współliniowe

- Stwierdzenie, czy możemy pokroić pizzę na dwie połowy tak, aby nie przeciąć żadnego pomidora, który się na niej znajduje

- Znalezienie miejsca, w którym należy postawić sklep tak, aby najdalej stojący od niego dom był możliwie najbliżej

- Policzenie, ile metrów płotu należy kupić, aby móc nim otoczyć wszystkie nasze ziemniaki.


Problemów geometrycznych można by było wymienić jeszcze wiele, ale zanim przejdziemy do rzeczy skomplikowanych powinniśmy zacząć od pewnych podstaw.


## Przedstawienie obiektów geometrycznych

Z geometrią wszyscy mieli styczność już w szkole podstawowej, gdzie każdy uczył się liczyć pola  trójkątów  i  tym  podobnych  rzeczy.  Jednak  problemy  geometryczne  w  algorytmice  przyjmuje zupełnie inną postać i zanim zabierzemy się za implementację geometrycznych struktur danych, powinniśmy się zastanowić w jaki sposób jesteśmy w stanie przechowywać obiekty geometryczne w przystępny sposób.


Podstawowym obiektem geometrycznym będą punkty. Praktycznie wszystkie inne obiekty geometryczne  będą  definiowane  przy  ich  pomocy.  Punkty  możemy  przechowywać  pamiętając  ich współrzędne  w  układzie  kartezjańskim  (czyli  takim  o  jakim  uczyliśmy  się  na  lekcjach  geometrii analitycznej na matematyce). Zatem każdy punkt będziemy pamiętać jako para liczb $(x, y).$ Może się zdarzyć, że będziemy musieli obsługiwać punkty umieszczone w przestrzeni trójwymiarowej, wtedy zamiast pary liczb będziemy pamiętali trzy liczby.


Bardzo często (szczególnie w zadaniach olimpijskich) współrzędne danych punktów będą całkowite, a zatem możemy je przechowywać w typie int. Jednak nierzadko w wyniku pewnych operacji liczby te przestaną być całkowite (np. punkt przecięcia dwóch odcinków może mieć współrzędne wymierne, nawet gdy oba odcinki miały końce  w  punktach  o  współrzędnych  całkowitych).  Zatem  w  niektórych przypadkach  wymagane będzie użycie typów zmiennoprzecinkowych. Jednakże tak długo jak będziemy w stanie tego uniknąć, będziemy chcieli pamiętać wszystkie możliwe informacje jako liczby całkowite. Warto jeszcze zwrócić  uwagę  na  to,  że  nawet  gdy  współrzędne  naszych  punktów  będą  mieściły  się  w  zakresie zmiennych $32$-bitowych, pewne operacje jakie będziemy na nich wykonywach (np. policzenie pola trójkąta)  będą  wymagały  stosowania  liczb  dużo  większych,  zatem  warto  zawsze  trzymać  nasze punkty w typie $64$-bitowym (jeżeli oczywiście pamięć nam na to pozwala).


Tak jak już wcześniej zostało to powiedziane, inne obiekty geometryczne zazwyczaj mogą być definiowane przy pomocy punktów - odcinek reprezentujemy parą punktów, wielokąt zbiorem punktów itp. Bardzo przydatne podczas implementacji będzie stworzenie własnych typów do trzymania tych danych, na przykład przy pomocy struct w języku $C++.$


## Odległości punktów i różne metryki

Przejdźmy do konkretów. Informacją, którą bardzo często będziemy chcieli znać, będzie odległość między parą punktów. Odległość między parą punktów $A$ i $B$ będzie tożsama z długością odcinka $AB$ ,  czy  też  wartością  jaką  otrzymamy  przykładając  linijkę  miedzy  dwoma  punktami  i  patrząc jakie  daje  ona  wskazanie.  Chcielibyśmy  umieć  policzyć  taką  odległość.  Wykorzystamy  do  tego twierdzenie Pitagorasa:
![Twierdzenie Pitagorasa](https://codimd.s3.shivering-isles.com/demo/uploads/upload_cf6a3c7aa64b0c20107b571ede1b131d.png)
Niech punkt $A$ ma współrzędne $x_A,$ $y_A,$ a $B$ ma współrzędne $x_B,$ $y_B.$ Wtedy na mocy powyższego rysunku  i  twierdzenia  pitagorasa  możemy  stwierdzić,  że  kwadrat  długości  odcinka $AB$ wynosi $( x_A − x_B )^2 + ( y_A − y_B )^2,$  zatem $d ( A, B )$ (tym  symbolem  będziemy  od  teraz  oznaczać  odległość dwóch punktów) wynosi $\\sqrt{
( x_A − x_B ) ^2 + ( y_A − y_B ) ^2}.$


Jak  widać  więc  odległość  między  dwoma  punktami  może  być  niewymierna,  nawet  gdy  oba punkty miały całkowite współrzędne. Jednak, co także widać, kwadrat tej odległości już jest całkowity,  zatem  do  porównania  odległości  między  dwoma  parami  punktów  możemy  porównywać ich  kwadraty,  aby  uciec  od  konieczności  stosowania  typów  zmiennoprzecinkowych.  Jednak  dla współrzędnych $\\leq X$ wartość  ta może wynosić  nawet $X^2,$  stąd musimy pamiętać  o zastosowaniu odpowiednio dużych typów zmiennych.


### Metryka miejska

Formalniej  rzecz  biorąc,  to  co  przed  chwilą  liczyliśmy  nazywane  jest  odległością  w  <b>metryce euklidesowej.</b>  Metryką  w  geometrii  będziemy  nazywać  nic  innego,  jak  sposób  liczenia  odległości między parą punktów. Metryka euklidesowa nie jest jedyną funkcjonalną metryką istniejącą w naszym świecie. Wyobraźmy sobie na przykład, że nasze punkty umieszczone są w wielkim mieście, w którym biegnie nieskończenie wiele ulic, równoległych do osi układu współrzędnych umieszczonych obok siebie w pewnych odstępach.


![Metryka miejska](https://codimd.s3.shivering-isles.com/demo/uploads/upload_fc05f2e496c6cab4a2202a89b5cc0f51.png)


W takiej sytuacji odległością między dwoma punktami będziemy mogli nazwać długość najkrótszej ścieżki między dwoma punktami, która biegnie wzdłuż takich ulic. Taka metryka nazywana jest <b>metryką miejską</b> albo metryką Manhattan, a odległość dwóch punktów wyrażona jest wtedy wzorem: $d_m(A, B) = | x_A − x_B |+| y_A − y_B |.$ My jednak przeważnie będziemy rozwiązywać problemy geometryczne związane z klasyczną metryką, czyli euklidesową.


## Iloczyn wektorowy i pole trójkąta

Umiemy już policzyć długość odcinka. Chcielibyśmy pójść jeszcze o krok dalej i nauczyć się liczyć pole trójkąta na podstawie współrzędnych jego wierzchołków. Jak można się domyślić, żadne wzory znane  nam  z  klasycznej  geometrii  nie  nadają  się  do  przyjemnego  liczenia  pól  trojkątów,  gdyż wymagają one znajdowania długości wysokości, promieni okręgów wpisanych lub też innych, jeszcze bardziej skomplikowanych rzeczy. Chcemy zatem wyprowadzić nowy wzór, który będzie łatwy w implementacji.


Załóżmy najpierw, że jeden z punktów naszego trójkąta jest środkiem układu współrzędnych, czyli jego współrzędne wynoszą $(0,0),$ natomiast dwa pozostałe punkty mają współrzędne dodatnie (oznaczmy te punkty jako $A$ i $B$). Wtedy musimy rozpatrzyć jeden z dwóch przypadków: $1$) większą współrzędną $x$ posiada punkt $B,$ a większą spółrzędną $y$ posiada punkt $A,$ $2$) jeden z tych punktów posiada obie współrzędne większe. Zajmijmy się przypadkiem pierwszym.


![Pole skierowane trójkąta](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f72c6fdadade2454b479d058f776ce94.png)


Na podstawie rysunku możemy teraz zauważyć, że pole naszego trójkąta będzie równe polu dużego prostokąta $OCDE$ pomniejszonemu o pola trzech trójkątów $OCA,$ $OEB$ oraz $ADB:$


$P_{OCDE}$ = $x_B$ $y_A$


$P_{OCA} = \\frac{1}{2} x_A y_A$


$P_{OEB} = \\frac{1}{2} x_B y_B$


$P_{ADB} = \\frac{1}{2} (x_B − x_A )( y_A − y_B )$


$P_{OAB} = P_{OCDE} − P_{OCA} − P_{OEB} − P_{ADB} =$ $=x_B y_A −\\frac{1}{2} x_A y_A −\\frac{1}{2}x_B y_B −\\frac{1}{2} (x_B y_A − x_B y_B − x_A y_A + x_A y_B)$
<br /> <br />


Po zsumowaniu i zredukowaniu wszystkich składników otrzymamy wzór: $P_{OAB} =\\frac{1}{2} (x_B y_A − x_A y_B ).$


### Znak pola skierowanego

Zauważmy jednak, że odwracając kolejność punktów (tzn. licząc z następującego wzoru pole $OBA$) otrzymalibyśmy liczbę przeciwną (np. gdyby pole $OAB$ wynosiło $3,$ to pole $OBA$ wynosiłoby $-3$). Mamy tutaj doczynienie z tak zwanym <b>polem skierowanym.</b> Wartość bezwzględna otrzymanego wyniku zwróci nam pole trójkąta, a znak otrzymanego wyniku określi, czy wprowadziliśmy punkty w kolejności zgodnej z kierunkiem wskazówek zegara, czy też nie. W przypadku $2$), w którym jeden z dwóch punktów ma obie wspołrzędne większe, wzór jaki otrzymamy będzie taki sam. Dowód tego faktu pozostawimy jako ćwiczenie czytelnikowi. Uogólnijmy zatem nasz wzór, by działał dla dowolnych trzech wierzchołów trójkąta.


![Dodawanie trójkątów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e315a1a6d7999cfd79bff018686de02b.png)


### Dodawanie pól skierowanych

Zauważmy  teraz,  że  dla  przykładu  pokazanego  na  rysunku $P_{ABC} = P_{OAB} + P_{OBC} − P_{OCA}.$  Podobną obserwację możemy poczynić dla dowolnego rozmieszczenia punktów, korzystając z faktu, że wyprowadzony przez nas wcześniej wzór zwracał nam pole skierowane. Skierowane pole trójkąta $XYZ$ oznaczmy jako $P_s (XYZ).$ Jak się okazuje, dla dowolnego rozmieszczenia punktów na płaszczyźnie będzie zachodzić: $P_s ABC = P_s (OAB) + P_s (OBC) + P_s (OCA),$ gdzie $O$ jest środkiem układu współrzędnych (dowód tego faktu nie jest trudny, jest jednak żmudny obliczeniowo, zatem pominiemy go w tym artykule). A zatem możemy tutaj wykorzystać nasz wcześniej wyprowadzony wzór i otrzymać: $$P_s (ABC)
= \\frac{1}{2} ( x_A y_B − x_B y_A + x_B y_C − x_C y_B + x_C y_A − x_A y_C)$$ Wzór ten jest także nazywany iloczynem wektorowym trzech punktów na płaszczyźnie. Oczywiście klasyczny iloczyn wektorowy zdefiniowany jest dla dwóch wektorów w przestrzeni, wzór ten jednak wykazuje z nim pewną analogię i stąd od teraz będziemy używali takiej nazwy do jego określenia. Co więcej, działa on dla dowolnych punktów na płaszczyźnie, nie tylko tych o dodatnich współrzędnych.


Zatem iloczyn wektorowy jest pomocnym narzędziem umożliwiającym nam nie tylko wyliczenie pola trójkąta $( P_{ABC} = |P_s (ABC)|),$ lecz także sprawdzenie, czy trzy punkty są wspołliniowe $(P_s (ABC) = 0 ),$  czy  także  stwierdzenie,  czy  trzy  punkty  zostały  podane  zgodnie  z  kierunkiem wskazówek zegara, czy też nie (znak skierowanego pola). Warto także zauważyć, że wartość iloczynu  wektorowego  dla  całkowitych  punktów  będzie  zawsze  liczbą  całkowitą,  bądź  ułamkiem  o mianowniku równym 2. Stąd dwukrotność tej wartości (a zarazem dwukrotność pola dowolnego trójkąta) zawsze będzie liczbą całkowitą.


## Zadania

- [Water Lily (Codeforces, Div. 2 B)](https://codeforces.com/contest/1199/problem/B)

- [Centrala telefoniczna (II OIJ, III etap)](https://szkopul.edu.pl/problemset/problem/ocGBMr4-sFMy6iEUQ6cZ6gNW/site/?key=statement)

- [Magazyn (XIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/x2ZZyM91jPNcAo2dCXi-glmL/site/?key=statement)

"
---
