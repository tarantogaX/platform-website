---
title: 'Arytmetyka modulo'
content: "
W poprzednim artykule z teorii liczb nauczyłeś się kilku podstawowych metod teorioliczbowych. Tutaj skupimy się na kilku bardziej zaawansowanych metodach.


## Funkcja Eulera $\\phi$

Funkcją Eulera $\\phi(n)$ nazywamy liczbę dodatnich liczb całkowitych $\\leqslant n,$ względnie pierwszych z $n.$ Oblicza się ją korzystając ze wzoru: $\\phi(n) = n \\cdot \\frac{p_1-1}{p_1} \\cdot \\frac{p_2-1}{p_2} \\cdot ... \\cdot \\frac{p_k-1}{p_k},$ gdzie $p_i$ to liczby pierwsze, które dzielą $n.$


Przykładowo, $\\phi(12) = 12 \\cdot \\frac{1}{2} \\cdot \\frac{2}{3} = 4.$ Aby udowodnić ten wzór wystarczy skorzystać z multiplikatywności funkcji $\\phi,$ którą omówimy poniżej. Do obliczenia $\\phi(n)$ można użyć sita Eratostenesa lub rozkładu liczby na czynniki pierwsze w $O(\\sqrt n).$


Funkcja Eulera posiada kilka ciekawych własności. Jedną z podstawowych jest multiplikatywność. Dla $m$ i $n$ względnie pierwszych zachodzi bowiem własność $\\phi(n \\cdot m) = \\phi(n) \\cdot \\phi(m).$ Łatwo zauważyć, że każda liczba pierwsza mniejsza od pierwszego $p$ jest z nim względnie pierwsza, dlatego $\\phi(p) = p-1.$ 


