---
title: 'Liniowe algorytmy tekstowe'
content: "
## Kilka definicji na początek

<b>Prefikso-sufiks słowa</b> – słowo, które znajduje się na początku i końcu rozpatrywanego słowa


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_409cccd1b289a7bdffd697d60b0b23b5.png)


<b>Okres słowa</b> - słowo, które przyłożone obok siebie pewną ilość razy utworzy nam rozpatrywane słowo (np. 'abc' jest okresem słowa 'abcabca', słowo 'abcd' jest okresem słowa 'abcdab', a słowo 'ab' nie jest okresem słowa 'bab')


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e055d004683e4bdeb611f0296f247e32.png)


<b>Pierwiastek słowa </b> – idealnie pasujący (inaczej: pełny) okres słowa (np. podsłowo 'aba' jest pierwiastkiem słowa 'abaabaaba', ale podsłowo 'abcd' nie jest pierwiastkiem słowa 'abcdab').


<b>Pierwiastek pierwotny słowa</b> – najkrótszy ze wszystkich pierwiastków słowa


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_5a73f18b9e1dd34bc9febdeb89255e91.png)


<b>Szablon</b> – słowo, którego wystąpieniami można pokryć cały tekst


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c55c92bdf4ed3ce532b43946d39f235a.png)


<b>Lemat</b> – twierdzenie pomocnicze

<b>Wzorzec</b> – słowo, którego wystąpień szukamy

## Prefikso-sufiksy

Zgodnie z powyższą definicją, prefikso-sufiksem słowa nazywamy taki jego prefiks, który jest jednocześnie jego sufiksem – to znaczy, że występuje na początku i na końcu słowa. Nauczymy się jak szybko liczyć dla każdego prefiksu słowa, jaka jest długość jego najdłuższego prefikso-sufiksu. Od tej pory będziemy oznaczać tę wartość jako $P[i]$ i nazywać funkcją prefikso-sufiksową. W potyczkach z funkcją $P[]$ pomoże nam lemat o prefikso-sufiksach.


<b>Lemat:</b> Jeżeli pewne słowo $T$ ma swój prefikso-sufiks $S$, a on ma własny prefikso-sufiks $Z$, $Z$ jest też prefikso-sufiksem $T$.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_2a95034927e300131f862359f0e3bbc8.png)


Dlaczego tak jest? Zauważ, że słowo $Z$ znajduje się na początku i końcu słowa $S$. Ponieważ $S$ znajduje się na końcu i początku $T$, to $Z$ także znajduje się na początku i końcu $T$.


<b>Wniosek:</b> Prefikso-sufiksy pewnego słowa możemy ustawić rosnąco. Wówczas każde krótsze słowo będzie prefikso-sufiksem dłuższego.


Przyjmijmy, że słowo ma długość $n$ i znajduje się w tablicy $s[1...n]$. $P[0]$ i $P[1]$ będą zawsze równe zero. Zastanówmy się teraz, w jaki sposób możemy znaleźć $P[i]$, mając policzone $P[]$ dla wszystkich $i$ od $0$ do $i−1$. W konstrukcji pomoże nam rozszerzanie prefikso-sufiksów.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_2074ec09dcf56cfd0e491f6c4510eacf.png)


Kiedy chcemy znaleźć $P[i]$ wiemy, że musimy znaleźć taki prefikso-sufiks słowa długości $i−1,$ który ma tę samą następną literę, co nasze słowo w indeksie $i$. Możemy po prostu przejrzeć wszystkie te prefikso-sufiksy. Okazuje to, że będzie to wystarczająco szybkie. Najpierw jednak, zapoznajmy się z przykładową implementacją.


```cpp=

P[1] = P[0] = 0;

for(int i=2;i<n;i++) {

\  \  \  \ int prefiks = P[i-1];

\  \  \  \ while (prefiks > 0 && s[prefiks + 1] != s[i])

\  \  \  \  \  \  \  \ prefiks = P[prefiks];

\  \  \  \ if (s[prefiks + 1] == s[i])

\  \  \  \  \  \  \  \ prefiks++;

\  \  \  \ P[i] = prefiks;

}

```


Na pierwszy rzut oka wydaje się, że funkcja ta działa w $O(n^2)$, ponieważ mamy tu pętlę w pętli.

Możemy jednak zauważyć, że dla jednej iteracji głównej pętli zmienna „prefiks” rośnie co najwyżej o $1,$ a pętla while może ją tylko zmniejszać. Ponieważ nie możemy odjąć więcej niż dodaliśmy, odjęć pętli while również nie będzie więcej niż $n$. Wyznaczanie funkcji prefiksowej działa więc w zamortyzowanym czasie $O(n)$.


Prefikso-sufiksy bywają trudne do zrozumienia. Inne podejście znajdziesz [tutaj.](https://eduinf.waw.pl/inf/alg/001_search/0047.php)


## Kilka słów o okresach, szablonach i prefikso-sufiksach

Prefikso-sufiksom jednoznacznie odpowiadają okresy słowa. Zauważmy, że gdy słowo długości $n$ ma prefiksosufiks o długości $k$, to ma też okres długości $n–k$.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a6c21376007b1c193027463deb2394eb.png)


Z tego, w szczególności, wynika, że najkrótszy okres odpowiada najdłuższemu prefikso-sufiksowi. Wprowadźmy jeszcze jedno narzędzie, które pomoże nam badać okresy słów.


<b>Lemat o okresowości:</b> Jeżeli słowo ma dwa okresy długości $p$ i $q$, to $NWD(p, q)$ (największy wspólny dzielnik) także jest okresem tego słowa.


