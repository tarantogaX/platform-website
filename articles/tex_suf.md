---
title: 'Tablica sufiksowa'
content: "
W poprzednim artykule nauczyłeś się algorytmu KMR oraz jak dzięki niemu porównywać słowa. Teraz przyszła pora wgłębić się w jego dalsze i bardziej praktyczne zastosowania: liczenie Tablicy Sufiksowej i jej pokrewnych.


## Tablica Sufiksowa

Tablica Sufiksowa, z angielskiego: Suffix Array (SA), trzyma nam pozycje posortowanych alfabetycznie sufiksów słowa $S.$ Innymi słowy w $SA[i]$ znajduje się numer pozycji, na której znajduje się $i$-ty najwcześniejszy leksykograficznie sufiks w $S.$


![Tablica sufiksowa a KMR](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c7f0f18da19d4412274dae70cfcad63b.png)


Do konstruowania $SA$ wykorzystamy $r$-ty poziom KMRa, gdzie $n \\leqslant 2^r$ dla $n$ będącego długością $S.$ Od teraz $r$-ty poziom będę nazywać ostatnim. Zauważmy, że żadne słowo nie ma nigdy dwóch takich samych sufiksów, dlatego, gdy $KMR[x][r] = y,$ to $SA[y] = x.$


## Tablica RANK

Tablica $RANK$ ułatwia nawigację po $SA.$ W $RANK[x]$ będziemy trzymać informację, że $x$-ty sufiks występuje na pozycji $RANK[x]$ w $SA.$ Nietrudno więc zauważyć, że odwracamy czynność tworzenia $SA,$ więc tablica $RANK$ to nic innego jak ostatni poziom KMR-a.


![Tablice rank, KMR i SA](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e6678d54a1c3ed7ac174f00dae76f2ab.png)


## Longest Common Prefix

Algorytm LPC służy do znajdowania najdłuższych wspólnych prefiksów (ang. LCP - Longest Common Prefix) kolejnych leksykograficznie sufiksów słowa $S.$ Innymi słowy, algorytm LCP służy do znajdowania LCP słów znajdujących się obok siebie w tablicy sufiksowej.


Dla każdej komórki $LCP[x]$ (oprócz pierwszej, gdzie dla ułatwienia możemy ustawić wartość -1) będziemy trzymać informację, że sufiksy zaczynające się na pozycjach $SA[x]$ oraz $SA[x-1]$ mają najdłuższy wspólny prefiks równy $LCP[x].$


![Wspólny prefiksy sąsiednich sufiksów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6b578c1af57eae362d0966f9e2dc765a.png)


Moglibyśmy obliczyć te wartości dla odpowiednich sufiksów szukając literka po literce pierwszej pozycji, na której występują dwa różne znaki. Gołym okiem widać, że takie rozwiązanie może kosztować nawet $O(n^2)$ czasu. Moglibyśmy również próbować znaleźć pierwsze różniące się pozycje wyszukiwaniem binarnym na haszach. To rozwiązanie byłoby w pełni akceptowalne i działałoby w czasie $O(n \\ log \\ n).$ Okazuje się jednak, że możemy to zrobić znacznie łatwiej, nieznacznie modyfikując pierwsze podejście.


<b>Twierdzenie:</b> Niech $u = LCP [x],$ $i = SA[x],$ a $j = SA[x-1].$ Zachodzi nierówność:

$LCP [SA[i+1]] \\geqslant max(0, u-1).$


<b>Dowód:</b> Zauważmy, że $i + 1$-wszy sufiks w $S$ to $i$-ty sufiks z uciętą pierwszą literą. Analogicznie $j + 1$-wszy to $j$-ty z uciętą pierwszą literą. Wynika z tego, że sufiks $j+1$-wszy i $i+1$-wszy posiadają LCP przynajmniej $u - 1.$ Sufiks $j + 1$-wszy jest wcześniejszy leksykograficznie niż $i + 1$-wszy, ponieważ sufiks $j$-ty był wcześniejszy niż $i$-ty (występował wcześniej w SA). Spośród mniejszych leksykograficznie sufiksów S sufiks $i + 1$-wszy ma największe LCP z tym, występującym bezpośrednio przed nim w SA, ponieważ pozycje w SA są posortowane leksykograficznie. Oznacza to, że nie może mieć z nim mniejszego LCP niż $u - 1.$


![Wspólne prefiksy podsłów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_16b391c3230bd3c703e4fc6c1ee957c1.png)


