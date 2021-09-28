---
title: 'Algorytmy zachłanne'
content: "
## Greedy algorithms - algorytmy zachłanne

Algorytmy zachłanne to chyba najbardziej naturalne ze wszystkich algorytmów. Większość ludzi nawet nie zdaje sobie sprawy, kiedy używa takich właśnie algorytmów - a robi to choćby kasjer w sklepie przy wydawaniu reszty. Ogólnie rzecz polega na tym, że będziemy wybierać opcję, która w danej chwili wydaje się najkorzystniejsza w nadziei, że doprowadzi ona do globalnie najlepszego rozwiązania. 


## Zadanie - zachłanne maksymalizowanie sumy

Dany jest ciąg $n$ liczb. Chcemy wybrać $k$ z nich tak, aby ich suma była jak największa.


### Rozwiązanie zachłanne

Żeby otrzymać jak największą sumę, chcemy po prostu wziąć $k$ największych liczb spośród tych, które mamy. Posortujemy więc liczby malejąco i weźmiemy $k$ pierwszych, otrzymując efektywne rozwiązanie tego problemu.


### Dowód poprawności

W algorytmach zachłannych bardzo ważny jest dowód poprawności, czyli rozumowanie mające wyjaśnić nam, dlaczego ten algorytm zawsze zwróci optymalne (czyli najlepsze) rozwiązanie. Spróbujmy więc udowodnić powyższy algorytm. Zastosujemy jedną z najpopularniejszych technik dowodzenia - dowód przez sprzeczność. Przypuścimy, że istnieje rozwiązanie lepsze $B,$ którego nasz algorytm nie znalazł. Bierze ono elementy $b_1,$ $b_2,$ ..., $b_k.$ Z drugiej strony nasze rozwiązanie $A$ bierze elementy $a_1,$ $a_2,$ ..., $a_k.$ 


![Rozwiązanie optymalne a znalezione](https://codimd.s3.shivering-isles.com/demo/uploads/upload_d2d06f0c15f4e8e1244a6cd4ef4ae1bc.png)


Przyporządkujmy elementy z $B$ elementom z $A,$ w ten sposób, że im większy jest element $B,$ tym większy elemnt $A$ zostaje mu przyporządkowany. Gdyby rozwiązanie $B$ było lepsze niż $A,$ to w którejś z par musiałoby zachodzić $a_i < b_i.$ To jest jednak niemoliwe, gdyż elementy są posortowane malejąco, a rozwiązanie $A$ bierze elementy od lewej strony.


![Przyporządkowywanie elementom A elementów B](https://codimd.s3.shivering-isles.com/demo/uploads/upload_20f0e18acdc94cb69181d305b41b663e.png)


Możnaby powiedzieć, że przecież to oczywiste, że ten algorytm działa. Po co nam w ogóle ten dowód? Okazuje się, że nie zawsze algorytmy zachłanne są poprawne. Zdarzają się nawet sytuacje, w których ta <b>oczywista oczywistość okazuje się nie być prawdziwa.</b>


## Zadanie - problem plecakowy

Mamy $n$ przedmiotów. Każdy ma swoją wagę $m_i$ i wartość $w_i.$ Dysponujemy plecakiem, który jest w stanie pomieścić przedmioty o sumarycznej wadze nie większej niż $M,$ ponieważ w przeciwnym wypadku rozerwie się niczym siatka z (tu wstaw nazwę dowolnej sieci supermarketów). Chcemy zapakować do plecaka przedmioty o jak największej sumarycznej wartości.


### Niepoprawne rozwiązanie zachłanne


Przychodzi na myśl, aby dla każdego przedmiotu wyznaczyć jego szlachetność - ile jest warty jeden kilogram tego przedmiotu - a następnie wkładać do plecaka elementy w kolejności od najszlachetniejszego. Niestety, takie podejście nie musi dać poprawnego wyniku:


![Kontrprzykład - najszlachetniejsze przedmioty nie muszę dać najlepszego rozwiązania!](https://codimd.s3.shivering-isles.com/demo/uploads/upload_7621f346bdb44d3d1dd8c3415818c78b.png)


Zapropononowane rozwiązanie włoży najpierw najcenniejszy przedmiot jako pierwszy, jednak nie znajdzie się już miejsce w plecaku dla niczego więcej. Wzięcie drugiego i trzeciego przedmiotu okazuje się być lepsze. Dyskretny problem plecakowy to przykład zadania, które nie daje się rozwiązać metodą zachłanną. Nie martw się - za kilka lekcji dowiesz się, jak możemy sobie z nim poradzić.


Przejdźmy teraz natomiast do trochę bardziej zaawansowanego zadania, z którym programowanie zachłanne świetnie sobie radzi.


## Zadanie - wybór zajęć

Na uczelni odbywa się $n$ wykładów, każdy ma podaną godzinę rozpoczęcia i zakończenia. Niestety, odbywają się one stacjonarnie, a my nie posiadamy umiejętności bilokacji - w jednym momencie możemy słuchać tylko jednego z nich. Ponadto, nie wolno nam wyjść przed zakończeniem ani wejść po rozpoczęciu wykładu. W ilu najwięcej wykładach możemy wziąć udział?


### Działająca strategia zachłanna

Rozważmy prostą strategię zachłanną: w każdym momencie pójdziemy na wykład, który zaczyna się najwcześniej. Łatwo przekonać się, że jest ona niepoprawna. Kontrprzykładem nazwiemy dane wejściowe, dla których algorytm nie działa. Czy potrafisz podać kontrprzykład do tego algorytmu?


Spróbujmy innego sposobu: w każdym momencie udamy się na wykład, który kończy się najwcześniej. Okazuje się, że tym razem nasza strategia jest poprawna. Czy potrafisz ją udowodnić?


Jak widzisz, zdarzają się przypadki, kiedy jeden algorytm zachłanny może nie działać, ale inny będzie poprawny.


## Znane algorytmy zachłanne

Podczas swojej przygody z algorytmiką spotkasz z pewnością mnóstwo algorytmów. Wiele z nich będzie implementować podejście zachłanne. Do najpopularniejszych należą:


- Problem wydawania reszty

- Ciągły problem plecakowy

- Algorytmy do wyszukiwania najkrótszych ścieżek - <b>BFS</b> i <b>Dijkstry</b>.

- Algorytmy do znajdowania minimalnego drzewa rozpinającego - <b>Kruskala</b> i <b>Prima</b>

- Algorytmy przepływowe


To tylko przykłady. Większość z nich poznasz w trakcie naszego kursu, nie musisz uczyć się ich teraz :) 

## Zadania

- [Tygrysy (V OIJ, III etap)](https://szkopul.edu.pl/problemset/problem/qIU-rEjDKpMNvQWNfGOxYrO5/site/?key=statement)

- [Apteka (VI OIJ, I etap)](https://szkopul.edu.pl/problemset/problem/mZDGm1hDFvHQwi1VEXmkuIZs/site/?key=statement)

- [Jutro (AMPPZ 2012)](https://szkopul.edu.pl/problemset/problem/EMB5uNAIW1GVi_U23U-pqurR/site/?key=statement)

- [Orka (XIII OI, II etap)](https://szkopul.edu.pl/problemset/problem/KLuOAAmU_h7SoX2qtgmAwXV2/site/?key=statement)

"
---
