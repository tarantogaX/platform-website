---
title: 'Dynamiki kombinatoryczne'
content: "

Z jednym z przykładów zliczania w programowaniu dynamicznym miałeś już do czynienia podczas wprowadzenia do tego działu. Pamiętasz zadanie z liczbami? Dzisiaj nauczymy się rozwiązywać podobne zadania, a także kilka nieco trudniejszych. Zacznijmy od czegoś prostego. 


## Zadanie przystawka

Rozważmy chyba najbardziej znany problem ze zliczaniem. Na taras wieży widokowej prowadzą schody o $n$ stopniach. Turysta wchodzi na taras wykonując kroki co $1$ lub co $2$ stopnie. Na ile sposobów turysta może przejść schody?.


### Rozwiązanie dynamiczne: iteracja

Chcemy rozwiązać ten problem programowaniem dynamicznym. Czego będziemy potrzebować?


Z pewnością przyda się jakiś stan. Niech $DP[i]$ będzie liczbą sposobów, na które możemy przejść schody z $i$ stopniami.


Co jeszcze musimy zrobić? Stany bazowe. To łatwe: $DP[0] = 1,$ bo po prostu stoimy w miejscu, a $DP[1] = 1,$ bo musimy przejść o jeden schodek.


A co z przejściami? Załóżmy, że nasz turysta stoi na $i$-tym schodku. Skąd mógł przyjść w jednym ruchu? Ze schodków $i-1$ lub $i-2,$ wykonując odpowiednio kroki o $1$ lub o $2$ schodki. Wobec tego $DP[i] = DP[i-1] + DP[i-2].$


W jakiej złożoności działa takie podejście? Mamy $n$ stanów, a każdy wyliczamy w $O(1).$ Złożoność czasowa wynosi więc $O(n),$ podobnie jak pamięciowa.
Moglibyśmy zmniejszyć złożoność pamięciową do $O(1),$ pamiętając tylko dwie ostatnie wartości tablicy (innych już nie będziemy potrzebować). Oto kod:


```cpp=

int fib(int n) {

\ \ \ \ int DP[n + 1];

\ \ \ \ DP[0] = DP[1] = 1;

\ \ \ \ for (int i = 2; i <= n; i ++) {

\ \ \ \ \ \ \ \ DP[i] = DP[i-1] + DP[i-2];

\ \ \ \ }

\ \ \ \ return DP[n];

}

```


Uruchamiając ten kod zorientujemy się, że w tablicy $DP[]$ bardzo szybko znajdą się duże liczby. Nic w tym dziwnego - dla większości problemów ze zliczaniem wyniki rosną naprawdę szybko, np. wykładniczo. Z tego powodu zwykle jesteśmy proszeni o podanie reszty z dzielenia przez jakąś rozsądną liczbę, na przykład $10^9+7.$ Operacje modulo nie powinny być dla Ciebie nowością. Gdyby jednak tak było, koniecznie zajrzyj do lekcji o nich w sekcji Podstawy.


## Nieco trudniejsze zadanie - rozmienianie kwoty

Mamy monety o nominałach $1, k, k^2, k^3, ...$ ($k$ jest stałe). Na ile sposobów możemy rozmienić nimi kwotę $n$?


### Rozwiązanie dynamiczne

Zaczynamy standardowo. Niech $DP[i]$ mówi nam, na ile sposobów możemy rozmienić kwotę $i.$


$DP[0] = DP[1] = 1.$ Uwaga! Tutaj trzeba oddzielnie rozważyć nie tylko małe $n$, ale też małe $k$. Co się dzieje, gdy $k=1$? To szczególny przypadek, mamy tylko jeden rodzaj monety. Wypisujemy wtedy $1$ dla każdego $n.$


Często pierwsze nieoczywiste rzeczy dzieją się dopiero podczas rozpatrywania przejść. Tu potrzebować będziemy nieco więcej komentarza. Skupmy się na monecie o nominale $1.$ Jeśli jej użyjemy, to pozostaje nam do rozmienienia kwota $n-1.$ Wygląda dość standardowo. Co się dzieje, gdy jej nie używamy?
Zostają nam monety $k, k^2, ...$ - wszystkie podzielne przez $k.$ Widzimy, że jeśli $n$ nie jest podzielne przez $k,$ to nie da się go rozmienić bez użycia monety o nominalne $1$ - więc w tym przypadku mamy $0$ sposobów. Co, gdy $n$ jest podzielne przez $k$? Skoro tak, to możemy zapisać: $k \\cdot \\frac{n}{k}$ wydajemy przy pomocy monet $k, k^2, ....$ Zauważmy, że obie strony możemy podzielić przez $k.$ Otrzymujemy wówczas informację, że liczbę $\\frac{n}{k}$ rozmieniamy przy pomocy monet $1, k, k^2, ....$ To już umiemy zrobić, prawda?


