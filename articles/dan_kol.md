---
title: 'Kolejka monotoniczna'
content: "
Wiele problemów wymaga użycia w którejś z części rozwiązania algorytmu gąsienicy. Jeśli nie pamiętasz jego dziłania, przypomnij, zajrzyj do lekcji na ten temat z sekcji o podstawach programowania.

W tym artykule opowiemy o tym, co możemy zrobić, gdy chcemy liczyć minimum i maksimum na naszym „pełzającym” przedziale. Oczywiście moglibyśmy zaimplementować zwykłe drzewo przedziałowe. Jednakże istnieje struktura, z której można wyciągnąć te informacje w $O(1)$ oraz nie wymaga pisania dwudziestu dodatkowych linii kodu, co na olimpiadzie może być bardzo pomocne. Ponieważ że minimum i maksimum możemy znaleźć w ten sam sposób, w dalszej części artykułu będziemy mówili o szukaniu maksimum.

## Działanie kolejki monotonicznej
Zanim przejdziemy do opisu samej struktury, zastanówmy się najpierw, jak ma ona działać. Na początku zastanówmy się, czy są pewne pozycje, z których liczby na pewno nie mogą być maksimum na pełznącym przedziale.

Obserwacja: Jeśli nasz przedział obejmuje w pewnym momencie kilka liczb: $a_k, \ a_{k+1}, \ ... \ a_{l}$ oraz znajdują się w nim takie dwie liczby $a_{n}, \ a_{m},$ że $a_n < a_m$ oraz $n < m,$ to wartość liczba z pozycji $n$ (czyli $a_n$) nie może być nigdy później maksymalną liczbą z naszego przedziału. Taką sytuację ilustruje poniższy rysunek: liczba z pozycji $4,$ czyli $1$ nie może stać się maksimum pełznącego przedziału, ponieważ znajduje się w nim także większa od niej liczba z pozycji $6,$ tj. $4.$

![Obserwacja - przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4f9412b67b283b8b4e4f4499f08a62a7.png)

Jak udowodnić tę obserwację? Zauważmy, że aby liczba z pozycji $a_n$ mogła być największą liczbą z naszego przedziału, $a_m$ musi z niego wypaść. Aby to się stało, tył naszej kolejki musi się przesunąć na pozycję wyższą, niż $m.$ Wtedy jednak $a_m$ również wypadnie z przedziału i oczywiście nie będzie mogło być jego największą liczbą.

Zbudujmy teraz naszą strukturę. Będziemy w niej trzymać po kolei tylko te liczby, które mają szansę stać się kiedyś największą liczbą z naszego przedziału. Każdą z nich będziemy trzymać w parze wraz z jej pozycją. Dla przykładu z rysunku w naszej strukturze będą więc pary: $(7, \ 5), \ (4, \ 6), \ (2, \ 7).$

Zauważmy, że dla poprawnego i szybkiego działania nasza kolejka powinna mieć kilka własności:

- powinny w niej znajdować się tylko te liczby, które "mają szansę" być maksimum na przedziale
- liczby w niej powinny znajdować się w kolejności występowania w ciągu, aby w razie przesuwania końców gąsienicy łatwo można było usunąć lub dodać do niej nowe elementy, nie szukając ich po całej strukturze
- jej elementy powinny być uszeregowane nierosnąco, aby łatwo można było znaleźć największy element - czyli po prostu pierwszą liczbę z kolejki


Dzięki wcześniejszej obserwacji spełnienie tych wszystkich warunków jednocześnie jest możliwe. Jeśli trzymamy w naszej kolejce tylko liczby, które mają szansę stać się maksimum na gąsienicy oraz są one trzymane w kolejności występowania w ciągu, to automatycznie - ze względu na obserwację - wartości tych elementów są nierosnące.

Do zaimplementowania naszej struktury użyjemy deque - czyli kolejki dwustronnej, umożliwiającej dodawanie i usuwanie elementów zarówno z przodu, jak i tyłu. Oraz struktury pair z STLa, umożliwiającej wygodne trzymanie pary liczb.

### Przesuwanie lewego końca gąsienicy
Przesuwanie lewego końca gąsienicy do przodu jest bardzo proste: gdy lewy koniec naszej gąsienicy przesunie się do przodu, czyli wyrzucimy z niej pewną liczbę, musimy wyrzucić ją również z kolejki, o ile się tam znajduje. Ponieważ liczby w kolejce są uszeregowane w kolejności występowania w naszym ciągu, sprowadzi się to jedynie do wyrzucenia pierwszego elementu kolejki (o ile jest on równy wyrzucanemu elementowi gąsienicy) i zmiany maksimum przedziału na następnego "kandydata" z kolejki, czyli na element, który znajdzie się teraz na jej przodzie.

### Przesuwanie prawego końca gąsienicy
Gdy natomiast przesuwamy do przodu prawy koniec gąsienicy, dodając do niej nowy element, zabiera on szansę wszystkim mniejszym od siebie liczbom z kolejki na zostanie maksimum przedziału - musimy je więc wyrzucić. Tak więc dopóki wartość liczby z tyłu kolejki jest mniejsza, niż elementu, który właśnie dodajemy do gąsienicy, wyrzucamy go z naszej kolejki monotonicznej (zauważmy, że może się zdarzyć, że wyczyścimy w ten sposób całą kolejkę - to jednak nic nie szkodzi). Gdy już skończymy to robić, na przód kolejki wrzucamy nowododany element gąsienicy.
![Przykład działania kolejki monotonicznej](https://codimd.s3.shivering-isles.com/demo/uploads/upload_31593425629172f4077fdcfef1f7d8cb.png)

### Implementacja kolejki monotonicznej
```cpp=
deque<pair<int, int> > kolejka;

//przesuwamy prawy koniec gąsienicy do przodu na pozycję a
void push(int t[], int a){
	while (!kolejka.empty() && kolejka.back().first <= t[a]) 			kolejka.pop_back();
	kolejka.push_back(make_pair(t[a], a));
}

//przesuwamy lewy koniec gąsienicy z pozycji a do przodu
void pop(int t[], int a){
	if (kolejka.front().second == a)
		kolejka.pop_front();
}

void get_maximum() {
	if (kolejka.size() == 0)
		return -1;
	return kolejka.front().first;
}
```

## Przykładowe zadanie na kolejkę monotoniczną
<b>Problem:</b> Dany jest ciąg $n$ liczb. Znajdź najdłuższy taki przedział, że różnica między maksymalnym a minimalnym elementem jest nie większa niż $k.$
<b>Rozwiązanie:</b> Możemy puścić zwykłą gąsienicę, która dla kolejnych lewych końców będzie „pełzać” prawym końcem tak długo, aż różnica między minimalnym a maksymalnym elementem będzie niewiększa niż $k.$ Znajdowanie minimum i maksimum na tym przedziale możemy wykonywać przy pomocy kolejki monotonicznej.

## Zadania
- [Piloci (XVII OI, III etap)](https://szkopul.edu.pl/problemset/problem/4ZH1h7Wr18Yb7B0L7ym_Km0L/site/?key=statement)
- [Temperatura (XVIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/6sGsrkO-SrmtogJ7u3RIOj3f/site/?key=statement)
- [Ptaszek (XXI OI, II etap)](https://szkopul.edu.pl/problemset/problem/A3QYXKEiRLgKerciOwA_lbCD/site/?key=statement)
"
---
