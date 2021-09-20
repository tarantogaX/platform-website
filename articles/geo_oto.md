---
title: 'Otoczka wypukła'
content: "
Rozpatrzmy następujący problem: dany jest zbiór ziemniaków posadzonych na polu (ziemniaki reprezentujemy jako dwuwymiarowe punkty na płaszczyźnie). Naszym zadaniem jest zakupienie jak najmniejszej liczby metrów płotu, którym będziemy mogli otoczyć wypukły obszar zawierający wszystkie nasze ziemniaki.

## Otoczka wypukła
Dla zbioru punktów na płaszczyźnie, jego otoczką nazwiemy najmniejszy (pod względem pola powierzchni) wielokąt wypukły zawierający ten zbiór punktów. Przykładowo na poniższym rysunku został przedstawiony zbiór punktów wraz z zaznaczoną jego otoczką wypukłą.

![Otoczka wypukł a- przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_39acbcc8aff473157d705f8d410b144f.png)

Jak widać na rysunku, otoczkę wypukłą najłatwiej moglibyśmy sobie wyobrazić jako ”elastyczną linę”, którą otaczamy wszystkie punkty ze zbioru i którą następnie zaciskamy na nim do oporu. Można też wywnioskować kilka innych przydatnych faktów: między innymi, że otoczka wypukła jest zawsze określona jednoznacznie (tzn. dla danego zbioru punktów istnieje dokładnie jeden taki wielokąt), jej wierzchołki są jednocześnie punktami naszego zbioru, a także dowolny inny wielokąt zawierający zbiór punktów musi zawierać w sobie też ich otoczkę wypukłą. Na dzisiejszej lekcji przede wszystkim dowiemy się jak taką otoczkę znaleźć oraz w jaki sposób może ona nam się przydać. 

### Kilka faktów o otoczce wypukłej
Oczywiście wszystko co wcześniej napisaliśmy było zgodne z prawdą, aczkolwiek nie było zbyt formalne. Łatwo jest myśleć o zaciskaniu liny wokół zbioru punktów, ale przydałoby się taką figurę zdefiniować formalnie po to, aby można było coś z nią robić. Formalniej otoczkę zdefiniujemy w taki sposób: 

Rozpatrzmy każdą możliwą trójkę punktów naszego zbioru, a następnie spójrzmy na trójkąt wyznaczany przez te $3$ punkty. Otoczką nazwiemy nałożenie (sumę) wszystkich tych trójkątów.

![Otoczka jako suma trójkątów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ad2722ca4968f9976090e4412f00cff1.png)

Musimy teraz wykazać kilka faktów:
- Tak zdefiniowana otoczka zawiera w sobie wszystkie punkty ze zbioru,
- Jest ona faktycznie wypukłym wielokątem,
- Jest ona najmniejszym takim wielokątem pod względem pola powierzchni. 

Pierwszy fakt wydaje się dosyć oczywisty: w końcu każdy punkt należy do trójkąta, którego jest on jednym z wierzchołków zawiera ten punkt. Dużo więcej uwagi będziemy musieli poświęcić drugiemu faktu: jak wykazać, że tak zdefiniowana figura będzie wielokątem wypukłym? W tym celu przedstawimy ważną własność wielokątów wypukłych (która poniekąd jest po prostu ich definicją): jeżeli dowolne dwa punkty $P$ i $Q$ należą do wielokąta wypukłego, to cały odcinek PQ musi do niego należeć:

