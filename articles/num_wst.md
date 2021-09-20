---
title: 'Wstęp do teorii liczb'
content: "
Zapewne wiesz, czym są liczby. Co więcej: umiesz je dodawać, odejmować, mnożyć i dzielić oraz zdajesz sobie sprawę z tego, że ostatnie z wyżej wymienionych działań czasem pozostawia resztę. Teoria Liczb jest działem matematyki, który zajmuje się badaniem zależności między liczbami. Jest bardzo przydatna w informatyce, dlatego poświęcimy na nią kilka artykułów.

## Jednoznaczność rozkładu na czynniki pierwsze
Niech $n > 1$ będzie liczbą całkowitą. Wtedy zawsze da się je jednoznacznie rozłożyć na czynniki pierwsze: $$n = p_1 ^ {\\alpha_1} \\cdot p_2 ^ {\\alpha_2} \\cdot p_3 ^ {\\alpha_3} \\cdot\\ ... \\cdot p_k ^ {\\alpha_k}$$ Innymi słowy, jeśli rozłożymy liczbę na czynniki pierwsze to niezależnie od tego jak to zrobimy, za każdym razem będą one tymi samymi liczbami pierwszymi i każda z nich wystąpi dokładnie tyle samo razy.

## Największy Wspólny Dzielnik
Największy wspólny dzielnik ($NWD$) $a$ i $b$ to największa taka liczba $d,$ że zarówno $a,$ jak i $b,$ są podzielne przez $d.$ Jeśli $d$ = $1,$ $a$ i $b$ nie mają żadnego wspólnego dzielnika oprócz jedynki. Mówimy wtedy, że $a$ i $b$ są względnie pierwsze. Przyjmijmy bez straty ogólności, że $a$ $\\ge$ $b.$ Niech $a = kd$ i $b = ld,$ gdzie $l$ i $k$ są względnie pierwszymi liczbami całkowitymi. Zauważmy, że $d\\ |\\ dk\\ –\\ dl\\ =\\ d(k\\ –\\ l),$ zatem: $$NWD(a,\\ b)\\ =\\ NWD(a,\\ b\\ –\\ a)$$ Oczywiście $NWD(a, 0)$ $=$ $a.$ Ta zależność pozwala nam na skonstruowanie prostego algorytmu, który odejmuje od większej z liczb $a,$ $b$ mniejszą tak długo, aż jedna z nich nie będzie równa zero. Wtedy druga będzie równa ich największemu wspólnemu dzielnikowi.

```cpp=
int NWD (int a,int b) {
	while (a > 0 && b > 0)
		if(a > b)
			a -=b;
		else
			b -= a;
	return a + b;
}
```

### Algorytm Euklidesa

Załóżmy, że w obecnym kroku algorytmu $a\\ \\leq\\ b.$ Wówczas będziemy odejmowali $b$ od $a$ tak długo, aż nie będzie od niego mniejsze. Zauważmy, że na końcu tych operacji pozostanie $a –\\ bx,$ gdzie $x$ jest liczbą całkowitą, $a \\geq\\ bx$ i $a\\ <\\ b(x\\ +\\ 1).$ Zauważmy, że $a\\ –\\ bx\\ =\\ a\\ –\\ b\\ \\cdot\\ \\lfloor\\dfrac{a}{b} \\rfloor\\ =\\ (a\\ mod\\ b).$ Możemy zamienić operacje odejmowania na modulo.

#### Implementacja:
```cpp=
int NWD (int a,int b) {
	while(a > 0 && b > 0)
		if(a > b)
			a %= b;
		else
			b %= a;
	return a + b;
}
```

Wyżej przedstawiony algorytm nazywa się <b>Algorytmem Euklidesa</b> i działa w czasie $O(log\\ n).$

