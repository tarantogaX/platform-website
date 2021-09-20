---
title: 'Sortowanie kątowe'
content: "
Na dzisiejszej lekcji przerobimy narzędzie przydatne do rozwiązywania wielu zadań geometrycznych - sortowanie kątowe. Jak dobrze wiemy, sortowanie jest procesem uporządkowania pewnych obiektów według pewnej reguły. Jak można się domyślić, sortowanie kątowe będzie porządkować zbiór wektorów według ich kątów. Dokładniej rzecz mówiąc, będziemy chcieli ułożyć nasze wektory w takiej kolejności, aby kąt między każdą sąsiednią parą wektorów nie zawierał żadnego innego
wektora ze zbioru.

![Wektory wyhodzące ze środka układu współrzędnych](https://codimd.s3.shivering-isles.com/demo/uploads/upload_60b55591eed8d89e0e19c2d5954d6311.png)

## Zadanie: najmniejszy kąt między wektorami
Zastanówmy się nad następującym problemem: dany jest zbiór wektorów. Chcielibyśmy znaleźć parę  wektorów  taką,  że  kąt  między  nimi  jest  najmniejszy  możliwy.  Zanim  zabierzemy  się  za  to zadanie możemy zastanowić się nad prostszym, analogicznym problemem:

Dany  jest  zbiór  liczb  na  osi  liczbowej.  Chcemy  znaleźć  parę  liczb,  która  jest  najbliższa  sobie. Brutalne rozwiązanie przejrzałoby każdą możliwą parę liczb i sprawdziło, która z nich jest sobie najbliższa. Jednak szybko możemy zauważyć, że gdy wszystkie liczby posortujemy, będzie opłacało się  sprawdzać  tylko  pary  sąsiednich  liczb.  Dzieje  się  tak,  gdyż  jeżeli  dla  pewnych  liczb $x,y,z$ zachodzi $x \\leq y \\leq z$ to zarówno $y − x$ jak i $z − y$ nie może być większe od $z − x,$ a zatem sprawdzenie $z − x$ jest niepotrzebne. Dzięki temu udało nam sie zbić złożoność z $O( n ^ 2 )$ do złożoności ograniczanej przez sortowanie $O(n \\cdot log \\ n).$

### Rozwiązanie z sortowaniem kątowym
Podobnie możemy postąpić przy wyznaczaniu pary najbliższych pod względem kąta między nimi wektorów. Jeżeli ułożymy nasze wektory zgodnie z kierunkiem wskazówek zegara, to jedyne pary jakie będziemy musieli sprawdzić będą parami sąsiednich wektorów na liście. Takich par jest oczywiście $O ( n )$ zamiast $O ( n^2 ).$ Wystarczy zatem uporać się z jednym problemem: musimy umieć posortować te wektory. Oczywiście musimy umieć jeszcze znaleźć kąt między dwoma wektorami, ale o tym szczególe technicznym wspomnimy na końcu tego artykułu.

## Iloczyn wektorowy raz jeszcze
Pamiętamy  doskonale  nasz  wzór  na  iloczyn  wektorowy  (czy  też  pole  skierowane,  jak  kto  woli). Jedną z jego istotnych własności, której dotychczas jeszcze nie  wykorzystywaliśmy, był fakt, że informuje nas o tym, czy dane punkty zostały wprowadzone zgodnie z kierunkiem wskazówek zegara, czy przeciwnie. Jeżeli znak iloczynu wychodzi ujemny, oznacza to, że punkty zostały wprowadzone przeciwnie z kolejnością wskazówek zegara, czyli punkt $C$ znajduje się na lewo od wektora $AB.$ Jeżeli  znak  iloczynu  wychodzi  dodatni,  oznacza  to,  że  punkty  zostały  wprowadzone  zgodnie  z kolejnością wskazówek zegara, czyli punkt $C$ leży na prawo od wektora $AB.$

![Punkty B i C w układzie współrzędnych](https://codimd.s3.shivering-isles.com/demo/uploads/upload_929dd1935e2570038ee03b5736934098.png)

Dla przykładu, na powyższym rysunku mamy dwa układy punktów. Ponieważ punkt $A$ jest środkiem  układu  w  obu  z  nich  to  iloczyn  $ABC$  będzie  wynosił $x_Cy_B − x_B y_C$ (de  facto  jest  to podwojona wartość tego iloczynu, jednak nas będzie interesował tylko jego znak, więc w niczym nam to nie przeszkadza). Dla pierwszego układu otrzymamy: $3 \\cdot 4 − 1 \\cdot 2 = 10,$ czyli $C$ leży na prawo od $AB.$ Dla drugiego otrzymamy: $(− 3) \\cdot 3 − 1 \\cdot 2 = −11,$ czyli $C$ leży na lewo od $AB.$

## Jak sortować kątowo?
Przejdźmy zatem do konkretów i zaprojektujmy algorytm sortujący. W przypadku jakiegokolwiek sortowania możemy użyć wbudowanej w stl-a funkcji sort, musimy tylko odpowiednio zaprojektować schemat porównywania dwóch obiektów. W przypadku, gdy sortowaliśmy dotychczas zwykłe liczby, C++ używał operacji porównywania, która z dwóch wartości jest większa. Taką operację nazwiemy komparatorem. Komparator jest funkcją zwracającą typ bool i przyjmującą jako argumenty dwa obiekty (nazywane przez nas odpowiednio left i right). Musi ona zwracać true jeżeli obiekt left jest ściśle mniejszy według naszego schematu porównywania, a false w przeciwnym wypadku. Przykładowo domyślny komparator wyglądał w ten sposób: ```return left < right```. Jeżeli chcielibyśmy posortować ciąg od największego do najmniejszego elementu użylibyśmy komparatora: ```return left > right```, dlatego że element left powinien znaleźć się przed  elementem right, gdy jest od niego większy.

Będziemy  zatem  chcieli  napisać  podobną  funkcję,  która  umożliwi  nam  stwierdzenie,  który  z dwóch wektorów jest ”mniejszy” i powinien znajdować się na liście wcześniej. Istnieje jednak pewnien problem. Relacja między naszymi wektorami w zbiorze będzie tworzyła relację <b>cykliczną,</b> tzn. jesteśmy w stanie ułożyć je ”po kolei”, ale ostatni wektor będzie też ”mniejszy” od pierwszego na liście.  Nie  jesteśmy  w  stanie  stwierdzić,  który  z  tych  wektorów  jest  ściśle  najmniejszy,  a  który ściśle największy. I co więcej, poprawnych ułożeń może być wiele, jeżeli bowiem weźmiemy pewnie uszeregowanie kątowe, a następnie przesuniemy jego ostatni wektor na pierwszą pozycję, to dalej będzie to poprawne uszeregowanie względem kąta. Funkcja sort w C++ nie może sobie na coś takiego pozwolić, więc będziemy musieli sobie jakoś z tym problemem poradzić.

Załóżmy, że wszystkie nasze sortowane wektory mają dodatnią współrzędną $x,$ czyli należą do prawej połowy układu współrzędnych. Wtedy możemy zauważyć, że z problemem tym możemy się uporać zakładając, że najmniejszym wektorem będzie ten skierowany najbardziej w dół. Wtedy nasz  komparator  może  wyglądać  następująco: ```return det(left, right) < 0```.  Jeżeli  wszystkie wektory należałyby do lewej połowy, to moglibyśmy założyć, że najmniejszym wektorem będzie ten  skierowany  najbardziej  w  górę.  Wtedy  nasz  komparator  będzie  wyglądał  w  dokładnie  taki sam sposób. Zatem jeżeli w naszym zbiorze pojawiają się wektory po obu stronach możemy wtedy podzielić je sobie na dwie części: te po lewej i te po prawej od osi Y, a następnie posortować obie części niezależnie. Jeżeli ustawimy najpierw wszystkie wektory, które znajdowały się po prawej, a następnie ustawimy wszystkie wektory, które znajdowały się po lewej to otrzymamy poprawnie posortowany zbiór:

Nasz przykładowy komparator mógłby wygladać w ten sposób:
```cpp=
bool comp (point left, point right) {
	// Wektor po prawej stronie osi Y powinien być wcześniej
	if (left.x < 0 && right.x > 0)
		return false;
	if (left.x > 0 && right.x < 0)
		return true;
	// W tym momencie wiemy, że oba wektory znajdują się
	// na tej samej połowie, więc porównujemy iloczynem wektorowym
	return det(left, right) < 0;
}
```

Żeby posortować nasz zbiór wektorów możemy teraz wywołać:
$sort(tab, tab + n, comp)$ Umiemy już posortować zbiór wektorów, a więc możemy rozwiązać też nasze zadanie: wystarczy posortować wszystkie wektory, a następnie znaleźć kąt między każdą sąsiednią parą (wliczając też parę  pierwszy  i  ostatni  wektor).  Jak  znaleźć  kąt  między  dwoma  wektorami?  Najłatwiej  znaleźć jego cosinus korzystając ze wzoru na iloczyn skalarny, który mówi, że dla każdej pary wektorów $v$ i $u$ zachodzi: $u_xv_x+u_yv_y=|v||u|cos \\theta.$ gdzie $|v$ to długość wektora (czyli $\\sqrt {v_x^2+v_y^2}$), a $\\theta$ jest kątem między $v$ i $u.$

## Dalsze zadania na sortowanie kątowe
### Liczenie trójkątów prostokątnych
Rozważmy następujący problem: dane jest $n$ punktów na płaszczyźnie $(n\\leq 5000).$ Chcemy policzyć ile jest trójkątów prostokątnych o wierzchołkach w tych punktach. Brutalne rozwiązanie rozpatrzy każdą trójkę punktów i sprawdzi (np. korzystając z twierdzenia Pitagorasa), czy tworzy ona trójkąt prostokątny. My jednak chcielibyśmy znaleźć rozwiązanie działające szybciej. Zauważmy, że zamiast trójek tworzących trójkąt prostokątny możemy się zająć policzeniem trójek punktów, które tworzą kąt prosty (tzn. ile jest trójek punktów $A, B, C,$ takich że kąt ABC jest prosty). Takich trójek oczywiście będzie tyle samo co trójkątów prostokątnych. Możemy zatem dla każdego punktu założyć, że będzie on wierzchołkiem tego kąta, a następnie policzyć ile jest par $A, B$ takich, że tworzą one z wybranym przez nas wierzchołkiem kąt prosty.

![Trójkąty prostokątne](https://codimd.s3.shivering-isles.com/demo/uploads/upload_82084b85a0adac73f35108f4b2446463.png)

Żeby znaleźć tą liczbę par możemy najpierw posortować kątowo wszystkie pozostałe punkty dookoła obranego przez nas wierzchołka (oznaczymy go jako $X$). Następnie możemy trzymać dwa wskaźniki na dwa punkty $A$ i $B$ na tej liście. Niech A będzie pierwszym punktem po posortowaniu, a $B$ będzie pierwszym punktem takim, że $AXB$ wynosi przynajmniej $90$ stopni. Jeżeli wynosi on dokładnie $90$ stopni to możemy dodać jeden do wyniku. Następnie przesuwamy punkt $A$ o jedną pozycję w prawo, a punkt B przesuwamy tak długo aż znowu kąt $AXB$ będzie co najmniej prosty. Przesuwając się taką ”gąsienicą” możemy zliczać kąty proste tak długo, aż punktem $A$ wrócimy z powrotem na pierwotną pozycję. Otrzymany przez nas algorytm będzie miał złożoność $O(n^2 \\cdot log \\ n).$

Musimy jednak uważać na szczególnie złośliwe przypadki, kiedy podczas przesuwania punktu $B$ ”przeskoczymy” na drugą stronę prostej $AX.$ Może się bowiem wtedy okazać, że kąt $AXB$ wyniesie na przykład $270$ stopni, co nieuważnie napisany program też może potraktować jako kąt prosty. Musimy zatem pamiętać, by nie przesuwać dalej punktu $B,$ jeżeli w wyniku tego znajdzie się on na prawo od wektora $AX.$

### Liczenie trójkątów ostrokątnych
Moglibyśmy też chcieć policzyć ile jest trójkątów ostrokątnych. Dosyć łatwo jesteśmy w stanie przekształcić nasz algorytm tak, by zliczał kąty ostre zamiast prostych. Jednak poprzednio opieraliśmy  się  na  tym,  że  każdy  trójkąt  prostokątny  zawiera dokładnie jeden  kąt  prosty,  a  każdy inny trójkąt nie zawiera żadnego. W przypadku kątów ostrych taka własność niestety nie zachodzi. Możemy  jednak  zauważyć,  że  zachodzi  inna  własność:  każdy  trójkąt  ostrokątny  zawiera  trzy  kąty ostre, a każdy inny trójkąt zawiera dwa kąty ostre. Niech $o$ oznacza liczbę trójkątów ostrokątnych, $r$ liczbę pozostałych trójkątów, a $k$ liczbę znalezionych kątów ostrych. Naszym celem jest policzenie $o.$ Wiemy natomiast, że zachodzą dwie następujące rzeczy:
$o+r=n$ oraz $k=3o+2r.$ Możemy zatem na podstawie tego policzyć, że $o=k−2(o+r)=k−2n.$ Czyli policzenie kątów ostrych także umożliwia nam znalezienie liczby trójkątów ostrokątnych.

### Krojenie pizzy
Innym problemem, który możemy przytoczyć będzie prezentowany na początku pierwszego wykładu problem z pokrojeniem pizzy tak, aby nie naruszyć żadnego pomidora. Mówiąc precyzyjniej możemy założyć, że mamy okrągłą pizzę o pewnym promieniu oraz $n$ pomidorów znajdujących się na niej, będących okręgami o jakimś promieniu. Naszym zadaniem jest stwierdzenie, czy istnieje prosta przechodząca przez środek pizzy, która nie przetnie żadnego z innych okręgów reprezentujących pomidory. Zajmijmy się najpierw trochę łatwiejszym problemem - stwierdzeniem czy istnieje półprosta o początku w środku pizzy, która nie przetnie żadnego pomidora.

![Pomidory na pizzy](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1b0adbb6b7211c4f56024bf11f3d60bd.png)

Możemy zauważyć, że każdy pomidor definiuje pewien przedział kątów, których nie może przyjąć nasza półprosta, bo inaczej przetnie ona ten pomidor. Przedziały te są tak naprawdę wyznaczane przez dwie proste poprowadzone ze środka i styczne do danego pomidora. Możemy policzyć oba te punkty styczności (znalezienie odpowiednich wzorów w internecie pozostawiamy jako ćwiczenie dla czytelnika), a następnie poprowadzić dwa wektory do obu punktów. Jeden z tych wektorów (wcześniejszy według naszego komparatora) oznaczymy jako $+1,$ a późniejszy jako $-1.$ Teraz, gdy posortujemy  wszystkie  otrzymane  w  ten  sposób  wektory,  a  następnie  przechodząc  od  pierwszego  do  ostatniego  policzymy  sumy  prefiksowe  przydzielonych  im  wartości,  to  możemy  zauważyć, że dana półprosta nie przetnie żadnego pomidora, jeżeli suma prefiksowa wartości wektorów dla odpowiadającego jej kąta będzie równa zero.

Jeżeli chcemy poprowadzić prostą, która niczego nie przecina musimy podobnie jak poprzednio przesuwać  ”gąsienicą”  dwie  półproste,  pilnując  tego  by  tworzyły  razem  kąt  $180$  stopni.  Wynik będzie pozytywny, jeżeli istniał moment, w którym sumy prefiksowe obu z nich wynosiły 0. Otrzymany przez nas algorytm będzie miał złożoność $O(n \\cdot log \\ n).$

## Zadania
- [Pionek (XXV OI, I etap)](https://szkopul.edu.pl/problemset/problem/NZSCUwz2ACePsBKuVCIVzrRt/site/?key=statement)
- [Owce (XVII OI, II etap)](https://szkopul.edu.pl/problemset/problem/ZJVIyol5_xl_W3I8dFikC_5F/site/?key=statement)
- [Laser (XX OI, III etap)](https://szkopul.edu.pl/problemset/problem/50NNSYZSygWhYhYv77iwZYP7/site/?key=statement)
"
---