<b>Wniosek:</b> Każdy pierwiastek słowa jest wielokrotnością pierwiastka pierwotnego.


## Wyznaczanie najkrótszego szablonu słowa

Na pierwszy rzut oka widać, że szablon jest zawsze prefikso-sufiksem danego słowa. Dla każdego prefikso-sufiksu możemy więc sprawdzić, czy jest szablonem w czasie liniowym, znajdując jego wystąpienia w słowie przy pomocy algorytmu KMP. Niestety, kandydatów na szablon mamy pesyimstycznie $O(n)$, a KMP potrafi sprawdzić każdy z nich w czasie $O(n)$, więc całkowita złożoność wynosiłaby $O(n^2)$. Spróbujmy poszukać czegoś lepszego.


<b>Lemat o szablonach:</b> Jeżeli $p$ jest szablonem słowa s, zaś $q$ jest jego prefikso-sufiksem, to jeżeli $p/2  \\leq q  \\leq p$, to również $q$ jest szablonem $s$.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ba9b3fdb74c2ffb390de3cd2b50c9a4b.png)


<b>Dowód:</b> $q$ jest prefikso-sufiksem $p$, ponieważ $p$ jest prefikso-sufiksem całego słowa, $q$ również, a ponadto, $q$ jest krótsze od $p$. Dzięki drugiej części nierówności wiemy, że wystąpienia $q$ na początku i na końcu $p$ pokrywają całe $p$. Wobec tego pokrycie słowa $s$ szablonem $p$ można łatwo zamienić na pokrycie $s$ słowem $q$.


<b>Wniosek:</b> Jeżeli $q$ nie jest szablonem słowa $s$ i $p/2  \\leq q  \\leq p$, to $p$ także nie jest szablonem słowa $s$.


Jak teraz rozwiązać nasze zadanie? Będziemy po kolei przeglądać kandydatów (czyli wszystkie prefikso-sufiksy słowa), od najmniejszego do największego, kończąc algorytm kiedy uda nam się znaleźć poprawny szablon. Kiedy sprawdzimy pewne q i nie okaże się dobrym szablonem, to wszystkie prefikso-sufiksy krótsze niż $2  \\cdot q$ możemy z całą pewnością dzięki naszemu lematowi odrzucić. Tym sposobem sprawdzimy nie więcej niż $O(log  \\ n)$ kandydatów, ponieważ każdy następny będzie przynajmniej dwa razy dłuższy. Umiemy więc znaleźć najkrótszy szablon słowa w czasie $O(n  \\ log  \\ n)$.


### Przydatne linki

Więcej o pierwiastkach, okresach i prefikso-sufiksach słowa możesz przeczytać w opracowaniu zadania: „Palindromy” z XIII Olimpiady Informatycznej.


O szybkim wyszukiwaniu szablonów informacje znajdziesz w opracowaniu zadania: „Szablon” z Olimpiady Informatycznej.

## Wyszukiwanie wzorca

W niektórych zadaniach musimy sprawdzać, czy pewne słowa są sobie równe, czy pierwsze jest szablonem drugiego, jego prefikso-sufiksem, i tak dalej... W tej części artykułu dowiesz się, jak stosunkowo szybko (w złożoności $O(n)$) sprawdzić czy pewien wzorzec występuje w tekście.


Jednym ze sposobów poradzenia sobie z tym problemem jest rozwiązanie brutalne. W takim rozwiązaniu dla każdej pozycji w słowie możemy założyć, że właśnie tutaj zacząłby się wzorzec, a następnie sprawdzić, czy odpowiadające sobie litery w słowach są równe. Taki sposób jest jednak pesymistycznie dość wolny i będziemy poszukiwać szybszego.


Z pomocą przychodzi nam pomysł i znana już funkcja prefikso-sufiksowa. Okazuje się, że jeśli rozważymy słowo: $wzorzec  \\# tekst$, a następnie użyjemy na nim tej funkcji, to wszystkie miejsca $i$, gdzie $P[i]=S$ wzorzec $S$, będą naszymi wystąpieniami wzorca w tekście. Dowód, dlaczego tak się dzieje, pozostawiamy jako krótkie i proste ćwiczenie.


Komentarza wymaga jednak wstawienie specjalnego znaku „#”. Otóż, gdybyśmy po prostu złączyli wzorzec i tekst, moglibyśmy otrzymać różne nieprzewidziane dziwactwa, spowodowane nachodzeniem się tych wyrazów. Wstawienie znaku spoza alfabetu gwaranantuje nam, że to nie nastąpi. Zapamiętaj ten trik – jest bardzo prosty, a potrafi oszczędzić wiele kłopotów.


W ten sposób otrzymaliśmy prosty i efektywny algorytm, który potrafi nam wyszukiwać wzorzec w tekście w czasie $O(|wzorzec|+|tekst|)$. Nie jest to jedyna metoda radzenia sobie z tym problemem. Inną są np. hasze, ale to już temat innego z artykułów


## Zadania

- [Szablon (XII OI, II etap)](https://szkopul.edu.pl/problemset/problem/a3IarwgOdubufXQ89OsQz3v_/site/?key=statement)

- [Okresy słów (XIII OI, I etap)](https://szkopul.edu.pl/problemset/problem/d5ZNN_brr5VUd_EG9OuvsTan/site/?key=statement)

- [Okresowość (XVIII OI, III etap)](https://szkopul.edu.pl/problemset/problem/FoRguPpW1-czheh8UD_LniGy/site/?key=statement)
"
---