![Wielokąty: wypukły i niewypukły](https://codimd.s3.shivering-isles.com/demo/uploads/upload_98baa693197cd00ed9acfe7941999c51.png)

Wykorzystamy ten fakt przy naszym dowodzie. Załóżmy nie wprost, że powstała w ten sposób otoczka wypukła nie jest jednak wypukła. Muszą zatem istnieć dwa punkty $P$ i $Q,$ takie że należą oba do otoczki, ale odcinek PQ w pewnym momencie wychodzi poza otoczkę. Jeżeli odcinek $PQ$ wychodzi poza otoczkę to musi w pewnym momencie przeciąć pewien jej bok, a następnie przeciąć inny bok ponownie (ponieważ odcinek $PQ$ musi z powrotem do tej otoczki powrócić). Niech przecięte odcinki są definiowane przez odpowiednio punkty $A, B$ oraz $C, D.$ Te cztery punkty oczywiście muszą być punktami z naszego zbioru (boki otoczki w końcu muszą być bokami trójkątów, które nakładaliśmy na zbiór). Każda trójka z tych punktów też definiuje pewne trójkąty należące do otoczki i w zależności od ich ułożenia niektóre z nich będą zawierać całkowicie fragment odcinka, który w otoczce miał się nie znajdować co da nam sprzeczność:

![Odcinek spoza otoczki?](https://codimd.s3.shivering-isles.com/demo/uploads/upload_881a5b0616b1548c4436a24fb2639fa5.png)

W ten sposób wykazaliśmy, że otoczka wypukła faktycznie jest wypukła. Zostało nam teraz pokazać, że jest ona najmniejszym takim wielokątem wypukłym pokrywającym cały zbiór. Udowodnimy nieco mocniejsze twierdzenie: każdy wielokąt wypukły pokrywający cały zbiór, będzie zawierał w sobię jego otoczkę wypukłą (to zarazem oznacza, że nie może mieć większego pola). Przyda nam się do tego następujący fakt: jeżeli wielokąt wypukły zawiera trzy różne punkty, to zawiera również cały trójkąt przez nie wyznaczany (dowód korzystający z definicji wielokąta wypukłego pozostawimy jako ćwiczenie dla czytelnika). A zatem dowolny wielokąt zawierający cały zbiór punktów, zawiera trójkąty wyznaczane przez każdą trójkę punktów a te tworzą otoczkę, zatem zawiera całą otoczkę, co chcieliśmy wykazać.

Warto też zauważyć, że pokazuje nam to przy okazji, że otoczka wypukła jest nie tylko najmniejszym takim wielokątem pod względem pola, ale także pod względem obwodu, gdyż wielokąt zawierający się w innym musi mieć mniejszy obwód (tak samo jak mniejsze pole).

### Liczne otoczki
Teraz przydałoby się zaprojektować odpowiedni algorytm, który dla danego zbioru punktów znajdzie jego otoczkę wypukłą. Zanim przejdziemy do działania zdefiniujemy sobie jeszcze jedno pojęcie punkt nazwiemy punktem <b>brzegowym</b> zbioru, jeżeli leży na brzegu otoczki wypukłej. Nasz algorytm będzie miał za zadanie mając dany zbiór punktów wypisać te, które są punktami brzegowymi (czyli jednocześnie definiują kształt otoczki), w kolejności występowania na tej otoczce.

Zaczniemy od bardzo prostej obserwacji: na pewno punkt najbardziej na lewo (o najmniejszej współrzędnej $x$) i najbardziej na prawo muszą należeć do otoczki. Będą one dzieliły naszą otoczkę na dwie części: górną i dolną. Nasz algorytm będzie liczył obie części otoczki osobno, ale w identyczny sposób, zatem skupimy się na policzeniu otoczki górnej.

![Górna część otoczki](https://codimd.s3.shivering-isles.com/demo/uploads/upload_0165291fa745dd2f405dc990b52f81bc.png)

Będziemy w tym celu symulować sobie wspomniane wcześniej ”naciąganie liny” wokół zbioru punktów. Konstrukcję zaczniemy od przywiązania naszej liny do punktu najbardziej na lewo. Następnie będziemy rozpatrywać kolejne punkty w kolejności rosnących współrzędnych $x$ (czyli od tego najbardziej na lewo do tego najbardziej na prawo) i będziemy patrzyć jak zmienia się naciągnięcie naszej liny wraz z dodawaniem nowego punktu. Załóżmy, że znamy już górną otoczkę dla pewnego prefiksu punktów i pojawia się nowy punkt na prawo od niej, który chcemy objąć naszą otoczką. Jako, że nasza górna otoczka ma być ”naprężoną liną” (czy też górną częścią wielokąta wypukłego), to wędrując wzdłuż niej od początku do końca powinniśmy jedynie skręcać w prawo. Zatem jeżeli nowo dodany punkt będzie na lewo względem kierunku, który wyznaczają dwa poprzednie punkty otoczki, to późniejszy z nich powinniśmy z niej usunąć. Czynność tą możemy powtarzać tak długo, aż nasza otoczka się wygładzi. Sprawdzenie czy nowy punkt jest na lewo od wektora możemy oczywiście zrobić korzystając z iloczynu wektorowego, o którym uczyliśmy się w poprzednich lekcjach.

![Dodawanie nowego punktu do otoczki wypukłej](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3588ae27f72388c359f275de0d119aa5.png)
Po dodaniu punktu $S$ do otoczki $ABCDEF$ usunięte zostaną punkty $F$ i $E,$ ponieważ odpowiednio $EFS$ i $DES$ tworzą zakręt w lewo. Dopiero $CDS$ tworzy zakręt w prawo.

W jakiej złożoności będzie działał nasz algorytm? Jeżeli otoczkę trzymamy na stosie, który daje nam dostęp do kilku ostatnio dodanych elementów, a ponadto pozwala nam dodawać do niego nowe elementy i usuwać ostatnio dodane (taki stos najłatwiej zaimplementować korzystając ze zwykłej tablicy o stałym rozmiarze), to złożoność tego algorytmu będzie liniowa. Każdy punkt bowiem zostanie tylko raz wrzucony na stos i tylko raz z niego usunięty. Oczywiście złożoność nam pogarsza fakt, że najpierw musimy nasze punkty posortować po współrzędnej $x.$ Ostateczna złożoność obliczeniowa wyniesie zatem $O (n \\cdot log \\ n)$ lub $O(n)$ jeżeli nasze dane są już posortowane.

Co z dolną otoczką? Liczymy ją w dokładnie taki sam sposób z tym, że punkty przeglądamy od prawej do lewej.

## Przykłady zadań na otoczkę wypukłą
Teraz czas wcielić teorię w życie. Jedno przykładowe zadanie korzystające z otoczki wypukłej umiemy już rozwiązać jest nim wspomniany problem znalezienia najkrótszego ogrodzenia. Zastosowań otoczki wypukłej jest jednak dużo więcej, aczkolwiek często jest ona stosowana w połączeniu z istotnie trudniejszymi geometrycznymi problemami, więc w tym artykule przedstawimy jedynie dwa nietrudne zadania, a same pojęcie otoczki będzie nam się jeszcze w przyszłości przewijać. 

### Zadanie - oddzielanie punktu prostą
Rozpatrzmy następujący problem: dany jest zbiór punktów oraz jeden dodatkowy specjalny punkt. Chcemy powiedzieć czy da się punkty oddzielić od specjalnego punktu jedną prostą. Zadanie pozornie wydaje się trudne, ale szybko możemy dojść do następującego wniosku: da się je oddzielić wtedy i tylko wtedy, gdy specjalny punkt nie znajduje się wewnątrz otoczki wypukłej zbioru punktów. 

![Przykład: punkt poza otoczką wypukłą zbioru punktów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d2213399d098dd8efdf3704f32cd67ee.png)

Jak  to  udowodnić?  Najpierw  pokażemy,  że  gdy  punkt  leży  poza  otoczką  to  istnieje  prosta, która  go  rozdzieli.  Rozpatrzmy  wszystkie  proste  przechodzące  wzdłuż  boków  otoczki  wypukłej. Jeżeli rozpatrzymy obszary po drugiej stronie tych prostych niż otoczka wypukła, to pokryją one razem  całą  pozostałą  część  płaszczyzny.  Zatem  punkt  specjalny  znajdzie  się  po  drugiej  stronie którejś z tych prostych. Co gdy punkt zawiera się wewnątrz otoczki? Wtedy prosta rozdzielająca musiałaby  przecinać  otoczkę,  bo  inaczej  zawierała  by  punkt  specjalny  po  tej  samej  stronie  co otoczka. A to z kolei oznacza, że istnieją dwa punkty zbioru leżące po dwóch różnych stronach, co daje nam sprzeczność i oznacza, że taka prosta nie istnieje. Zatem całe zadanie sprowadza się do policzenia otoczki zbioru, a następnie sprawdzenia czy specjalny punkt należy do tej otoczki (czyli czy punkt należy do wielokąta wypukłego). 

### Zadanie: usuwanie punktów
Drugie, nieco trudniejsze zadanie, o którym warto wspomnieć, pojawiło się kilka lat temu na Mistrzostwach Wielkopolski w programowaniu zespołowym: dany jest zbiór punktów i jeden wyróżniony punkt. Ile przynajmniej niewyróżnionych punktów musimy usunąć, aby wyróżniony punkt leżał na otoczce pozostałej części punktów? To zadanie pozornie wydaje się jeszcze trudniejsze i do jego rozwiązania będzie niezbędny jeszcze jeden fakt: punkt jest punktem brzegowym zbioru wtedy i tylko wtedy, gdy istnieje prosta przez niego poprowadzona, która zawiera cały zbiór punktów po jednej stronie.

Dowód tego faktu jest w zasadzie niemal identyczny co dowód poprawności poprzedniego zadania, więc pozostawimy go jako ćwiczenie dla czytelnika. A od tej obserwacji niewiele nam brakuje już do rozwiązania wzorcowego: jeżeli chcemy żeby wyróżniony punkt leżał na otoczce, to musimy wybrać  prostą,  która  będzie  zawierała  cały  zbiór  po  jej  jednej  stronie.  A  to  oznacza,  że  całkowicie będziemy musieli usunąć punkty po jednej z jej stron. Zatem nasze zadanie sprowadza się do znalezienia prostej przechodzącej przez wyróżniony punkt, która zawiera po jednej stronie jak najmniej pozostałych punktów. Jest to zadanie, które możemy rozwiązać sortując zbiór kątowo dookoła wyróżnionego punktu i stosując metody przedstawione w poprzednim artykule dotyczącym sortowania kątowego.

## Zadania
- [Polygonds (Codeforces, Div. 2 B)](https://codeforces.com/problemset/problem/166/B)
- [Freelancer's Dreams (Codeforces, Div. 1 C)](https://codeforces.com/problemset/problem/605/C)
"
---
