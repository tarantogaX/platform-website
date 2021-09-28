---
title: 'Bardzo duże liczby'
content: "
W tym artykule zajmiemy się wielomianami. W pewnym sensie szczególnym przykładem wielomianów są bignumy -- czyli po prostu duże liczby, <b>wykraczające poza zakresy int i long long.</b> Standardowe typy nie mogą przechowywać liczb, które mają więcej niż $20$ cyfr. Z tego powodu czasem jesteśmy zmuszeni sami pisać arytmetykę wielkich liczb. 


## Wielomiany - szkolne informacje

Przypomnijmy najpierw kilka szkolnych faktów o wielomianach. 


Dla danej nieujemnej liczby całkowitej $n$ <b>wielomian</b> stopnia $n$ zmiennej $x$ oznaczany jako $P(x)$ jest wyrażeniem postaci: $a_n \\cdot x^n + a_{n-1} \\cdot x^{n-1} + ... + \\cdot a_1\\cdot x + a_0.$ Liczby [$a_n,$ $a_{n-1},$ ..., $a_1,$ $a_0$] nazywamy współczynnikami wielomianu.


<b>Podzielność wielomianów:</b> Wielomian $W(x)$ jest podzielny przez $P(x) \\neq 0$ wtedy i tylko wtedy, gdy istnieje wielomian $Q(x)$ taki, że $W(x) = P(x) \\cdot Q(x).$ 


<b>Pierwiastkiem</b> wielomianu $W(x)$ nazywamy taką liczbę $y,$ że $W(y) = 0.$


<b>Równość wielomianów:</b> Dwa wielomiany są równe wtedy i tylko wtedy, gdy ich stopnie i wszystkie współczynniki są równe.


<b>Twierdzenie Bezouta:</b> Wielomian $W(x)$ ma liczbę $a$ jako pierwiastek wtedy i tylko wtedy, gdy $W(x)$ jest podzielny przez dwumian $V(x) = x - a.$


### Reprezentacja wielomianów

Wielomiany najczęściej reprezentujemy jako ciąg współczynników, które możemy trzymać na vectorze. Duże liczby możemy traktować podobnie -- z tą różnicą, że interesuje nas jeszcze podstawa systemu, którego używamy. Standardowo zapisując liczby używamy systemu dziesiętnego. Aby skorzystać z pojemności domyślnych typów możemy użyć systemu o podstawie $10^9.$ Dlaczego taka? Długość liczby zmniejsza nam się dzieki temu około dziewięciokrotnie, a możemy spokojnie mnożyć i dodawać współczynniki. Warto też rozważyć trzymanie liczb od końca, bo wielomiany \\textit{rosną w przód} (czyli nowe wyrazy pojawiają się z przodu, a nie z tyłu).

## Podstawowe operacje na dużych liczbach

### Normalizacja liczb

Zarówno w arytmetyce modulo, jak i tutaj, przydatna może okazać się funkcja normalizująca. W systemie operującym na liczbach całkowitych o podstawie $b$ współczynniki powinny być od $0$ do $b-1.$ Normalizację stosujemy po operacjach na dużych liczbach, żeby uprościć implementację.


### Dodawanie dużych liczb

Dodawanie możemy realizować według standardowego szkolnego algorytmu. Nie potrzebujemy nic więcej, niż dodanie współczynników przy tych samych potęgach. Potem powinniśmy wywołać funkcję normalizującą. Trzeba jeszcze pamiętać o tym, że długość jednej liczby może przekraczać drugą i obronić się przed odwoływaniem do indeksów, które nie istnieją.


### Porównywanie dużych liczb

Nic prostszego. Jak liczba jest dłuższa, to jest większa. A jak długość jest taka sama, to możemy po prostu porównać współczynniki przy kolejnych potęgach.


### Odejmowanie dużych liczb

Odejmowanie możemy realizować podobnie jak dodawanie, dzięki funkcji normalizującej. Odejmujemy współczynniki nie przejmując się niczym, a następnie wywołujemy funkcję normalizującą, żeby ogarnęła nam wszystkie powstałe dziwactwa.


## Mnożenie dużych liczb. Algorytm Karatsuby

Duże liczby możemy pomnożyć w $O(n^2)$ z definicji i nie wymaga to żadnego zaawansowania. Znacznie ciekawiej przedstawia się sprawa zrobienia tego szybciej. Pomoże nam w tym Algorytm Karatsuby.


