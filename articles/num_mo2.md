---
title: 'Arytmetyka modulo 2'
content: "
## Co to jest generator?
Generatorem modulo liczba pierwsza $p$ nazywamy taką liczbę $g > 0,$ że $g, g^2, g^3, g^4, ... , g^{p-1}$ przyjmuje wszystkie możliwe reszty modulo $p,$ każdą dokładnie raz. Przykładowo, $2$ nie jest generatorem modulo $7,$ ale $3$ już tak.
![3 jest generatorem modulo 7](https://codimd.s3.shivering-isles.com/demo/uploads/upload_48620c837e5604b2a60bcbce90d8fc72.png)
Generator nazywa się też czasem pierwiastkiem pierwotnym.

## Liczenie generatora
Generatory mają ciekawe własności. Niestety, nie przydałoby się to nam, jeśli nie potrafilibyśmy takiego generatora znaleźć. Z pomocą przychodzi nam algorytm probabilistyczny. Okazuje się bowiem, że generatory nie tylko istnieją, ale jest ich dużo. Dokładniej, jest ich $\\phi(p-1).$ Pomysł na efektywny algorytm szukania generatora: dopóki nie znajdziemy generatora, <b>losujemy</b> dowolną resztę modulo $p$ i sprawdzamy czy spełnia warunki generatora.

### Sprawdzanie, czy liczba jest generatorem
Pozostało nam jeszcze szybkie sprawdzanie kandydata $x$ na generator. Można by oczywiście sprawdzić po kolei każdą potęgę $x$ -- ale to raczej nieoptymalne.

W pierwszej części tego artykułu nauczyliśmy się, że kolejne potęgi $x$ modulo $p$ układają się w cykl. Liczba $x$ będzie więc generatorem wtedy i tylko wtedy, gdy długość cyklu wyniesie dokładnie $p-1.$ Dłuższa niż $p-1$ być nie może -- to wiemy z małego twierdzenia Fermata. Wystarczy więc sprawdzić, czy pierwsze wystąpienie jedynki ($x^a=1$ (mod p)) znajduje się wcześniej, niż dla $a=p-1.$ Jeśli nie -- to znaleźliśmy generator.

Jak to sprawdzić? Długość cyklu (czyli tak naprawdę $ord_p(x)$) musi dzielnikiem $p-1.$ Wystarczy przed rozpoczęciem szukania generatorów rozłożyć $p-1$ na czynniki pierwsze. Mając liczby pierwsze $q$ dzielące $p-1$ możemy łatwo sprawdzić dla każdego z nich, czy $x^q=1$ (mod p).

### Analiza i implementacja
Trudno oszacować złożoność tego algorytmu. Po pierwsze losujemy, a po drugie jedne liczby mają więcej dzielników pierwszych, inne mniej. Tak czy inaczej, jedno sprawdzenie kosztuje nas $O((log \\ p)^2),$ a szansę na trafienie generatora przy jednym strzale mamy $\\frac{\\phi(p-1)}{p-1}.$ Podobnie jak w wypadku testu Millera - Rabina, strzelanie kończy się znacznie szybciej, niż moglibyśmy przypuszczać.

```cpp=
vector <int> primes; //tu powinny wczesniej
		     //byc dzielniki pierwsze liczby p-1
bool isGenerator (int x, int p) {
	for (int i = 0; i< primes.size(); i ++)
		if (potmod(x, primes[i], p) == 1)
			return 0;
	return 1;
}

int findGenerator(int p) {
	while (true) {
		int x = random(2, p - 1);
		if (isGenerator(x, p))
			return x;
	}
}
```

## Zastosowanie generatorów
Logarytmem z liczby $a$ przy podstawie $b$ nazywamy taką liczbę $c,$ że $b^c = a.$ Podobny logarytm możemy zdefiniować w arytmetyce modulo (będziemy nazywać go dyskretnym). Nauczymy się znajdować logarytm dyskretny modulo liczba pierwsza $p$ przy pomocy generatora. 

Mamy dane $a, b$ i chcemy znaleźć takie $c,$ że $b^c=a.$ Dlaczego generatory są takie fajne? Dzięki nim możemy zamiast o różnych liczbach modulo myśleć o różnych potęgach jednej liczby. Mając generator $g$ możemy przedstawić $a$ jako $g^k$ i $b$ jako $g^l.$ Liczby $k,l$ będą jednoznacznie wyznaczone, ponieważ dla każdej reszty modulo istnieje dokładnie jedna potęga $g,$ która jest jej równa. W takim razie równanie zapiszemy jako $(g^l)^c = g^k,$ czyli $(g^{l\\cdot c} = g^k$ (oczywiście modulo $p$). Ponownie, $g$ przechodzi przez każdą resztę raz, więc $l \\cdot c = k$ (modulo $p-1$). Mając $k, l$ interesuje nas $c$ równe $\\frac{k}{l}$ (modulo $p-1$). A właściwie skąd się wzięło $p-1$? Jeśli nie jesteś pewien, spójrz na sekcję <b>Modulowanie wykładnika</b> z pierwszego artykułu. Odwrotność modulo umiemy już znajdować, więc problem będzie szybko rozwiązany, jeśli uda nam się znaleźć odpowiednie $k,l.$

### Logarytm dyskretny
Aktualnie postawiony przed nami problem wygląda następująco: mamy znaleziony generator $g$ i jakąś liczbę $x.$ Interesuje nas znalezienie odpowiadającej $x$ potęgi generatora, czyli takiego $k,$ że $g^k=x$ (mod p). 

Niech $s$ = $\\sqrt p + 1.$ Zrobimy coś na kształt zamiany systemu liczbowego na system o podstawie $s.$ Rozważmy zbiór $A$ składający się z liczb $g^0, g^1, g^2, ..., g^s.$ Zawiera on $O(s)$ elementów. Ponadto, wybierzemy sobie zbiór $B$ składający się z liczb $g^s,$ $g^{2\\cdot s},$ $g^{3\\cdot s},$ $g^{4\\cdot s},$ ... , $g^{s\\cdot s}.$ On również składa się z $O(s)$ elementów. 

![Potęgowanie z pierwiastkiem - tabela mnożenia](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3d2c3b639417975430706535d47d8712.png)

Zauważmy, że każdą liczbę $u$ z przedziału $<1, p-1>$ da się przedstawić jako $a\\cdot s + b,$ podobnie też zachowają się wykładniki (mnożenie liczb to dodawanie wykładników $g$). Wobec tego, sprowadziliśmy nasz problem do znalezienia takich $a, b,$ że $a \\in A, b\\in B$ i $a\\cdot b = x$ (mod p). Aby temu sprostać, rozważymy każdą możliwą liczbę $a$ ze zbioru $A,$ ich jest $O(\\sqrt p).$ Skoro mamy ustalone $a$ oraz $x,$ a ma zachodzić $a\\cdot b = x,$ to $b = \\frac{x}{a}.$ Dzielić modulo $p$ umiemy aż za łatwo, więc wystarczy sprawdzić, czy $\\frac{x}{a}$ znajduje się w zbiorze $B.$ To możemy zrobić jakkolwiek -- gąsienicą, binary searchem, setem, mapą...

## Zadania
- [Lunar New Year and a Recursive Sequence (Codeforces, Div. 2 F)](https://codeforces.com/contest/1106/problem/F)

"
---
