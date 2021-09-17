---
title: 'Wyszukiwanie binarne'
content: "
Niektóre proste techniki znacznie przyspieszające algorytmy są stosowane tak powszechnie, jak drożdże przy pieczeniu ciasteczek. W tym artykule poznasz najbardziej kultową z nich – wyszukiwanie binarne (ang. binary search).

### Zadanie - Szukanie liczby w ciągu

Dany jest ciąg $n$ liczb $a_i$ i $t$ zapytań $(1 \\leq n, a_i, t \\leq 10^6).$ Każde z nich jest postaci: określ czy liczba $x$ występuje w ciągu.


![przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3f38594743c2b226fbc0131c56cb0783.png)


#### Wolne rozwiązanie

Dla każdego z $t$ zapytań w czasie $O(n)$ przeglądamy cały ciąg w poszukiwaniu $x.$ Oznacza to, że wykonamy $O(tn)$ operacji, co zdecydowanie nie jest satysfakcjonujące. Przyspieszmy ten algorytm korzystając z pewnej obserwacji.

#### Ułatwienie - szukanie liczby w posortowanym ciągu

Posortujmy rosnąco wartości $a_i$ w jakikolwiek szybki sposób.


![posortowany ciąg](https://codimd.s3.shivering-isles.com/demo/uploads/upload_27e99bb1f7c3cfa573566689bb33889e.png)


Zauważmy, że jeśli $a_i < x$ to tym bardziej $a_j < x$ dla każdego $j < i.$


![przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_960b90df912c639738d4638fdaa63032.png)


Analogicznie, jeśli $a_i \\geqslant x$ to tym bardziej $a_j \\geqslant x$ dla każdego $j > i.$


![przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_82387b0835c1deff8213c6b6a0b5fd22.png)


Wykorzystując powyższy fakt, dochodzimy do wniosku, że jeśli $a_i \\neq x$ to w zależności od tego czy $a_i \\geq x,$ czy $a_i < x$ wartość $x$ na pewno nie będzie występować na pozycjach większych lub mniejszych od $i.$

#### Rozwiązanie - wyszukanie binarne

Niech $p$ i $k$ będą odpowiednio początkiem i końcem przedziału, na którym może wystąpić $x.$ Jako, że na początku nie mamy żadnych informacji na temat naszego ciągu, to potencjalnie może ono wystąpić wszędzie: $p = 1,$ $k = n.$ Niech $sr$ będzie środkiem przedziału: $sr = \\frac{p + k}{2}$ (zaokrąglone w dół). Sprawdzimy teraz relację między $a_{sr}$ a $x$:
- $a_{sr} < x$: $x$-a na pewno nie ma na przedziale $[p, sr],$ ale może wystąpić w $[sr + 1,k].$ Przyjmujemy $p = sr + 1.$


![x w prawym przedziale](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c3d298caa3f3d5bbec302c5214218fd2.png)


- $a_{sr} \\geqslant x$: $x$-a na pewno nie ma na przedziale $[sr + 1,k],$ ale może wystąpić w $[p,sr].$ Przyjmujemy $k = sr.$


![x w lewym przedziale](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3a79482f3a35f8560fede2519bdb310e.png)


Po skończonej liczbie wywołań takiego algorytmu $p = k,$ ponieważ z każdym krokiem zmniejszamy długość naszego przedziału. Oznacza to, że jedyne miejsce, w którym potencjalnie może znaleźć się $x$ to $a_p.$ Wystarczy sprawdzić czy $x = a_p$ i możemy odpowiedzieć na zapytanie.

### Binsearch - złożoność czasowa

Warto zastanowić się, jaka dokładnie jest ta 'skończona liczba wywołań'. Za każdym razem zmniejszamy długość naszego przedziału dwukrotnie. Oznacza to, że po pierwszym wykonaniu algorytmu nasz przedział będzie dwa razy krótszy, po drugim: cztery, po trzecim: osiem, a po $i$-tym: $2^i.$ Długość przedziału wyniesie $1$ po $k$ krokach dla takiego $k,$ że $2^k \\approx n.$ Takie $k$ nazywamy logarytmem dwójkowym i w informatyce oznaczamy jako $log~n.$ Złożoność czasowa odpowiedzi na jedno zapytanie wynosi $O(log~n).$ Ze względu na to, że potęgi dwójki bardzo szybko rosną, logarytm rośnie powoli. Zauważmy, że dla $n = 10^6$ zachodzi $log~n \\approx 20.$ Dla komputera jest to tyle, co nic. Mając dane $t$ zapytań, koszt czasowy całego programu można oszacować jako $O(n~log~n + t~log~n),$ gdyż sortowanie ciągu kosztuje $O(n~log~n).$ Opisaną wyżej technikę nazywamy wyszukiwaniem binarnym.

### Zastosowanie wyszukiwania binarnego - obliczanie pierwiastka

Znajdź najmniejszą liczbę całkowitą większą lub równą pierwiastkowi $n$ $(1 \\leqslant n \\leqslant 10^{18}).$

#### Rozwiązanie

Podobnie jak w powyższym problemie, będziemy zmniejszać przedział możliwości. Na początku znajdźmy górne i dolne ograniczenia. Wiemy, że pierwiastek jest na pewno dodatni: możemy przyjąć $p = 1.$ Tak samo żadna liczba całkowita nie ma pierwiastka większego od samej siebie: ustawmy $k = n.$ „Strzelamy” w środek przedziału – $sr$ i sprawdzać, relację $sr^2$ z $n.$ Jeżeli $sr^2 < n,$ to $sr < \\sqrt{n}$ – szukana wartość będzie większa niż $sr.$ To znaczy, że będzie znajdować się na przedziale $[sr + 1, k].$ W przeciwnym wypadku pozostaje do rozważenia przedział $[p, sr].$ Tak samo jak ostatnio po $O(log~n)$ ruchach $p = k$ oraz jest to rozwiązanie naszego pierwiatka. W przypadkach takich, jak to zadanie, gdy wyszukujemy wartość, będącą rozwiązaniem danego problemu, mówimy o „wyszukiwaniu binarnym po wyniku”.

### Zadania

- [Kalendarze (III OIJ, II etap)](https://szkopul.edu.pl/problemset/problem/LWpMcXylQBa6wHzcJ6U7axzK/site/?key=statement)
- [Computer Game (Codeforces, Div. 3 C)](https://codeforces.com/contest/1183/problem/C)
- [Energy Exchange (Codeforces, Beta Round B)](https://codeforces.com/contest/68/problem/B)
- [Three Base Stations (Codefroces, Beta Round C)](https://codeforces.com/contest/51/problem/C)
"
---
