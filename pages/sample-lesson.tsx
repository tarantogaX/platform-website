import Head from 'next/head';
import * as React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IStyleArgument} from '../styles/theme';
import Section from '../components/section/Section';
import LessonContent from '../page-fragments/lesson/LessonContent';
import Navbar from '../components/navbar/Navbar';
import Center from '../components/central/Center';

const lessonTitle = `Zliczanie kubełkowe`;
const lessonContent = `W zadaniach natykamy się nieraz na problem zliczenia wystąpień pewnych elementów. Można w ten sposób np. sortować ciąg lub znaleźć jego dominantę. W tym artykule omówimy metodę zliczania kubełkowego. 

### Zadanie - szukanie dominanty ciągu
Dany jest ciąg długości $n$ $( 1 \\leq n \\leq 10^6),$ złożony z liczb naturalnych $x_i$ $( 1 \\leq x_i \\leq 10^6).$ Znajdź jego dominantę – element, który występuje najwięcej razy.
 
#### Rozwiązanie

Niech $t$ będzie tablicą. Dla każdego $i$ zwiększymy wartość $t[x_i]$ o jeden. W ten sposób w $a$-tej komórce $t$ będziemy przechowywać liczbę wystąpień elementu o wartości $a.$

![zliczanie kubełkowe - przykład](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ff2aa8bfd0d40494abd41d7a843bec98.png)

Dominantą ciągu będzie to $x,$ którego $t[x]$ jest największe. Wystarczy więc przejrzeć wszystkie komórki tablicy $t$ i znaleźć maksymalną wartość.

#### Złożoność czasowa
Przeglądamy ciąg o długości $n$ w czasie $O(n).$ Następnie iterujemy się po wszystkich komórkach $t.$ Sumaryczna złożoność wynosi $O(n + Z),$ gdzie $Z$ to maksymalna wartość ze wszystkich $x_i.$

### Sortowanie kubełkowe

Zauważmy, że jeśli będziemy „wyciągać” elementy z kubełków – komórek tablicy $t,$ od najmniejszego do największego, to uzyskamy posortowany ciąg.

![sortowanie kubełkowe](https://codimd.s3.shivering-isles.com/demo/uploads/upload_e07d7a0a05592d3199b0ce3328540823.png)

### Zadania
- [Łańcuch kolorowy (XX OI, III etap)](https://szkopul.edu.pl/problemset/problem/MAWN1VdLdXO29VvrVYuYxQyw/site/?key=statement)
- [Calendar (Codeforces, Beta Round Div. 2 D)](https://codeforces.com/contest/58/problem/D)
`;

const Lesson: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>Meet IT Lesson</title>
            </Head>
            <Center noLeftMargin maxWidth={1500}>
                <Navbar sectionTitle="Algorytmy dynamiczne" lessonsList={["Dziel i zwyciężaj", "Zliczanie kubełkowe", "Gąsienica", "Sortowanie kątowe"]} selectedLesson={1} />
                <LessonContent title={lessonTitle} content={lessonContent} />
            </Center>
        </>
    );
};

export default Lesson;
