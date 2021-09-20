---
title: 'Zamiatanie'
content: "
W tej lekcji zapoznamy się z pewną techniką rozwiązywania specyficznych problemów geometrycznych, która znana powszechnie jest jako zamiatanie. Do pełnego zrozumienia treści tego wykładu wymagana będzie znajomość drzew przedziałowych (o których przeczytać można w dziale Struktury danych), a także znajomość struktury set z STLa.


## Czym właściwie jest zamiatanie?

Wyobraźmy sobie, że dany mamy pewien problem geometryczny związany ze zbiorem punktów na płaszczyźnie (zazwyczaj będą to punkty, ale może się zdarzyć, że będą to inne obiekty geometryczne, np. odcinki czy prostokąty). Główną ideą zamiatania będzie posortowanie naszych punktów po współrzędnej $x$-owej (lub innych obiektów geometrycznych po pewnych ich charakterystycznych cechach), a następnie rozpatrywanie ich w takiej kolejności, zarządzając przy tym jakąś inteligentną strukturą danych, która umożliwi nam rozwiązanie problemu.


Brzmi trudno i niezrozumiale, a zatem najlepiej uda nam się tą technikę zrozumieć prezentując przykładowe problemy i ich rozwiązania poprzez zamiatanie.


## Zadanie: suma odległości między parami punktów

Wyobraźmy sobie, że dane mamy n punktów na osi liczbowej (czyli punkty mają jedynie współrzędną $x$). Chcemy znaleźć sumę odległości między każdą parą z nich.


Zapewne każdy z Was jest już  w  stanie  odpowiedzieć  sobie  na  pytanie  jak  ten  problem  rozwiązać.  I  zapewne  rozwiązanie, które  przychodzi  Wam  do  głowy  jest  w  rzeczywistości  rozwiązaniem  wykorzystującym  technikę zamiatania, zatem dokładnie teraz je przeanalizujemy.


### Rozwiązanie

Tak  jak  było  to  wspomniane  na  początku  artykułu  zaczniemy  od  posortowania  wszystkich punktów po ich jedynej współrzędnej. Teraz punkty będziemy przeglądać w kolejności ich posortowania (tzn. od lewej do prawej). Będziemy cały czas pamiętać dotychczas policzony wynik, tzn. sumę odległości między każdą parą, którą już przejrzeliśmy. Musimy teraz umieć zaktualizować wynik,  gdy  pojawia  nam  się  nowy  punkt.  Jeżeli  znamy  sumę  odległości  między  każdą  parą  poprzednich punktów to musimy do wyniku dodać sumę odległości między aktualnie rozpatrywanym punktem, a wszystkimi poprzednimi. A zatem wynik powinniśmy zwiększyć o $\\sum^{k−1}_{i =1} |x_k − x_i|.$


Ponieważ nasze punkty są zamiatane (tzn. przeglądane od lewej do prawej), to wszystkie poprzednie punkty będą leżały na lewo od niego. Ta własność nam ułatwi znacząco robotę$^*$: w naszej sumie możemy zapomnieć o wartości bezwzględnej, gdyż $x_k$ zawsze będzie większe niż $x_i$, a nasz wzór uprości się następująco: $\\sum^{k−1}_{i =1} (x_k − x_i) = (k−1)x_k−\\sum^{k−1}_{i =1}x_i.$ Policzenie $(k−1)x_k$ jest trywialne, a więc pozostaje nam pamiętanie sumy współrzędnych punktów, które już przetworzyliśmy. Tutaj wkracza trzeci punkt naszego algorytmu zamiatania, czyli zastosowanie odpowiedniej struktury danych,  która  umożliwi  nam  liczenie  tego  wyniku.  W  naszym  przypadku  ową  strukturą  będzie poprostu pojedyncza zmienna pamiętająca sumę współrzędnych przetworzonych punktów.


