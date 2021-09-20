---
title: 'Algorytm Karpa-Millera-Rosenberga'
content: "
Na ostatniej lekcji nauczyłeś się porównywać słowa za pomocą haszowania. Dzisiaj dowiesz się jak to robić innym sposobem. Mimo, że jest zarówno trudniejszy w implementacji jak i lekko wolniejszy, to warty uwagi. Istnieje wiele zadań, w których zastosowanie go jest prostsze. Dodatkowo, w odróżnieniu od haszowania, zawsze działa. Przydaje się także w konstrukcji Tablicy Sufiksowej, o której będzie następna lekcja.

## Algorytm Karpa-Millera-Rosenberga
Algorytm Karpa-Millera-Rosenberga (w skrócie KMR), zwany również Słownikiem Podsłów Bazowych, umożliwia porównywanie podsłów słowa $S$ w złożoności czasowej i pamięciowej $O(n \\cdot log \\ n).$

Zupełnie jak w haszowaniu będziemy chcieli przyporządkować tekstom liczby. Takie same podsłowa powinny mieć przyporządkowaną tę samą liczbę. Każde podsłowo powinno mieć przyporządkowaną mniejszą liczbę od późniejszych leksykograficznie i większą od wcześniejszych. KMR zachowuje te relacje między podsłowami o równych długościach, co umożliwia ich porównywanie. Zauważmy, że słowa o różnych długościach nigdy nie są takie same, więc ten przypadek można sprawdzić osobno.

Jako, że wszystkich podsłów jest rzędu $O(n^2),$ nie możemy sobie pozwolić na przetworzenie wszystkich. Z tego powodu, na początku, zajmiemy się tylko tymi, których długość jest potęgą dwójki. Na każdej z n pozycji S może znajdować się jedno podsłowo długości $2^k$ $(k \\leq logn).$ Oznacza to, że tych podsłów jest $O(nlogn).$

Niech $KMR[x][k]$ oznacza wartość przyporządkowaną podsłowu mającemu długość $2^k$ i znajdującemu się na $x$-tej pozycji $S.$ Algorytm zaczynamy od podsłów długości $2^0 = 1,$ czyli od pojedynczych liter. Każdemu znakowi ’a’ przyporządkujemy 1, ’b’ - 2, ’c’ - 3, aż do ’z’, któremu przypiszemy 26.

![Przyorządkowywanie liczb](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c070c7f083f8cda1d690a5284afa4bce.png)


Zauważmy, że dla każdego $k$ zachodzi: $2^{k-1} + 2^{k-1} = 2^k.$ Oznacza to, że łącząc $2$ krótsze podsłowa o długości $2^{k-1}$ otrzymamy podsłowo o długości $2^k.$

![Łączenie podsłów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_61448e79ba8a12cb0e4a8c3bfc64ff97.png)

Sąsiednie litery, a właściwie przyporządkowane im liczby, połączmy w pary. Ostatnia litera musi zostać sparowana ze znakiem pustym znajdującym się na pozycji $n + 1.$

![Pary liter](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6491c50f86ede2eeeeffadb161867033.png)

Zauważmy, że dwa podsłowa o długości $2$ są sobie równe wtedy i tylko wtedy, gdy odpowiadające im pary są takie same. Kiedy pierwsza liczba w parze jest mniejsza, to podsłowo, któremu odpowiada jest wcześniejsze leksykograficznie. Jeśli pierwsze liczby są równe, to późniejsze jest podsłowo, którego druga liczba w parze jest większa.