Chcemy pomnożyć dwie liczby o podstawie $b.$ Bez straty ogólności załóżmy, że są tej samej długości, którą oznaczymy przez $n.$ Jeśli $n=1$ to sprawa jest prosta. W przeciwnym wypadku zacznijmy od podzielenia liczb na pół. $$x = x_1 \\cdot b^{\\frac{n}{2}} + x_2$$ $$y = y_1 \\cdot b^{\\frac{n}{2}} + y_2$$ Wiemy, że pomnożenie $x\\cdot y$ jest równoważne z pomnożeniem $x_1 \\cdot b^{\\frac{n}{2}} + x_2$ przez $y = y_1 \\cdot b^{\\frac{n}{2}} + y_2.$ To cztery mnożenia. Możemy podejść do tego nieco sprytniej, aby zmniejszyć tę liczbę do trzech mnożeń. Zapiszmy:  $$a = x_1 \\cdot y_1$$ $$d = x_2 \\cdot y_2$$ $$e = (x_1 + x_2) \\cdot (y_1 + y_2) - a - d$$ Wobec tego, możemy zapisać wynik mnożenia jako: $$x\\cdot y = a \\cdot b^n + e \\cdot b^{\\frac{n}{2}} + d$$ Algorytm wywołamy rekurencyjnie, wszystkie mnożenia mniejszych liczb również wykonując przy jego pomocy. Mnożenie przez potęgi $b$ w systemie o podstawie $b$ to nic innego, jak dopisanie na końcu pewnej liczby zer. Wszystkie z liczb $x_1,$ $x_2,$ $y_1,$ $y_2$ są długości $\\frac{n}{2}.$ Wszystkie dodawania zajmują nam $O(n),$ więc złożoność tego algorytmu opisuje równanie rekurencyjne: $$T(n) = 3 \\cdot T(\\frac{n}{2}) + O(n)$$ Rozwiązaniem tego równania jest $T(n) = O(n^{\\log_2 3}).$ Jest to nieznacznie gorzej niż $O(n \\sqrt n),$ czyli całkiem fajnie. A na pewno znacznie lepiej niż $O(n^2).$


Więcej o algorytmie Karatsuby można przeczytać [tutaj.](https://brilliant.org/wiki/karatsuba-algorithm/)


## Dzielenie dużych liczb. NWD dużych liczb

Dzielenie wielomianu przez wielomian można zrealizować w $O(n^2)$ podobnie jak mnożenie -- z definicji (jak nas w szkole uczyli). Sprawa z NWD przedstawia się nieco ciekawiej. Trochę jak zawsze -- do dyspozycji jest algorytm Euklidesa. Kiedy niekoniecznie interesuje nas najszybszy możliwy czas wykonania możemy sobie pozwolić na małe ustępstwo. Zamiast pisać modulowanie, korzystamy ze wzoru $NWD(a, b) = NWD(a-b, b).$ W ten sposób otrzymalibyśmy algorytm, który działa bardzo słabo. Możemy jednak być sprytni i nieco sobie pomóc. Weźmy największą potęgę podstawy $b$ (niech to będzie $b^k$), która dzieli obydwie liczby (wiemy, że to po prostu liczba zer na końcu). Możemy obydwie liczby wydzielić wystarczająco dużo przez $b^k$ (żeby $b$ nie dzieliło żadnej z nich), zapamiętać, że NWD trzeba pomnożyć przez $b^k$ (to po prostu dopisanie zer na końcu), wydzielić jedną z liczb przez $b,$ a następnie mniejszą wymnażać przez $b$ dopóki liczby są różnej długości. Dzięki temu po $O(log \\ b)$ operacjach odejmowania zmniejszymy stopnie obydwóch liczb. Koniec końców obliczymy NWD dwóch dużych liczb w $O(n^2 log \\ b)$ w dosyć łatwy sposób.


## Zadania

- [Liczba zbiorów n-k-specjalnych (IV OI, III etap)](https://szkopul.edu.pl/problemset/problem/tvDsyvSww77IiecR5AKcASbM/site/?key=statement)

- [Kafelki (X OI, II etap)](https://szkopul.edu.pl/problemset/problem/1mRVaDVJ8FN2x69FUiYf89yt/site/?key=statement)

- [Lampki (XV OI, III etap)](https://szkopul.edu.pl/problemset/problem/SGVBRKdEJIMlqRk0S_saThBw/site/?key=statement)

"
---