$^*$Oczywiście stwierdzenie, że to ułatwi znacząco robotę w tym przypadku jest mocno przerysowane, ale przykład ten powinien ilustrować to, w jaki sposób fakt ten ułatwi rozwiązanie trudniejszych problemów.


## Zadanie: punkty w prostokątach

Zajmijmy się teraz jakimś porządniejszym problemem: dany jest zbiór punktów na płaszczyźnie (tym razem zajmujemy się już dwoma wymiarami) oraz zbiór prostokątów o bokach równoległych do osi. Każdy punkt/prostokąt ma współrzędne całkowite. Dla każdego prostokąta musimy stwierdzić,  ile  z  danych  punktów  się  w  nim  znajduje.  Problem  ten  rozwiążemy  offline,  czyli  możemy najpierw  wczytać  wszystkie  dane,  przygotować  odpowiedzi  na  wszystkie  zapytania  w  dowolnej kolejności i wypisać wszystkie odpowiedzi na sam koniec.


### Rozwiązanie

Zastanówmy się najpierw jak rozwiązać problem jednowymiarowy (tzn mamy punkty na osi liczbowej oraz zapytania o spójne przedziały tej osi). Początkowo możemy przeskalować wszystkie punkty szczególne czyli te, które są albo punktem pośród danego zbioru albo te, które sa końcami przedziałów o które się pytamy. Dzięki temu zakres naszych współrzędnych nie będzie przekraczał $O( n ).$  Możemy  zatem  stworzyć  drzewo  przedziałowe  indeksowane  po  współrzędnych  i  łatwo  jesteśmy w stanie rozwiązać nasz problem. Sprawa jednak komplikuje się przy dwóch wymiarach. Co prawda jesteśmy w stanie napisać dwuwymiarowe drzewo przedziałowe, ale niestety w takim przypadku  nawet  po  przeskalowaniu  naszych  punktów  nasze  drzewo  musiałoby  zawierać $O ( n^2 )$ komórek, a to jest zbyt dużo (łatwiej już zaimplementować najbardziej brutalny algorytm). Jak sobie poradzić z takim problemem?


Istotnym mykiem jaki zastosujemy, będzie rozbicie każdego zapytania o liczbę punktów w prostokącie na dwa zapytania o liczbę punktów w ”prefiksopasku”. Takim prefiksopaskiem nazwiemy pewien prostokąt, którego lewy bok będzie przylegał do pionowej osi układu współrzędnych (oczywiście zakładamy tutaj, że wszystkie współrzędne punktów są dodatnie). Wtedy każdy prostokąt możemy przedstawić jako różnicę dwóch ”prefiksopasków” w sposób pokazany na rysunku, a zatem znając odpowiedzi na liczbę punktów w obu z nich możemy otrzymać odpowiedź o zapytanie dla początkowego prostokąta odejmując obie wartości. Jak odpowiedzieć na zapytania o ”prefiksopaski”?


### Zamiatanie wkracza do gry

I tutaj z pomocą przyjdzie nam zamiatanie. Na liście będziemy trzymali dwa rodzaje ”zdarzeń” (od teraz wszystkie interesujące rzeczy, które w trakcie zamiatania będziemy rozpatrywać, będziemy nazywać zdarzeniami). Pierwszy rodzaj zdarzenia będzie oznaczał, że pojawił się nowy punkt do rozpatrzenia. Drugi rodzaj będzie oznaczał, że pojawił się pewien koniec prefiksopasku, dla którego chcielibyśmy znać odpowiedź. Teraz oba rodzaje zdarzeń wrzucamy na jedną listę i sortujemy, a następnie ”skanujemy” naszą miotłą.