LCP będziemy liczyć dla kolejnych sufiksów w tej kolejności, w jakiej występowały w $S.$ Załóżmy, że rozpatrujemy teraz $i$-ty sufiks. Jeżeli jest on najwcześniejszy leksykograficznie $(RANK[i] = 1),$ to możemy taki sufiks pominąć $(LCP [1] = -1)$ i przejść do rozpatrywania kolejnego. W przeciwnym wypadku znajdźmy poprzedni leksykograficznie sufiks. Będzie się on znajdować na pozycji $j = SA[RANK[i] - 1].$ Niech $u = LCP[j].$ W tym miejscu możemy znaleźć brutalnie sprawdzając literka po literce, pierwszą różniącą sufiks $i$-ty oraz $j$-ty pozycję i tym samym wyliczyć $LCP[RANK[i]].$ Jednakże zamiast od pierwszej pozycji poszukiwania zacznijmy od $u$-tej. Możemy to zrobić, ponieważ z Twierdzenia 1 wiemy, że $LCP[SA[i + 1]] \\geqslant max(0, u - 1).$


W jakim czasie działa to rozwiązanie? Zauważmy, że nie ma dwóch sufiksów o długości przynajmniej $n.$ Tym samym nie ma dwóch sufiksów, które miałyby $LCP > n.$ Słowo o długości $n$ ma dokładnie $n$ sufiksów. Oznacza to, że po uzyskaniu LCP równego $n$ w $O(n)$ ruchach mogłoby się zdarzyć, że $u$ zmniejszyłoby się o maksymalnie $n.$ LCP mogłoby urosnąć jeszcze raz do $n$ w czasie $O(n)$ i już nigdy nie zmaleje. Z tego wynika, że tak zaimplementowany algorytm brutalny działa w $O(n),$ czyli szybciej i łatwiej niż binary search po haszach.


## Niesąsiednie sufiksy

Co zrobić, gdybyśmy chcieli policzyć LCP dwóch sufiksów, które nie sąsiadują ze sobą w SA? Załóżmy, że numery ich pozycji znajdują się w SA na pozycjach kolejno $z$ i $z + a.$ Okazuje się, że LCP tych dwóch słów to nic innego jak minimum wartości w tablicy LCP na przedziale $[z + 1; z + a].$


Dlaczego? Powiedzmy, że $t$ kolejnych sufiksów ma LCP równe $y.$ To znaczy, że pierwszy i ostatni ma przynajmniej takie LCP. Gdyby pierwszy i ostatni sufiks miały na pozycji $y+1$-wszej tę samą literkę, to wszystkie sufiksy miałyby tę samą literkę. Dzieje się tak ponieważ są one podane w kolejności alfabetycznej. Oznacza to, że sufiks pierwszy i ostatni nie mają LCP większego niż wspólne LCP wszystkich sufiksów po drodze. To znaczy, że LCP słowa pierwszego i ostatniego jest równe minimum z LCP kolejnych sufiksów na przedziale.


![Wspólne prefiksy ciągu kolejnych sufiksów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_9314ac8295958323a95ec376215e3a3f.png)


### Liczba różnych podsłów

<b>Moc zbioru</b> - liczba wszystkich elementów w zbiorze.


Spróbujmy obliczyć liczbę różnych podsłów w słowie $S.$ W tym celu zdefiniujmy zbiór $Q$ jako zbiór różnych podsłów $S.$ Chcemy poznać moc $Q.$ Niech $Q_1$ będzie pomocniczym zbiorem pustym. Przetwórzmy kolejne sufiksy $S$ w takiej kolejności, w jakiej występują w tablicy sufiksowej. Dla każdego z nich dodamy do $Q_1$ wszystkie podsłowa zaczynające się na tej samej pozycji co on i nie będące jeszcze w $Q_1.$ Dzięki temu rozważymy wszystkie podsłowa i dodamy do $Q_1$ niepowtarzające się. Po zakończeniu operacji $Q_1 = Q.$ Niech $dl_i$ oznacza długość $i$-tego sufiksu. Istnieje $dl_i$ parami różnych podsłów zaczynających się na tej samej pozycji co on, ponieważ na tyle sposobów jesteśmy w stanie wybrać ich zakończenie. Które z tych podsłów zostały już dodane wcześniej do $Q_1$? Otóż te, które są prefiksami LCP $i$-tego sufiksu oraz $i-1$-szego. Dla pierwszego sufiksu nie ma takich podsłów. W pozostałych wypadkach tę własność spełnia $LCP[i]$ podsłów. Oznacza to, że przy rozważaniu $i$-tego sufiksu do $Q_1$ dodamy $dl_i - LCP[i]$ podsłów. Suma długości sufiksów jest równa
$\\frac{n\\cdot(n-1)}{2},$ więc liczba różnych podsłów słowa $S$ to:

$$\\frac { n \\cdot ( n - 1 ) } { 2 } - \\sum _ { i = 2 } ^ { n } L C P [ i ]$$


## Zadania

- [You Are Given Some Strings... (Codeforces, Edu Round E)](https://codeforces.com/contest/1202/problem/E)

- [String (Codeforces, Beta Round Div. 1 D)](https://codeforces.com/contest/123/problem/D)

- [Forbidden Indices (Codeforces, Edu Round F)](https://codeforces.com/contest/873/problem/F)

"
---