<b>Dowód</b>: Zauważmy, że liczba wykonanych operacji zależy od tego, jak szybko zmniejszają się wartości $a$ i $b.$ Ponieważ $(a\\ mod\\ b)\\ <\\ b\\ \\cdot\\ \\lfloor\\dfrac{a}{b} \\rfloor$ oraz $a = b\\ \\cdot\\ \\lfloor\\dfrac{a}{b} \\rfloor\\ +\\ (a\\ mod\\ b)$ to: $$a\\ (mod\\ b)\\ <\\ \\frac{a}{2}$$ Z tego wynika, że za każdym obrotem pętli jedna z wartości $a,$ $b$ zmniejsza się przynajmniej dwukrotnie, co oznacza, że algorym działa w czasie $O(log\\ n).$

## Najmniejsza Wspólna Wielokrotność
Najmniejsza wspólna wielokrotność ($NWW$) liczb $a$ i $b,$ to najmniejsza taka liczba $D,$ której dzielnikami są $a$ i $b.$ $D$ musi zawierać w swoim rozkładzie na liczby pierwsze wszystkie czynniki pierwsze $a$ oraz $b.$ Dzieje się tak, ponieważ rozkład na czynniki pierwsze jest jednoznaczny. Jeśli $$n = p_1 ^ {\\alpha_1} \\cdot\\ p_2 ^ {\\alpha_2} \\cdot\\ ... \\cdot p_k ^ {\\alpha_k}$$ $$b = p_1 ^ {\\beta_1} \\cdot p_2 ^ {\\beta_2} \\cdot\\ ... \\cdot p_k ^ {\\beta_k}$$ gdzie niektóre z wartości $\\alpha_i$ i $\\beta_i$ mogą być równe zero to wtedy: $$D = p_1 ^ {max(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {max(\\alpha_2, \\beta_2)} \\cdot\\  ... \\cdot\\ p_k ^ {max(\\alpha_k, \\beta_k)}$$ Zauważmy, że: $$NWD(a,\\ b) = p_1 ^ {min(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {min(\\alpha_2, \\beta_2)} \\cdot\\ ... \\cdot\\ p_k ^ {min(\\alpha_k, \\beta_k)}$$ z kolei: $$ab = p_1 ^ {\\alpha_1\\ +\\ \\beta_1} \\cdot\\ p_2 ^ {\\alpha_2\\ +\\ \\beta_2} \\cdot\\ ... \\cdot\\ p_k ^ {\\alpha_k\\ +\\ \\beta_k}\\ =$$ $$=\\ p1 ^ {min(\\alpha_1,\\ \\beta_1)} \\cdot\\ p1^{max(\\alpha_1,\\  \\beta_1)} \\cdot\\ p_2 ^{min(\\alpha_2,\\ \\beta_2)} \\cdot\\ p_2 ^ {max(\\alpha_2, \\beta_2)} \\cdot\\ ... \\cdot\\ p_k ^ {max(\\alpha_k,\\ \\beta_k)} \\cdot\\ p_k ^ {min(\\alpha_k,\\ \\beta_k)}$$ Oznacza to, że:

$$\\frac{ab}{NWD(a,\\ b)}\\ =$$
$$=\\ \\frac{p_1 ^ {\\alpha_1\\ +\\ \\beta_1} \\cdot\\ p_2 ^ {\\alpha_2 +\\ \\beta_2} \\cdot\\ ... \\cdot\\ p_k ^ {\\alpha_k\\ +\\ \\beta_k}}{p_1 ^ {min(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {min(\\alpha_2, \\beta_2)} \\cdot\\ ... \\cdot p_k ^ {min(\\alpha_k, \\beta_k)}}\\ =$$
$$=\\ \\frac{p1 ^ {min(\\alpha_1,\\ \\beta_1)} \\cdot\\ p1^{max(\\alpha_1,\\  \\beta_1)} \\cdot\\ p_2 ^{min(\\alpha_2,\\ \\beta_2)} \\cdot\\ p_2 ^ {max(\\alpha_2, \\beta_2)} \\cdot\\ ... \\cdot\\ p_k ^ {min(\\alpha_k,\\ \\beta_k)} \\cdot\\ p_k ^ {max(\\alpha_k,\\ \\beta_k)}}{p_1 ^ {min(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {min(\\alpha_2, \\beta_2)} \\cdot\\ ... \\cdot p_k ^ {min(\\alpha_k, \\beta_k)}}\\ =$$
$$=\\ \\frac{p_1 ^ {min(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {min(\\alpha_2, \\beta_2)} \\cdot\\ ... \\cdot\\ p_k ^ {min(\\alpha_k, \\beta_k)} \\cdot\\ p_1 ^ {max(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {max(\\alpha_2, \\beta_2)} \\cdot\\  ... \\cdot\\ p_k ^ {max(\\alpha_k, \\beta_k)}}{p_1 ^ {min(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {min(\\alpha_2, \\beta_2)} \\cdot\\ ... \\cdot\\ p_k ^ {min(\\alpha_k, \\beta_k)}}\\ =$$
$$=\\ p_1 ^ {max(\\alpha_1, \\beta_1)} \\cdot\\ p_2 ^ {max(\\alpha_2, \\beta_2)} \\cdot\\  ... \\cdot\\ p_k ^ {max(\\alpha_k, \\beta_k)}\\ =$$
$$=\\ NWW(a,\\ b)$$

Czyli $$NWW(a,\\ b)\\ =\\ \\frac{ab}{NWD(a,\\ b)}$$

## Sito Erastotenesa
Zdefiniujmy sobie bitset lub tablicę $Sito[].$ Dla liczby całkowitej $x$ z przedziału $[1; n]$ $Sito[x]$ będzie równe $0$ jeśli $x$ jest pierwsze i $1$ w przeciwnym wypadku. Nauczymy się ją wypełniać. Na początku we wszystkich komórkach sita przechowujemy zero.

![Początkowe wartości sita](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4c166ef1d6fd95f8d4215c5f40170608.png)

Ustawmy $Sito[1] = 0.$ Następnie przeglądamy wszystkie kolejne komórki w kolejności rosnących indeksów. Zakładamy, że $Sito[i]$ jest zgodne ze swoją definicją. Jeśli $Sito[i] = 0,$ $i$ jest pierwsze. Wszystkie liczby podzielne przez $i$ to $i,$ $2i,$ $3i,$ $4i,$ $5i$ ... Oznacza to, że $2i,$ $3i,$ $4i,$ $5i$ ... są złożone. Podstawimy więc pod $Sito[2i],$ $Sito[3i],$ $Sito[4i],$ $Sito[5i]$ ... 1.

![Zaktualizowane sito po uwzględnieniu 2](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c39a4249c63d624aff53af9b2f9f9542.png)

Jako, że przeglądamy komórki sita w kolejności rosnących indeksów, zanim dojdziemy do $a$-tej, najpierw musieliśmy przejrzeć te, o numerach równych dzielnikom pierwszym $a.$ Oznacza to, że jeśli jakikolwiek taki istnieje to kiedy go przetwarzaliśmy, ustawiliśmy $Sito[a] = 1.$ W przeciwnym wypadku $a$ jest pierwsze, a $Sito[a]$ pozostaje zerem. Złożoność tego algorytmu to $O(n\\ log\\ log\\ n).$

#### Implementacja:
```cpp=
void sito() {
	for (int i = 2; i <= n; i++) {
		if (Sito[i] == 0) {
			j = 2 * i;
			while (j <= n) {
				Sito[j] = 1;
				j += i;
			}
		}
	}
}
```

### Zastosowanie: znajdowanie dzielników pierwszych liczby
Przy niedużych modyfikacjach sito może pomóc nam znaleźć wszystkie dzielniki pierwsze każdej liczby z przedziału $[1; n].$ Zauważmy, że aby uzyskać odpowiedni algorytm należy po prostu przy każdym obrocie pętli w linijce zapisywać informację, że $i$ jest dzielnikiem pierwszym $j.$

```cpp=
while (j <= n) {
	Sito[j] = 1;
	Dzielniki
	pierwsze[j].push_back(i);
	j += i;
}
```

Jeżeli chcielibyśmy znaleźć wszystkie dzielniki, a nie tylko pierwsze, możemy dodatkowo pozbyć się linijki ```if (Sito[i] == 0)``` Ów algorytm będzie działać, ponieważ dla każdego i zapiszemy, że $2i,$ $3i,$ $4i,$ $5i$ ... ma dzielnik $i.$ Niestety złożoność obliczeniowa zmieni się na niekorzyść. Zauważmy, że w $i$-tym obrocie głównej pętli wykonamy $O(\\frac{n}{i})$ operacji, dlatego cały algorytm kosztuje $O(n\\ +\\ \\frac{n}{2}\\ +\\ \\frac{n}{3}\\ +\\ \\frac{n}{4}\\ +\\ ...\\ +\\ 1)\\ \\sim\\ O(n\\ log\\ n),$ co dalej jest bardzo satysfakcjonujące.

## Duży dzielnik pierwszy
<b>Twierdzenie</b>: Żadna liczba $n$ nie ma więcej niż jednego dzielnika pierwszego $P$ takiego, że $P  > \\sqrt{n}.$
<b>Dowód</b>: Załóżmy, że istnieją dwie liczby pierwsze $p$ i $q$ takie, że $p\\ \\mid\\ n$ i $q\\ \\mid\\ n$ oraz $p,$ $q > \\sqrt{n}.$ Wówczas
z jednoznaczności rozkładu wiemy, że $n = pqk,$ gdzie $k$ jest liczbą naturalną. $$p > \\sqrt{n}$$ $$q > \\sqrt{n}$$ $$pq > n = pqk$$ Otrzymujemy sprzeczność.

## Sprawdzanie, czy liczba jest pierwsza
Gdy chcemy dowiedzieć się, czy liczba $n$ jest pierwsza, możemy sprawdzić wartość $Sito[n].$ Jednakże to podejście wymaga wcześniejszego zbudowania sita, co dla wystarczająco dużych $n$ byłoby nie do uzyskania. Z pomocą przychodzi twierdzenie o dużym dzielniku pierwszym. Zauważmy, że jeśli liczba $n$ ma tylko jeden dzielnik pierwszy $p$ to $n = p$ i $n$ jest pierwsze. W przeciwnym wypadku $n$ posiada dzielnik pierwszy mniejszy lub równy $\\sqrt{n}$ i jest złożone. Możemy zaimplementować algorytm, który brutalnie sprawdza czy $i\\ \\mid\\ n$ dla każdego $i \\leq \\sqrt{n}.$ Złożoność czasowa takiego rozwiązania wyniesie $O(\\sqrt{n}).$

```cpp=
bool pierwsze (int n) {
	for (int i = 2; i * i <= n; i ++)
		if (n % i == 0)
			return false;
	return true;
}
```

## Faktoryzacja
Faktoryzacja to inaczej <b>rozkład liczby na czynniki pierwsze.</b> Będziemy chcieli ją teraz znaleźć. $$n = p_1 ^ {\\alpha_1} \\cdot\\ p_2 ^ {\\alpha_2} \\cdot\\ ... \\cdot\\ p_k ^ {\\alpha_k}$$ Załóżmy bez straty ogólności, że $p_1 < p_2 < ... < p_k.$ Najmniejszym dzielnikiem $n$ jest $p_1.$ Znajdźmy je, brutalnie sprawdzając, czy kolejne liczby naturalne dzielą $n.$ Następnie podzielmy $n$ przez $p_1 ^ {\\alpha_1}.$ $$\\frac{n}{p_1^{\\alpha^1}} = p_2 ^ {\\alpha_2} \\cdot\\ ... \\cdot\\ p_k ^ {\\alpha_k}$$

Znajdźmy teraz $p_2,$ brutalnie sprawdzając czy kolejne liczby naturalne większe od $p_1$ dzielą n...

Powyższy algorytm będziemy powtarzać tak długo, aż $n$ jest równe $1$ lub nie sprawdzimy czy $\\sqrt{n}$ $\\mid$ $n.$ W pierwszym przypadku znaleźliśmy naszą faktoryzację, więc możemy zakończyć obliczenia. Natomiast do drugiego dojdzie wtedy, gdy znajdziemy już wszystkie takie $p_i,$ że $p_i\\ \\leq\\ \\sqrt{n}.$ Z twierdzenia o dużym dzielniku pierwszym wiemy, że może istnieć tylko jedno takie $p_j,$ że $p_j > \\sqrt{n}.$ Wówczas: $$\\frac{n}{p_1 ^ {\\alpha_1} \\cdot p_2 ^ {\\alpha_2} \\cdot\\ ... \\cdot\\ p_{k-1} ^ {\\alpha_{k-1}}} = p_k ^ {\\alpha_k}$$ należy dodać do faktoryzacji. Powyższy algorytm działa w czasie $O(\\sqrt{n})$ i jest po prostu cudowny.

#### Implementacja:
```cpp=
vector <int> faktoryzuj (int n) {
	vector <int> faktoryzacja;
	int N = n;
	for ( int i = 2; i*i <= N; i ++)
		while (n % i == 0) {
			n /= i;
			faktoryzacja.push_back(i);
		}
	if (n != 1)
		faktoryzacja.push_back(n);
	return faktoryzacja;
}
```

## Znajdowanie wszystkich dzielników
Na koniec nauczmy się znajdować wszystkie dzielniki liczby $n.$ Niech $d$ będzie liczbą naturalną taką, że $d\\ \\mid\\ n.$ Dla każdego takiego $d$ istnieje $k\\ =\\ \\frac{n}{d}$ również będące liczbą naturalną. Ponadto $d\\ =\\ \\frac{n}{k},$ więc $k\\ \\mid\\ n.$ Załóżmy, że $k\\ \\geq\\ d.$ Wówczas $k\\ \\geq\\ \\sqrt{n}$ i $d\\ \\leq\\ \\sqrt{n}.$

<b>Dowód</b>: Gdyby tak nie było, to $k$ i $d$ byłyby albo obie mniejsze niż $\\sqrt{n}$ albo obie większe niż $\\sqrt{n}.$ Rozważmy oba przypadki: $$k\\ >\\ \\sqrt{n}$$ $$d\\ >\\ \\sqrt{n}$$ $$k\\ \\cdot\\ d\\ >\\ n$$ Orzymujemy sprzeczność! $$k\\ <\\ \\sqrt{n}$$ $$d\\ <\\ \\sqrt{n}$$ $$k\\ \\cdot\\ d\\ <\\ n$$ Orzymujemy sprzeczność!

Z powyższego rozumowania wynika, że dla każdego $d\\ \\leq\\ \\sqrt{n}$ i będącego dzielnikiem $n$ istnieje dzielnik równy $\\frac{n}{d} \\geq \\sqrt{n}.$ To znaczy, że możemy dla każdego $i$ z przedziału $[1; \\sqrt{n}]$ sprawdzić czy $i\\ \\mid\\ n.$ Jeśli $i\\ \\mid\\ n$ to dzielnikami $n$ będą $i$ oraz $\\frac{n}{i}.$ W ten sposób znajdziemy je wszystkie w czasie $O(\\sqrt{n}).$

## Zadania
- [Podzielność (XXIV OI, I etap)](https://szkopul.edu.pl/problemset/problem/cSnlafnvkbirhnQrS9CQ9MEw/site/?key=statement)
- [Liczby B-gładkie (IX OI, III etap)](https://szkopul.edu.pl/problemset/problem/VBw12Ev-eDIXnziDWIE9jqVX/site/?key=statement)
- [Gra w dzielniki (X OI, III etap)](https://szkopul.edu.pl/problemset/problem/Nuzr3WcSxrZWjKLJuI9s74Jn/site/?key=statement)
"
---