![Zamiatanie miotłą](https://codimd.s3.shivering-isles.com/demo/uploads/upload_eca83988a4913a718baf0aad55b5bdd4.png)


Dla każdego zdarzenia typu koniec pasku chcemy poznać odpowiedź, czyli to ile punktów wewnątrz niego się znalazło. I tutaj nasze życie uratuje fakt, że wszystkie punkty, które dotychczas rozpatrywaliśmy znajdowały się na lewo od naszej miotły. A zatem sprawdzając czy jakiś punkt znajduje się w rozpatrywanym prefiksopasku musimy tylko wiedzieć, czy jego współrzędna y zawiera się w żądanym przedziale. Współrzędna $x$ nas nie interesuje, gdyż wszystkie punkty o zbyt dużym $x$-ie nie zostały jeszcze rozpatrzone. Musimy zatem tylko wiedzieć ile dotychczas przetworzyliśmy punktów, których y mieści się w żądanym przedziale. A to już zaskakująco przypomina nam wcześniej analizowany przypadek jednowymiarowy.


Czyli  trzymamy  drzewo  przedziałowe  indeksowane  po współrzędnych $y$ (oczywiście  najpierw  skalujemy wszystkie interesujące nas $y$-i). W momencie gdy trafiamy na zdarzenie ”nowy punkt”, to po prostu w odpowiednim miejscu drzewa przedziałowego dodajemy jeden. Gdy trafiamy na zdarzenie \"koniec paska\", to po prostu zczytujemy sumę na odpowiednim przedziale $y$-ów z drzewa przedziałowego.


## Punkty w obszarach raz jeszcze

Umiemy zatem offline poradzić sobie z liczeniem punktów w obszarach ortogonalnych (takim pojęciem będziemy nazywali prostokąty o bokach równoległych do osi). Co jeżeli chcielibyśmy umieć zliczać punkty znajdujące się w obszarach ograniczonych przez inne kształty? Przykładowo, chcielibyśmy odpowiadać na zapytania następującej postaci: dla danego punktu $A$ i liczby $d,$ powiedz ile punktów ze zbioru znajduje się nie dalej niż $d$ od punktu $A.$


### Zadanie w metryce miejskiej

Jak się okazuje, problem ten nie posiada łatwego rozwiązania, więc spróbujemy sobie go nieco ułatwić. Z pierwszego artykułu przypominamy sobie o istnieniu innych metryk. Co zatem, gdybyśmy chcieli odpowiedzieć na zapytanie o liczbę punktów, które znajdują się nie dalej niż d w metryce miejskiej? Przypomnijmy sobie najpierw wzór na odległość w metryce miejskiej: $d(A, B) = |x_A x_B| + |y_A y_B|.$


Spóbujmy zatem rozpisać własności jakie pewien punkt $B$ powinien spełniać, tak aby znajdował się w pożądanej odległości od punktu $A.$ Musi zachodzić następujący warunek: $|x_A − x_B| + |y_A − y_B| \\leq d.$ Niestety wartość bezwzględna w tym wzorze dużo nam utrudnia. Gdybyśmy na przykład wiedzieli, że zachodzi $x_A > x_B$ oraz $y_A > y_B$ to moglibyśmy zapomnieć o wartościach bezwzględnych w naszym wzorze i otrzymalibyśmy warunek, który zapewne łatwiej by było sprawdzić. Niestety nie wiemy, który punkt posiada większe współrzędne.


Zauważmy, że gdybyśmy bardzo chcieli pozbyć się wartości bezwzględnych z naszego wzoru, to musielibyśmy rozpatrzyć cztery możliwości: 


$1)$ $x_A > x_B$ oraz $y_A > y_B$


$2)$ $x_A > x_B$ oraz $y_A < y_B$


$3)$ $x_A < x_B$ oraz $y_A < y_B$


$4)$ $x_A < x_B$ oraz $y_A > y_B$


W zależności od tego, która para nierówności z powyższych zachodzi, to nasz warunek wyglądałby wtedy następująco:


$1)$ $x_A − x_B + y_A − y_B ⩽ d$


$2)$ $x_A − x_B + y_B − y_A ⩽ d$