```cpp=

int monety (int n, int k) {

\ \ \ \ if (k <= 1)

\ \ \ \ \ \ \ \ return 1;

\ \ \ \ DP[0] = DP[1] = 1;

\ \ \ \ for (int i = 2; i <= n; i ++) {

\ \ \ \ \ \ \ \ if (i % k != 0)

\ \ \ \ \ \ \ \ \ \ \ \ DP[i] = DP[i-1];

\ \ \ \ \ \ \ \ else

\ \ \ \ \ \ \ \ \ \ \ \ DP[i] = DP[i-1] + DP[i/k];

\ \ \ \ }

\ \ \ \ return DP[n];

}

```


Więcej o zliczaniu rekurencyjnym możesz przeczytać [tutaj.](http://www-users.mat.umk.pl/~sendlew/w12/mata2-rekurencja-slajdy.pdf)


## Wypisywanie k-tej liczby o jakiejś własności

Tym razem zliczanie użyjemy zliczania jako pomocniczego narzędzia. Pozwolę sobie na użycie bardzo prostego przykładu: chcemy wypisać $k$-tą liczbę podzielną przez $3,$ gdzie $k\\leqslant 10^{18}.$ Wiem, że możemy wypisać $3\\cdot k$ - chcę tylko pokazać ogólne podejście :) 


Rozwiązanie do tego typu zadania podzielimy na dwie fazy. W pierwszej policzymy sobie tablicę pomocniczą, która pomoże nam później wypisać tę liczbę znak po znaku. Uwaga na zera wiodące! (Zero wiodące to zero na początku liczby - przykładowo: liczba $010$ powinna być zapisana jako $10$).


Przypomnijmy cechę podzielności przez $3$: <i>Liczba jest podzielna przez $3,$ jeśli suma jej cyfr dzieli się przez $3.$</i> Będziemy chcieli nauczyć się liczyć, ile jest liczb długości nie większej niż $n,$ które mają resztę $k$ z dzielenia przez $3.$ Oczywiście, $k \\in {0, 1, 2}.$ Oznaczmy to jako $DP[n][k].$


Aby poruszyć się dalej musimy wiedzieć, jakiej długości liczby nas interesują. Oszacujemy sobie, że nigdy nie będą miały więcej niż $20$ cyfr.


Wypadałoby policzyć tablicę $DP.$ Nie musimy się tutaj specjalnie starać - $n\\leqslant 20,$ a $k\\leqslant 2.$ Dla liczb jednocyfrowych radzimy sobie łatwo - dla każdej cyfry $c$: $DP[1][c\\%3]++.$


Rozważmy dłuższe liczby. Każda taka liczba ma pierwszą cyfrę. Możemy rozważyć każdą opcję, a następnie użyć wcześniej policzonych informacji do obliczenia $DP[n][k],$ ponieważ wiemy jaką resztę musi mieć pozostała część liczby.


```cpp=

int ustal(int x) {

\ \ \ \ //upraszcza kod - zwraca reszte z dzielenia przez 3

\ \ \ \ x += 33333333; //nie chcemy modulowac liczb ujemnych

\ \ \ \ return x % 3;

}


DP[0][0] = 1;

for (int i = 0; i <= 9; i ++)

\ \ \ \ DP[1][i % 3] ++;

for (int i = 2; i <= MAX_N; i ++)

\ \ \ \ for (int j = 0; j < 3; j ++)

\ \ \ \ \ \ \ \ for (int pierwsza = 0; pierwsza < 10; pierwsza ++)

\ \ \ \ \ \ \ \ \ \ \ \ DP[i][j] += DP[i-1][ustal(j - pierwsza)];

```


Ten kod nie jest w stu procentach poprawny - co może pójść nie tak wyjaśnimy po omówieniu drugiej fazy.