![Porównywanie par](https://codimd.s3.shivering-isles.com/demo/uploads/upload_31c179e0529742da88f19acdea2bacc2.png)

Posortujmy wszystkie pary. Podsłowom odpowiadającym najmniejszej przyporządkujmy $1,$ podsłowom odpowiadającym drugiej najmniejszej przyporządkujmy $2$ i tak dalej...

![Posortowane pary](https://codimd.s3.shivering-isles.com/demo/uploads/upload_fdc957a3a473968981bfb156af5cedda.png)

Tak oto mamy przyporządkowane liczby do podsłów o długości $2$ - obliczyliśmy wartości $KMR[x][1]$ dla każdego $x \\leq n.$ Poziom $2$ możemy uzupełnić analogicznie. Dla podsłowa znajdującego się na pozycji $x$ utworzymy parę (KMR[x][1], KMR[x + 2][1])$.

![Parowanie par](https://codimd.s3.shivering-isles.com/demo/uploads/upload_91f627f96c168615ae2315fa13b79587.png)

Zauważmy, że możemy teraz przyporządkować podsłowom długości $4$ liczby w analogiczny sposób do tego jakiego użyliśmy dla podsłów o długości $2$:

![Numerowanie par](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a97ab32c1dbe7ab6b0bccaf7faefec13.png)

Co więcej, ta metoda działa dla dowolnego $2^k!$ W celu przyporządkowania liczb podsłowom na poziomie $k$-tym możemy dla każdego $x \\leq n$ utworzyć parę $(KMR[x][k-1], KMR[x+2^k-1][k-1])$ i użyć wcześniej opisanej metody.

Oto uzupełniona tablica KMR dla słowa <b>abcdfabcdef</b>:

![Tablica KMR](https://codimd.s3.shivering-isles.com/demo/uploads/upload_cf38d9042294bb8940cfe8c14a9b09a0.png)

Algorytm dla $logn$ poziomów posortuje $n$ par i przydzieli numery odpowiednim podsłowom. W zależności od zaimplementowanego sortowania złożoność czasowa może się różnić. Gdybyśmy użyli sortowania kubełkowego wyniesie ona $O(nlogn).$ Natomiast dla funkcji sort z STL’a: $O(nlog^2n).$ Mimo, że teoretycznie drugie rozwiązanie powinno być wolniejsze, to przez wysoką efektywność STL’a i tak pozostaje szybsze oraz łatwiejsze w implementacji.

```cpp=
pair <pair <int, int>, pair <int, int> > pomoc[n + 2];
int r = log(n) + 1, pot = 1;
for (int i = 0; i < n; i ++)
	KMR[i][0] = s[i] - ’a’+ 1;
for (int x = 1;x <= r; x ++) {
	for(int i = 0;i < n; i ++) {
		if (i+pot >= n)
			pomoc[i] = make_pair(
				KMR[i][x-1],
				make_pair(-1, i));
		else
			pomoc[i] = make_pair(
				KMR[i][x-1],
				make_pair(KMR[i+pot][x-1], i));
	}
	sort(pomoc,pomoc+n);
	pair <int, int> pom = make_pair(-1,-1);
	int ile = -1;
	for(int i = 0;i < n; i ++) {
		if(pom.first != pomoc[i].first
			|| pom.second != pomoc[i].second.first
		) {
			pom = make_pair(
				pomoc[i].first,
				pomoc[i].second.first);
				++ile;
		}
		KMR[pomoc[i].second.second][x] = ile;
	}
	pot *= 2;
}
```

## Porównywanie podsłów za pomocą KMR
W celu porównania dwóch podsłów o długości $2^k$ znajdujących się kolejno na pozycjach $i$ i $j$ wy-starczy sprawdzić czy $KMR[i][k] = KMR[j][k].$ Co jeśli będziemy chcieli porównać podsłowa, których długość nie jest potęgą dwójki?

![Dwa podsłowa](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ac7d62f870953e4109b74dccadb2d6ab.png)

Niech $a$ będzie długością podsłowa, $x$ pozycją jego początku w $S$ i $y$ pozycją jego końca. Weźmy maksymalne takie $q,$ że $2^q \\leq a.$ Zauważmy, że:  $2^q + 2^q = 2^q+1 > a$ oraz $2^q > \\frac{a}{2}.$

Oznacza to, że gdy weźmiemy podsłowa o długości $2^q$ zaczynające się na pozycji $x$ oraz $y - 2^q + 1,$ to całkowicie pokryją interesujące nas podsłowo i nie wyjdą poza jego ramy. Oznacza to, że dla dwóch podsłów możemy utworzyć pary postaci $(KMR[x][q],KMR[y-2^q+1][q])$ i porównywać je ze sobą.

![Porównywanie podsłów](https://codimd.s3.shivering-isles.com/demo/uploads/upload_0e002c4a1db121a467e2ff3df557fba2.png)

Zauważmy, że oprócz sprawdzania czy podsłowa są równe KMR umożliwia sprawdzenie, które z nich jest wcześniejsze leksykograficznie. Jest to bardzo mocna zaleta i możliwość, której nie daje haszowanie.

## Porównywanie podsłów dwóch różnych słów za pomocą KMR
Algorytm KMR umożliwia nam porównywanie podsłów jednego słowa. A co gdybyśmy chcieli porównywać między sobą podsłowa dwóch różnych słów $S$ i $W$? Okazuje się, że to nie jest żaden problem. Możemy połączyć $S$ i $W$ w jedno słowo. Chcielibyśmy jednak uniknąć powstania nowych podsłów, które tak naprawdę nie istnieją. W tym celu utworzymy słowo $X$ postaci: $S+\\#+W,$ gdzie $\\#$ to znak spoza alfabetu.

![Łączenie słów haszem](https://codimd.s3.shivering-isles.com/demo/uploads/upload_53f97a9db9e1cf97ebfd50c1edd975d7.png)

Możemy teraz spokojnie obliczyć wartości KMR dla $X$ i porównywać między sobą podsłowa $S$ i podsłowa $W.$

## Zadania
- [Świąteczny łańcuch (XXIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/cSa80AKpjHR8FlWE4BCpLGT3/site/?key=statement)

"
---