$3)$ $x_B − x_A + y_B − y_A ⩽ d$


$4)$ $x_B − x_A + y_A − y_B ⩽ d$


### Szybkie sprawdzanie warunków

Na szczęście wszystkie cztery warianty naszego warunku zawierają niezmienną prawą stronę. Natomiast  lewa  strona  spośród  wszystkich  wariantów  przybierze  największą  wartość,  dla  tego wariantu,  który  należy  rozpatrzyć.  Przykładowo  jeżeli  obie  współrzędne  punktu  $A$  są  większe niż  obie  współrzędne  punktu  $B$  (czyli  zaszedł  przypadek  $1)$  to  warunkiem  na  zawieranie  się  w odległości  nie  przekraczającej $d$ będzie  warunek  $1)$  Ale  wtedy  pozostałe  warunki  tym  bardziej zostaną spełnione, gdyż lewa strona warunków $2),$ $3)$ i $4)$ będzie mniejsza (odpowiednie różnice staną się teraz ujemne).


Czyli możemy zawsze sprawdzać czy wszystkie $4$ warunki zachodzą naraz. Jeżeli tak to punkt leży odpowiednio blisko. Jeżeli którykolwiek z nich nie zachodzi to punkt leży zbyt daleko. Jak zatem szybko zliczyć punkty spełniające wszystkie 4 warunki?


Cofnijmy się na chwilę do naszego problemu z prostokątami. Załóżmy, że pytamy się czy punkt B znajduje się w prostokącie, którego przeciwległe wierzchołki wyznaczane są przez współrzędne $(x_1 , y_1 , x_2 , y_2)$ (zakładamy, że współrzędne pierwsze są mniejsze od drugich). Wtedy warunek na to, czy $B$ znajduje się wewnątrz tego prostokąta wyznaczają następujące cztery nierówności:


$1)$ $x_B \\geq x_1$


$2)$ $y_B \\geq y_1$


$3)$ $x_B \\leq x_2$


$4)$ $y_B \\leq y_2$


Czy warunki te nie przypominają w pewnym stopniu czterech warunków, które przedstawiliśmy wcześniej?  Spróbujmy  poprzekształcać  je  w  taki  sposób,  aby  otrzymać  postać  jak  najbardziej zbliżoną do powyższych warunków na zawieranie się punktów w prostokącie


$1)$ $x_A−x_B+y_A−y_B⩽d,$ co jest równoważne: $x_A+y_A−(x_B+y_B)⩽d,$ a to jest równoważne: $x_B+y_B⩾x_A+y_A−d$


$2)$ $x_A−x_B+y_B−y_A⩽d ,$ czyli $x_B−y_B⩾x_A−y_A−d$


$3)$ $x_B−x_A+y_B−y_A⩽d ,$ czyli $x_B+y_B⩽x_A+y_A+d$


$4)$ $x_B−x_A+y_A−y_B⩽d ,$ czyli $x_B−y_B⩽x_A−y_A+d$


Otrzymaliśmy cztery bardzo podobne warunki do warunków na zawieranie się w każdym prostokącie. Tak naprawdę warunki te są identyczne. Jedynie pod punkt B w warunkach prostokąta podstawiliśmy punkt o współrzędnych $(x_B+y_B,x_B−y_B)$ natomiast prostokąt $(x1,y1,x2,y2)$ zastąpiliśmy  prostokątem $(x_A+y_A−d, x_A−y_A−d ,x_A+y_A+d, x_A−y_A+d).$  Nic  nam  więc  nie stoi na przeszkodzie, aby każdy punkt z wejściowego zbioru zamienić na punkt o współrzędnych $(x+y, x−y) ,$ a każde zapytanie o punkt $A$ i odległość d zamienić na zapytanie o zawieranie się punktów w prostokącie $( x_A+y_A−d ,x_A−y_A−d, x_A+y_A+d, x_A−y_A+d).$ Możemy przecież wtedy puścić nasz zwykły algorytm zliczający punkty w prostokątach ortogonalnych i wszystko będzie działało tak jak należy.


