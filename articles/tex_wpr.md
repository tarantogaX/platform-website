---
title: 'Wprowadzenie do algorytmów tekstowych'
content: "
Na dzisiejszej lekcji dowiesz się, w jaki sposób utrzymywać teksty w pamięci komputera oraz poznasz definicje kilku ważnych pojęć.

## Kod ASCII
![Kod ASCII](https://codimd.s3.shivering-isles.com/demo/uploads/upload_fce83cbe38054a916651f6aa894bc618.png)

Znaki w C++ są kodowane w ASCII: każdemu z nich jest przyporządkowana liczba z przedziału od $0$ do $255.$ Dzięki temu mamy możliwość odejmowania i dodawania znaków. Na przykład:
```cpp=
int X = ’c’ - ’a’; // X = 2
char X = 65; // X = 'A'
int X = ’9’ - ’0’;  // X = 9
```

## Char
Każdy pojedynczy znak trzymamy w pamięci jako zmienną typu char. Wczytywanie pojedynczego znaku możemy zaimplementować w następujący sposób:
```cpp=
char znak;
scanf(\" %c\", &znak);
cin >> znak; // Alternatywny sposób
//Możemy go użyć, jeśli znak jest otoczony na wejściu spacjami
```
To bardzo ważne, żeby pamiętać o spacji przed ```\\%c```. W innym wypadku każdy znak biały (spacja, enter, itp.) będzie również interpretowany jako coś, co chcemy wczytać.

Natomiast przy wypisywaniu charów ta spacja nie jest już potrzebna:

```cpp=
printf(\"%c\", znak);
cout << znak; // Alternatywny sposób
```

W celu uzyskania kodu ASCII danego znaku, wystarczy podstawić chara pod inta:

```cpp=
int a = znak; ///a będzie kodem ASCII zmiennej o nazwie znak
```

A co, jeśli chcemy trzymać całe słowo? Możemy do tego użyć typu <b>string,</b> który zachowuje się tak samo jak tablica charów. Wczytujemy go za pomocą komendy:

```cpp=
string slowo;
scanf(\"%s\", slowo);
cin >> slowo; // Alternatywny sposób
```

W kolejnych komórkach stringu ```slowo```, zaczynając od 0, znajdą się kolejne znaki wczytanego słowa. Wywołanie ```slowo.length()``` zwróca długość wczytanego stringa.

## Podstawowe pojęcia
- <b>Alfabet</b> – zbiór znaków, np. $\\{a,b,c,d,e,f,g\\}$ lub $\\{2,X,d,4,1,<\\}$ są alfabetami
- <b>Litera</b> – znak występujący w danym alfabecie, np. $a,$ $V$ lub $7$ to litery
- <b>Słowo</b> – ciąg znaków, np. $abbabc$ lub $k0mpend1X$
- <b>Język</b> – zbiór słów, np. $\\{abbac, baca, ab, a\\}$
- <b>Podciąg S</b> – słowo, którego znaki występują w słowie $S,$ niekoniecznie obok siebie, ale w tej samej kolejności. Dla słowa $acbabcc$ jego podciągami są np. $cbacc$ i $abbc,$ ale nie są nimi $cccbb$ lub $abbbcc$
- <b>Podsłowo S</b> – spójny fragment słowa $S.$ Każde podłowo jest podciągiem, ale nie każdy podciąg jest podsłowem. Dla tego samego słowa $acbabcc$ podciągi $cbab$ oraz $abc$ są jego podsłowami, ale np. jego podciąg $abbc$ nie jest jego podsłowem

## Zadania
- [Ukryte liczby (IV OIJ, I etap)](https://szkopul.edu.pl/problemset/problem/B1hVIHVRAPsK9SZewqg_b014/site/?key=statement)
- [Zliczacz liter (I OIJ, I etap)](https://szkopul.edu.pl/problemset/problem/y4Yh2h48DQKL4dOEQ8smdTSL/site/?key=statement)
- [Gumka do mazania (VI OIJ, III etap)](https://szkopul.edu.pl/problemset/problem/CNrWfGt3eL5nu1HJ_Og05_v4/site/?key=statement)
"
---