Zachodzi również twierdzenie Eulera, będące uogólnieniem małego twierdzenia Fermata. Dla każdego $1\\leqslant a\\leqslant n$ zachodzi: $a^{\\phi(n)} \\equiv 1 (mod \\ p).$ Niespecjalnie trudny dowód tego faktu możemy znaleźć choćby [w Delcie.](http://www.deltami.edu.pl/temat/matematyka/teoria_liczb/2019/09/26/Funkcja_Eulera/)


## Potęgowanie i modulowanie wykładnika

Obliczenie $a^b$ (mod p) przy pomocy szybkiego potęgowania nie jest specjalnie trudne. Gorzej, jeśli wykładnik byłby nieco bardziej złożony. Kuszącą opcją wydaje się zmodulowanie wykładnika tak, aby on również był nie większy niż $p.$ Co nam podpowiada intuicja? $(a^b)\\% n$ = $(a ^ {b \\% p} )\\% p.$ To NIE jest prawda!


Zamiast intuicji możemy skorzystać z twierdzenia Eulera. Wiemy, że $a^{p-1} \\equiv 1 (mod p).$ Wobec tego, wykładnik powinniśmy modulować przez $p-1$ zamiast $p.$ Dobrze ilustruje to poniższy rysunek.


![Modulowanie wykładnika](https://codimd.s3.shivering-isles.com/demo/uploads/upload_cfa0c159aa0064c24a26816b4ddb37c6.png)


## Dzielenie modulo liczba złożona

Pamiętamy, że dla liczb pierwszych zachodzi $\\frac{a}{b} = a\\cdot b^{n-2} (mod \\ n).$ Analogicznie, jeśli $n$ jest względnie pierwsze, to chcielibyśmy znaleźć odwrotność modularną $b,$ aby móc spokojnie podzielić. Jeśli $NWD(b, n)=1,$ to taką własność spełnia $\\phi(n)-1,$ dokładnie tak samo, jak w wypadku liczb pierwszych. Gorzej, jeśli $b$ i $n$ mogą mieć wspólne dzielniki. Wtedy, jeśli w ogóle da się podzielić, to aby uniknąć dzielenia przez zero, musimy wydzielić te dzielniki. Dla każdego dzielnika $n$ będziemy pamiętać, ile razy dzieli $a,$ a ile razy dzieli $b.$ Każdy dzielnik powinien występować w $a$ nie rzadziej niż w $b,$ bo inaczej wynik nie byłby całkowity. W takim razie wystarczy zapisać: $\\frac{a}{b}=\\frac{p_1^{q_1}\\cdot p_2^{q_2} ... \\cdot d}{p_1^{r_1}\\cdot p_2^{r_2} ... \\cdot e}=p_1^{q_1-r_1} \\cdot p_2^{q_2-r_2} ... \\cdot \\frac{d}{e}.$ Koniec końców, $e$ będzie względnie pierwsze z $n,$ więc będziemy mogli zastosować poprzednią technikę.


## Cykliczność reszt modulo. Rząd elementu

Będziemy rozważać wartości $a^k (mod \\ n),$ dla pewnego $1\\leqslant a\\leqslant n-1$ i dowolnego naturalnego $k.$ $a^0=1,$ więc pierwszą resztą w naszym ciągu  jest $1.$ Ponieważ reszt modulo $n$ jest $n,$ w pewnym momencie zaczną się powtarzać. Ponadto, pierwszą powtarzającą się resztą musi być jedynka. Dlaczego tak jest? Gdyby to nie było $1,$ to weszlibyśmy w cykl reszt, w którym nie występuje liczba $1,$ a tylko $a^0$ byłoby równe $1.$ To jest fałsz, gdyż z twierdzenia Eulera wiemy, że $a^{\\phi(n)} \\equiv 1 (mod p),$ czyli $a^0$ nie jest jedyną potęgą, której wartość wyniesie $1.$
![Cykliczność potęg](https://codimd.s3.shivering-isles.com/demo/uploads/upload_79ac746e0148a51d5a7cf685791d0815.png)


<b>Rzędem</b> $a$ (modulo $n$) dla względnie pierwszych $a$ i $n$ nazywamy najmniejszą taką liczbę naturalną $k,$ że $a^k \\equiv 1 (mod \\ n)$ i piszemy $Ord_n(a) = k.$ Jasne jest, że $Ord_n(a) \\leqslant \\phi(n),$ ponieważ zachodzi $a^{\\phi(n)} \\equiv 1 (mod \\ n).$ Okazuje się ponadto, że $Ord_n(a)$ musi dzielić $\\phi(n).$ Dlaczego tak jest? Wiemy, że wszystkie spośród liczb $a^Ord_n(a), a^{2\\cdot Ord_n(a)}, a^{3\\cdot Ord_n(a)}, a^{4\\cdot Ord_n(a)} ... $ są równe $1.$ Gdyby $Ord_n(a)$ nie było dzielnikiem $\\phi(n),$ to mielibyśmy dwie jedynki oddalone o mniej niż $Ord_n(a).$ To oznacza, że długość cyklu reszt musi być mniejsza niż $Ord_n(a),$ co powoduje sprzeczność z faktem, że $Ord_n(a)$ jest najkrótszą możliwą długością cyklu reszt.
![Rząd a cykle potęgowania](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ceb6fb0e5a5f23527c9bc928ce8c26b8.png)


## Test pierwszości Fermata

Umiemy już sprawdzać, czy liczba jest pierwsza w $O(\\sqrt n).$ Czasem potrzebujemy jednak sprawdzać pierwszość większych liczb -- co wtedy? Z pomocą przychodzą nam bardziej zaawansowane testy pierwszości. Jednym z nich jest test Fermata.


Na mocy małego twierdzenia Fermata wiemy, że jeśli $p$ jest liczbą pierwszą, to dla każdego $a$ takiego, że $1\\leqslant a\\leqslant p-1$ zachodzi $a^{p-1} \\equiv 1 (mod p).$ W takim razie, możemy wylosować $a,$ a następnie przy pomocy szybkiego potęgowania sprawdzić, czy ta własność faktycznie zachodzi. Jeśli nie, to liczba $n$ <i>z pewnością</i> nie jest pierwsza. Co jednak, gdy po wielu takich testach nie udało nam się znaleźć kontrprzykładu? Wówczas liczba $n$ <i>z dużym prawdopodobieństwem</i> jest pierwsza.


Niestety, istnieją liczby, które nie są pierwsze, a spełniają warunek małego twierdzenia Fermata dla każdego $1\\leqslant a\\leqslant n-1.$ Są one nazywane liczbami Carmichaela. Nie jest ich dużo, jednak są istotną przeszkodą w bezpiecznym używaniu testu pierwszości Fermata, ponieważ powodują zwrócenie błędnego wyniku. Z tego powodu test pierwszości Fermata nie jest powszechnie stosowany.


## Test pierwszości Millera - Rabina

Znacznie częściej stosowany jest natomiast test Millera - Rabina. Na początek kilka obserwacji:

- Jeśli $n$ jest bardzo małe, możemy sprawdzić jego pierwszość algorytmem brutalnym.

- Jeśli $n > 2$ i $n$ jest parzyste, to $n$ z pewnością liczbą pierwszą nie jest.

- W przeciwnym wypadku $n$ jest nieparzyste, czyli $n-1$ jest parzyste.

Powtórzymy pewną procedurę $k$ razy, podobnie jak w teście Fermata. Im większe $k,$ tym większa dokładność. $K = 30$ wystarcza w zupełności, o czym więcej powiemy później.


Zapiszmy najpierw $n-1$ jako $2^r \\cdot d,$ gdzie $r$ jest największą potęgą dwójki dzielącą $n-1.$ Dlaczego skupiamy się na $n-1$? Małe twierdzenie Fermata nam podpowiedziało. Skupimy się na wystąpieniu jedynek. 


Wylosujmy $a$ takie, że $2\\leqslant a\\leqslant n-2.$ Na początku obliczymy $a^d (mod \\ n).$ Jeśli ta liczba jest równa $1$ lub $-1$ (pamiętajmy, że $-1$ to to samo co $n-1$ mod $n$), to nic ciekawego nie uzyskamy -- przerywamy sprawdzanie. W przeciwnym wypadku będziemy podnosić liczbę do kwadratu, dopóki wykładnik $d$ spełnia $d \\neq n-1.$ Zauważmy, że jeśli napotkamy po drodze liczbę $1,$ to już do końca tej operacji będziemy otrzymywać liczbę $1$ (bo $1\\cdot 1=1$). Ponadto, jeśli napotkamy po drodze liczbę $-1,$ to od następnej operacji będziemy otrzymywać liczbę $1$ (bo $(-1)\\cdot(-1) =1$). 


Zauważmy, że jeśli napotkamy szybciej $1$ niż $-1,$ to $-1$ w ogóle nie wystąpi (bo już do końca będą jedynki). Ponadto, jeśli znajdziemy pierwsze wystąpienie jedynki, to $-1$ <i>musi</i> wystąpić dokładnie przed nim (bo dla $n$ będącego liczbą pierwszą jeśli zachodzi $a^2=1,$ to zachodzi też $(a-1)\\cdot(a+1)=0,$ czyli $a=1$ lub $a=-1.$ To pozwala nam stwierdzić, że jeśli napotkamy szybciej $1$ niż $-1,$ to $n$ z pewnością nie jest liczbą pierwszą.


Dodatkowo, może się okazać, że po skończeniu procedury nie napotkaliśmy ani $1,$ ani $-1.$ To oznacza, że $a^{n-1} \\neq 1 (mod \\ n),$ czyli $n$ również nie może być pierwsze. To pozwala nam dość prosto zapisać schemat funkcji sprawdzającej w algorytmie Millera - Rabina.


### Implementacja

```cpp=

bool oneIteration (long long n) { //zwraca false jesli n nie jest pierwsze

	long long a = random(2, n - 2), r = 0, d = n;

	while (d % 2 == 0) {

		d /= 2;

		r ++;

	}
	
	long long x = potmod(a, d, n)%n; //pamietajmy ze -1 to n-1

	if (x == 1 || x == n-1)

		return true; //tutaj to nam nic nie da

	while (d != n-1) {

		x = (x*x) % n;

		d *= 2;

		if (x == 1)

			return false; //1 szybciej niz -1

		if (x == n-1)

			return true; //nie udalo sie znalezc :/

	}

	return false;

}


bool millerRabin (long long n, int k) { //sprawdza, czy n jest pierwsze

	if (n == 2)

		return true;

	if (n < 2 || n % 2 == 0)

		return false;

	for (int step = 1; step <= k; step ++)

		if (oneIteration(n) == false)

			return false;

	return true;

}

```


### Analiza algorytmu Millera-Rabina

Jak szybko działa algorytm Millera - Rabina? Możemy powołać się na publikację, w której jest dowiedzione, że jeśli $n$ jest złożone, to jeden krok sprawdzania tego algorytmu zakwalifikuje je jako złożone z prawdopodobieństwem większym niż $\\frac{3}{4}.$ Z tego powodu rozsądnym wydaje się wybór $k=30.$


Wykonujemy procedurę sprawdzenia $k$ razy, a jej działanie możemy oszacować przez $O(log \\ n).$ Jest jednak drobny szczegół -- zwykle kiedy już musimy użyć tego testu pierwszości, $n$ do sprawdzenia jest znacząco większe niż $10^9.$ To może oznaczać, że mnożenie dwóch liczb przekręcałoby nam long longa. Rozwiązania są dwa: używamy algorytmu ruskich chłopów do mnożenia dwóch liczb dokładnie w ten sam sposób jak potęgowania modulo lub decydujemy się na użycie typu $128$--bitowego. Nie wszystkie środowiska dopuszczają to drugie rozwiązanie.


## Rozszerzony algorytm Euklidesa

Algorytm Euklidesa służył nam do policzenia największego wspólnego dzielnika dwóch liczb i był jednym z bardziej standardowych algorytmów. Okazuje się, że możemy go nieznacznie usprawnić, aby rozwiązywał nieco trudniejszy problem:


Mając dane $a, b$ znajdź $x, y$ takie, że $a\\cdot x + b\\cdot y = NWD(a, b)$


Przypomnijmy implementację standardowego algorytmu Euklidesa.


```cpp=

typedef long long int LL;

typedef pair <LL, LL> PLL; //dla latwiejszego zapisu

PLL gcd(LL a, LL b) {

	if (b == 0)

		return a;

	return

		gcd(b, a%b);

}

```


Zauważmy, że gdy zachodzi brzegowy przypadek $b=0$ to rozwiązaniem równania $a\\cdot x + b\\cdot y = NWD(a, b)$ jest para ($1, 0$). W przeciwnym wypadku możemy wywołać nasz algorytm rekurencyjnie, a następnie zaktualizować policzone wartości. 


Pamiętamy, że zachodzi wzór: $a \\% b + b\\cdot \\lfloor \\frac{a}{b} \\rfloor = a.$ Zauważmy, że jeśli ma zachodzić $a\\cdot x + b\\cdot y = NWD(a, b),$ a mamy też $a_1\\cdot x_1 + b_1\\cdot y_1 = NWD(a_1, b_1),$ to ponieważ NWD się nie zmienia, zachodzi równość $a\\cdot x + b\\cdot y = a_1\\cdot x_1 + b_1\\cdot y_1.$ Ze sposobu działania algorytmu Euklidesa znamy jednak $a_1$ i $b_1$ -- są to $b$ i $a \\% b,$ odpowiednio. Podstawmy to do wzoru:


$a\\cdot x + b\\cdot y = b\\cdot x_1 + (a - b \\cdot \\lfloor\\frac{a}{b}\\rfloor)\\cdot y_1$


$a\\cdot x + b\\cdot y = a\\cdot y_1 + b\\cdot x_1 - b \\cdot \\lfloor\\frac{a}{b}\\rfloor\\cdot y_1$


$a\\cdot x + b\\cdot y = a\\cdot y_1 + b\\cdot (x_1 - \\lfloor\\frac{a}{b}\\rfloor\\cdot y_1$)


Nietrudno zauważyć, że równanie spełnione jest przez $x$ równe $y_1$ oraz $y$ równe $x_1 - \\lfloor \\frac{a}{b} \\rfloor \\cdot y_1.$ Nietrudno zaimplementować powyższe spostrzeżenie w identyczny sposób, jak zwykły algorytm Euklidesa, zachowując złożoność obliczeniową.


```cpp=

typedef long long int LL;

typedef pair <LL, LL> PLL; //dla latwiejszego zapisu

PLL extgcd(LL a, LL b) {

	if (b == 0)

		return make_pair(1, 0);

	PLL res = extgcd(b, a % b);

	return make_pair(res.second, res.first - (a/b) * res.second);

}

```


Rozszerzony algorytm Euklidesa możemy wykorzystać do znajdowania odwrotności modulo i rozwiązywania niektórych równań w liczbach całkowitych.


## Zadania

- [Najdzielniejszy dzielnik (XVII OI, I etap)](https://szkopul.edu.pl/problemset/problem/9G-lSeJl2QmOnKQprRR4ZJZv/site/?key=statement)

- [Skoczki (XII OI, I etap)](https://szkopul.edu.pl/problemset/problem/3BGAy8SxgAh6ZUiC_GwpDKxh/site/?key=statement)

- [Kurs szybkiego czytania (XXII OI, II etap)](https://szkopul.edu.pl/problemset/problem/vX48bEW0i5IRszoCOP_f78Dc/site/?key=statement)

"
---