### Jeszcze bardziej geometryczna interpretacja

Brzmi magicznie, ale jednak działa. Jednak czysta algebra nie wszystkich przekona, więc przyjrzymy  się  także  bardziej  geometrycznej  interpretacji  tego  problemu.  W  przypadku,  gdy  mamy styczność z takim zadaniem, najlepiej zawsze zacząć od narysowania sobie kształtu obszaru jaki takie zapytania obejmują. To znaczy, zaznaczmy zupełnie wszystkie punkty płaszczyzny (nie tylko te z danego zbioru), które znajdują się nie dalej niż pewne $d$ (w metryce miejskiej) od pewnego punktu $A.$ Łatwo zauważyć, że taki kształt wyróżnionego obszaru będzie w kształcie ”diamentu” (czy też kwadratu obróconego o $45$ stopni). No właśnie skoro o kwadraty równoległe do osi umiemy się zapytać, a ten kwadrat został obrócony o idealnie $45$ stopni, to istnieje nadzieja na to, że jak obrócimy całą płaszczyznę o $45$ stopni, to na wszystkie zapytania będziemy w stanie odpowiadać jak należy.


![Metryka miejska](https://codimd.s3.shivering-isles.com/demo/uploads/upload_7c7ebce4bef2a9ccced2ff45fe3a3b6f.png)


Zacznijmy od wyznaczenia współrzędnych wierzchołków naszego przewróconego kwadratu. Łatwo zauważyć, że cztery te wierchołki będą miały współrzędne $(x_A,y_A−d),$ $(x_A−d,y_A),$ $(x_A, y_A+d),$ $(x_A+d,y_A).$ Przypomnijmy sobie zatem matematyczny wzór na obracanie punktów na płaszczyźnie (albo znajdźmy go w internecie). Jeżeli obracamy punkt $( x,y )$ wokół środka układu współrzędnych o kąt $\\alpha$ to otrzymujemy punkt o współrzędnych $( x \\ cos \\alpha− y \\ sin \\alpha,x \\ sin \\alpha +y \\ cos \\alpha).$ Podstawiając zatem pod alfę $45$ stopni otrzymamy: $(\\frac{\\sqrt{2}}{2}x− \\frac{\\sqrt{2}}{2}y,\\frac{\\sqrt{2}}{2}x+\\frac{\\sqrt{2}}{2}y).$ Liczby niecałkowite nie są przyjemne, ale nic nie stoi nam na przeszkodzie, aby także wszystkie współrzędne podzielić przez $\\frac{\\sqrt{2}}{2}.$  Wtedy  otrzymamy  dużo  bardziej  znajomy  nam  wzór: $(x−y,x+y)$  (zamieniła  nam się tutaj kolejność współrzędnych, ale to nic nie szkodzi dopóki każdy punkt potraktujemy tym samym wzorem.


A zatem pod każdy punkt z wejścia podstawimy $(x−y,x+y).$ Pozostało nam jeszcze obrócić kwadraty o które się pytaliśmy. Jest to jednak nic innego jak zastosowanie powyższego wzoru dla czwórki wierzchołków, które wyznaczyliśmy już wcześniej. Pozostawiamy to zatem jako ćwiczenie dla czytelnika. Wynik powinien wyjść podobny do tego, który otrzymaliśmy wcześniej z naszych algebraicznych rozważań.


### Geomatryczna interpretacja oryginalnego zadania

A  co  gdybyśmy  spróbowali  geometrycznie  zinterpretować  oryginalny  problem,  czyli  taki  w którym pod uwagę bierzemy klasyczną metrykę euklidesową? Łatwo zauważyć, że obszar, który w ten sposób wyróżnimy będzie okręgiem. Zatem nasze zadanie sprowadzi się do odpowiadania na  zapytania  o  liczbę  punktów  w  różnych  okręgach.  Same  okręgi  nie  wyglądają  już  przyjaźnie. Nie mają prostej przejrzystej struktury tak jak obszary ortogonalne i ciężko w jakikolwiek sposób podejść do tego problemu, więc na razie sobie go darujemy :)


A jak na przykład zliczyć punkty występujące w prostokątach, które nie są równoległe do osi układu współrzędnych? Albo jak zliczyć punkty znajdujące się w obszarach trójkątnych? Odpowiedź na te zapytania da się już znaleźć. Niestety do tego problemu już nie podchodzi się przy użyciu zamiatania, a stosuje się dużo bardziej zaawansowane geometryczne struktury danych, o których być może w przyszłości przeczytacie :)tkie elementy z przedziału możemy rozszerzać lub zwężać przedział z poprzedniego zapytania.


