---
title: 'Sumy prefiksowe'
content: "
### Zadanie - szukanie sum na przedziałach

Podaj sumę na przedziale $[a,b]$ ciągu $S$ o długości $n$ $(n \\leq 10^6).$


![przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_3ad8040f07cf46f57ebe76fea99e2fff.png)


#### Wolne rozwiązanie

Pierwsze rozwiązanie, na jakie możemy wpaść to przejrzenie wszystkich elementów od $a$-tego do $b$-tego i zsumowanie ich. Tak po prostu. Bez haczyków. Zastanówmy się, jaką to ma złożoność obliczeniową. Wykonamy $b – a$ operacji. W najgorszym wypadku, kiedy $a = 1$ i $b = n,$ wyniesie ona $O(n).$ Co gdybyśmy chcieli zapytać się o sumę na przedziale $m$ $(m \\leqslant 10^6)$ razy? Uzyskalibyśmy wtedy złożoność $O(nm),$ co zdecydowanie nie brzmi satysfakcjonująco.

#### Sumy prefiksowe

Niech $pref[i]$ oznacza sumę na prefiksie o długości $i$ (inaczej $i$-tym prefiksie). Chcemy obliczyć $pref[i]$ dla każdego naturalnego $i \\leq n.$ Pomogą nam w tym dwa spostrzeżenia:
$1)$ $pref[1]$ = $S_1$
$2)$ Dla $i > 1$ zachodzi: $pref[i] = pref[i – 1] + S_i$


![sumy prefiksowe - przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_22ba84964b9ad4a62a3d289dd3f773a6.png)


Pozwala nam to policzyć wszystkie sumy prefiksowe w $O(n).$

#### Suma na przedziale

Zauważmy, że suma na przedziale $[a,b]$ to nic innego jak $pref[b] – pref[a – 1]$ (przy czym zakładamy, że $pref[0]=0$).


![przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_00a488efe984019a9bc7d7ffb3150570.png)


Oznacza to, że jeśli obliczymy wcześniej sumy prefiksowe w $O(n)$ to będziemy mogli pytać się o sumy na przedziale w $O(1).$ Nasz problem będziemy mogli rozwiązać w $O(n + m)$ zamiast $O(nm).$ Jest to bardzo satysfakcjonujące rozwiązanie.

### Dwuwymiarowe sumy prefiksowe

Dany mamy prostokąt podzielony na komórki, w każdej znajduje się liczba. Chcemy podać sumę liczb w podprostokątach.


![prostokąt z liczbami](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a41c863f4eef84f021a4603afc017ab1.png)


Do rozwiązania tego problemu możemy policzyć coś bardzo podobnego do standardowych sum prefiksowych. Jako $A[i][j]$ oznaczmy sumę w prostokącie, którego lewy górny róg ma współrzędne $[1,1],$ a prawy dolny $[i,j].$ Tak samo, jak ostatnio, skorzystamy z tych samych dwóch spostrzeżeń:
1. $A[1][1] = S_{(1,1)}$
2. $A[i][j] = S_{(i,j)} + A[i – 1][j] + A[i][j – 1] – A[i – 1][j – 1]$


![drugi wzór - schemat](https://codimd.s3.shivering-isles.com/demo/uploads/upload_36ec918f197696105a009939708c3cd3.png)


Zauważmy, że suma w prostokącie, którego lewy górny róg ma współrzędne $[a,b],$ a prawy dolny $[c,d]$ to nic innego jak $A[c][d] – A[a – 1][d] – A[c][b – 1] + A[a -1][b – 1]$ (zakładamy tutaj, że $A[0][i]=0$ oraz $A[i][0]=0$ dla dowolnego $i$).


![liczenie sumy w dowolnym podprostokącie](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f981ff337462a553c624bcc290849ec5.png)


Metodę sum prefiksowych możemy rozszerzyć na większą liczbę wymiarów, obliczając odpowiednie wzory podobnie do tych pokazanych powyżej. Jednak już dla $n \\geq 4$ jest to dosyć trudne, przez co raczej rzadko widywane.
 
### Iloczyny i xory prefiksowe - uogólnienie

Funkcja sumy nie jest jedyną funkcją, którą możemy liczyć na prefiksach. Możemy liczyć też chociażby funkcje $min,$ $max$ czy $xor.$ Jednak by móc w ten sposób obliczać ich wartość dla dowolnych przedziałów, używana funkcja musi mieć zdefiniowaną odwrotność (np. odejmowanie dla dodawania, dzielenie dla mnożenia czy $xor$ dla $xor$-a). Dlatego mając tablicę $xor$-ów prefiksowych $XOR[i]$ możemy obliczyć $xor$ na dowolnym przedziale $[i,j]:$ będzie on równy $XOR[j] \\ xor \\ XOR[i-1],$ ponieważ funkcją odwrotną dla $xor$-a jest właśnie $xor.$ Nie możemy natomiast obliczyć $min$ na przedziale mając tylko wartości dla prefiksów, ponieważ funkcja $min$ nie ma swojej odwrotności.

### Szczegół implementacyjny - indeksowanie

Z pewnych względów elementy naszej tablicy numerowaliśmy od jedynki zamiast od zera. Ten trick implementacyjny warto stosować w swoich programach. Pomyślmy, co stanie się, gdy ktoś zapyta nas o prefiks $[1,i].$ Gdybyśmy indeksowali elementy od zera odpowiedź na nie byłaby równa $pref[i-1] – pref[-1],$ co spowoduje odwołanie się do elementu będącego poza tablicą. Problem nie będzie występować w przypadku numerowania ciągu od jedynki. W $pref[0]$ należy zapisać tzw. element neutralny wykonywanego działania (np. 0 dla dodawania, 1 dla mnożenia). Problemy wielowymiarowe są analogiczne.

### Zadania

- [Halloween (VI OIJ, zawody drużynowe)](https://szkopul.edu.pl/c/archiwum-zadan-k0mpend1x/problemset/problem/dpUrcEC9SeZC4bUHhqj0lU4d/site/?key=statement)
- [Porządek (VII OIJ, II etap)](https://szkopul.edu.pl/c/archiwum-zadan-k0mpend1x/problemset/problem/r2sI-xPUxHi_4OnW7gBWKq6Q/site/?key=statement)
- [Karen and Coffee (Codeforces, Div. 2 B)](https://codeforces.com/contest/816/problem/B)
- [Greg and Array (Codeforces, Div. 2 C)](https://codeforces.com/contest/296/problem/C)
"
---
