---
title: 'Metoda gąsienicy'
content: "
Zapewne każdy wie, jak wygląda gąsienica. Jest to typ larwy u motyli i błonówek z podrzędu rośliniarek, jedno ze stadiów rozwoju. Charakteryzuje się miękkim ciałem o robakowatym kształcie i metamerii homonomicznej oraz obecnością nieczłonowanych przydatków odwłokowych nazywanych posuwkami.


Co ma gąsienica do rozwiązywania problemów informatycznych? Otóż posiada mocarną umiejętność – <b>pełzanie.</b>

### Kiedy stosować metodę gąsienicy? Intersujące przedziały

W bardzo wielu zadaniach napotykamy się na potrzebę przetwarzania informacji dla przedziałów, które spełniają dany warunek. Nazwijmy je <b>interesującymi.</b> W tym artykule będą nas obchodzić problemy, w których <b>jeżeli warunek zachodzi dla fragmentu $[a, b + 1]$ lub $[a - 1, b],$ to zachodzi również dla $[a,b]$</b>


Oznacza to, że dla każdego początku $a$ albo żaden fragment nie jest interesujący, albo istnieje taki koniec $b,$ że wszystkie interesujące przedziały zawierają się w przedziale $[a, b].$
	
### Pełzanie

W celu rozwiązywania tego typu problemów możemy dla $i$ „pełzać” po kolejnych $j$ dopóki fragment $[i, j + 1]$ spełnia dany warunek. Wówczas przetwarzamy informacje dla znalezionych przedziałów i \"skracamy się\", po czym kontynuujemy poszukiwania dla $i + 1.$ Zauważmy, że skoro $[i + 1, j]$ jest interesujące, to możemy wznowić „pełzanie” dalszym końcem od $j$ zamiast od $i + 1.$ Ta optymalizacja zmniejsza koszt czasowy przeglądnięcia wszystkich interecujących przedziałów z $O(n ^ 2)$ do $O(n).$ 


Dlaczego?


![pełzanie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_20c6ce143e20d6f5abff558946dc5bc1.png)


Zastanówmy się, od czego zależy złożoność gąsienicy. Przy założeniach, że przetwarzanie informacji dla znalezionych przedziałów umiemy wykonywać w czasie stałym, liczba wykonanych operacji jest proporcjonalna do sumarycznej liczby \"przesunięć\" początków i końców. Skoro za każdym razem przesuwamy początek lub koniec o jeden w przód,  łącznie każdy z nich przesunie się conajwyżej $n$ razy. Łączna liczba przesunięć wyniesie co najwyżej $2n,$ co daje nam maksymalnie $O(n)$ operacji.
Gdybyśmy chcieli sprawdzać oddzielnie każdy przedział, w sumie musielibyśmy sprawdzić $O(n^2)$ możliwych przedziałów (dla $n$ możliwych początków i $n$ możliwych końców).


![gąsienica, pełznąca po przedziałach](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d449c5a8e7ba6b3889e11f6280c2f24f.png)


### Zadanie - szukanie najdłuższego ciągu o niedużej sumie

Mając dane $K$ i ciąg $n$ liczb naturalnych $a_i$ podaj długość najdłuższego przedziału $[p, k]$ takiego, że $a_p + a_{p+1} + a_{p+2} + \\dots + a_{k-1} + a_k < K.$

#### Rozwiązanie metodą gąsienicy

Niech $S(a,b)$ będzie równe sumie liczb na przedziale $[a,b].$ Dla każdej pozycji $i$ szukamy najdłuższego fragmentu  zaczynającego się na $i,$ spełniającego podaną nierówność. Będziemy iterować się po kolejnych $j$ tak długo, aż $S(i, j + 1) < K.$


Wówczas możemy zaktualizować wynik i poszukać najdłuższego fragmentu spełniającego podaną nierówność i zaczynającego się na $i + 1.$ Jako, że $S(i + 1, j) < S(i, j) < K,$ zaczniemy iterację od wcześniej wyliczonego $j.$ Rozwiązanie znajdziemy w czasie $O(n).$


![Pełznięcie w zadaniu](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6ced11896817de8d1d17bb287f769f6f.png)


```cpp=

int najdluzszy_przedzial(int k, int a[]) {

\ \ \ \ int j = 1, suma = a[1], wynik = 0;

\ \ \ \ for (int i = 1; i <= n; i ++) {

\ \ \ \ \ \ \ \ if (j < i) {

\ \ \ \ \ \ \ \ \ \ \ \ j = i;

\ \ \ \ \ \ \ \ \ \ \ \ suma = a[i];

\ \ \ \ \ \ \ \ }

\ \ \ \ \ \ \ \ while (j + 1 <= n && suma + a[j + 1] < K) {

\ \ \ \ \ \ \ \ \ \ \ \ suma += a[j + 1];

\ \ \ \ \ \ \ \ \ \ \ \ j ++;

\ \ \ \ \ \ \ \ }

\ \ \ \ \ \ \ \ wynik = max(wynik, j - i + 1);

\ \ \ \ \ \ \ \ suma -= a[i];

\ \ \ \ }

\ \ \ \ return wynik;

}

```

### Zadania

- [Pocztówka (III OIJ, II etap)](https://szkopul.edu.pl/problemset/problem/o7GQu46vul51CKrIKIKHS1_i/site/?key=statement)

- [Naszyjniki (III OIJ, I etap)](https://szkopul.edu.pl/problemset/problem/UoaoClr0lw6vbHd_WouiFgIL/site/?key=statement)

- [Vus the Cossack and Strings (Codeforces, Div. 2 C)](https://codeforces.com/contest/1186/problem/C)

- [Electrification (Codeforces, Edu Round C)](https://codeforces.com/contest/1175/problem/C)
"
---