## Zadanie: para najbliższych punktów

Na deser przedstawimy jeden z najbardziej klasycznych problemów geometrycznych, którego różnych rozwiązań istnieje wiele. My oczywiście jednak zajmiemy się tym rozwiązaniem, które bazuje na  idei  zamiatania.  Oczywiście  jak  nietrudno  po  tytule  paragrafu  się  domyślić,  dany  będziemy mieli zbiór punktów, w którym będziemy chcieli znaleźć parę punktów, która znajduje się najbliżej siebie pośród wszystkich par (tym razem rozumiejąc odległość w sensie euklidesowym).


### Rozwiązanie

Zaczniemy  standardowo: posortujmy  wszystkie  punkty  po  jednej  współrzędnej  i  zacznijmy przeglądać w tej kolejności. To co chcemy umieć zrobić, to dla aktualnie rozpatrywanego punktu znaleźć jego najbliższego sąsiada, którego już przetworzyliśmy (a więc najbliższego sąsiada z lewej). Moglibyśmy oczywiście na siłę policzyć każdą parę odległości, ale podejście takie będzie nas kosztowało czas $O (n^2),$ co nie brzmi zadowalająco.


Zauważmy  jednak,  że  jesteśmy  w  stanie  zawęzić  zbiór  punktów  do  przeanalizowania.  Niech $\\Delta$  będzie  oznaczać  dotychczas  znalezioną  odległość  między  najbliższą  parą  punktów,  którą  już rozpatrzyliśmy (przypominamy, że rozpatrzyliśmy w pewnym sensie każdą parę, która znajduje się na lewo od aktualnie rozpatrywanego punktu). Wtedy wszystkie punkty, których współrzędna $x$ jest przynajmniej o $\\Delta$ mniejsza od $x$-a aktualnie rozpatrywanego punktu na pewno nie poprawią wyniku i możemy je zignorować. W tym celu punkty do ”sprawdzenia do pary” możemy trzymać na kolejce. Za każdym razem, gdy skończymy analizować nowy punkt na miotle, możemy go dodać do kolejki, a następnie wszystkie punkty z końca możemy sciągać, póki ich $x$ jest mniejszy o więcej niż $\\Delta$ od $x$-a nowego punktu na miotle.


Podobnie obszar przeszukiwać możemy zawężyć do punktów, których $y$ nie jest o $\\Delta$ większy i nie jest o $\\Delta$ mniejszy niż y aktualnie rozpatrywanego punktu. Żeby ten warunek sobie zagwarantować, możemy dodatkowo poza kolejką, trzymać punkty na secie (przykładowo w postaci para(y, numer punktu)). Dzięki temu możemy dodawać nowe punkty, usuwać najstarsze dodane oraz przeszukiwać spójny przedział punktów po interesujących nas $y$-kach.


### Algorytm krok po kroku

Nasz algorytm zatem wygląda tak:


Posortuj punkty po $x$ i przeglądaj w tej kolejności. Dla każdego punktu:


$1)$ Usuń z początku kolejki (i jednocześnie z seta) wszystkie punkty, których $x < x_{akt} −\\Delta.$


$2)$ Sprawdź punkty na secie między lowerboundem $y_{akt} − \\Delta,$ a lowerboundem $y_{akt} + \\Delta$ i zaktualizuj $\\Delta$ (dotychczasowy najlepszy wynik).


$3)$ Dodaj nowy punkt na kolejkę oraz dodaj na seta parę $(y_{akt} ,akt)$


### Analiza rozwiazania

Udało nam się oczywiście zmniejszyć liczbę rozpatrywanych par, ale może się nam wydawać, że pesymistycznie i tak przejrzymy $O (n^2)$ par, pomimo naszej optymalizacji. I tutaj do gry wkracza magiczna obserwacja: Rozpatrując pewien punkt na miotle, patrzymy na pewną liczbę kandydatów do pary. Przy czym:
$1)$ Wszyscy kandydaci mieszczą się w prostokącie o rozmiarach $\\Delta$ na $2\\Delta.$
$2)$ Odległość między każdą parą kandydatów musi wynosić przynajmniej $\\Delta$ (inaczej nasza delta byłaby jeszcze mniejsza, bo znaleźlibyśmy parę o mniejszej odległości).


Te dwa fakty zatem dają nam bardzo mocne podstawy do podejrzewania, że w rzeczywistości takich kandydatów nie może być wiele. Udowodnijmy to matematycznie: Jeżeli odległość między każdą parą kandydatów nie przekracza $\\Delta$ to oznacza, że kładąc na każdym kandydacie okrąg o promieniu $\\frac{\\Delta}{2},$ żadna para okręgów się nie przetnie. Niech kandydatów będzie $k.$ Wtedy sumaryczne  pole  wszystkich  okręgów  wyniesie $k\\frac{\\pi\\Delta^2}{2}$  Z  drugiej  strony  wszyscy  kandydaci  mieszczą  się  w prostokącie $\\Delta \\times 2\\Delta,$ a więc wszystkie okręgi mieszczą się w prostokącie $2\\Delta \\times 3\\Delta.$  czyli pole okręgów musi być mniejsze niż pole prostokąta, a zatem $k\\frac{\\pi\\Delta^2}{2}$ < $6\\Delta^2,$ co po przekształceniach daje nam: $k < \\frac{24}{π} < \\frac{24}{ 3}=8.$ A zatem kandydatów nigdy nie będzie więcej niż $8,$ więc liczba par przejrzanych punktów wyniesie nie więcej niż $8n,$ a zatem cały czas algorytmu będzie ograniczony przez sortowanie / seta, a więc O $(n \\cdot log \\ n).$


## Dodatkowe zadania

Poniżej przedstawiamy kilka zadań do samodzielnego rozwiązania, które opierają się na idei zamiatania:


$1)$ Dany jest zbiór poziomych i pionowych odcinków. Znaleźć liczbę par odcinków (poziomy, pionowy), które się przecinają. $O (n \\cdot log \\ n)$


$2)$ Dany jest zbiór punktów. Umieścić kwadrat k na k równolegle do osi układu współrzędnych tak, aby pomieścić jak najwięcej punktów ze zbioru. $O (n \\cdot log \\ n)$


$3)$ Dany jest zbiór nieprzecinających się prostokątów. Znaleźć największe k takie, że powiększenie wszystkich prostokątów o k jednostek we wszystkie strony nie sprawi, że któraś para z nich się przetnie.


## Zadania

- [Kopalnia złota (VIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/TYf8i2qvrGI0l8QHEYJXO5dG/site/?key=statement)

- [Gazociągi (XIV OI, III etap)](https://szkopul.edu.pl/problemset/problem/dPgIN7IwQ8JfKdyk3zTpUMiu/site/?key=statement)

- [Zamek (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/7Lmwi_qxvuplTPlhRuci1UBt/site/?key=statement)

"
---
