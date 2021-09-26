---
title: 'Arytmetyka modularna i szybkie potęgowanie'
content: "
## Co to jest modulo

Czasem zdarza się, że niektóre wartości w naszym programie (np. wynik) są bardzo duże i nie mieszczą się w zakresach zmiennych udostępnianych przez języki programowania. Często jako wynik programu wystarczy wtedy podać jedynie jego resztę z dzielenia przez z góry określoną liczbę $M.$ Zazwyczaj w celu ułatwienia obliczeń wybiera się $M$ będące liczbą pierwszą. Dzisiaj dowiesz się, jak wykonywać podstawowe operacje w arytmetyce modularnej oraz szybko potęgować liczby.


Poprzez zapis: $a \\equiv b \\ (mod \\ M)$ (czytaj: $a$ przystaje do $b$ modulo $M$) rozumiemy, że liczby $a$ i $b$ mają tą samą resztę z dzielenia przez $M,$ czyli że $a-b$ jest podzielne przez $M.$ Na przykład: $2\\equiv 8 \\ (mod \\ 6),$ $17 \\equiv 187 \\ (mod \\ 10).$ Takie \"równanie\" nazywamy kongruencją.

## Dodawanie, odejmowanie i mnożenie modulo

Trzy wyżej wymienione operacje wykonujemy dokładnie tak samo, jak w przypadku zwykłej arytmetyki na liczbach:


$(a + b) \\ (mod \\ M) \\equiv (a \\ (mod \\ M) + b \\ (mod \\ M)) \\ (mod \\ M)$


$(a \\cdot b) \\ (mod \\ M) \\equiv (a \\ (mod \\ M) \\cdot b \\ (mod \\ M)) \\ (mod \\ M)$


$(a – b) \\ (mod \\ M) \\equiv (a \\ (mod \\ M) - b \\ (mod \\ M)) \\ (mod \\ M)$


Na przykład: $17$ $(mod \\ 10)$ $+$ $28$ $(mod \\ 10)$ $\\equiv$ $(7 \\ (mod \\ 10)$ $+$ $8$ $(mod \\ 10))$ $(mod \\ 10)$ $=$ $(7 + 8)$ $(mod \\ 10)$ $=$ $15$ $(mod \\ 10)$ $\\equiv$ $45$ $(mod \\ 10)$ $=$ $(17+28)$ $(mod \\ 10).$


Innymi słowy, jeśli chcemy poznać resztę z dzielenia przez $M$ sumy dwóch liczb, możemy najpierw zamiast każdej z nich wziąć jej resztę (mod $M$), dodać do siebie te reszty i wziąć resztę z dzielenia przez $M$ tej sumy. Otrzymamy wtedy taki sam wynik, jak gdybyśmy najpierw dodali do siebie obie liczby, a następnie policzyli resztę tej sumy modulo $M.$


W przypadku odejmowania istnieje niebezpieczeństwo, że wynik będzie ujemny. Chcielibyśmy jednak modulować jedynie liczby dodatnie. Dlatego do wyniku odejmowania dodajemy $M$ - nie zmienia to nam reszty z dzielenia przez $M$ danej liczby, a zapewnia, że liczba, której resztę z dzielenia następnie obliczymy, będzie dodatnia.


W przypadku mnożenia istnieje natomiast niebezpieczeństwo, że jeśli liczba $M$ jest duża (np. $M=10^9+7$) to mnożąc ze sobą dwie reszty, wykroczymy poza zakres intów. Aby uniknąć tego problemu, musimy po prostu pamiętać o zastosowaniu long longów.

## Szybkie potęgowanie modulo

Zauważmy, że:


![a do b](https://codimd.s3.shivering-isles.com/demo/uploads/upload_778f849085d6554cc8dbce725b30a67e.png)
			
            
Pozwala to na zaimplementowanie prostego algorytmu do szybkiego potęgowania liczb:
	

```cpp=

long long modulo=1000000009;

long long pow(long long base, long long power) {

\ \ \ \ if (power == 0)

\ \ \ \ \ \ \ \ return 1;

\ \ \ \ else if (power % 2 == 0) {

\ \ \ \ \ \ \ \ long long result = pow(base, power / 2);

\ \ \ \ \ \ \ \ return (result * result) % modulo;

\ \ \ \ }

\ \ \ \ else

\ \ \ \ \ \ \ \ return (base * pow(base, power - 1)) % modulo;

}

```


Ile razy wykona się ta funkcja? Wykładnik $b$ nie będzie nieparzysty więcej razy niż parzysty. Oznacza to, że w przynajmniej połowie przypadków zmniejsza się on dwukrotnie – liczba wywołań funkcji będzie rzędu $O(log(b)).$ Jest to istotna różnica w porównaniu do wykonywania $b$ mnożeń „na pałę forem”.

## Dzielenie modulo - odwrotność potęgowania

Niestety, dzielenia modulo nie możemy wykonywać tak \"niefrasobliwie\", jak reszty operacji, ponieważ bardzo często $a \\div b$ daje inną resztę z dzielenia przez $M,$ niż $a \\pmod{M} \\div b \\pmod{M}$


Np. z jednej strony $(12 \\div 2)$ $pmod{10}$ $=$ $6$ $\\pmod{10},$ a z drugiej: $(12 \\pmod{10})$ $\\div$ $(2 \\pmod{10})$ $=$ $(2 \\pmod{10})$ $\\div$ $(2 \\pmod{10})$ $=$ $1 \\pmod{10}.$ Coś tutaj się nie zgadza...


Może też się zdarzyć, że $a$ nie jest podzielne przez $b,$ a mimo tego dzielenie modulo da się wykonać, np. $3$ nie dzieli $7$ , ale $7 \\pmod{10} \\div 3 \\pmod{10} \\equiv 9 \\pmod{10},$ ponieważ $3 \\cdot 9 = 27 \\equiv 7 \\pmod{10}$}


Aby dzielenie modulo wykonywać poprawnie, musimy podejść do niego od całkiem nowej strony. Otóż przedstawmy sobie dzielenie jako mnożenie przez <b>odwrotność:</b>


$(a \\div b) \\pmod M = a \\cdot b^{-1} \\pmod M = a \\pmod M \\cdot b^{-1} \\pmod M$


Gdzie $b^{-1}$ to taka liczba, że $b \\cdot b^{-1} \\equiv 1 \\ \\pmod M.$ Umiemy już mnożyć, więc musimy nauczyć się znajdywać odwrotność modulo. W tym celu skorzystamy z <b>Małego Twierdzenia Fermata,</b> które mówi, że:
Dla $M$ będącego liczbą pierwszą i $b$ niepodzielnego przez $M$ zachodzi: $b^{M – 1} \\equiv 1\\pmod{M}$


<b>Dowód:</b> Rozważmy wszystkie możliwe kolorowania \"koła fortuny\", podzielonego na $M$ kawałków, na $b$ kolorów. W sumie jest ich $b^M$ - każdy kawałek możemy pokolorować na jeden z $b$ kolorów. Zauważmy, że po obróceniu dowolnego kolorowania, takiego, że nie całe koło jest pomalowane na ten sam kolor, otrzymamy jakieś inne kolorowanie. W sumie kolorowań, w których całe koło jest jednokolorowe, mamy $b$ - tyle, ile kolorów. Czyli pozostałe $b^M-b$ kolorowań możemy poustawiać po $M$ kolorowań tak, że kolorowania w jednej grupie da się uzyskać z siebie poprzez obracanie koła. Każde kolorowanie trafi do dokładnie jednej grupy wraz z $M-1$ kolorowaniami, które możemy z niego uzyskać, obracając koło. Czyli $M$ dzieli $b^M-b = b(b^{M-1}-1).$ Ponieważ $M$ nie dzieli $b$ oraz jest pierwsze, $M$ musi dzielić $b^{M-1}-1,$ czyli $b^{M-1} \\equiv 1 \\pmod{M}.$ To kończy dowód.


Wykorzystując Małe Twierdzenie Fermata, dostajemy:


$b \\cdot b^{-1} \\equiv 1 \\equiv b ^ {M – 1} \\pmod{M}$


$b \\cdot b^{-1} = b ^ {M – 2} \\cdot b \\pmod{M}$


$b^{-1} \\cdot b \\cdot b^{-1} = b ^ {M – 2} \\cdot b \\cdot b^{-1} \\pmod{M}$ (pomnożyliśmy stronami poprzednią kongruencję przez $b^{-1}$)


$b ^ {-1} \\equiv b ^ {M – 2}\\pmod{M}$ (ponieważ $b \\cdot b^{-1} \\equiv 1 \\pmod{M}$ \"znikają\" z obu stron)
	

$b ^ {M – 2}$ umiemy policzyć w $O(log \\ M),$ używając szybkiego potęgowania, czyli umiemy już też dzielić $(mod \\ M).$


Przypomnijmy na koniec, że aby zastosować Małe Twierdzenie Fermata, $M$ musi być liczbą pierwszą. Jak radzić sobie z dzieleniem, gdy jest ono złożone dowiesz się w artykule Teoria liczb I.

## Zadania

- [Tiles (Codeforces, Global Round C)](https://codeforces.com/contest/1178/problem/C)

- [Santa's Bot (Codeforces, Edu Round D)](https://codeforces.com/contest/1279/problem/D)
"
---
