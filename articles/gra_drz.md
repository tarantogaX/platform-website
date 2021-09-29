---
title: 'Drzewa'
content: "
<b>Drzewa</b> są wszechobecne. Każde z nich jest spójne, posiada korzeń, liście, $n$ wierzchołków i $n-1$ krawędzi.


![Drzewo - graf bez cykli](https://codimd.s3.shivering-isles.com/demo/uploads/upload_517d20747c86aeafc430e29b9e0882fa.png)


Drzewo jest <b>grafem acyklicznym</b> – nie występują w nim cykle.


![Nie - drzewo (jest cykl)](https://codimd.s3.shivering-isles.com/demo/uploads/upload_def15e9c9c91bf994a3ab1775e342ec0.png)


Między każdą parą wierzchołków da się dojść na dokładnie jeden sposób przy założeniach, że nigdy się nie cofamy.


## Drzewa - kilka definicji

<b>Korzeń</b> – wyszczególniony wierzchołek w drzewie. Może istnieć co najwyżej jeden.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a3bc2efe2e643200b5b369c5f2d15b8c.png)


Drzewo jest ukorzenione, jeśli posiada korzeń. W takim wypadku możemy zdefiniować kilka nowych pojęć:


<b>Przodkiem</b> wierzchołka nazwiemy każdy wierzchołek, który leży na ścieżce pomiędzy tym wierzchołkiem a korzeniem. 


<b>Potomkiem</b> natomiast jest każdy wierzchołek, który znajduje się w jego poddrzewie.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_7aae7af811e707133d48a47f098732b2.png)


Potomkowie x tworzą poddrzewo ukorzenione w x. Poddrzewo zawsze jest drzewem.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1c426599564ee4f0ade3429a6619fab0.png)


<b>Liściem</b> nazwiemy wierzchołek bez potomków.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1fb73442afac7ca417c6ea45acbd150c.png)


Jeżeli między x i y istnieje krawędź i x jest przodkiem y wówczas x jest ojcem y. W przeciwnym wypadku x jest synem y.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_f61eb24479aef8551c2ef2e21360473d.png)


<b>Las</b> jest to zbiór drzew.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_1b67e3fda5134a3efaa68aaee97f9cf6.png)


<b>Wielkością poddrzewa</b> nazwiemy liczbę wierzchołków, które się w nim znajdują.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_a930c1708f4f219aca799b8e6af5b845.png)


<b>Średnica</b> to najdłuższa ścieżka drzewa.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_6009bc7b5687aa0e9a8269b1bb31b1f4.png)


## Programowanie dynamiczne na poddrzewach

Jedną z najbardziej pomocnych technik radzenia sobie z drzewem jest programowanie dynamiczne na jego poddrzewach. Poddrzewa też są drzewami, więc zachowują się tak samo jak cały graf. Poniżej przedstawię przykładowe problemy:


### Obliczanie wielkości poddrzew

Niech $ile[x]$ oznacza wielkość poddrzewa ukorzenionego w $x.$ Wówczas: jeśli $x$ jest liściem, $ile[x] = 1,$ ponieważ jedynym wierzchołkiem znajdującym się w jego poddrzewie jest on sam.


w przeciwnym wypadku w poddrzewie ukorzenionym w $x$ są wszystkie wierzchołki, które znajdują się w poddrzewach ukorzenionych w jego synach.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d2b31e3430da8628ccf12aa8d0cd4c95.png)


$ile[x]$ jest o jeden większe niż suma $ile[u_i],$ ponieważ $x$ jest jedynym wierzchołkiem nie znajdującym się w żadnym z poddrzew jego synów.


### Zadanie: najdłuższa ścieżka z wierzchołka

Dla każdego wierzchołka $x$ znajdź długość najdłuższej ścieżki, która się w nim kończy.


Niech $pMax[x]$ będzie długością najdłuższej ścieżki, która kończy się w $x$ i zawiera się w poddrzewie $x.$ Jeżeli $x$ jest liściem, $pMax[x] = 0.$ W przeciwnym wypadku:


$pMax[x] = max(pMax[u1], pMax[u2], ..., pMax[uk]) + 1$


Niech $nMAx[x]$ będzie długością najdłuższej ścieżki, która kończy się w $x$ i biegnie do ojca $x.$ Jeżeli $x$ jest korzeniem, $nMax[x] = 0.$ W przeciwnym wypadku: $$nMax[x] = max(nMax[ojciec[x]]+1, pMax[u1]+2, pMax[u2]+2, ..., pMax[uk] + 2).$$


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_932bf177710d9c4692b80e76cca217f0.png)


W wyżej podanym przykładzie dla każdego wierzchołka pierwsza liczba oznacza jego $pMax,$ a druga - $nMax.$


Wynikiem dla $x$ będzie $max(pMax[x], nMax[x]),$ ponieważ w tych dwóch wariantach rozważyliśmy wszystkie ścieżki kończące się w $x.$


### Znajdowanie średnicy drzewa

Weźmy dowolny wierzchołek $X.$ Niech $Y$ będzie wierzchołkiem najbardziej oddalonym od $X.$ Znajdowanie go jest prostym problemem, który pozostawiam jako ćwiczenie.


<b>Twierdzenie:</b> $Y$ będzie jednym z końców średnicy.


<b>Dowód:</b> Załóżmy, że twierdzenie jest fałszywe. Wówczas musimy rozważyć dwa przypadki:

- Ścieżka między $X$ a $Y$ nie ma części wspólnej ze średnicą.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d636cca8520429b893ad72402b317af1.png)


Na czerwono zaznaczona jest średnica, na zielono: ścieżka między $X$ a $Y$ , na niebiesko: ścieżka między $X$ a najbliższym wierzchołkiem średnicy. Wiemy, że $k$ jest maksymalne $-k \\geq a + b.$ Oznacza to, że ścieżka pomiędzy $Y$ a $Z$ jest niekrótsza niż średnica – również jest średnicą. Otrzymujemy sprzeczność.

- Ścieżka między $X$ a $Y$ ma część wspólną ze średnicą.


![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_fb311c522536fb2f90f602ea8c9c0cfd.png)


Wówczas $g \\geq p,$ ponieważ w przeciwnym wypadku $Y$ nie byłby wierzchołkiem najbardziej oddalonym od $X.$ Oznacza to, że ścieżka pomiędzy $Y$ a $Z$ jest niekrótsza niż średnica – również jest średnicą. Otrzymujemy sprzeczność.


Znajdźmy drugi koniec średnicy – wierzchołek najbardziej oddalony od $Y.$ Nazwijmy go $W.$ $Y$ i $W$ jednoznacznie wyznaczają średnicę, ponieważ między każdą parą wierzchołków w drzewie istnieje dokładnie jedna ścieżka.


## Zadania

- [Łuk triumfalny (XX OI, II etap)](https://szkopul.edu.pl/problemset/problem/jgCcEjQu3kdpM4BmxA6GujfX/site/?key=statement)

- [Strajki (XXIV OI, II etap)](https://szkopul.edu.pl/problemset/problem/lR_LabSUC2n7EMmDHpw-wk_b/site/?key=statement)

- [Metro (XIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/iho4pUEITa4G4NJDKU1-8z8g/site/?key=statement)

"
---