Mając już narzędzie, możemy przystąpić do konstrukcji wyniku. Ustalmy, że nasza liczba może mieć zera wiodące i ma dokładnie $20$ cyfr - usunięcie zer w wyniku to malutki szczegół. Będziemy poruszać się tzw. schodzeniem. Założymy, że na pierwszym miejscu stoi cyfra $c$ i spojrzymy, na ile sposobów możemy dokończyć liczbę tak, aby dzieliła się przez $3.$ Jeśli zakończeń jest przynajmniej $k,$ to z pewnością cyfra $c$ musi stać na pierwszym miejscu, ponieważ każda liczba z cyfrą $c$ na początku jest mniejsza niż liczba z cyfrą $c+1$ na początku. Z drugiej strony, kiedy liczba sposobów na dokończenie jest mniejsza niż $k$ to wiemy, że $c$ stać na początku nie może - więc musimy szukać dalej. Pamiętajmy o odjęciu od $k$ wszystkich tych możliwości. Dla przykładu: jeśli szukamy siódmej liczby podzielnej przez $3,$ to wiemy, że na pierwszym miejscu nie może stać $0,$ gdyż liczby z zerem na początku: $03,$ $06,$ $09$ są tylko trzy. To jednak nie znaczy, że mamy pominąć - więc odejmujemy $3$ od $k$ i szukamy dalej.


```cpp=

vector <int> wynik;

int reszta = 0;

for (int i = MAX_N; i > 0; i -) {

\ \ \ \ for (int c = 0; c < 10; c ++) {

\ \ \ \ \ \ \ \ long long dokoncz = DP[i - 1][ustal(3 - reszta - c)];

\ \ \ \ \ \ \ \ if (dokoncz >= k) {

\ \ \ \ \ \ \ \ \ \ \ \ wynik.push_back(c);

\ \ \ \ \ \ \ \ \ \ \ \ reszta += c;

\ \ \ \ \ \ \ \ \ \ \ \ break;

\ \ \ \ \ \ \ \ }

\ \ \ \ \ \ \ \ else k -= dokoncz;

\ \ \ \ }

}

int pocz = 0;

while (wynik[pocz] == 0)

\ \ \ \ pocz ++;

for (int i = pocz; i < wynik.size(); i ++)

\ \ \ \ cout << wynik[i];

```


Kod powyższy będzie wypisywać poprawnie odpowiedź dla liczby $k-1.$ Dlaczego tak? Dla uproszczenia implementacji założyliśmy, że $0$ również jest liczbą podzielną przez $3$ o długości $1.$ To poniekąd prawda, chociaż nas interesowały liczby dodatnie. Nic nie stoi nam na przeszkodzie, by na początku dodać $1$ do $k.$


Błąd, o którym wspominałem wcześniej, jest nieco inny. Z wcześniejszych fragmentów artykułu możemy się dowiedzieć, że liczby w takich tablicach lubią szybko rosnąć. Tak jest i tym razem. Standardowe typy liczb całkowitych mogą nie pomieścić liczb, które nas interesują. Zauważmy jednak, że przy schodzeniu jeśli mamy bardzo dużą liczbę, to nie jest dla nas istotne jak bardzo dużą - chcemy tylko wiedzieć, że większą niż aktualne $k.$ Wobec tego możemy zawsze ograniczać: $DP[i][j] = min(DP[i][j], MAXK + 1).$ Z kolei maksymalne $k$ było do $10^{18}$ - więc i $DP[i][j]$ nie będzie znacznie większe.


## Dynamiki kombinatoryczne na przedziałach

Czasem jesteśmy proszeni o to, aby podać $k$-tą liczbę o Jakiejś Własności nie mniejszą niż $a.$ Jak sobie wówczas poradzić? Za pomocą sumy prefiksowej! Będziemy potrzebowali funkcji, która policzy nam liczbę liczb o Jakiejś Własności nie większych niż $n.$ To robimy dokładnie tak samo jak poprzednio - tylko musimy uważać, żeby liczby faktycznie były nie większe niż $n.$


Powiedzmy, że w pdziedziale $[1, a-1]$ jest $p$ liczb o Danej Własności. Teraz nasze zadanie sprowadza się już po prostu do znalezienia $(k+p)$-tej liczby o Tej Własności.


## Zadania

- [Monety (V OI, II etap)](https://szkopul.edu.pl/problemset/problem/GMBfzRQAdw3b7wfvC9Xf7YE4/site/?key=statement)

- [Suma Cyfr (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/Ng815bt4Fko9lj2-l7eVl3Aw/site/?key=statement)

- [Misie (XIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/rjT2toimgFwJAHEb_-Lm75qm/site/?key=statement)

"
---
