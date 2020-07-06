import React, { useState } from 'react';
import './Quote.css';

import quotes from '../quotes';

function getQuote(index) {

    let quoteText = quotes[index]['quoteText'];

    return quoteText;

}

function getAuthor(index) {

    let quoteAuthor = quotes[index]['quoteAuthor'];

    return quoteAuthor;

}

function Quote() {

    let randomIndex = Math.floor(Math.random() * quotes.length);

    let characterIndex = 0;

    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
             "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
             "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", ".", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+",
             "[", "]", ";", ":", "'", "\"", "/", "\\", "?", "<", ">", "`", "~", " "];

    let time;
    let time2;

    const [quote, setQuote] = useState(getQuote(randomIndex));
    const [author, setAuthor] = useState(getAuthor(randomIndex));
    const [wpm, setWpm] = useState(0);

    let characters = Array.from(quote);

    let spans = characters.map((character, index) =>

        <span id={'character' + index} key={index} name='characterSpans' onClick={() => {
            
            document.getElementById('quoteInput').focus();
            document.getElementById('character' + 0).style.backgroundColor = 'yellow';
    
        }}>{character}</span>

    );

  return (
    <div className="Quote">
      { spans }
      <br></br>
      <br></br>
      <span>{ author }</span>
      <br></br>
      <br></br>
      <span>{ wpm.toPrecision(2) } words/minute</span>
      <br></br>
      <input type="text" id='quoteInput' onBlur={() => document.getElementById('character' + 0).style.backgroundColor = 'white'} onKeyDown={(event) => {

        event.preventDefault();

        let key = event.key;

        if (key === 'Enter') {

            let randomIndex = Math.floor(Math.random() * quotes.length);

            characterIndex = 0;

            setQuote(getQuote(randomIndex));
            setAuthor(getAuthor(randomIndex));
            setWpm(0.0);

            let spans = document.getElementsByName('characterSpans');

            spans.forEach(span => {
                span.style.backgroundColor = 'white';
                span.className = '';
            });

            document.getElementById('quoteInput').value = '';

            document.getElementById('character' + 0).style.backgroundColor = 'yellow';

        }else {

            if (document.getElementsByClassName('correctCharacter').length < spans.length) {

                if (characterIndex === 0) {

                    time = Date.now();

                }

                if (key === 'Backspace') {

                    if (characterIndex > 0) characterIndex--;

                    document.getElementById('character' + characterIndex).style.backgroundColor = 'yellow';

                    if (characterIndex + 1 < characters.length) document.getElementById('character' + (characterIndex + 1)).style.backgroundColor = 'white';

                }

                if (alphabet.includes(key)) {

                    if (characterIndex < characters.length){

                        if (key === characters[characterIndex]) {

                            document.getElementById('character' + characterIndex).style.backgroundColor = 'green';
                            document.getElementById('character' + characterIndex).classList.add('correctCharacter');

                        }else {

                            document.getElementById('character' + characterIndex).style.backgroundColor = 'red';
                            document.getElementById('character' + characterIndex).classList.add('incorrectCharacter');

                        }

                        if (characterIndex < characters.length) characterIndex++;

                        if (characterIndex < characters.length) document.getElementById('character' + characterIndex).style.backgroundColor = 'yellow';

                    }

                    if (document.getElementsByClassName('correctCharacter').length === spans.length && wpm !== '0.0') {

                        time2 = Date.now();

                        setWpm((characters.length / 5) / ((time2 - time) / 1000 / 60));
            
                    }

                }

            }

        }

        }}/>
    </div>
  );
}

export default Quote;